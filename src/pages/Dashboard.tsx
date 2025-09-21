import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Palette, 
  Megaphone, 
  TrendingUp, 
  Users, 
  Plus,
  Star,
  Eye,
  Share2,
  Heart,
  ArrowUpRight
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Products",
      value: "12",
      change: "+3 this week",
      icon: Palette,
      color: "from-primary to-primary-glow",
    },
    {
      title: "Marketing Campaigns",
      value: "8",
      change: "+2 this week",
      icon: Megaphone,
      color: "from-accent to-accent-glow",
    },
    {
      title: "Profile Views",
      value: "156",
      change: "+23% this month",
      icon: Eye,
      color: "from-success to-primary",
    },
    {
      title: "Connections",
      value: "24",
      change: "+5 new",
      icon: Users,
      color: "from-primary to-accent",
    },
  ];

  const recentProducts = [
    {
      id: 1,
      title: "Handwoven Banarasi Silk Saree",
      image: "/placeholder-saree.jpg",
      price: "₹8,500 - ₹12,000",
      status: "Active",
      views: 45,
      shares: 12,
    },
    {
      id: 2,
      title: "Traditional Brass Diya Set",
      image: "/placeholder-diya.jpg",
      price: "₹450 - ₹800",
      status: "Active",
      views: 32,
      shares: 8,
    },
    {
      id: 3,
      title: "Hand-carved Wooden Elephant",
      image: "/placeholder-elephant.jpg",
      price: "₹1,200 - ₹2,500",
      status: "Draft",
      views: 0,
      shares: 0,
    },
  ];

  const quickActions = [
    {
      title: "Create New Product",
      description: "Upload photos and generate catalog",
      icon: Palette,
      href: "/catalog",
      variant: "hero" as const,
    },
    {
      title: "Generate Marketing",
      description: "Create social media content",
      icon: Megaphone,
      href: "/market",
      variant: "warm" as const,
    },
    {
      title: "View Insights",
      description: "Check performance metrics",
      icon: TrendingUp,
      href: "/insights",
      variant: "default" as const,
    },
    {
      title: "Connect with Artisans",
      description: "Expand your network",
      icon: Users,
      href: "/reach",
      variant: "secondary" as const,
    },
  ];

  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { supabase } = await import("../../lib/supabaseClient.js");
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData?.session) {
          window.location.replace('/login');
          return;
        }
        const user = sessionData.session.user;
        const { data: prof, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        if (!error) setProfile(prof);
      } catch (err) {
        console.error('Dashboard session/profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
              {loading ? 'Loading...' : profile?.business_name ? `Welcome back, ${profile.business_name}!` : 'Welcome back!'}
            </h1>
            <p className="text-muted-foreground mt-2">
              Here's what's happening with your craft business today
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Badge variant="secondary" className="px-3 py-1">
              <Star className="w-4 h-4 mr-1 text-accent" />
              Premium Member
            </Badge>
            <Link to="/catalog">
              <Button variant="hero" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                New Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-warm hover:shadow-craft transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground mt-2">
                      {stat.value}
                    </p>
                    <p className="text-sm text-success mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <Card className="shadow-warm hover:shadow-craft transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-xl gradient-warm group-hover:scale-110 transition-transform">
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Products</h2>
            <Link to="/catalog">
              <Button variant="outline" size="sm">
                View All
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProducts.map((product) => (
              <Card key={product.id} className="shadow-warm hover:shadow-craft transition-all duration-300 group">
                <div className="aspect-square bg-secondary/20 rounded-t-lg craft-texture flex items-center justify-center">
                  <Palette className="w-12 h-12 text-muted-foreground/50" />
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <Badge 
                      variant={product.status === "Active" ? "default" : "secondary"}
                      className="ml-2 text-xs"
                    >
                      {product.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {product.price}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {product.views}
                      </div>
                      <div className="flex items-center">
                        <Share2 className="w-4 h-4 mr-1" />
                        {product.shares}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <Card className="gradient-earth text-secondary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Today's Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <strong>Boost your visibility:</strong> Posts with regional hashtags get 3x more engagement. 
              Try adding location-specific tags like #MumbaiArtisan or #VaranasiHandloom to your next marketing campaign.
            </p>
            <Link to="/market">
              <Button variant="secondary" size="sm">
                Create Marketing Content
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;