import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Home, 
  Palette, 
  Megaphone, 
  TrendingUp, 
  Users, 
  User, 
  Settings,
  Menu,
  Bell,
  Search,
  LogOut
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home, current: location.pathname === "/dashboard" },
    { name: "Catalog Builder", href: "/catalog", icon: Palette, current: location.pathname === "/catalog" },
    { name: "Market It", href: "/market", icon: Megaphone, current: location.pathname === "/market" },
    { name: "Insights", href: "/insights", icon: TrendingUp, current: location.pathname === "/insights" },
    { name: "Reach", href: "/reach", icon: Users, current: location.pathname === "/reach" },
    { name: "Profile", href: "/profile", icon: User, current: location.pathname === "/profile" },
  ];

  const NavItem = ({ item, mobile = false }: { item: typeof navigation[0]; mobile?: boolean }) => (
    <Link
      to={item.href}
      className={`
        flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-craft
        ${item.current 
          ? 'bg-primary text-primary-foreground shadow-warm' 
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
        }
        ${mobile ? 'w-full justify-start' : ''}
      `}
      onClick={() => mobile && setIsMobileMenuOpen(false)}
    >
      <item.icon className="w-5 h-5 mr-3" />
      {item.name}
    </Link>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-card border-r border-border shadow-warm">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-border">
            <div className="flex items-center">
              <div className="p-2 rounded-lg gradient-hero">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold gradient-hero bg-clip-text text-transparent">
                KalaConnect
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-foreground">Priya Sharma</p>
                <p className="text-xs text-muted-foreground">Handloom Weaver</p>
              </div>
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between h-16 px-4 bg-card border-b border-border shadow-warm">
          <div className="flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="flex flex-col h-full">
                  {/* Logo */}
                  <div className="flex items-center h-16 px-6 border-b border-border">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg gradient-hero">
                        <Palette className="w-6 h-6 text-white" />
                      </div>
                      <span className="ml-3 text-xl font-bold gradient-hero bg-clip-text text-transparent">
                        KalaConnect
                      </span>
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="flex-1 px-4 py-6 space-y-2">
                    {navigation.map((item) => (
                      <NavItem key={item.name} item={item} mobile />
                    ))}
                  </nav>

                  {/* User section */}
                  <div className="p-4 border-t border-border">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-foreground">Priya Sharma</p>
                        <p className="text-xs text-muted-foreground">Handloom Weaver</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="ml-4 flex items-center">
              <div className="p-2 rounded-lg gradient-hero">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-lg font-bold gradient-hero bg-clip-text text-transparent">
                KalaConnect
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;