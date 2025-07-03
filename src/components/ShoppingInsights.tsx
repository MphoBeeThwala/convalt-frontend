import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Calendar, Star } from "lucide-react";

const ShoppingInsights = () => {
  // Mock insights data
  const monthlySpending = [
    { month: "Jan", amount: 2890, budget: 3500, savings: 245 },
    { month: "Dec", amount: 3200, budget: 3500, savings: 180 },
    { month: "Nov", amount: 2750, budget: 3500, savings: 320 },
    { month: "Oct", amount: 3100, budget: 3500, savings: 210 },
  ];

  const topCategories = [
    { category: "Fresh Produce", percentage: 35, amount: 1011.50, trend: "up" },
    { category: "Dairy & Eggs", percentage: 18, amount: 520.20, trend: "down" },
    { category: "Meat & Poultry", percentage: 22, amount: 635.80, trend: "up" },
    { category: "Pantry Staples", percentage: 15, amount: 433.50, trend: "stable" },
    { category: "Beverages", percentage: 10, amount: 289.00, trend: "down" },
  ];

  const favoriteStores = [
    { store: "Pick n Pay", visits: 12, percentage: 40, avgSaving: 45.20 },
    { store: "Checkers", visits: 8, percentage: 27, avgSaving: 38.50 },
    { store: "Woolworths", visits: 6, percentage: 20, avgSaving: 52.80 },
    { store: "Spar", visits: 4, percentage: 13, avgSaving: 28.90 },
  ];

  const savingsInsights = [
    {
      title: "Best Saving Month",
      value: "November",
      amount: "R320.00",
      description: "You saved the most by choosing Pick n Pay for bulk purchases"
    },
    {
      title: "Top Saving Category", 
      value: "Fresh Produce",
      amount: "R89.50/month",
      description: "Shopping at local markets through our platform saves you most"
    },
    {
      title: "Smart Shopping Streak",
      value: "15 days",
      amount: "R180.00 saved",
      description: "Your longest streak of choosing the cheapest option"
    }
  ];

  const currentMonth = monthlySpending[0];
  const budgetProgress = (currentMonth.amount / currentMonth.budget) * 100;

  return (
    <div className="space-y-6">
      {/* Monthly Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Monthly Spending Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Budget Progress</span>
              <span className="text-sm font-medium">R{currentMonth.amount} / R{currentMonth.budget}</span>
            </div>
            <Progress value={budgetProgress} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">R{currentMonth.amount}</p>
                <p className="text-sm text-muted-foreground">Spent</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">R{currentMonth.savings}</p>
                <p className="text-sm text-muted-foreground">Saved</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">R{currentMonth.budget - currentMonth.amount}</p>
                <p className="text-sm text-muted-foreground">Remaining</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-4 w-4 text-primary" />
                <span className="text-sm">Shopping Trips</span>
              </div>
              <span className="font-semibold">24</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-success" />
                <span className="text-sm">Avg. Savings</span>
              </div>
              <span className="font-semibold">R41.20</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-secondary" />
                <span className="text-sm">Best Deal Day</span>
              </div>
              <span className="font-semibold">Saturday</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-accent" />
                <span className="text-sm">Shopping Frequency</span>
              </div>
              <span className="font-semibold">2.1/week</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Spending by Category */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Spending by Category</h3>
        <div className="space-y-4">
          {topCategories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{category.category}</span>
                  {category.trend === "up" && (
                    <TrendingUp className="h-4 w-4 text-success" />
                  )}
                  {category.trend === "down" && (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground">R{category.amount}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Progress value={category.percentage} className="flex-1 h-2" />
                <span className="text-sm font-medium w-12">{category.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Favorite Stores */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Your Favorite Stores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favoriteStores.map((store, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{store.store}</h4>
                <Badge variant="secondary">{store.visits} visits</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Share of visits</span>
                  <span>{store.percentage}%</span>
                </div>
                <Progress value={store.percentage} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg. savings per visit</span>
                  <span className="text-success">R{store.avgSaving}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Savings Insights */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Smart Savings Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {savingsInsights.map((insight, index) => (
            <div key={index} className="text-center p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">{insight.title}</h4>
              <p className="text-2xl font-bold text-primary mb-1">{insight.value}</p>
              <p className="text-lg font-semibold text-success mb-2">{insight.amount}</p>
              <p className="text-xs text-muted-foreground">{insight.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Monthly Trend */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Spending Trend (Last 4 Months)</h3>
        <div className="space-y-4">
          {monthlySpending.map((month, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{month.month} 2024</span>
                  <span className="text-sm">R{month.amount} / R{month.budget}</span>
                </div>
                <Progress value={(month.amount / month.budget) * 100} className="h-2" />
              </div>
              <div className="ml-4 text-right">
                <p className="text-success text-sm">+R{month.savings}</p>
                <p className="text-xs text-muted-foreground">saved</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <h3 className="text-xl font-semibold mb-4">💡 Personalized Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <p className="text-sm">
              <strong>Switch to Checkers for dairy:</strong> You could save an additional R15-20 per month on your dairy purchases.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
            <p className="text-sm">
              <strong>Shop on Wednesdays:</strong> Analysis shows you get better deals mid-week compared to weekends.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
            <p className="text-sm">
              <strong>Bulk buy non-perishables:</strong> Consider buying rice, pasta, and canned goods in larger quantities to save more.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ShoppingInsights;