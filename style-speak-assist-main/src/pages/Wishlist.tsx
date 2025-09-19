import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const convertToINR = (usdPrice: number) => {
    const exchangeRate = 83.12;
    return Math.round(usdPrice * exchangeRate);
  };

  const handleAddToCart = (item: any) => {
    addToCart(item);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">My Wishlist</h1>
            </div>
          </div>

          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start adding products you love to your wishlist
            </p>
            <Link to="/">
              <Button>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">My Wishlist</h1>
              <span className="text-lg text-muted-foreground">({items.length} items)</span>
            </div>
          </div>
          
          {items.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearWishlist}
              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              Clear Wishlist
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="group shadow-card hover:shadow-card-hover transition-smooth">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <Button
                    onClick={() => removeFromWishlist(item.id)}
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                  >
                    <Heart className="w-4 h-4 text-primary fill-primary" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2">{item.name}</h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-primary">₹{convertToINR(item.price_usd)}</p>
                      <p className="text-sm text-muted-foreground">${item.price_usd.toFixed(2)} USD</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm ${item.stock > 0 ? 'text-green-600' : 'text-destructive'}`}>
                        {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(item)}
                    disabled={item.stock === 0}
                    className="w-full mt-4"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Wishlist;