-- Create applications table for membership applications
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  education TEXT,
  institution TEXT,
  graduation_year INTEGER,
  current_employer TEXT,
  job_title TEXT,
  years_experience INTEGER,
  membership_category membership_category NOT NULL,
  cipm_member_id TEXT,
  document_url TEXT,
  status TEXT DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create news/announcements table
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  author_id UUID REFERENCES auth.users(id),
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Applications policies
CREATE POLICY "Users can submit applications"
ON public.applications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own applications"
ON public.applications
FOR SELECT
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage applications"
ON public.applications
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- News policies
CREATE POLICY "Anyone can view published news"
ON public.news
FOR SELECT
USING (published = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage news"
ON public.news
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();