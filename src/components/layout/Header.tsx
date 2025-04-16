
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut, Home, CreditCard, PiggyBank, Gift } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "There was an error logging you out",
        variant: "destructive",
      });
    }
  };

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: CreditCard, requiresAuth: true },
    { name: "Offers", href: "/offers", icon: Gift },
    { name: "Savings", href: "/savings", icon: PiggyBank, requiresAuth: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  (!item.requiresAuth || isLoggedIn) && (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                        location.pathname === item.href
                          ? "bg-banking-primary text-white"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl banking-gradient bg-clip-text text-transparent">
              Inclusive Banking
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-5 ml-8">
            {navigation.map((item) => (
              (!item.requiresAuth || isLoggedIn) && (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-1 text-sm font-medium ${
                    location.pathname === item.href
                      ? "text-banking-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user.user_metadata.name || user.email}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              className="banking-gradient"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
