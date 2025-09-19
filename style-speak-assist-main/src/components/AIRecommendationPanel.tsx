import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Bot, Star, ArrowRight, Sparkles } from "lucide-react";

interface AIRecommendationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const shoeTypes = [
  "Running", "Casual", "Formal", "Athletic", "Hiking", "Fashion"
];

const brands = [
  "Nike", "Adidas", "Puma", "New Balance", "Converse", "Vans"
];

const mockRecommendations = [
  {
    id: 1,
    name: "Nike Air Max 270",
    brand: "Nike",
    price: 150,
    rating: 4.8,
    image: "/placeholder.svg",
    reason: "Perfect for daily wear with excellent comfort"
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    price: 180,
    rating: 4.9,
    image: "/placeholder.svg",
    reason: "Superior cushioning for active lifestyle"
  },
  {
    id: 3,
    name: "New Balance 990v5",
    brand: "New Balance",
    price: 175,
    rating: 4.7,
    image: "/placeholder.svg",
    reason: "Premium quality meets classic style"
  }
];

export const AIRecommendationPanel = ({ isOpen, onClose }: AIRecommendationPanelProps) => {
  const [preferences, setPreferences] = useState({
    priceRange: [100],
    selectedTypes: [] as string[],
    selectedBrands: [] as string[],
  });
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const toggleType = (type: string) => {
    setPreferences(prev => ({
      ...prev,
      selectedTypes: prev.selectedTypes.includes(type)
        ? prev.selectedTypes.filter(t => t !== type)
        : [...prev.selectedTypes, type]
    }));
  };

  const toggleBrand = (brand: string) => {
    setPreferences(prev => ({
      ...prev,
      selectedBrands: prev.selectedBrands.includes(brand)
        ? prev.selectedBrands.filter(b => b !== brand)
        : [...prev.selectedBrands, brand]
    }));
  };

  const handleGetRecommendations = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-primary" />
            <span>AI Shoe Recommendation Assistant</span>
          </DialogTitle>
          <DialogDescription>
            Tell us your preferences and we'll find the perfect shoes for you
          </DialogDescription>
        </DialogHeader>

        {!showResults ? (
          <div className="space-y-6">
            {/* Price Range */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Price Range</Label>
              <div className="px-4">
                <Slider
                  value={preferences.priceRange}
                  onValueChange={(value) => setPreferences(prev => ({ ...prev, priceRange: value }))}
                  max={500}
                  min={50}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>$50</span>
                  <span className="font-medium">Up to ${preferences.priceRange[0]}</span>
                  <span>$500+</span>
                </div>
              </div>
            </div>

            {/* Shoe Types */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Shoe Types</Label>
              <div className="grid grid-cols-3 gap-2">
                {shoeTypes.map((type) => (
                  <Button
                    key={type}
                    onClick={() => toggleType(type)}
                    variant={preferences.selectedTypes.includes(type) ? "default" : "outline"}
                    size="sm"
                    className="h-auto py-2"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Preferred Brands</Label>
              <div className="grid grid-cols-3 gap-2">
                {brands.map((brand) => (
                  <Button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    variant={preferences.selectedBrands.includes(brand) ? "default" : "outline"}
                    size="sm"
                    className="h-auto py-2"
                  >
                    {brand}
                  </Button>
                ))}
              </div>
            </div>

            {/* Get Recommendations Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleGetRecommendations}
                disabled={isAnalyzing}
                size="lg"
                className="bg-gradient-primary text-primary-foreground shadow-button"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                    Analyzing Preferences...
                  </>
                ) : (
                  <>
                    <Bot className="w-5 h-5 mr-2" />
                    Get AI Recommendations
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                <Sparkles className="w-4 h-4 mr-1" />
                AI Analysis Complete
              </Badge>
              <h3 className="text-xl font-semibold mt-2">Here are your personalized recommendations</h3>
            </div>

            <div className="grid gap-4">
              {mockRecommendations.map((shoe) => (
                <Card key={shoe.id} className="shadow-card hover:shadow-card-hover transition-smooth">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-background-secondary rounded-lg flex items-center justify-center">
                        <img src={shoe.image} alt={shoe.name} className="w-16 h-16 object-cover rounded" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-lg">{shoe.name}</h4>
                            <p className="text-muted-foreground">{shoe.brand}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 fill-accent text-accent" />
                                <span className="text-sm font-medium ml-1">{shoe.rating}</span>
                              </div>
                              <span className="text-2xl font-bold text-primary">${shoe.price}</span>
                            </div>
                          </div>
                          
                          <Button size="sm" className="bg-gradient-primary text-primary-foreground">
                            View Details
                          </Button>
                        </div>
                        
                        <div className="mt-3 p-2 bg-background-secondary rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <Bot className="w-4 h-4 inline mr-1" />
                            AI Insight: {shoe.reason}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center space-x-3">
              <Button variant="outline" onClick={() => setShowResults(false)}>
                Refine Preferences
              </Button>
              <Button onClick={onClose} className="bg-gradient-primary text-primary-foreground">
                Browse All Recommendations
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};