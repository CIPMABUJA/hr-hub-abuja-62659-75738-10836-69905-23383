
-- 1. Contact messages table
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public contact form)
CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages FOR INSERT TO public
WITH CHECK (true);

-- Admins can view
CREATE POLICY "Admins can view contact messages"
ON public.contact_messages FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 2. Newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  subscribed_at timestamptz DEFAULT now(),
  active boolean DEFAULT true
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers FOR INSERT TO public
WITH CHECK (true);

CREATE POLICY "Admins can view subscribers"
ON public.newsletter_subscribers FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 3. Settings table
CREATE TABLE public.settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage settings"
ON public.settings FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Insert default settings
INSERT INTO public.settings (key, value) VALUES
  ('branch_info', '{"name":"CIPM Abuja Branch","code":"ABJ","address":"Plot 17 Benghazi Street, Wuse Zone 4, Abuja","phone":"08056357501","email":"abuja@cipmnigeria.org"}'::jsonb),
  ('membership_fees', '{"student":15000,"associate":45000,"member":65000,"fellow":85000}'::jsonb),
  ('notifications', '{"new_applications":true,"payments":true,"event_registrations":true,"membership_expiry":true,"forum_activity":false}'::jsonb);

-- 4. Gallery images table
CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  image_url text NOT NULL,
  category text,
  uploaded_by uuid,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery images"
ON public.gallery_images FOR SELECT TO public
USING (true);

CREATE POLICY "Admins can manage gallery images"
ON public.gallery_images FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 5. Auto-generate member ID function
CREATE OR REPLACE FUNCTION public.generate_member_id()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  next_num integer;
  new_id text;
BEGIN
  SELECT COALESCE(MAX(
    CAST(NULLIF(regexp_replace(member_id, '[^0-9]', '', 'g'), '') AS integer)
  ), 0) + 1 INTO next_num
  FROM public.memberships;
  
  new_id := 'CIPM-ABJ-' || LPAD(next_num::text, 4, '0');
  RETURN new_id;
END;
$$;
