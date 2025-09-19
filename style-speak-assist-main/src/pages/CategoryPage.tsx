import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getProductImage } from "@/utils/imageUtils";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

interface Product {
  id: string;
  name: string;
  description?: string;
  price_usd: number;
  stock: number;
  image_url?: string;
  category_id: number;
  created_at: string;
}

interface Category {
  id: number;
  name: string;
  created_at: string;
}

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      if (!categoryId) return;

      try {
        // Fetch category info
        const { data: categoryData, error: categoryError } = await (supabase as any)
          .from('categories')
          .select('*')
          .eq('id', categoryId)
          .single();

        if (categoryError) {
          console.error('Error fetching category:', categoryError);
        } else {
          setCategory(categoryData);
        }

        // Fetch products in this category
        const { data: productsData, error: productsError } = await (supabase as any)
          .from('products')
          .select('*')
          .eq('category_id', parseInt(categoryId));

        if (productsError) {
          console.error('Error fetching products:', productsError);
        } else {
          setProducts(productsData || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [categoryId]);

  const toggleFavorite = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const convertToINR = (usdPrice: number) => {
    const exchangeRate = 83; // Approximate USD to INR rate
    return Math.round(usdPrice * exchangeRate);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-smooth">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">
              {category?.name || 'Category'}
            </span>
          </div>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {category?.name || 'Products'}
          </h1>
          <p className="text-muted-foreground">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No products found in this category.</p>
            <Link to="/">
              <Button variant="outline">Browse All Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="shadow-card hover:shadow-card-hover transition-smooth group">
                <CardHeader className="p-0 relative">
                  <div className="relative h-48 bg-background-secondary rounded-t-lg overflow-hidden">
                    <img 
                      src={getProductImage(product.image_url || "")} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                    
                    {/* Stock Badge */}
                    {product.stock === 0 && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-smooth">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toggleFavorite(product.id)}
                        className="w-8 h-8 p-0 rounded-full"
                      >
                        <Heart 
                          className={`w-4 h-4 ${
                            isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""
                          }`} 
                        />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {product.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-xl font-bold text-primary">
                          ₹{convertToINR(product.price_usd).toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${product.price_usd} USD
                        </div>
                      </div>
                      
                      {product.stock > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {product.stock} in stock
                        </div>
                      )}
                    </div>

                    <Button 
                      onClick={() => handleAddToCart(product)} 
                      className="w-full bg-gradient-primary text-primary-foreground"
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;