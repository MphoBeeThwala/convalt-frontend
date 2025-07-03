import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Plus, X, Search, ArrowLeft, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
}

interface GroceryListBuilderProps {
  onSearch: (data: { items: GroceryItem[], budget: number, radius: number }) => void;
  onBack: () => void;
}

const GroceryListBuilder = ({ onSearch, onBack }: GroceryListBuilderProps) => {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [currentItem, setCurrentItem] = useState("");
  const [budget, setBudget] = useState(500);
  const [radius, setRadius] = useState([5]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const addItem = () => {
    if (!currentItem.trim()) return;
    
    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: currentItem.trim(),
      quantity: 1
    };
    
    setItems([...items, newItem]);
    setCurrentItem("");
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleSearch = async () => {
    if (items.length === 0) {
      toast({
        title: "Add items first",
        description: "Please add at least one item to your grocery list.",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      onSearch({
        items,
        budget,
        radius: radius[0]
      });
      setIsSearching(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  // Popular South African grocery items for quick add
  const popularItems = [
    "Milk 2L", "Bread", "Eggs (dozen)", "Chicken breast", "Rice 2kg",
    "Potatoes 2kg", "Onions 1kg", "Tomatoes 1kg", "Bananas 1kg", "Apples 1kg"
  ];

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
            Back
          </Button>
          <h1 className="text-3xl font-bold">Build Your Grocery List</h1>
          <div className="w-20" /> {/* Spacer */}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main List Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Item Input */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add Items</h2>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter grocery item (e.g., Milk 2L)"
                  value={currentItem}
                  onChange={(e) => setCurrentItem(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={addItem} className="btn-hero">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Popular Items */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Popular Items</h3>
              <div className="flex flex-wrap gap-2">
                {popularItems.map((item) => (
                  <Badge 
                    key={item}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-white smooth-transition"
                    onClick={() => {
                      setCurrentItem(item);
                      setTimeout(addItem, 100);
                    }}
                  >
                    + {item}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Current List */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Your List ({items.length} items)
              </h3>
              {items.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No items added yet. Start by typing an item above.
                </p>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between bg-muted rounded-lg p-3"
                    >
                      <span className="font-medium">{item.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Settings & Search */}
          <div className="space-y-6">
            {/* Budget */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Budget</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary">R{budget}</span>
                </div>
                <Slider
                  value={[budget]}
                  onValueChange={(value) => setBudget(value[0])}
                  max={2000}
                  min={50}
                  step={25}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>R50</span>
                  <span>R2000</span>
                </div>
              </div>
            </Card>

            {/* Search Radius */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Search Radius
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-2xl font-bold text-secondary">{radius[0]}km</span>
                </div>
                <Slider
                  value={radius}
                  onValueChange={setRadius}
                  max={25}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1km</span>
                  <span>25km</span>
                </div>
              </div>
            </Card>

            {/* Search Button */}
            <Card className="p-6">
              <Button 
                onClick={handleSearch}
                disabled={isSearching || items.length === 0}
                className="w-full btn-hero text-lg py-3"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Find Cheapest Store
                  </>
                )}
              </Button>
              {items.length > 0 && (
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Searching {items.length} items within {radius[0]}km
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryListBuilder;