import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { ChatAssistant } from "@/components/ChatAssistant";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  // For demo purposes, you can switch to dashboard view
  // In production, this would be handled by authentication and routing
  if (showDashboard) {
    return <AnalyticsDashboard />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProductGrid />
      </main>
      <ChatAssistant />
      
      
    </div>
  );
};

export default Index;