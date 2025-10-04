import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/member/dashboard" element={<MemberDashboard />} />
          <Route path="/member/profile" element={<ProfilePage />} />
          <Route path="/member/membership" element={<MembershipPage />} />
          <Route path="/member/payments" element={<PaymentsPage />} />
          <Route path="/member/cpd" element={<CPDPage />} />
          <Route path="/member/events" element={<EventsPage />} />
          <Route path="/member/resources" element={<ResourcesPage />} />
          <Route path="/member/forum" element={<ForumPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
