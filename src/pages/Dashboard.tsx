import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ShoppingCart, TrendingDown, Clock, Star, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import ShoppingHistory from "@/components/ShoppingHistory";
import SavedLists from "@/components/SavedLists";
import UserPreferences from "@/components/UserPreferences";
import ShoppingInsights from "@/components/ShoppingInsights";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    totalSaved: 2450.50,
    lastShop: "2 days ago",
    favoriteStore: "Pick n Pay",
    monthlyBudget: 3500,
    spent: 2890
  };

  const recentActivity = [
    { id: 1, store: "Pick n Pay", amount: 456.80, items: 12, date: "2 days ago", savings: 45.20 },
    { id: 2, store: "Checkers", amount: 234.50, items: 8, date: "1 week ago", savings: 23.10 },
    { id: 3, store: "Woolworths", amount: 689.20, items: 15, date: "2 weeks ago", savings: 67.80 },
  ];

  const quickStats = [
    { title: "Total Saved", value: `R${userData.totalSaved.toFixed(2)}`, icon: TrendingDown, color: "text-success" },
    { title: "Last Shop", value: userData.lastShop, icon: Clock, color: "text-primary" },
    { title: "Favorite Store", value: userData.favoriteStore, icon: Star, color: "text-secondary" },
    { title: "This Month", value: `R${userData.spent}/R${userData.monthlyBudget}`, icon: Calendar, color: "text-muted-foreground" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {userData.name}!</h1>
              <p className="text-muted-foreground">Here's your smart shopping overview</p>
            </div>
            <Button className="btn-hero mt-4 md:mt-0">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Start New Shopping
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickStats.map((stat, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </Card>
            ))}
          </div>

          {/* Budget Progress */}
          <Card className="p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Monthly Budget Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Spent: R{userData.spent}</span>
                <span>Budget: R{userData.monthlyBudget}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${(userData.spent / userData.monthlyBudget) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">
                R{(userData.monthlyBudget - userData.spent).toFixed(2)} remaining this month
              </p>
            </div>
          </Card>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="lists">Saved Lists</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="preferences">Settings</TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="overview" className="space-y-6">
                {/* Recent Activity */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Recent Shopping Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <ShoppingCart className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{activity.store}</p>
                            <p className="text-sm text-muted-foreground">
                              {activity.items} items • {activity.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">R{activity.amount}</p>
                          <p className="text-sm text-success">Saved R{activity.savings}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <ShoppingCart className="h-6 w-6 mb-2" />
                      Start Shopping
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Star className="h-6 w-6 mb-2" />
                      Use Template
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <MapPin className="h-6 w-6 mb-2" />
                      Find Nearby Stores
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <ShoppingHistory />
              </TabsContent>

              <TabsContent value="lists">
                <SavedLists />
              </TabsContent>

              <TabsContent value="insights">
                <ShoppingInsights />
              </TabsContent>

              <TabsContent value="preferences">
                <UserPreferences />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;