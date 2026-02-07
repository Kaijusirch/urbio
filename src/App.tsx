import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DriversPage from "./pages/dashboard/DriversPage";
import ComplaintsPage from "./pages/dashboard/ComplaintsPage";
import LostPropertyPage from "./pages/dashboard/LostPropertyPage";
import FareEvasionsPage from "./pages/dashboard/FareEvasionsPage";
import IncidentsPage from "./pages/dashboard/IncidentsPage";
import HearingsPage from "./pages/dashboard/HearingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/urbio">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="drivers" element={<DriversPage />} />
                <Route path="complaints" element={<ComplaintsPage />} />
                <Route path="lost-property" element={<LostPropertyPage />} />
                <Route path="fare-evasions" element={<FareEvasionsPage />} />
                <Route path="incidents" element={<IncidentsPage />} />
                <Route path="hearings" element={<HearingsPage />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
