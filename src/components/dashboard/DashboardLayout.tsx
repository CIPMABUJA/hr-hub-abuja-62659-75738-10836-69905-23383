import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  User, 
  CreditCard, 
  Calendar, 
  Award, 
  BookOpen, 
  MessageSquare,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import cipmLogo from "@/assets/cipm-logo.png";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: "member" | "admin";
}

export default function DashboardLayout({ children, userRole = "member" }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const memberNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/member/dashboard" },
    { icon: User, label: "Profile", path: "/member/profile" },
    { icon: CreditCard, label: "Membership", path: "/member/membership" },
    { icon: CreditCard, label: "Payments", path: "/member/payments" },
    { icon: Award, label: "CPD Points", path: "/member/cpd" },
    { icon: Calendar, label: "Events", path: "/member/events" },
    { icon: BookOpen, label: "Resources", path: "/member/resources" },
    { icon: MessageSquare, label: "Forum", path: "/member/forum" },
  ];

  const adminNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: User, label: "Members", path: "/admin/members" },
    { icon: Calendar, label: "Events", path: "/admin/events" },
    { icon: CreditCard, label: "Payments", path: "/admin/payments" },
    { icon: BookOpen, label: "Resources", path: "/admin/resources" },
    { icon: MessageSquare, label: "Forum", path: "/admin/forum" },
    { icon: Bell, label: "News", path: "/admin/news" },
    { icon: TrendingUp, label: "Analytics", path: "/admin/analytics" },
  ];

  const navItems = userRole === "admin" ? adminNavItems : memberNavItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-muted">
      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex flex-col bg-background border-r transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"}`}>
        <div className="flex items-center justify-between p-4 border-b">
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2">
              <img src={cipmLogo} alt="CIPM Logo" className="h-8" />
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={!sidebarOpen ? "mx-auto" : ""}
          >
            {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "default" : "ghost"}
                className={`w-full justify-start ${!sidebarOpen && "justify-center px-2"}`}
              >
                <item.icon className={`h-5 w-5 ${sidebarOpen && "mr-3"}`} />
                {sidebarOpen && <span>{item.label}</span>}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className={`w-full justify-start text-destructive hover:text-destructive ${!sidebarOpen && "justify-center px-2"}`}
            onClick={() => console.log("Logout")}
          >
            <LogOut className={`h-5 w-5 ${sidebarOpen && "mr-3"}`} />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={() => setMobileMenuOpen(false)}>
          <aside className="fixed left-0 top-0 bottom-0 w-64 bg-background border-r z-50" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <Link to="/" className="flex items-center gap-2">
                <img src={cipmLogo} alt="CIPM Logo" className="h-8" />
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={() => console.log("Logout")}
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-background border-b p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            <div className="flex-1 lg:flex-none">
              <h1 className="text-xl font-bold text-foreground ml-2 lg:ml-0">
                {userRole === "admin" ? "Admin Portal" : "Member Portal"}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">John Doe</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/member/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
