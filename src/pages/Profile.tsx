import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  User,
  Settings,
  Globe,
  Key,
  Bell,
  Shield,
  Camera,
  Save,
  LogOut,
  Star,
  Eye,
  Share2,
  MapPin,
  Calendar,
  Palette,
  Instagram,
  MessageSquare,
  Link as LinkIcon,
  Edit
} from "lucide-react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    username: "priya_handloom",
    email: "priya.sharma@email.com",
    phone: "+91-9876543210",
    businessName: "Priya's Traditional Handloom",
    craftCategory: "Handloom & Textiles",
    location: "Varanasi, Uttar Pradesh",
    bio: "Traditional handloom weaver specializing in Banarasi silk sarees. Our family has been preserving this ancient art for three generations, creating beautiful sarees with intricate zari work and traditional motifs.",
    website: "www.priyahandloom.com",
    socialLinks: {
      instagram: "@priya_handloom",
      whatsapp: "+91-9876543210"
    },
    language: "hi"
  });

  const [settingsData, setSettingsData] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    profileVisibility: "public",
    showContactInfo: true,
    allowMessages: true
  });

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी (Hindi)" },
    { code: "mr", name: "मराठी (Marathi)" },
    { code: "ta", name: "தமிழ் (Tamil)" },
    { code: "te", name: "తెలుగు (Telugu)" },
    { code: "gu", name: "ગુજરાતી (Gujarati)" },
  ];

  const craftCategories = [
    "Handloom & Textiles",
    "Pottery & Ceramics",
    "Jewelry & Accessories",
    "Woodwork & Furniture",
    "Metalwork",
    "Paintings & Arts",
    "Leather Goods",
    "Bamboo & Cane",
    "Stone Carving",
    "Other",
  ];

  const profileStats = {
    profileViews: 2847,
    followers: 1234,
    totalProducts: 23,
    joinDate: "March 2023",
    completionRate: 92
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated successfully!",
      description: "Your changes have been saved.",
    });
    setIsEditing(false);
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings updated!",
      description: "Your preferences have been saved.",
    });
  };

  const handleImageUpload = () => {
    toast({
      title: "Image upload",
      description: "Profile picture upload functionality will be available soon.",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
                Profile & Settings
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your account and preferences
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Badge variant="secondary" className="px-3 py-1">
                <Star className="w-4 h-4 mr-1 text-accent" />
                {profileStats.completionRate}% Complete
              </Badge>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="language">
                <Globe className="w-4 h-4 mr-2" />
                Language
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Profile Overview */}
                <Card className="shadow-warm">
                  <CardContent className="p-6 text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                        <Palette className="w-12 h-12 text-white" />
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full"
                        onClick={handleImageUpload}
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {profileData.businessName}
                    </h3>
                    <p className="text-muted-foreground mb-1">@{profileData.username}</p>
                    <p className="text-sm text-muted-foreground mb-4">{profileData.craftCategory}</p>
                    
                    <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      {profileData.location}
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-foreground">{profileStats.profileViews}</p>
                        <p className="text-xs text-muted-foreground">Views</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">{profileStats.followers}</p>
                        <p className="text-xs text-muted-foreground">Followers</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">{profileStats.totalProducts}</p>
                        <p className="text-xs text-muted-foreground">Products</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center text-xs text-muted-foreground mt-4">
                      <Calendar className="w-3 h-3 mr-1" />
                      Joined {profileStats.joinDate}
                    </div>
                  </CardContent>
                </Card>

                {/* Profile Form */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="shadow-warm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <User className="w-5 h-5 mr-2 text-primary" />
                          Profile Information
                        </CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          {isEditing ? "Cancel" : "Edit"}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={profileData.username}
                            disabled={!isEditing}
                            onChange={(e) => setProfileData(prev => ({...prev, username: e.target.value}))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            disabled={!isEditing}
                            onChange={(e) => setProfileData(prev => ({...prev, email: e.target.value}))}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          value={profileData.businessName}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData(prev => ({...prev, businessName: e.target.value}))}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="craftCategory">Craft Category</Label>
                          <Select 
                            value={profileData.craftCategory} 
                            disabled={!isEditing}
                            onValueChange={(value) => setProfileData(prev => ({...prev, craftCategory: value}))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {craftCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={profileData.location}
                            disabled={!isEditing}
                            onChange={(e) => setProfileData(prev => ({...prev, location: e.target.value}))}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData(prev => ({...prev, bio: e.target.value}))}
                          rows={4}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            disabled={!isEditing}
                            onChange={(e) => setProfileData(prev => ({...prev, phone: e.target.value}))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            value={profileData.website}
                            disabled={!isEditing}
                            onChange={(e) => setProfileData(prev => ({...prev, website: e.target.value}))}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="instagram">Instagram</Label>
                          <div className="relative">
                            <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="instagram"
                              value={profileData.socialLinks.instagram}
                              disabled={!isEditing}
                              className="pl-10"
                              onChange={(e) => setProfileData(prev => ({
                                ...prev, 
                                socialLinks: {...prev.socialLinks, instagram: e.target.value}
                              }))}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="whatsapp">WhatsApp Business</Label>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="whatsapp"
                              value={profileData.socialLinks.whatsapp}
                              disabled={!isEditing}
                              className="pl-10"
                              onChange={(e) => setProfileData(prev => ({
                                ...prev, 
                                socialLinks: {...prev.socialLinks, whatsapp: e.target.value}
                              }))}
                            />
                          </div>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex justify-end space-x-3 pt-4">
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                          <Button variant="hero" onClick={handleSaveProfile}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="shadow-warm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-primary" />
                      Notifications
                    </CardTitle>
                    <CardDescription>
                      Manage how you receive updates and alerts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Get updates via email</p>
                      </div>
                      <Switch
                        checked={settingsData.emailNotifications}
                        onCheckedChange={(checked) => 
                          setSettingsData(prev => ({...prev, emailNotifications: checked}))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive push notifications</p>
                      </div>
                      <Switch
                        checked={settingsData.pushNotifications}
                        onCheckedChange={(checked) => 
                          setSettingsData(prev => ({...prev, pushNotifications: checked}))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-muted-foreground">Tips and promotional content</p>
                      </div>
                      <Switch
                        checked={settingsData.marketingEmails}
                        onCheckedChange={(checked) => 
                          setSettingsData(prev => ({...prev, marketingEmails: checked}))
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-warm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-primary" />
                      Privacy Settings
                    </CardTitle>
                    <CardDescription>
                      Control who can see your information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="visibility">Profile Visibility</Label>
                      <Select 
                        value={settingsData.profileVisibility}
                        onValueChange={(value) => setSettingsData(prev => ({...prev, profileVisibility: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public - Anyone can see</SelectItem>
                          <SelectItem value="connected">Connected artisans only</SelectItem>
                          <SelectItem value="private">Private - Hidden profile</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Contact Info</p>
                        <p className="text-sm text-muted-foreground">Display phone and email</p>
                      </div>
                      <Switch
                        checked={settingsData.showContactInfo}
                        onCheckedChange={(checked) => 
                          setSettingsData(prev => ({...prev, showContactInfo: checked}))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Allow Messages</p>
                        <p className="text-sm text-muted-foreground">Let others message you</p>
                      </div>
                      <Switch
                        checked={settingsData.allowMessages}
                        onCheckedChange={(checked) => 
                          setSettingsData(prev => ({...prev, allowMessages: checked}))
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end">
                <Button variant="hero" onClick={handleSaveSettings}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </TabsContent>

            {/* Language Tab */}
            <TabsContent value="language" className="space-y-6">
              <Card className="shadow-warm max-w-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-primary" />
                    Language Preferences
                  </CardTitle>
                  <CardDescription>
                    Choose your preferred language for the app interface and content generation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="language">App Language</Label>
                    <Select 
                      value={profileData.language}
                      onValueChange={(value) => setProfileData(prev => ({...prev, language: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-2">
                      This language will be used for the app interface and AI-generated content
                    </p>
                  </div>

                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Supported Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• AI-generated product descriptions</li>
                      <li>• Social media captions and hashtags</li>
                      <li>• Marketing content in your language</li>
                      <li>• App interface (coming soon for all languages)</li>
                    </ul>
                  </div>

                  <Button variant="hero">
                    <Save className="w-4 h-4 mr-2" />
                    Save Language Preference
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="shadow-warm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Key className="w-5 h-5 mr-2 text-primary" />
                      Password & Security
                    </CardTitle>
                    <CardDescription>
                      Manage your account security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" placeholder="••••••••" />
                    </div>
                    
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="••••••••" />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="••••••••" />
                    </div>

                    <Button variant="default" className="w-full">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-warm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-primary" />
                      Account Actions
                    </CardTitle>
                    <CardDescription>
                      Manage your account and data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Export My Data
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Download Account Info
                    </Button>
                    
                    <div className="pt-4 border-t">
                      <Button variant="destructive" className="w-full justify-start">
                        <LogOut className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        This action cannot be undone. All your data will be permanently deleted.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;