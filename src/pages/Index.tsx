import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, MapPin, Zap, Shield } from "lucide-react";
import GroceryListBuilder from "@/components/GroceryListBuilder";
import RetailerResults from "@/components/RetailerResults";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [showListBuilder, setShowListBuilder] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const handleStartShopping = () => {
    setShowListBuilder(true);
  };

  const handleSearch = (data: any) => {
    // Mock search results for now
    const mockResults = {
      retailer: "Pick n Pay",
      totalPrice: data.budget * 0.85, // Always under budget
      items: data.items,
      savings: data.budget * 0.15,
      distance: "2.3km",
      logo: "🛒"
    };
    setSearchResults(mockResults);
  };

  if (searchResults) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <RetailerResults 
          results={searchResults} 
          onBack={() => setSearchResults(null)}
        />
      </div>
    );
  }

  if (showListBuilder) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <GroceryListBuilder 
          onSearch={handleSearch}
          onBack={() => setShowListBuilder(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              🇿🇦 Made for South Africa
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Find Your Cheapest
              <br />
              <span className="text-gradient">Complete Basket</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Stop app-hopping! Input your grocery list and budget. 
              We'll find the single cheapest retailer nearby that has everything you need.
            </p>
            <Button 
              size="lg"
              className="btn-hero text-lg px-8 py-4 mb-4"
              onClick={handleStartShopping}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Start Smart Shopping
            </Button>
            <p className="text-sm text-white/70">
              No more installing multiple grocery apps • Always find the best deal
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">How Convergence Works</h2>
            <p className="text-xl text-muted-foreground">
              Smart shopping made simple for South African families
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-gradient p-8 text-center animate-scale-in">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Create Your List</h3>
              <p className="text-muted-foreground">
                Add your grocery items and set your budget. We support everything from essentials to specialty items.
              </p>
            </Card>

            <Card className="card-gradient p-8 text-center animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Find Nearby Stores</h3>
              <p className="text-muted-foreground">
                We search Pick n Pay, Checkers, Woolworths, and more within your preferred radius.
              </p>
            </Card>

            <Card className="card-gradient p-8 text-center animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Get Best Deal</h3>
              <p className="text-muted-foreground">
                We find the single retailer with your complete list at the lowest total price.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Choose Convergence?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Save Money & Time</h3>
                    <p className="text-muted-foreground">
                      No more comparing prices across multiple apps. We do the work for you.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Complete Baskets Only</h3>
                    <p className="text-muted-foreground">
                      We only show retailers that have everything on your list in stock.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">WhatsApp Integration</h3>
                    <p className="text-muted-foreground">
                      Send your list via WhatsApp for quick shopping on the go.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Popular in South Africa</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Pick n Pay</span>
                  <Badge variant="secondary">Connected</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Checkers</span>
                  <Badge variant="secondary">Connected</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Woolworths</span>
                  <Badge variant="secondary">Connected</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Spar</span>
                  <Badge variant="secondary">Connected</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Food Lover's</span>
                  <Badge variant="secondary">Connected</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Smart Shopping?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of South African families saving money and time with Convergence.
          </p>
          <Button 
            size="lg"
            className="btn-hero text-lg px-8 py-4"
            onClick={handleStartShopping}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;