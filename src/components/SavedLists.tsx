import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Star, Calendar, ShoppingCart, Edit, Trash2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SavedList {
  id: string;
  name: string;
  items: string[];
  category: string;
  created: string;
  lastUsed: string;
  timesUsed: number;
  averageCost: number;
  isFavorite: boolean;
}

const SavedLists = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [newListName, setNewListName] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock saved lists data
  const [savedLists, setSavedLists] = useState<SavedList[]>([
    {
      id: "1",
      name: "Weekly Essentials",
      items: ["Milk 2L", "Bread", "Eggs (dozen)", "Chicken breast", "Rice 2kg", "Bananas", "Apples", "Onions", "Tomatoes", "Potatoes"],
      category: "weekly",
      created: "2024-01-01",
      lastUsed: "2024-01-15",
      timesUsed: 8,
      averageCost: 450.50,
      isFavorite: true
    },
    {
      id: "2", 
      name: "Breakfast Items",
      items: ["Cereal", "Milk", "Yogurt", "Berries", "Honey", "Coffee", "Orange juice", "Toast"],
      category: "breakfast",
      created: "2024-01-02",
      lastUsed: "2024-01-10",
      timesUsed: 5,
      averageCost: 234.80,
      isFavorite: false
    },
    {
      id: "3",
      name: "Braai Essentials",
      items: ["Boerewors", "Steak", "Chicken", "Potato salad", "Coleslaw", "Rolls", "Butter", "Beer", "Soft drinks", "Ice"],
      category: "entertaining",
      created: "2023-12-15",
      lastUsed: "2024-01-01",
      timesUsed: 12,
      averageCost: 678.90,
      isFavorite: true
    },
    {
      id: "4",
      name: "Baby Essentials",
      items: ["Baby formula", "Diapers", "Baby food", "Wet wipes", "Baby lotion", "Rusk", "Apple juice"],
      category: "baby",
      created: "2023-11-20",
      lastUsed: "2024-01-12",
      timesUsed: 15,
      averageCost: 567.20,
      isFavorite: false
    },
    {
      id: "5",
      name: "Healthy Options",
      items: ["Quinoa", "Avocados", "Salmon", "Kale", "Blueberries", "Almonds", "Olive oil", "Greek yogurt", "Sweet potato"],
      category: "health",
      created: "2023-12-01",
      lastUsed: "2024-01-08",
      timesUsed: 6,
      averageCost: 789.50,
      isFavorite: false
    }
  ]);

  const filteredLists = savedLists.filter(list => 
    list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    list.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    list.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleFavorite = (id: string) => {
    setSavedLists(lists => 
      lists.map(list => 
        list.id === id ? { ...list, isFavorite: !list.isFavorite } : list
      )
    );
  };

  const duplicateList = (list: SavedList) => {
    const newList: SavedList = {
      ...list,
      id: Date.now().toString(),
      name: `${list.name} (Copy)`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: new Date().toISOString().split('T')[0],
      timesUsed: 0
    };
    setSavedLists([newList, ...savedLists]);
    toast({
      title: "List duplicated",
      description: `"${newList.name}" has been created successfully.`
    });
  };

  const deleteList = (id: string) => {
    setSavedLists(lists => lists.filter(list => list.id !== id));
    toast({
      title: "List deleted",
      description: "The shopping list has been removed."
    });
  };

  const useList = (list: SavedList) => {
    toast({
      title: "Loading shopping list",
      description: `"${list.name}" is ready for shopping.`
    });
    // In real app, this would navigate to the shopping builder with pre-loaded items
  };

  const createNewList = () => {
    if (!newListName.trim()) return;
    
    const newList: SavedList = {
      id: Date.now().toString(),
      name: newListName,
      items: [],
      category: "custom",
      created: new Date().toISOString().split('T')[0],
      lastUsed: new Date().toISOString().split('T')[0],
      timesUsed: 0,
      averageCost: 0,
      isFavorite: false
    };
    
    setSavedLists([newList, ...savedLists]);
    setNewListName("");
    setIsCreateDialogOpen(false);
    toast({
      title: "List created",
      description: `"${newList.name}" has been created. You can now add items to it.`
    });
  };

  const categoryColors = {
    weekly: "bg-primary/10 text-primary",
    breakfast: "bg-secondary/10 text-secondary",
    entertaining: "bg-success/10 text-success",
    baby: "bg-warning/10 text-warning",
    health: "bg-accent/10 text-accent",
    custom: "bg-muted text-muted-foreground"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Saved Shopping Lists</h2>
          <p className="text-muted-foreground">Quick access to your frequently used shopping lists</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-hero">
              <Plus className="h-4 w-4 mr-2" />
              Create New List
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Shopping List</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">List Name</label>
                <Input
                  placeholder="e.g., Weekend Shopping"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && createNewList()}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createNewList} disabled={!newListName.trim()}>
                  Create List
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <ShoppingCart className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your saved lists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <p className="text-sm text-muted-foreground">Total Lists</p>
          <p className="text-2xl font-bold text-primary">{savedLists.length}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-sm text-muted-foreground">Favorites</p>
          <p className="text-2xl font-bold text-secondary">{savedLists.filter(l => l.isFavorite).length}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-sm text-muted-foreground">Most Used</p>
          <p className="text-2xl font-bold text-success">{Math.max(...savedLists.map(l => l.timesUsed))}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-sm text-muted-foreground">Avg. Cost</p>
          <p className="text-2xl font-bold text-accent">R{Math.round(savedLists.reduce((a, l) => a + l.averageCost, 0) / savedLists.length)}</p>
        </Card>
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLists.map((list) => (
          <Card key={list.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold">{list.name}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(list.id)}
                    className="p-1"
                  >
                    <Star className={`h-4 w-4 ${list.isFavorite ? 'fill-secondary text-secondary' : 'text-muted-foreground'}`} />
                  </Button>
                </div>
                <Badge className={categoryColors[list.category as keyof typeof categoryColors]}>
                  {list.category}
                </Badge>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="text-sm text-muted-foreground">
                {list.items.length} items • Used {list.timesUsed} times
              </div>
              
              <div className="flex flex-wrap gap-1">
                {list.items.slice(0, 4).map((item, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
                {list.items.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{list.items.length - 4} more
                  </Badge>
                )}
              </div>

              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg. Cost:</span>
                  <span className="font-medium">R{list.averageCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Used:</span>
                  <span className="font-medium">{new Date(list.lastUsed).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                className="flex-1 btn-hero" 
                size="sm"
                onClick={() => useList(list)}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Use List
              </Button>
              
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" onClick={() => duplicateList(list)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => deleteList(list.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredLists.length === 0 && (
        <Card className="p-12 text-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No lists found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Create your first shopping list to get started"}
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First List
          </Button>
        </Card>
      )}
    </div>
  );
};

export default SavedLists;