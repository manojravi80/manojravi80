-- Add INSERT policy for staff signup
CREATE POLICY "Allow staff signup" 
ON public.staff 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Optional: Add policy to allow staff to be created by authenticated users
-- This alternative approach allows any authenticated user to create staff entries
-- Uncomment the line below if you prefer this approach:
-- CREATE POLICY "Authenticated users can create staff" ON public.staff FOR INSERT WITH CHECK (auth.role() = 'authenticated');