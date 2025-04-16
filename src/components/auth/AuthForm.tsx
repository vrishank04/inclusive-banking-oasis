
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const AuthForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setShowConfirmationMessage(false);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        if (error.message === "Email not confirmed") {
          setShowConfirmationMessage(true);
          toast({
            title: "Email verification required",
            description: "Please check your inbox and confirm your email address",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Login successful",
          description: "Welcome back to Inclusive Banking Oasis",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMessage(error.message || "Failed to login");
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setShowConfirmationMessage(false);
    
    if (!name) {
      setErrorMessage("Please enter your name");
      setIsLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) throw error;
      
      setShowConfirmationMessage(true);
      toast({
        title: "Signup successful",
        description: "Please check your email to confirm your account",
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      setErrorMessage(error.message || "Failed to create account");
      toast({
        title: "Signup failed",
        description: error.message || "Please check your information and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendConfirmationEmail = async () => {
    if (!email) {
      setErrorMessage("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      if (error) throw error;
      
      toast({
        title: "Confirmation email sent",
        description: "Please check your inbox for the verification link",
      });
    } catch (error: any) {
      console.error("Email resend error:", error);
      toast({
        title: "Failed to resend email",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-banking-primary/20">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        {showConfirmationMessage && (
          <Alert className="mt-4 mx-4 bg-amber-50 border-amber-200">
            <InfoIcon className="h-4 w-4 text-amber-500" />
            <AlertTitle className="text-amber-800">Email confirmation required</AlertTitle>
            <AlertDescription className="text-amber-700">
              Please check your inbox and click on the verification link to confirm your email address.
              <div className="mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resendConfirmationEmail}
                  disabled={isLoading}
                  className="text-amber-600 border-amber-300 hover:bg-amber-100"
                >
                  Resend confirmation email
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        <TabsContent value="login">
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-banking-primary">Welcome Back</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {errorMessage && !showConfirmationMessage && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                  {errorMessage}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="email@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-banking-secondary font-medium hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full banking-gradient" 
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        
        <TabsContent value="signup">
          <form onSubmit={handleSignup}>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-banking-primary">Create Account</CardTitle>
              <CardDescription className="text-center">
                Enter your details to create a new account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {errorMessage && !showConfirmationMessage && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                  {errorMessage}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder="email@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  required 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full banking-gradient" 
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
