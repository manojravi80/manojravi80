import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, GitCompare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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

export const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching products:', error);
          toast({
            title: "Error",
            description: "Failed to load products",
            variant: "destructive",
          });
        } else {
          setProducts(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  const toggleFavorite = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  const toggleCompare = (productId: string) => {
    if (compareList.includes(productId)) {
      setCompareList(prev => prev.filter(id => id !== productId));
    } else if (compareList.length < 3) {
      setCompareList(prev => [...prev, productId]);
    } else {
      toast({
        title: "Compare Limit Reached",
        description: "You can compare up to 3 products at once.",
        variant: "destructive",
      });
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
      <section className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
        <p className="text-muted-foreground">Discover our curated collection from various categories</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products available at the moment.</p>
        </div>
      ) : (
        <>
          {compareList.length > 0 && (
            <div className="mb-6 p-4 bg-accent/20 rounded-lg border border-accent/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <GitCompare className="w-5 h-5 text-accent-foreground" />
                  <span className="font-medium">Comparing {compareList.length} products</span>
                </div>
                <Button size="sm" className="bg-gradient-primary text-primary-foreground">
                  Compare Now
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="shadow-card hover:shadow-card-hover transition-smooth group">
                <CardHeader className="p-0 relative">
                  <div className="relative h-64 bg-background-secondary rounded-t-lg overflow-hidden">
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
                    <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-smooth">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toggleFavorite(product.id)}
                        className="w-10 h-10 p-0 rounded-full"
                      >
                        <Heart 
                          className={`w-4 h-4 ${
                            isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""
                          }`} 
                        />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toggleCompare(product.id)}
                        className={`w-10 h-10 p-0 rounded-full ${
                          compareList.includes(product.id) ? "bg-accent text-accent-foreground" : ""
                        }`}
                      >
                        <GitCompare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      {product.description && (
                        <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                          {product.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-2xl font-bold text-primary">
                          ₹{convertToINR(product.price_usd).toLocaleString('en-IN')}
                        </span>
                        <div className="text-sm text-muted-foreground">
                          ${product.price_usd} USD
                        </div>
                      </div>
                      
                      {product.stock > 0 && (
                        <div className="text-sm text-muted-foreground">
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
        </>
      )}
    </section>
  );
};