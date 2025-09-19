-- Import the new images and update database with proper image paths
-- We need to use placeholder paths since we can't import ES6 modules in SQL

-- Update products with proper image file names (they should be imported in components)
UPDATE public.products 
SET image_url = 'white-tshirt.jpg'
WHERE id = '437f56ba-884e-4599-83f6-2e3993b42c2d';

UPDATE public.products 
SET image_url = 'summer-dress.jpg'
WHERE id = '95b87546-4ea5-4982-916e-4e4b555ac615';

UPDATE public.products 
SET image_url = 'wireless-headphones.jpg'
WHERE id = '28a07aef-f4e8-4eb0-8696-f2a0bdc24c0a';

UPDATE public.products 
SET image_url = 'running-shoes.jpg'
WHERE id = '9c1ee33c-72a3-4ec7-93bc-d5cb01a8d3dd';

UPDATE public.products 
SET image_url = 'leather-handbag.jpg'
WHERE id = 'e91b363e-27a3-44be-89c1-74d730894334';