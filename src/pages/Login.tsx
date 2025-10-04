import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-16 bg-muted">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto shadow-strong">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Member Login</h1>
                <p className="text-muted-foreground">Access your CIPM Abuja member portal</p>
              </div>

              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com"
                      className="pl-10"
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      className="pl-10"
                      required 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" variant="default" size="lg" className="w-full">
                  Sign In
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Not a member yet?{" "}
                  <Link to="/membership" className="text-primary font-medium hover:underline">
                    Join CIPM Abuja
                  </Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-center text-muted-foreground">
                  Having trouble logging in? Contact us at{" "}
                  <a href="mailto:abuja@cipmnigeria.org" className="text-primary hover:underline">
                    abuja@cipmnigeria.org
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}