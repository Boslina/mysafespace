import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, screenshotId } = await req.json();
    console.log('Analyzing screenshot:', screenshotId);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // System prompt for TFGBV analysis
    const systemPrompt = `You are an expert AI analyst specialized in detecting Tech-Facilitated Gender-Based Violence (TFGBV).

Your role is to analyze screenshots, chat logs, and messages to identify:
- Cyberstalking patterns
- Harassment and threatening language
- Revenge porn or non-consensual intimate image sharing threats
- Online harassment and bullying
- Deepfake imagery indicators
- Financial scam coercion
- Violent threats
- Doxxing attempts
- Online grooming patterns
- Blackmail and coercion
- Romance fraud indicators

Analyze the image and provide:
1. Risk Score (0-100): How severe is the threat?
2. Threat Categories: List specific types of TFGBV detected
3. Detailed Analysis: Explain what patterns you see
4. Recommended Actions: Concrete next steps for the victim

Be trauma-sensitive, supportive, and accurate. If no TFGBV is detected, say so clearly.`;

    // Call Lovable AI with vision capability
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this screenshot for Tech-Facilitated Gender-Based Violence. Provide a detailed risk assessment.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;

    console.log('AI Analysis:', analysisText);

    // Parse the analysis to extract structured data
    const riskScore = extractRiskScore(analysisText);
    const threatCategories = extractThreatCategories(analysisText);
    const recommendedActions = extractRecommendedActions(analysisText);

    // Update the screenshot record
    const { error: updateError } = await supabase
      .from('screenshots')
      .update({
        analysis_result: {
          full_analysis: analysisText,
          timestamp: new Date().toISOString()
        },
        risk_score: riskScore,
        threat_categories: threatCategories,
        recommended_actions: recommendedActions,
        status: 'analyzed'
      })
      .eq('id', screenshotId);

    if (updateError) {
      console.error('Error updating screenshot:', updateError);
      throw updateError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        riskScore,
        threatCategories,
        analysis: analysisText,
        recommendedActions
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-screenshot:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function extractRiskScore(text: string): number {
  const riskMatch = text.match(/risk\s*score[:\s]+(\d+)/i);
  if (riskMatch) {
    return Math.min(100, Math.max(0, parseInt(riskMatch[1])));
  }
  
  // Detect severity keywords for fallback scoring
  if (text.toLowerCase().includes('severe') || text.toLowerCase().includes('critical')) {
    return 80;
  }
  if (text.toLowerCase().includes('moderate') || text.toLowerCase().includes('concerning')) {
    return 50;
  }
  if (text.toLowerCase().includes('low') || text.toLowerCase().includes('minimal')) {
    return 20;
  }
  return 30;
}

function extractThreatCategories(text: string): string[] {
  const categories: string[] = [];
  const lowerText = text.toLowerCase();
  
  const threatTypes = [
    'cyberstalking',
    'harassment',
    'revenge porn',
    'intimate image',
    'deepfake',
    'financial scam',
    'violent threat',
    'doxxing',
    'grooming',
    'blackmail',
    'coercion',
    'romance fraud'
  ];

  for (const threat of threatTypes) {
    if (lowerText.includes(threat)) {
      categories.push(threat);
    }
  }

  return categories.length > 0 ? categories : ['general threat'];
}

function extractRecommendedActions(text: string): string[] {
  const actions: string[] = [];
  
  // Look for numbered or bulleted lists in the recommended actions section
  const actionsSection = text.match(/recommended actions?:(.+?)(?=\n\n|$)/is);
  if (actionsSection) {
    const lines = actionsSection[1].split('\n');
    for (const line of lines) {
      const cleaned = line.trim().replace(/^[-*•\d.)\s]+/, '');
      if (cleaned.length > 10) {
        actions.push(cleaned);
      }
    }
  }

  // Default actions if none extracted
  if (actions.length === 0) {
    actions.push(
      'Save and document this evidence securely',
      'Contact local authorities or support organizations',
      'Block the perpetrator on all platforms',
      'Seek support from trusted friends or family'
    );
  }

  return actions.slice(0, 5); // Limit to 5 actions
}