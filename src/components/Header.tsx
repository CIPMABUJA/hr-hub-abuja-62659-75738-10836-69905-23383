import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import cipmLogo from "@/assets/logo.png";
const navigation = [{
  name: "Home",
  href: "/"
}, {
  name: "Who We Are",
  href: "/about"
}, {
  name: "What We Do",
  href: "/services"
}, {
  name: "Membership",
  href: "/membership"
}, {
  name: "News",
  href: "/news"
}, {
  name: "Gallery",
  href: "/gallery"
}, {
  name: "Contact",
  href: "/contact"
}];
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return <header className="sticky top-0 z-50 bg-card shadow-soft">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-3">
            <img src={cipmLogo} alt="CIPM Logo" className="h-16 w-16" />
            <div className="flex flex-col">
              
              
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map(item => <Link key={item.name} to={item.href} className={`text-sm font-medium transition-colors hover:text-primary ${isActive(item.href) ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
              {item.name}
            </Link>)}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link to="/member/dashboard">Member Portal</Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && <div className="lg:hidden bg-card border-t border-border">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map(item => <Link key={item.name} to={item.href} className={`block rounded-md px-3 py-2 text-base font-medium ${isActive(item.href) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`} onClick={() => setMobileMenuOpen(false)}>
                {item.name}
              </Link>)}
            <div className="pt-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button variant="default" size="sm" className="w-full" asChild>
                <Link to="/member/dashboard">Member Portal</Link>
              </Button>
            </div>
          </div>
        </div>}
    </header>;
}