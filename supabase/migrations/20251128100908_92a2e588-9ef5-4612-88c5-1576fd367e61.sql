-- Create screenshots table for TFGBV analysis
CREATE TABLE IF NOT EXISTS public.screenshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  analysis_result JSONB,
  risk_score INTEGER CHECK (risk_score >= 0 AND risk_score <= 100),
  threat_categories TEXT[],
  recommended_actions TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'analyzed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.screenshots ENABLE ROW LEVEL SECURITY;

-- Users can view their own screenshots
CREATE POLICY "Users can view their own screenshots"
ON public.screenshots
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own screenshots
CREATE POLICY "Users can insert their own screenshots"
ON public.screenshots
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own screenshots
CREATE POLICY "Users can update their own screenshots"
ON public.screenshots
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own screenshots
CREATE POLICY "Users can delete their own screenshots"
ON public.screenshots
FOR DELETE
USING (auth.uid() = user_id);

-- Create storage bucket for screenshots
INSERT INTO storage.buckets (id, name, public)
VALUES ('screenshots', 'screenshots', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for screenshots bucket
CREATE POLICY "Users can upload their own screenshots"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'screenshots' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own screenshots"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'screenshots' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own screenshots"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'screenshots' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER screenshots_updated_at
BEFORE UPDATE ON public.screenshots
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();