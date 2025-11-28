import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, AlertCircle, Shield, FileImage, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ScreenshotAnalyzer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file',
        variant: 'destructive'
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 10MB',
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);
    setResult(null);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to use this feature',
          variant: 'destructive'
        });
        navigate('/auth');
        return;
      }

      // Upload to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('screenshots')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('screenshots')
        .getPublicUrl(fileName);

      // Create screenshot record
      const { data: screenshot, error: insertError } = await supabase
        .from('screenshots')
        .insert({
          user_id: user.id,
          image_url: publicUrl,
          status: 'pending'
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setUploading(false);
      setAnalyzing(true);

      // Call analysis edge function
      const { data: analysisData, error: analysisError } = await supabase.functions.invoke('analyze-screenshot', {
        body: {
          imageUrl: publicUrl,
          screenshotId: screenshot.id
        }
      });

      if (analysisError) throw analysisError;

      setAnalyzing(false);
      setResult(analysisData);

      toast({
        title: 'Analysis complete',
        description: 'Your screenshot has been analyzed successfully'
      });

    } catch (error: any) {
      console.error('Error:', error);
      setUploading(false);
      setAnalyzing(false);
      
      toast({
        title: 'Error',
        description: error.message || 'Failed to analyze screenshot',
        variant: 'destructive'
      });
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-destructive';
    if (score >= 40) return 'text-amber-600';
    return 'text-green-600';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 70) return 'High Risk';
    if (score >= 40) return 'Moderate Risk';
    return 'Low Risk';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            AI Screenshot Analyzer
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload screenshots of threatening messages, harassment, or suspicious content. 
            Our AI will analyze them for signs of tech-facilitated gender-based violence.
          </p>
        </div>

        <Card className="shadow-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Upload Evidence
            </CardTitle>
            <CardDescription>
              Your uploaded content is encrypted and securely stored. Only you can access your analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading || analyzing}
                className="hidden"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload" 
                className="cursor-pointer flex flex-col items-center gap-4"
              >
                {uploading || analyzing ? (
                  <>
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    <p className="text-sm text-muted-foreground">
                      {uploading ? 'Uploading...' : 'Analyzing with AI...'}
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Click to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </>
                )}
              </label>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Risk Score */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className={`h-6 w-6 ${getRiskColor(result.riskScore)}`} />
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Assessment</p>
                    <p className={`text-2xl font-bold ${getRiskColor(result.riskScore)}`}>
                      {getRiskLabel(result.riskScore)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className={`text-2xl font-bold ${getRiskColor(result.riskScore)}`}>
                    {result.riskScore}/100
                  </p>
                </div>
              </div>

              {/* Threat Categories */}
              {result.threatCategories && result.threatCategories.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FileImage className="h-4 w-4" />
                    Detected Threats
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.threatCategories.map((category: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Analysis */}
              <div>
                <h3 className="font-semibold mb-3">Detailed Analysis</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{result.analysis}</p>
                </div>
              </div>

              {/* Recommended Actions */}
              {result.recommendedActions && result.recommendedActions.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Recommended Actions</h3>
                  <ul className="space-y-2">
                    {result.recommendedActions.map((action: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t">
                <Button onClick={() => navigate('/resources')} className="w-full">
                  View Support Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ScreenshotAnalyzer;