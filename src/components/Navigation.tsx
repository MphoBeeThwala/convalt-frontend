import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <ShoppingCart className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-primary">Convergence</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-muted-foreground hover:text-primary smooth-transition">
            How It Works
          </a>
          <a href="#retailers" className="text-muted-foreground hover:text-primary smooth-transition">
            Retailers
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-primary smooth-transition">
            Contact
          </a>
          <Button variant="outline">Sign In</Button>
          <Button className="btn-hero">Get Started</Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;