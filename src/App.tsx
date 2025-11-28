import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Auth from "./pages/Auth";
import ScreenshotAnalyzer from "./pages/ScreenshotAnalyzer";
import PeriodTracker from "./pages/PeriodTracker";
import SafetyTips from "./pages/SafetyTips";
import Resources from "./pages/Resources";
import TalkToMe from "./pages/TalkToMe";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/analyzer" element={<ScreenshotAnalyzer />} />
          <Route path="/period-tracker" element={<PeriodTracker />} />
          <Route path="/safety-tips" element={<SafetyTips />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/talk" element={<TalkToMe />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
