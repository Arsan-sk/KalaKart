import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Megaphone,
  Wand2,
  Copy,
  Share2,
  MapPin,
  Clock,
  Hash,
  AtSign,
  MessageSquare,
  Instagram,
  Send,
  Star,
  Target,
  Zap
} from "lucide-react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const MarketIt = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const [campaignData, setCampaignData] = useState({
    prompt: "",
    targetLocation: "",
    language: "hi",
    postType: "instagram",
  });

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "mr", name: "मराठी" },
    { code: "ta", name: "தமிழ்" },
    { code: "te", name: "తెలుగు" },
    { code: "gu", name: "ગુજરાતી" },
  ];

  const postTypes = [
    { value: "instagram", label: "Instagram Post", icon: Instagram },
    { value: "whatsapp", label: "WhatsApp Business", icon: MessageSquare },
    { value: "all", label: "All Platforms", icon: Share2 },
  ];

  const generateContent = async () => {
    if (!campaignData.prompt.trim()) {
      toast({
        title: "Missing prompt",
        description: "Please describe what you want to promote",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation - would integrate with Supabase Edge Functions
    setTimeout(() => {
      const mockContent = {
        captions: {
          short: "🌟 हस्तनिर्मित बनारसी रेशम साड़ी ✨\nपारंपरिक कारीगरी का अनुपम नमूना। आज ही ऑर्डर करें! 📞\n#HandmadeWithLove #BanarasiSilk #VaranasiWeaver",
          medium: "✨ वाराणसी की गलियों से सीधे आपके घर तक! ✨\n\nयह खूबसूरत बनारसी रेशमी साड़ी तीन पीढ़ियों के अनुभव से तैयार की गई है। हर धागे में छुपी है हमारी मेहनत और समर्पण की कहानी।\n\n🎯 विशेषताएं:\n• शुद्ध रेशम और सुनहरी जरी\n• हाथकरघा तकनीक\n• शादी-विवाह के लिए परफेक्ट\n\nआज ही संपर्क करें और बनें इस कलाकृति के मालिक! 📱\n\n#BanarasiSaree #HandloomSaree #WeddingSaree #VaranasiCraft #SilkSaree #TraditionalWear #HandmadeInIndia #SareeLovers",
          long: "🕊️ वाराणसी की धरती से आपके लिए खास... 🕊️\n\nनमस्कार! मैं प्रिया शर्मा, वाराणसी की एक हथकरघा कारीगर। आज मैं आपके साथ साझा कर रही हूं अपनी सबसे प्रिय कलाकृति - यह बनारसी रेशमी साड़ी।\n\n✨ कहानी इस साड़ी की:\nयह साड़ी सिर्फ कपड़ा नहीं, बल्कि हमारे पूर्वजों की कला का जीवंत रूप है। हर मोतिया, हर जरी का धागा, हर रंग - सब कुछ प्रेम और धैर्य से बुना गया है।\n\n🎨 विशेष बातें:\n• 100% शुद्ध मलका रेशम\n• 24 कैरेट सोने की जरी\n• 45 दिन की मेहनत\n• पारंपरिक मुगल डिज़ाइन\n• प्राकृतिक रंगों का इस्तेमाल\n\n💝 आपके खास मौकों के लिए:\nचाहे शादी हो, त्योहार हो या कोई विशेष अवसर - यह साड़ी आपको बनाएगी सबसे खूबसूरत। इसे पहनकर आप ना सिर्फ सुंदर दिखेंगी, बल्कि हमारी संस्कृति की गरिमा भी बढ़ाएंगी।\n\n📞 संपर्क करें:\nव्हाट्सऐप: +91-9876543210\nया कमेंट में 'INTERESTED' लिखें\n\n🙏 आपका साथ ही हमारी कला को जिंदा रखता है। धन्यवाद!\n\n#BanarasiSaree #HandloomIndia #VaranasiWeaver #SilkSaree #TraditionalCraft #WeddingSaree #HandmadeWithLove #SupportLocalArtisans #IndianTextile #CulturalHeritage"
        },
        hashtags: [
          "#BanarasiSaree", "#HandloomSaree", "#VaranasiCraft", "#SilkSaree", 
          "#WeddingSaree", "#TraditionalWear", "#HandmadeInIndia", "#SareeLovers",
          "#IndianTextile", "#CulturalHeritage"
        ],
        mentions: [
          "@saree_stories", "@indian_weavers", "@handloom_hub", 
          "@varanasi_diaries", "@silk_route_india"
        ],
        whatsappMessage: "🌟 विशेष ऑफर! 🌟\nहस्तनिर्मित बनारसी रेशम साड़ी - सीधे कारीगर से!\n\n✅ शुद्ध रेशम और सुनहरी जरी\n✅ पारंपरिक हाथकरघा तकनीक\n✅ मुफ्त होम डिलीवरी\n\nआज ही ऑर्डर करें: +91-9876543210\n\n#HandmadeWithLove #BanarasiSaree",
        bestPostingTimes: [
          "सुबह 8:00 - 10:00 बजे",
          "दोपहर 1:00 - 2:00 बजे", 
          "शाम 7:00 - 9:00 बजे"
        ],
        locationInsights: "मुंबई में त्योहारी सीजन के दौरान बनारसी साड़ियों की मांग 40% बढ़ जाती है। दिवाली से पहले का समय सबसे अच्छा है।"
      };
      
      setGeneratedContent(mockContent);
      setIsGenerating(false);
      setActiveTab("results");
      
      toast({
        title: "Marketing content generated!",
        description: "Your social media campaign is ready to share",
      });
    }, 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied successfully",
    });
  };

  const shareToWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  const previousCampaigns = [
    {
      id: 1,
      title: "Diwali Diya Collection",
      date: "3 days ago",
      platform: "Instagram + WhatsApp",
      engagement: "156 likes, 23 shares",
      status: "Active"
    },
    {
      id: 2,
      title: "Wooden Elephant Showcase",
      date: "1 week ago",
      platform: "Instagram",
      engagement: "89 likes, 12 shares",
      status: "Completed"
    },
    {
      id: 3,
      title: "Wedding Season Promotion",
      date: "2 weeks ago",
      platform: "All Platforms",
      engagement: "234 likes, 45 shares",
      status: "Completed"
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
                Market It
              </h1>
              <p className="text-muted-foreground mt-2">
                Generate viral marketing content for your crafts
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Badge variant="secondary" className="px-3 py-1">
                <Zap className="w-4 h-4 mr-1 text-accent" />
                AI Powered
              </Badge>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="create" className="flex items-center">
                <Wand2 className="w-4 h-4 mr-2" />
                Create Campaign
              </TabsTrigger>
              <TabsTrigger value="results" disabled={!generatedContent}>
                <Megaphone className="w-4 h-4 mr-2" />
                Generated Content
              </TabsTrigger>
              <TabsTrigger value="history">
                <Clock className="w-4 h-4 mr-2" />
                Campaign History
              </TabsTrigger>
            </TabsList>

            {/* Create Campaign Tab */}
            <TabsContent value="create" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <Card className="shadow-warm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-primary" />
                      Campaign Details
                    </CardTitle>
                    <CardDescription>
                      Tell us what you want to promote and we'll create engaging content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="prompt">What do you want to promote?</Label>
                      <Textarea
                        id="prompt"
                        placeholder="Describe your product, its unique features, story, or any special offer..."
                        value={campaignData.prompt}
                        onChange={(e) => setCampaignData(prev => ({...prev, prompt: e.target.value}))}
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="language">Content Language</Label>
                        <Select 
                          value={campaignData.language}
                          onValueChange={(value) => setCampaignData(prev => ({...prev, language: value}))}
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
                      </div>

                      <div>
                        <Label htmlFor="postType">Platform Focus</Label>
                        <Select 
                          value={campaignData.postType}
                          onValueChange={(value) => setCampaignData(prev => ({...prev, postType: value}))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {postTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center">
                                  <type.icon className="w-4 h-4 mr-2" />
                                  {type.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Target Location (Optional)</Label>
                      <Input
                        id="location"
                        placeholder="e.g., Mumbai, Delhi, or leave blank for general audience"
                        value={campaignData.targetLocation}
                        onChange={(e) => setCampaignData(prev => ({...prev, targetLocation: e.target.value}))}
                      />
                    </div>

                    <Button
                      onClick={generateContent}
                      disabled={isGenerating}
                      size="lg"
                      variant="hero"
                      className="w-full"
                    >
                      {isGenerating ? (
                        <>
                          <Wand2 className="w-5 h-5 mr-2 animate-spin" />
                          Generating Content...
                        </>
                      ) : (
                        <>
                          <Megaphone className="w-5 h-5 mr-2" />
                          Generate Marketing Pack
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Tips & Examples */}
                <Card className="shadow-warm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="w-5 h-5 mr-2 text-accent" />
                      Pro Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <h4 className="font-semibold text-accent mb-2">📸 Great Content Ideas:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Highlight unique crafting techniques</li>
                        <li>• Share the story behind your product</li>
                        <li>• Mention special offers or festivals</li>
                        <li>• Include your location for local customers</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-primary/10 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">⏰ Best Posting Times:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Morning: 8:00 - 10:00 AM</li>
                        <li>• Lunch: 1:00 - 2:00 PM</li>
                        <li>• Evening: 7:00 - 9:00 PM</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-success/10 rounded-lg">
                      <h4 className="font-semibold text-success mb-2">🎯 Example Prompt:</h4>
                      <p className="text-sm text-muted-foreground italic">
                        "Beautiful handwoven Banarasi silk saree with golden zari work. 
                        Made by our family for 3 generations in Varanasi. Perfect for weddings 
                        and festivals. Special Diwali discount available!"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="space-y-6">
              {generatedContent && (
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Generated Captions */}
                  <div className="space-y-6">
                    <Card className="shadow-warm">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center">
                            <Instagram className="w-5 h-5 mr-2 text-primary" />
                            Instagram Captions
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Short Caption */}
                        <div className="p-4 bg-secondary/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-xs">Short (Stories/Quick Post)</Badge>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyToClipboard(generatedContent.captions.short)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{generatedContent.captions.short}</p>
                        </div>

                        {/* Medium Caption */}
                        <div className="p-4 bg-secondary/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-xs">Medium (Regular Post)</Badge>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyToClipboard(generatedContent.captions.medium)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-sm whitespace-pre-wrap max-h-32 overflow-y-auto">{generatedContent.captions.medium}</p>
                        </div>

                        {/* Long Caption */}
                        <div className="p-4 bg-secondary/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-xs">Long (Detailed Story)</Badge>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyToClipboard(generatedContent.captions.long)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-sm whitespace-pre-wrap max-h-40 overflow-y-auto">{generatedContent.captions.long}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* WhatsApp Message */}
                    <Card className="shadow-warm">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center">
                            <MessageSquare className="w-5 h-5 mr-2 text-success" />
                            WhatsApp Business Message
                          </span>
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => shareToWhatsApp(generatedContent.whatsappMessage)}
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Share Now
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 bg-success/10 rounded-lg">
                          <p className="text-sm whitespace-pre-wrap">{generatedContent.whatsappMessage}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Hashtags & Mentions */}
                  <div className="space-y-6">
                    <Card className="shadow-warm">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Hash className="w-5 h-5 mr-2 text-primary" />
                          Hashtag Pack
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {generatedContent.hashtags.map((tag: string, index: number) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                              onClick={() => copyToClipboard(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => copyToClipboard(generatedContent.hashtags.join(' '))}
                          className="w-full"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy All Hashtags
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="shadow-warm">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <AtSign className="w-5 h-5 mr-2 text-primary" />
                          Suggested Mentions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {generatedContent.mentions.map((mention: string, index: number) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-secondary/20 rounded">
                              <span className="text-sm font-mono">{mention}</span>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => copyToClipboard(mention)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-warm">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <MapPin className="w-5 h-5 mr-2 text-primary" />
                          Location Insights
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-accent/10 rounded-lg">
                          <h4 className="font-semibold mb-2">📍 Market Intelligence:</h4>
                          <p className="text-sm text-muted-foreground">{generatedContent.locationInsights}</p>
                        </div>

                        <div className="p-4 bg-primary/10 rounded-lg">
                          <h4 className="font-semibold mb-2">⏰ Best Posting Times:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {generatedContent.bestPostingTimes.map((time: string, index: number) => (
                              <li key={index}>• {time}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              <Card className="shadow-warm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    Previous Campaigns
                  </CardTitle>
                  <CardDescription>
                    Your marketing campaign history and performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {previousCampaigns.map((campaign) => (
                      <div
                        key={campaign.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-warm transition-all duration-200"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                            <Megaphone className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {campaign.title}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{campaign.date}</span>
                              <span>{campaign.platform}</span>
                              <Badge variant={campaign.status === "Active" ? "default" : "secondary"} className="text-xs">
                                {campaign.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{campaign.engagement}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Copy className="w-4 h-4" />
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
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MarketIt;