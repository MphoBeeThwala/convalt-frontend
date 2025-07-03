import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Shield, Phone, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationalId: "",
    password: "",
    confirmPassword: ""
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const validateSAId = (id: string): boolean => {
    // Basic SA ID validation (13 digits)
    return /^\d{13}$/.test(id);
  };

  const validatePhone = (phone: string): boolean => {
    // SA phone number validation
    return /^(\+27|0)[0-9]{9}$/.test(phone);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSAId(signupData.nationalId)) {
      toast({
        title: "Invalid ID Number",
        description: "Please enter a valid 13-digit South African ID number.",
        variant: "destructive"
      });
      return;
    }

    if (!validatePhone(signupData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid South African phone number.",
        variant: "destructive"
      });
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are identical.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created successfully!",
        description: "Please check your phone for an OTP verification code.",
      });
    }, 2000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login successful!",
        description: "Welcome back to Convergence.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-md">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              🔐 Secure Authentication
            </Badge>
            <h1 className="text-3xl font-bold mb-2">Join Convergence</h1>
            <p className="text-muted-foreground">
              Start saving money on your grocery shopping today
            </p>
          </div>

          <Card className="p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-hero"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Full Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone Number
                    </label>
                    <Input
                      placeholder="+27 or 0xx xxx xxxx"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      SA ID Number
                    </label>
                    <Input
                      placeholder="13-digit ID number"
                      maxLength={13}
                      value={signupData.nationalId}
                      onChange={(e) => setSignupData({...signupData, nationalId: e.target.value.replace(/\D/g, '')})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      type="password"
                      placeholder="Create a strong password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm Password</label>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-hero"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-sm text-muted-foreground">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <span className="text-xs text-muted-foreground">Secure & Private</span>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 text-primary mb-2" />
              <span className="text-xs text-muted-foreground">SMS Verification</span>
            </div>
            <div className="flex flex-col items-center">
              <User className="h-8 w-8 text-primary mb-2" />
              <span className="text-xs text-muted-foreground">SA ID Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;