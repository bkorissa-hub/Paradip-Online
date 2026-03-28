import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/AuthContext';
import { HelmetProvider } from 'react-helmet-async';

import ScrollToTop from './components/ScrollToTop';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const Sales = lazy(() => import('./pages/Sales'));
const Services = lazy(() => import('./pages/Services'));
const Support = lazy(() => import('./pages/Support'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Maintenance = lazy(() => import('./pages/Maintenance'));

// SEO Footer Routes
const ComputerRepair = lazy(() => import('./pages/seo/ComputerRepair'));
const SoftwareSupport = lazy(() => import('./pages/seo/SoftwareSupport'));
const CustomPcBuilds = lazy(() => import('./pages/seo/CustomPcBuilds'));
const OnSiteSupport = lazy(() => import('./pages/seo/OnSiteSupport'));
const NetworkSetup = lazy(() => import('./pages/seo/NetworkSetup'));
const CctvSolutions = lazy(() => import('./pages/seo/CctvSolutions'));

const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Settings = lazy(() => import('./pages/admin/Settings'));
const Products = lazy(() => import('./pages/admin/Products'));
const Tickets = lazy(() => import('./pages/admin/Tickets'));
const Blogs = lazy(() => import('./pages/admin/Blogs'));
const ServicesManagement = lazy(() => import('./pages/admin/ServicesManagement'));
const Login = lazy(() => import('./pages/admin/Login'));
const Pages = lazy(() => import('./pages/admin/Pages'));
const PageEditor = lazy(() => import('./pages/admin/PageEditor'));
const Categories = lazy(() => import('./pages/admin/Categories'));

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

const queryClient = new QueryClient();

function AppRoutes() {
  const { settings, loading } = useSettings();
  const location = useLocation();

  // Show loading state while fetching settings
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if in maintenance mode and not on admin route
  const isAdminRoute = location.pathname.startsWith('/admin');
  const inMaintenanceMode = settings?.maintenanceMode && !isAdminRoute;

  if (inMaintenanceMode) {
    return <Maintenance />;
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
      <Routes>
        {/* Public routes with main layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          
          {/* Static SEO Service Routes */}
          <Route path="/services/computer-and-laptop-repair" element={<ComputerRepair />} />
          <Route path="/services/software-installation-support" element={<SoftwareSupport />} />
          <Route path="/services/custom-pc-builds" element={<CustomPcBuilds />} />
          <Route path="/services/on-site-it-support" element={<OnSiteSupport />} />
          <Route path="/services/network-and-wifi-setup" element={<NetworkSetup />} />
          <Route path="/services/cctv-and-security-solutions" element={<CctvSolutions />} />
          
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>

        {/* Admin login route */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="services-management" element={<ServicesManagement />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="pages" element={<Pages />} />
          <Route path="pages/:name" element={<PageEditor />} />
          <Route path="categories" element={<Categories />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <SettingsProvider>
            <AppRoutes />
            <Toaster />
            <Sonner />
          </SettingsProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
</HelmetProvider>
);

export default App;
