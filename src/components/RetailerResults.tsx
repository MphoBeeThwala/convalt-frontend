import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, CheckCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RetailerResultsProps {
  results: {
    retailer: string;
    totalPrice: number;
    items: Array<{id: string, name: string, quantity: number}>;
    savings: number;
    distance: string;
    logo: string;
  };
  onBack: () => void;
}

const RetailerResults = ({ results, onBack }: RetailerResultsProps) => {
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
      title: "Redirecting to " + results.retailer,
      description: "Your basket has been prepared. Complete your purchase on their website.",
      duration: 3000,
    });
    
    // In a real app, this would redirect to the retailer's checkout page
    // with the basket pre-populated
    setTimeout(() => {
      window.open("https://www.pnp.co.za/", "_blank");
    }, 1000);
  };

  const handleTryAnother = () => {
    toast({
      title: "Search Again",
      description: "Let's find you another option with different criteria.",
    });
    onBack();
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          <h1 className="text-3xl font-bold">Best Match Found!</h1>
          <div className="w-20" /> {/* Spacer */}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Result */}
          <div className="lg:col-span-2 space-y-6">
            {/* Winner Card */}
            <Card className="p-8 bg-gradient-to-br from-success/5 to-primary/5 border-primary/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{results.logo}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-primary">{results.retailer}</h2>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {results.distance} away
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Open until 8pm
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-success text-success-foreground text-lg px-4 py-2">
                  Best Deal
                </Badge>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-primary">R{results.totalPrice.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">Total Cost</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-success">R{results.savings.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">You Save</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-secondary">{results.items.length}</div>
                  <div className="text-sm text-muted-foreground">Items Available</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 mb-6">
                <div className="flex items-center text-success mb-2">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-semibold">All items in stock and available</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  This retailer has confirmed availability for all items on your list. 
                  Your basket is ready for checkout.
                </p>
              </div>
            </Card>

            {/* Item Breakdown */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Your Basket Breakdown</h3>
              <div className="space-y-3">
                {results.items.map((item, index) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between py-3 border-b last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">
                        R{((results.totalPrice / results.items.length) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Action Panel */}
          <div className="space-y-6">
            {/* Checkout Action */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Ready to Shop?</h3>
              <div className="space-y-4">
                <Button 
                  onClick={handleCheckout}
                  className="w-full btn-hero text-lg py-3"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Checkout at {results.retailer}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  We'll redirect you to {results.retailer} with your basket pre-loaded
                </p>
              </div>
            </Card>

            {/* Alternative Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Other Options</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleTryAnother}
                >
                  Try Different Budget
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={onBack}
                >
                  Modify List
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  Share via WhatsApp
                </Button>
              </div>
            </Card>

            {/* Store Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Store Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance:</span>
                  <span>{results.distance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery:</span>
                  <span>Available (R50)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Collection:</span>
                  <span>Free in 2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating:</span>
                  <span>4.5/5 ⭐</span>
                </div>
              </div>
            </Card>

            {/* Savings Highlight */}
            <Card className="p-6 bg-gradient-to-br from-success/10 to-transparent border-success/20">
              <h3 className="text-lg font-semibold text-success mb-2">
                💰 You're saving money!
              </h3>
              <p className="text-sm text-muted-foreground">
                This is R{results.savings.toFixed(2)} less than the average price 
                from other retailers in your area.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerResults;