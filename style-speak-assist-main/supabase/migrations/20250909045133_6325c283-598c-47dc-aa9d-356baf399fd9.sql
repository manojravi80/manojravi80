-- Fix RLS policies for staff table to allow signup
DROP POLICY IF EXISTS "Allow staff signup" ON public.staff;
DROP POLICY IF EXISTS "Staff can insert own profile" ON public.staff;

-- Create a single, clear policy for staff signup
CREATE POLICY "Staff can signup" ON public.staff
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Update products with correct image paths
UPDATE public.products 
SET image_url = '/src/assets/white-tshirt.jpg'
WHERE id = '437f56ba-884e-4599-83f6-2e3993b42c2d';

UPDATE public.products 
SET image_url = '/src/assets/summer-dress.jpg'
WHERE id = '95b87546-4ea5-4982-916e-4e4b555ac615';

UPDATE public.products 
SET image_url = '/src/assets/wireless-headphones.jpg'
WHERE id = '28a07aef-f4e8-4eb0-8696-f2a0bdc24c0a';

UPDATE public.products 
SET image_url = '/src/assets/running-shoes.jpg'
WHERE id = '9c1ee33c-72a3-4ec7-93bc-d5cb01a8d3dd';

UPDATE public.products 
SET image_url = '/src/assets/leather-handbag.jpg'
WHERE id = 'e91b363e-27a3-44be-89c1-74d730894334';