-- Add missing categories with explicit IDs to avoid conflicts
INSERT INTO public.categories (name) 
SELECT category_name 
FROM (
  VALUES 
    ('Stationery'),
    ('Home & Kitchen'), 
    ('Beauty & Personal Care'),
    ('Sports & Fitness')
) AS new_categories(category_name)
WHERE NOT EXISTS (
  SELECT 1 FROM public.categories 
  WHERE name = new_categories.category_name
);