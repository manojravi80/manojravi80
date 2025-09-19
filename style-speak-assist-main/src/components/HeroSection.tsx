import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Bot, Zap } from "lucide-react";
import { AIRecommendationPanel } from "./AIRecommendationPanel";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  const [showRecommendations, setShowRecommendations] = useState(false);

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBanner})` }}
      />
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Badge */}
          <Badge variant="secondary" className="mb-6 bg-accent/20 text-accent-foreground border-accent/30">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Shoe Discovery
          </Badge>

          {/* Hero Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <span className="bg-gradient-primary bg-clip-text text-transparent block">
              Shoes with AI
            </span>
          </h1>

          {/* Hero Description */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Experience the future of shoe shopping with our AI recommendation assistant. 
            Get personalized suggestions, compare brands, and find exactly what you're looking for.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={() => setShowRecommendations(true)}
              size="lg"
              className="bg-gradient-primary text-primary-foreground shadow-button hover:shadow-card-hover transition-smooth"
            >
              <Bot className="w-5 h-5 mr-2" />
              Get AI Recommendations
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-primary/20">
              <Zap className="w-5 h-5 mr-2" />
              Browse Collection
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="shadow-card hover:shadow-card-hover transition-smooth">
              <CardHeader className="text-center pb-2">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bot className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Smart recommendations based on your style, preferences, and needs
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-card-hover transition-smooth">
              <CardHeader className="text-center pb-2">
                <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">Voice Search</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Simply speak to find products - "Show me running shoes under $100"
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-card-hover transition-smooth">
              <CardHeader className="text-center pb-2">
                <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-foreground" />
                </div>
                <CardTitle className="text-lg">Global Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Prices in your local currency with real-time conversion rates
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Recommendation Panel */}
      <AIRecommendationPanel 
        isOpen={showRecommendations}
        onClose={() => setShowRecommendations(false)}
      />
    </section>
  );
};

export default HeroSection;