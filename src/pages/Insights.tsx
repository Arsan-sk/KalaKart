import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  RefreshCw,
  Eye,
  Heart,
  Share2,
  Target,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Calendar,
  Lightbulb
} from "lucide-react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const Insights = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("2 hours ago");

  const updateInsights = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated("Just now");
      toast({
        title: "Insights updated!",
        description: "Fresh analytics and recommendations are ready",
      });
    }, 2000);
  };

  const performanceMetrics = [
    {
      title: "Profile Views",
      value: "2,847",
      change: "+23%",
      trend: "up",
      icon: Eye,
      color: "from-primary to-primary-glow"
    },
    {
      title: "Product Engagement",
      value: "1,456",
      change: "+18%",
      trend: "up",
      icon: Heart,
      color: "from-accent to-accent-glow"
    },
    {
      title: "Shares & Saves",
      value: "892",
      change: "+31%",
      trend: "up",
      icon: Share2,
      color: "from-success to-primary"
    },
    {
      title: "Conversion Rate",
      value: "12.8%",
      change: "-2%",
      trend: "down",
      icon: Target,
      color: "from-primary to-accent"
    }
  ];

  const topProducts = [
    {
      name: "Handwoven Banarasi Silk Saree",
      views: 456,
      engagement: 89,
      trend: "up",
      score: 92
    },
    {
      name: "Traditional Brass Diya Set", 
      views: 342,
      engagement: 67,
      trend: "up",
      score: 85
    },
    {
      name: "Hand-carved Wooden Elephant",
      views: 231,
      engagement: 45,
      trend: "down",
      score: 76
    }
  ];

  const trendingKeywords = [
    { keyword: "Diwali crafts", volume: "High", competition: "Medium" },
    { keyword: "Wedding sarees", volume: "Very High", competition: "High" },
    { keyword: "Handmade jewelry", volume: "Medium", competition: "Low" },
    { keyword: "Traditional art", volume: "Medium", competition: "Medium" },
    { keyword: "Festival decor", volume: "High", competition: "Medium" }
  ];

  const recommendations = [
    {
      type: "Content",
      title: "Post during peak hours",
      description: "Your audience is most active between 7-9 PM. Schedule posts during this time for maximum engagement.",
      impact: "High",
      icon: Clock
    },
    {
      type: "Keywords",
      title: "Add trending hashtags",  
      description: "Include #DiwaliCrafts and #WeddingSarees in your next posts to reach 40% more potential customers.",
      impact: "Medium",
      icon: TrendingUp
    },
    {
      type: "Product",
      title: "Promote Banarasi collection",
      description: "Your silk sarees get 3x more engagement. Consider creating more similar products.",
      impact: "High", 
      icon: Star
    },
    {
      type: "Social",
      title: "Connect with micro-influencers",
      description: "Reaching out to local fashion bloggers could increase your reach by 25%.",
      impact: "Medium",
      icon: Share2
    }
  ];

  const bestPostingTimes = [
    { day: "Monday", time: "8:00 AM, 7:00 PM", engagement: "High" },
    { day: "Tuesday", time: "1:00 PM, 8:00 PM", engagement: "Medium" },
    { day: "Wednesday", time: "12:00 PM, 7:30 PM", engagement: "Medium" },
    { day: "Thursday", time: "9:00 AM, 8:00 PM", engagement: "High" },
    { day: "Friday", time: "6:00 PM, 9:00 PM", engagement: "Very High" },
    { day: "Saturday", time: "10:00 AM, 2:00 PM", engagement: "High" },
    { day: "Sunday", time: "11:00 AM, 6:00 PM", engagement: "Very High" }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
              Insights & Analytics
            </h1>
            <p className="text-muted-foreground mt-2">
              Track performance and discover growth opportunities
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Badge variant="secondary" className="px-3 py-1">
              <Clock className="w-4 h-4 mr-1" />
              Updated {lastUpdated}
            </Badge>
            <Button 
              onClick={updateInsights}
              disabled={isRefreshing}
              variant="hero"
            >
              {isRefreshing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Update Now
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="shadow-warm hover:shadow-craft transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground mt-2">
                      {metric.value}
                    </p>
                    <div className="flex items-center mt-1">
                      {metric.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 text-success mr-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-destructive mr-1" />
                      )}
                      <span className={`text-sm ${metric.trend === "up" ? "text-success" : "text-destructive"}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color}`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Performing Products */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                Top Performing Products
              </CardTitle>
              <CardDescription>
                Your best products based on views and engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground line-clamp-1">
                        {product.name}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {product.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          {product.engagement}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant={product.trend === "up" ? "default" : "secondary"} className="text-xs">
                        {product.score}%
                      </Badge>
                      {product.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 text-success" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trending Keywords */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Trending Keywords
              </CardTitle>
              <CardDescription>
                Popular search terms in your craft category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingKeywords.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">#{item.keyword}</p>
                      <p className="text-sm text-muted-foreground">
                        Volume: {item.volume} • Competition: {item.competition}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-accent" />
              AI Recommendations
            </CardTitle>
            <CardDescription>
              Personalized suggestions to grow your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:shadow-warm transition-all">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg gradient-warm">
                      <rec.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{rec.title}</h4>
                        <Badge 
                          variant={rec.impact === "High" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {rec.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Best Posting Times */}
        <Card className="shadow-warm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Optimal Posting Schedule
            </CardTitle>
            <CardDescription>
              When your audience is most active throughout the week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              {bestPostingTimes.map((schedule, index) => (
                <div key={index} className="p-4 bg-secondary/20 rounded-lg text-center">
                  <h4 className="font-semibold text-foreground mb-2">{schedule.day}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{schedule.time}</p>
                  <Badge 
                    variant={schedule.engagement === "Very High" ? "default" : schedule.engagement === "High" ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {schedule.engagement}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="gradient-earth text-secondary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="secondary" size="lg" className="h-auto p-4 flex-col space-y-2">
                <PieChart className="w-6 h-6" />
                <span>Create Campaign</span>
                <span className="text-xs opacity-80">Based on insights</span>
              </Button>
              
              <Button variant="secondary" size="lg" className="h-auto p-4 flex-col space-y-2">
                <TrendingUp className="w-6 h-6" />
                <span>Optimize Products</span>
                <span className="text-xs opacity-80">Update descriptions</span>
              </Button>
              
              <Button variant="secondary" size="lg" className="h-auto p-4 flex-col space-y-2">
                <Share2 className="w-6 h-6" />
                <span>Connect Network</span>
                <span className="text-xs opacity-80">Find collaborators</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Insights;