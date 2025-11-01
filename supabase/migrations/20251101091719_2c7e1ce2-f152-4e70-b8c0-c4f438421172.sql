-- Fix Public Exposure of User Contact Information
-- Drop the insecure policy that allows anyone to view all profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create a secure policy that only allows users to view their own profile
-- Admins can still view all profiles for management purposes
CREATE POLICY "Users can view own profile or admins can view all" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() = id 
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- Add additional validation for payments table
-- Ensure user_id cannot be NULL (adding constraint if not exists)
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'payments' 
    AND column_name = 'user_id' 
    AND is_nullable = 'YES'
  ) THEN
    ALTER TABLE public.payments 
    ALTER COLUMN user_id SET NOT NULL;
  END IF;
END $$;

-- Add check to ensure payment reference is unique when provided
CREATE UNIQUE INDEX IF NOT EXISTS unique_payment_reference 
ON public.payments(reference) 
WHERE reference IS NOT NULL;