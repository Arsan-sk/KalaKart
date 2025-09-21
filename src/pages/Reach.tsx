import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users,
  Search,
  UserPlus,
  MessageCircle,
  Heart,
  MapPin,
  Star,
  Filter,
  Eye,
  Share2,
  Palette,
  CheckCircle2,
  Clock,
  UserCheck
} from "lucide-react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const Reach = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("discover");

  const featuredArtisans = [
    {
      id: 1,
      name: "Rajesh Kumar",
      craft: "Pottery & Ceramics",
      location: "Khurja, Uttar Pradesh",
      followers: 2847,
      products: 23,
      rating: 4.9,
      verified: true,
      image: "/placeholder-artisan1.jpg",
      bio: "Traditional pottery artist specializing in blue pottery. 25+ years of experience.",
      specialties: ["Blue Pottery", "Traditional Designs", "Custom Orders"],
      isFollowing: false,
    },
    {
      id: 2,
      name: "Meera Patel",
      craft: "Jewelry & Accessories", 
      location: "Jaipur, Rajasthan",
      followers: 3521,
      products: 45,
      rating: 4.8,
      verified: true,
      image: "/placeholder-artisan2.jpg",
      bio: "Creating authentic Rajasthani jewelry with traditional Kundan and Meenakari work.",
      specialties: ["Kundan Jewelry", "Meenakari", "Wedding Sets"],
      isFollowing: true,
    },
    {
      id: 3,
      name: "Arjun Singh",
      craft: "Woodwork & Furniture",
      location: "Saharanpur, Uttar Pradesh", 
      followers: 1892,
      products: 34,
      rating: 4.7,
      verified: false,
      image: "/placeholder-artisan3.jpg",
      bio: "Hand-carved wooden furniture and decorative items using traditional techniques.",
      specialties: ["Hand Carving", "Furniture", "Decorative Items"],
      isFollowing: false,
    },
    {
      id: 4,
      name: "Lakshmi Devi",
      craft: "Handloom & Textiles",
      location: "Kanchipuram, Tamil Nadu",
      followers: 4156,
      products: 67,
      rating: 4.9,
      verified: true,
      image: "/placeholder-artisan4.jpg",
      bio: "Master weaver of authentic Kanchipuram silk sarees with gold zari work.",
      specialties: ["Silk Sarees", "Gold Zari", "Wedding Collections"],
      isFollowing: false,
    },
    {
      id: 5,
      name: "Suresh Chand",
      craft: "Metalwork",
      location: "Moradabad, Uttar Pradesh",
      followers: 2345,
      products: 29,
      rating: 4.6,
      verified: true,
      image: "/placeholder-artisan5.jpg",
      bio: "Brassware and metalwork artist creating traditional utensils and decorative pieces.",
      specialties: ["Brass Utensils", "Decorative Items", "Religious Articles"],
      isFollowing: true,
    },
    {
      id: 6,
      name: "Kavita Sharma",
      craft: "Paintings & Arts",
      location: "Udaipur, Rajasthan",
      followers: 3789,
      products: 52,
      rating: 4.8,
      verified: true,
      image: "/placeholder-artisan6.jpg",
      bio: "Miniature painter specializing in Rajasthani and Mughal art styles.",
      specialties: ["Miniature Painting", "Traditional Art", "Custom Portraits"],
      isFollowing: false,
    },
  ];

  const myConnections = [
    {
      id: 1,
      name: "Rajesh Kumar",
      craft: "Pottery & Ceramics",
      location: "Khurja, UP",
      status: "Connected",
      lastActive: "2 hours ago",
      mutualConnections: 12,
    },
    {
      id: 2,
      name: "Meera Patel", 
      craft: "Jewelry & Accessories",
      location: "Jaipur, RJ",
      status: "Connected",
      lastActive: "1 day ago",
      mutualConnections: 8,
    },
    {
      id: 5,
      name: "Suresh Chand",
      craft: "Metalwork",
      location: "Moradabad, UP",
      status: "Connected",
      lastActive: "3 hours ago",
      mutualConnections: 5,
    },
  ];

  const pendingRequests = [
    {
      id: 7,
      name: "Amit Verma",
      craft: "Leather Goods",
      location: "Kanpur, UP", 
      requestDate: "2 days ago",
      mutualConnections: 3,
    },
    {
      id: 8,
      name: "Sunita Devi",
      craft: "Bamboo & Cane",
      location: "Tripura",
      requestDate: "1 week ago", 
      mutualConnections: 1,
    },
  ];

  const handleConnect = (artisanId: number) => {
    toast({
      title: "Connection request sent!",
      description: "The artisan will be notified about your request",
    });
  };

  const handleFollow = (artisanId: number) => {
    toast({
      title: "Following artisan",
      description: "You'll see their updates in your feed",
    });
  };

  const handleAcceptRequest = (artisanId: number) => {
    toast({
      title: "Connection accepted!",
      description: "You can now message and collaborate",
    });
  };

  const ArtisanCard = ({ artisan, showConnectButton = true }: { artisan: any; showConnectButton?: boolean }) => (
    <Card className="shadow-warm hover:shadow-craft transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Palette className="w-8 h-8 text-white" />
            </div>
            {artisan.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {artisan.name}
                </h3>
                <p className="text-sm text-muted-foreground">{artisan.craft}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  {artisan.location}
                </div>
              </div>
              
              {artisan.rating && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-accent mr-1" />
                  <span className="text-sm font-medium">{artisan.rating}</span>
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {artisan.bio}
            </p>

            {artisan.specialties && (
              <div className="flex flex-wrap gap-1 mt-3">
                {artisan.specialties.slice(0, 2).map((specialty: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
                {artisan.specialties.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{artisan.specialties.length - 2} more
                  </Badge>
                )}
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {artisan.followers || artisan.mutualConnections} 
                  {artisan.followers ? " followers" : " mutual"}
                </span>
                <span className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {artisan.products} products
                </span>
              </div>

              {showConnectButton && (
                <div className="flex items-center space-x-2">
                  {!artisan.isFollowing ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFollow(artisan.id)}
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      Follow
                    </Button>
                  ) : (
                    <Button variant="secondary" size="sm" disabled>
                      <UserCheck className="w-4 h-4 mr-1" />
                      Following
                    </Button>
                  )}
                  
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => handleConnect(artisan.id)}
                  >
                    <UserPlus className="w-4 h-4 mr-1" />
                    Connect
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
                Reach & Connect
              </h1>
              <p className="text-muted-foreground mt-2">
                Build your network and collaborate with fellow artisans
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Badge variant="secondary" className="px-3 py-1">
                <Users className="w-4 h-4 mr-1" />
                {myConnections.length} Connections
              </Badge>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="discover" className="flex items-center">
                <Search className="w-4 h-4 mr-2" />
                Discover Artisans
              </TabsTrigger>
              <TabsTrigger value="connections">
                <Users className="w-4 h-4 mr-2" />
                My Network ({myConnections.length})
              </TabsTrigger>
              <TabsTrigger value="requests">
                <UserPlus className="w-4 h-4 mr-2" />
                Requests ({pendingRequests.length})
              </TabsTrigger>
            </TabsList>

            {/* Discover Tab */}
            <TabsContent value="discover" className="space-y-6">
              {/* Search & Filters */}
              <Card className="shadow-warm">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search artisans by name, craft, or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline" size="default">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Featured Artisans */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Featured Artisans</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredArtisans.map((artisan) => (
                    <ArtisanCard key={artisan.id} artisan={artisan} />
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* My Network Tab */}
            <TabsContent value="connections" className="space-y-6">
              <Card className="shadow-warm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    My Connections
                  </CardTitle>
                  <CardDescription>
                    Your network of fellow artisans and collaborators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myConnections.map((connection) => (
                      <div
                        key={connection.id}
                        className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg hover:shadow-warm transition-all"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                            <Palette className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{connection.name}</h4>
                            <p className="text-sm text-muted-foreground">{connection.craft}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                              <span className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {connection.location}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                Active {connection.lastActive}
                              </span>
                              <span>{connection.mutualConnections} mutual connections</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Requests Tab */}
            <TabsContent value="requests" className="space-y-6">
              <Card className="shadow-warm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserPlus className="w-5 h-5 mr-2 text-primary" />
                    Connection Requests
                  </CardTitle>
                  <CardDescription>
                    Artisans who want to connect with you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg hover:shadow-warm transition-all"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                            <Palette className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{request.name}</h4>
                            <p className="text-sm text-muted-foreground">{request.craft}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                              <span className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {request.location}
                              </span>
                              <span>Sent {request.requestDate}</span>
                              <span>{request.mutualConnections} mutual connections</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleAcceptRequest(request.id)}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                          <Button variant="outline" size="sm">
                            Decline
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Network Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-warm text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">24</h3>
                <p className="text-muted-foreground">Total Connections</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-warm text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">156</h3>
                <p className="text-muted-foreground">Profile Views</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-warm text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">89</h3>
                <p className="text-muted-foreground">Collaborations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reach;