-- Add missing categories to complete the ecommerce site
INSERT INTO public.categories (name) VALUES
  ('Stationery'),
  ('Home & Kitchen'), 
  ('Beauty & Personal Care'),
  ('Sports & Fitness')
ON CONFLICT (name) DO NOTHING;