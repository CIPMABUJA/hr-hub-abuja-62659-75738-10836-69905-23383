import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Sorry, we couldn't find the page you're looking for. It may have been moved or doesn't exist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" asChild>
                <Link to="/">
                  <Home className="mr-2" />
                  Go to Home
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
