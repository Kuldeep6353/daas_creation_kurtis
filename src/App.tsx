import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";
import Index from "./pages/Index";
import About from "./pages/About";
import Capabilities from "./pages/Capabilities";
import WhyPartner from "./pages/WhyPartner";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import AdminAuth from "./pages/AdminAuth";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Chat from "./pages/Chat";
import AdminChat from "./pages/AdminChat";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";






const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/capabilities" element={<Capabilities />} />
              <Route path="/why-partner" element={<WhyPartner />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin/login" element={<AdminAuth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/chat" element={<Chat />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/chat/:conversationId" element={<AdminChat />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingChatButton />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
