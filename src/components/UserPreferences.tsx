import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, MapPin, Bell, Shield, Heart, DollarSign, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserPreferences = () => {
  const { toast } = useToast();
  
  // Profile Settings
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+27 82 123 4567",
    nationalId: "8801015800087"
  });

  // Location Settings
  const [location, setLocation] = useState({
    defaultRadius: [5],
    autoLocation: true,
    address: "123 Main Street, Cape Town, 8001"
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    dealNotifications: true,
    orderUpdates: true,
    weeklyReports: false,
    whatsappUpdates: true
  });

  // Shopping Preferences
  const [shopping, setShopping] = useState({
    dietaryRestrictions: ["halaal"],
    preferredStores: ["pick-n-pay", "checkers"],
    budgetAlerts: true,
    autoSaveLists: true,
    comparisonMode: "comprehensive"
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    shareData: false,
    locationTracking: true,
    marketingEmails: false,
    analytics: true
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const dietaryOptions = [
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "halaal", label: "Halaal" },
    { id: "kosher", label: "Kosher" },
    { id: "gluten-free", label: "Gluten Free" },
    { id: "dairy-free", label: "Dairy Free" },
    { id: "low-carb", label: "Low Carb" },
    { id: "keto", label: "Keto" }
  ];

  const storeOptions = [
    { id: "pick-n-pay", label: "Pick n Pay" },
    { id: "checkers", label: "Checkers" },
    { id: "woolworths", label: "Woolworths" },
    { id: "spar", label: "Spar" },
    { id: "food-lovers", label: "Food Lover's Market" },
    { id: "shoprite", label: "Shoprite" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Account Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="shopping">Shopping</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Profile Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input 
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input 
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input 
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">National ID</label>
                <Input 
                  value={profile.nationalId}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">Contact support to change your ID number</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button onClick={handleSave} className="btn-hero">
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Location Settings */}
        <TabsContent value="location">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Location Preferences</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Auto-detect location</label>
                    <p className="text-sm text-muted-foreground">Use your device's location for nearby stores</p>
                  </div>
                  <Switch 
                    checked={location.autoLocation}
                    onCheckedChange={(checked) => setLocation({...location, autoLocation: checked})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default Address</label>
                  <Input 
                    value={location.address}
                    onChange={(e) => setLocation({...location, address: e.target.value})}
                    placeholder="Enter your primary address"
                  />
                </div>
                
                <div className="space-y-4">
                  <label className="text-sm font-medium">Default Search Radius: {location.defaultRadius[0]}km</label>
                  <Slider
                    value={location.defaultRadius}
                    onValueChange={(value) => setLocation({...location, defaultRadius: value})}
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
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button onClick={handleSave} className="btn-hero">
                <Save className="h-4 w-4 mr-2" />
                Save Location Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Notification Preferences</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Price Drop Alerts</label>
                    <p className="text-sm text-muted-foreground">Get notified when items on your lists go on sale</p>
                  </div>
                  <Switch 
                    checked={notifications.priceAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, priceAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Deal Notifications</label>
                    <p className="text-sm text-muted-foreground">Weekly deals and special offers</p>
                  </div>
                  <Switch 
                    checked={notifications.dealNotifications}
                    onCheckedChange={(checked) => setNotifications({...notifications, dealNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Order Updates</label>
                    <p className="text-sm text-muted-foreground">Shopping list and order status updates</p>
                  </div>
                  <Switch 
                    checked={notifications.orderUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, orderUpdates: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Weekly Reports</label>
                    <p className="text-sm text-muted-foreground">Your savings and spending insights</p>
                  </div>
                  <Switch 
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications({...notifications, weeklyReports: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">WhatsApp Updates</label>
                    <p className="text-sm text-muted-foreground">Receive notifications via WhatsApp</p>
                  </div>
                  <Switch 
                    checked={notifications.whatsappUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, whatsappUpdates: checked})}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button onClick={handleSave} className="btn-hero">
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Shopping Preferences */}
        <TabsContent value="shopping">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Heart className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Shopping Preferences</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Dietary Restrictions</label>
                <div className="flex flex-wrap gap-2">
                  {dietaryOptions.map((option) => (
                    <Badge 
                      key={option.id}
                      variant={shopping.dietaryRestrictions.includes(option.id) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        const newRestrictions = shopping.dietaryRestrictions.includes(option.id)
                          ? shopping.dietaryRestrictions.filter(r => r !== option.id)
                          : [...shopping.dietaryRestrictions, option.id];
                        setShopping({...shopping, dietaryRestrictions: newRestrictions});
                      }}
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Stores</label>
                <div className="flex flex-wrap gap-2">
                  {storeOptions.map((store) => (
                    <Badge 
                      key={store.id}
                      variant={shopping.preferredStores.includes(store.id) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        const newStores = shopping.preferredStores.includes(store.id)
                          ? shopping.preferredStores.filter(s => s !== store.id)
                          : [...shopping.preferredStores, store.id];
                        setShopping({...shopping, preferredStores: newStores});
                      }}
                    >
                      {store.label}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Comparison Mode</label>
                <Select value={shopping.comparisonMode} onValueChange={(value) => setShopping({...shopping, comparisonMode: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quick">Quick (Top 3 stores)</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive (All stores)</SelectItem>
                    <SelectItem value="preferred">Preferred stores only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Budget Alerts</label>
                    <p className="text-sm text-muted-foreground">Warn when approaching budget limits</p>
                  </div>
                  <Switch 
                    checked={shopping.budgetAlerts}
                    onCheckedChange={(checked) => setShopping({...shopping, budgetAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Auto-save Shopping Lists</label>
                    <p className="text-sm text-muted-foreground">Automatically save lists for future use</p>
                  </div>
                  <Switch 
                    checked={shopping.autoSaveLists}
                    onCheckedChange={(checked) => setShopping({...shopping, autoSaveLists: checked})}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button onClick={handleSave} className="btn-hero">
                <Save className="h-4 w-4 mr-2" />
                Save Shopping Preferences
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Privacy & Security</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Share Anonymous Data</label>
                    <p className="text-sm text-muted-foreground">Help improve our service with anonymous usage data</p>
                  </div>
                  <Switch 
                    checked={privacy.shareData}
                    onCheckedChange={(checked) => setPrivacy({...privacy, shareData: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Location Tracking</label>
                    <p className="text-sm text-muted-foreground">Required for finding nearby stores</p>
                  </div>
                  <Switch 
                    checked={privacy.locationTracking}
                    onCheckedChange={(checked) => setPrivacy({...privacy, locationTracking: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Marketing Emails</label>
                    <p className="text-sm text-muted-foreground">Receive promotional offers and news</p>
                  </div>
                  <Switch 
                    checked={privacy.marketingEmails}
                    onCheckedChange={(checked) => setPrivacy({...privacy, marketingEmails: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Analytics</label>
                    <p className="text-sm text-muted-foreground">Track app usage for performance improvements</p>
                  </div>
                  <Switch 
                    checked={privacy.analytics}
                    onCheckedChange={(checked) => setPrivacy({...privacy, analytics: checked})}
                  />
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold mb-2">Data Protection</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Your personal information is encrypted and stored securely. We never share your shopping data with third parties without your explicit consent.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">Download My Data</Button>
                  <Button variant="outline" size="sm" className="text-destructive">Delete Account</Button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button onClick={handleSave} className="btn-hero">
                <Save className="h-4 w-4 mr-2" />
                Save Privacy Settings
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserPreferences;