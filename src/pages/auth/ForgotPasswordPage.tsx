import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import cipmLogo from "@/assets/cipm-logo.png";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Password reset will be implemented later
    console.log("Forgot password for:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={cipmLogo} alt="CIPM Logo" className="h-16" />
          </div>
          <CardTitle className="text-2xl">Forgot Password?</CardTitle>
          <CardDescription>
            {!submitted 
              ? "Enter your email address and we'll send you a reset link"
              : "Check your email for the password reset link"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link to="/auth/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </div>

              <div className="text-center pt-4">
                <Link to="/" className="text-sm text-muted-foreground hover:underline">
                  ← Back to Home
                </Link>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your inbox and follow the instructions.
              </p>
              <Button asChild className="w-full">
                <Link to="/auth/login">Back to Login</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
