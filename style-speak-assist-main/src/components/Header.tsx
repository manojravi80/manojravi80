import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Search, Globe, ShoppingBag, UserCog, Heart, ShoppingCart } from "lucide-react";
import { CurrencySelector } from "./CurrencySelector";
import { StaffLoginModal } from "./StaffLoginModal";
import { supabase } from "@/integrations/supabase/client";
import { useSearch } from "@/hooks/useSearch";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: number;
  name: string;
  created_at: string;
}

const Header = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showStaffLogin, setShowStaffLogin] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { searchQuery, setSearchQuery, searchResults, isSearching, showResults, setShowResults, clearSearch } = useSearch();
  const { getTotalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { toast } = useToast();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from('categories')
          .select('*')
          .order('name');

        if (error) {
          console.error('Error fetching categories:', error);
        } else {
          setCategories(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowResults]);

  const handleVoiceSearch = () => {
    if (!isVoiceActive) {
      // Start voice recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsVoiceActive(true);
          toast({
            title: "Listening...",
            description: "Speak now to search for products",
          });
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setSearchQuery(transcript);
          toast({
            title: "Voice search completed",
            description: `Searching for: ${transcript}`,
          });
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          toast({
            title: "Voice search failed",
            description: "Please try again or use text search",
            variant: "destructive",
          });
        };

        recognition.onend = () => {
          setIsVoiceActive(false);
        };

        recognition.start();
      } else {
        toast({
          title: "Voice search not supported",
          description: "Your browser doesn't support voice search. Please use text search.",
          variant: "destructive",
        });
      }
    } else {
      setIsVoiceActive(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleProductClick = (productId: string) => {
    clearSearch();
    // Navigate to product detail (for now, just navigate to home)
    navigate('/');
  };

  const convertToINR = (usdPrice: number) => {
    const exchangeRate = 83.12;
    return Math.round(usdPrice * exchangeRate);
  };

  return (
    <header className="bg-card border-b border-card-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Snapcart
            </h1>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() => searchQuery && setShowResults(true)}
                className="w-full pl-10 pr-16 py-3 bg-background-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
              />
              <Button
                onClick={handleVoiceSearch}
                variant="ghost"
                size="sm"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 ${
                  isVoiceActive ? "voice-pulse bg-primary text-primary-foreground" : ""
                }`}
              >
                <Mic className="w-4 h-4" />
              </Button>

              {/* Search Results Dropdown */}
              {showResults && (searchResults.length > 0 || isSearching) && (
                <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto shadow-card-hover">
                  <CardContent className="p-2">
                    {isSearching ? (
                      <div className="p-4 text-center text-muted-foreground">
                        Searching...
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="space-y-1">
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => handleProductClick(product.id)}
                            className="flex items-center space-x-3 p-3 hover:bg-muted rounded-lg cursor-pointer transition-smooth"
                          >
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-md"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder.svg';
                              }}
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
                              <p className="text-primary font-semibold">₹{convertToINR(product.price_usd)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        No products found for "{searchQuery}"
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <CurrencySelector />
            
            {/* Wishlist Button */}
            <Link to="/wishlist">
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart Button */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Link to="/staff-auth">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <UserCog className="w-4 h-4" />
                <span>Staff Login</span>
              </Button>
            </Link>

            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              AI Powered
            </Badge>
          </div>
        </div>
        
        {/* Categories Navigation */}
        {categories.length > 0 && (
          <nav className="mt-4 pt-4 border-t border-card-border">
            <div className="flex items-center space-x-6 overflow-x-auto">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Categories:
              </span>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="text-sm text-foreground hover:text-primary transition-smooth whitespace-nowrap"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>

      <StaffLoginModal 
        isOpen={showStaffLogin}
        onClose={() => setShowStaffLogin(false)}
      />
    </header>
  );
};

export default Header;