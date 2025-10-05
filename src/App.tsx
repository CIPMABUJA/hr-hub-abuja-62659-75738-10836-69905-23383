import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Membership from "./pages/Membership";
import News from "./pages/News";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Apply from "./pages/Apply";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import MemberDashboard from "./pages/member/MemberDashboard";
import ProfilePage from "./pages/member/ProfilePage";
import MembershipPage from "./pages/member/MembershipPage";
import PaymentsPage from "./pages/member/PaymentsPage";
import CPDPage from "./pages/member/CPDPage";
import EventsPage from "./pages/member/EventsPage";
import ResourcesPage from "./pages/member/ResourcesPage";
import ForumPage from "./pages/member/ForumPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MembersManagement from "./pages/admin/MembersManagement";
import EventsManagement from "./pages/admin/EventsManagement";
import PaymentsManagement from "./pages/admin/PaymentsManagement";
import SettingsPage from "./pages/admin/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/news" element={<News />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/apply" element={<Apply />} />
          
          {/* Auth Routes */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Member Portal Routes */}
          <Route path="/member/dashboard" element={<ProtectedRoute><MemberDashboard /></ProtectedRoute>} />
          <Route path="/member/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/member/membership" element={<ProtectedRoute><MembershipPage /></ProtectedRoute>} />
          <Route path="/member/payments" element={<ProtectedRoute><PaymentsPage /></ProtectedRoute>} />
          <Route path="/member/cpd" element={<ProtectedRoute><CPDPage /></ProtectedRoute>} />
          <Route path="/member/events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
          <Route path="/member/resources" element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>} />
          <Route path="/member/forum" element={<ProtectedRoute><ForumPage /></ProtectedRoute>} />
          
          {/* Admin Portal Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/members" element={<ProtectedRoute requireAdmin><MembersManagement /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute requireAdmin><EventsManagement /></ProtectedRoute>} />
          <Route path="/admin/payments" element={<ProtectedRoute requireAdmin><PaymentsManagement /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><SettingsPage /></ProtectedRoute>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
