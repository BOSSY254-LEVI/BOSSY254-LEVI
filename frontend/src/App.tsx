import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import { CommandPalette } from "./components/CommandPalette";

const queryClient = new QueryClient();

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Projects = lazy(() => import("@/pages/Projects"));
const Skills = lazy(() => import("@/pages/Skills"));
const Experience = lazy(() => import("@/pages/Experience"));
const Contact = lazy(() => import("@/pages/Contact"));
const Blog = lazy(() => import("@/pages/Blog"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Suspense fallback={<Skeleton className="h-screen w-full" />}>
                  <Home />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition>
                <Suspense fallback={<Skeleton className="h-screen w-full" />}>
                  <About />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/projects"
            element={
              <PageTransition>
                <Suspense fallback={<Skeleton className="h-screen w-full" />}>
                  <Projects />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/skills"
            element={
              <PageTransition>
                <Suspense fallback={<Skeleton className="h-screen w-full" />}>
                  <Skills />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/experience"
            element={
              <PageTransition>
                <Suspense fallback={<Skeleton className="h-screen w-full" />}>
                  <Experience />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <Suspense fallback={<Skeleton className="h-screen w-full" />}>
                  <Contact />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/blog"
            element={
              <PageTransition>
                <Suspense fallback={<Skeleton className="h-screen w-full" />}>
                  <Blog />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <Suspense fallback={<Skeleton className="h-screen w-full" />}>
                  <NotFound />
                </Suspense>
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <AppRoutes />
          <CommandPalette />
        </BrowserRouter>
        <Toaster />
        <Sonner />
        <PerformanceMonitor />
        <ScrollToTopButton />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
