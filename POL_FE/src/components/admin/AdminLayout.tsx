import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  Menu,
  X,
  ShoppingBag,
  HeadphonesIcon,
  BookOpen,
  LogOut,
  Wrench,
  User,
  FileText, // Changed from FileType to FileText
  Tags, // Added Tags icon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const mainNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: ShoppingBag, label: "Products", path: "/admin/products" },
    { icon: Wrench, label: "Services", path: "/admin/services-management" },
    { icon: HeadphonesIcon, label: "Tickets", path: "/admin/tickets" },
    { icon: BookOpen, label: "Blogs", path: "/admin/blogs" },
    { icon: FileText, label: "Pages", path: "/admin/pages" },
    { icon: Tags, label: "Categories", path: "/admin/categories" }, // Added Categories
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Sidebar - Fixed */}
      <aside
        className={cn(
          "border-r border-border bg-card transition-all duration-200 flex flex-col h-screen",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border flex-shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <span className="text-sm font-semibold">Admin Panel</span>
            )}
          </Link>
          <button
            type="button"
            className="p-1 rounded-md hover:bg-secondary"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Menu className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>

        <nav className="px-2 py-4 text-sm overflow-y-auto flex-1">
          <div className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-2 text-xs font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User info and logout at bottom */}
        {sidebarOpen && (
          <div className="px-2 py-3 border-t border-border flex-shrink-0">
            <div className="flex items-center gap-2 px-2 py-2 mb-2 rounded-md bg-secondary/50">
              <User className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {user?.username || 'Admin'}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user?.role || 'admin'}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              <LogOut className="h-3 w-3 mr-2" />
              Logout
            </Button>
          </div>
        )}
        {!sidebarOpen && (
          <div className="px-2 py-3 border-t border-border flex-shrink-0">
            <button
              onClick={handleLogout}
              className="w-full p-2 rounded-md hover:bg-destructive/10 text-destructive flex items-center justify-center"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </aside>

      {/* Main content - Scrollable */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header - Fixed */}
        <div className="border-b border-border bg-card/80 backdrop-blur flex-shrink-0">
          <div className="px-4 py-3 flex items-center justify-between">
            <div>
              <h1 className="text-sm font-semibold text-foreground">
                Admin Panel
              </h1>
              <p className="text-xs text-muted-foreground">
                Manage content and pages for Paradeep Online
              </p>
            </div>
            <Link
              to="/"
              className="text-xs text-muted-foreground font-bold hover:text-primary"
            >
              Back to website
            </Link>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-gradient-subtle">
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
