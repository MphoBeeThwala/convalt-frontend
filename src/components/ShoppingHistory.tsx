import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Search, Filter, Download, ShoppingCart } from "lucide-react";
import { format } from "date-fns";

const ShoppingHistory = () => {
  const [date, setDate] = useState<Date>();
  const [filterStore, setFilterStore] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock shopping history data
  const shoppingHistory = [
    {
      id: 1,
      date: "2024-01-15",
      store: "Pick n Pay",
      total: 456.80,
      items: 12,
      savings: 45.20,
      status: "completed",
      list: ["Milk 2L", "Bread", "Eggs", "Chicken breast", "Rice 2kg", "Bananas", "Apples", "Onions", "Tomatoes", "Potatoes", "Yogurt", "Cheese"]
    },
    {
      id: 2,
      date: "2024-01-08",
      store: "Checkers",
      total: 234.50,
      items: 8,
      savings: 23.10,
      status: "completed",
      list: ["Coffee", "Sugar", "Tea bags", "Biscuits", "Cereal", "Orange juice", "Butter", "Jam"]
    },
    {
      id: 3,
      date: "2024-01-02",
      store: "Woolworths",
      total: 689.20,
      items: 15,
      savings: 67.80,
      status: "completed",
      list: ["Salmon", "Avocados", "Cherry tomatoes", "Rocket", "Olive oil", "Pasta", "Parmesan", "Wine", "Dark chocolate", "Berries", "Nuts", "Honey", "Quinoa", "Coconut milk", "Vanilla"]
    },
    {
      id: 4,
      date: "2023-12-28",
      store: "Spar",
      total: 178.90,
      items: 6,
      savings: 12.30,
      status: "completed",
      list: ["Cleaning supplies", "Toilet paper", "Shampoo", "Toothpaste", "Soap", "Deodorant"]
    },
    {
      id: 5,
      date: "2023-12-22",
      store: "Food Lover's Market",
      total: 567.40,
      items: 18,
      savings: 78.90,
      status: "completed",
      list: ["Turkey", "Ham", "Prawns", "Vegetables", "Fruits", "Desserts", "Sparkling water", "Party snacks"]
    }
  ];

  const filteredHistory = shoppingHistory.filter(item => {
    const matchesStore = filterStore === "all" || item.store.toLowerCase().includes(filterStore.toLowerCase());
    const matchesSearch = searchTerm === "" || 
      item.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.list.some(listItem => listItem.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDate = !date || new Date(item.date).toDateString() === date.toDateString();
    
    return matchesStore && matchesSearch && matchesDate;
  });

  const totalSpent = filteredHistory.reduce((sum, item) => sum + item.total, 0);
  const totalSavings = filteredHistory.reduce((sum, item) => sum + item.savings, 0);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Filter Your Shopping History</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items or stores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Store</label>
            <Select value={filterStore} onValueChange={setFilterStore}>
              <SelectTrigger>
                <SelectValue placeholder="All stores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                <SelectItem value="pick n pay">Pick n Pay</SelectItem>
                <SelectItem value="checkers">Checkers</SelectItem>
                <SelectItem value="woolworths">Woolworths</SelectItem>
                <SelectItem value="spar">Spar</SelectItem>
                <SelectItem value="food lover's">Food Lover's Market</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Actions</label>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => {
                setDate(undefined);
                setFilterStore("all");
                setSearchTerm("");
              }}>
                Clear
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Trips</p>
            <p className="text-2xl font-bold text-primary">{filteredHistory.length}</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="text-2xl font-bold text-secondary">R{totalSpent.toFixed(2)}</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Saved</p>
            <p className="text-2xl font-bold text-success">R{totalSavings.toFixed(2)}</p>
          </div>
        </Card>
      </div>

      {/* History List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Shopping History</h3>
        {filteredHistory.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No shopping history matches your filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((trip) => (
              <div key={trip.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{trip.store}</h4>
                    <p className="text-sm text-muted-foreground">{format(new Date(trip.date), "PPP")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">R{trip.total.toFixed(2)}</p>
                    <Badge variant="secondary" className="text-success">
                      Saved R{trip.savings.toFixed(2)}
                    </Badge>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-muted-foreground mb-2">{trip.items} items purchased:</p>
                  <div className="flex flex-wrap gap-1">
                    {trip.list.slice(0, 6).map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                    {trip.list.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{trip.list.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Badge 
                    variant={trip.status === "completed" ? "default" : "secondary"}
                    className="bg-success text-success-foreground"
                  >
                    {trip.status === "completed" ? "✓ Completed" : trip.status}
                  </Badge>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Reorder
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ShoppingHistory;