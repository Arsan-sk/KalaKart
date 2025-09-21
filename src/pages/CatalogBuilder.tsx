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
  Upload,
  Wand2,
  Eye,
  Share2,
  Copy,
  Download,
  Star,
  Tag,
  MapPin,
  Clock,
  CheckCircle2,
  Palette
} from "lucide-react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const CatalogBuilder = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("upload");

  const [productData, setProductData] = useState({
    category: "",
    customPrompt: "",
    language: "hi",
    targetLocation: "",
  });

  const categories = [
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

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "mr", name: "मराठी" },
    { code: "ta", name: "தமிழ்" },
    { code: "te", name: "తెలుగు" },
    { code: "gu", name: "ગુજરાતી" },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages(prev => [...prev, ...files].slice(0, 5)); // Max 5 images
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const generateCatalog = async () => {
    if (selectedImages.length === 0) {
      toast({
        title: "No images selected",
        description: "Please upload at least one product image",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation - would integrate with Supabase Edge Functions
    setTimeout(() => {
      const mockContent = {
        title: "Handwoven Banarasi Silk Saree with Golden Zari Work",
        description: "यह खूबसूरत बनारसी रेशमी साड़ी पारंपरिक हाथकरघा तकनीक से बनाई गई है। इसमें नाजुक सुनहरी जरी का काम और जटिल मोतियों की कढ़ाई है। यह साड़ी शादी-विवाह और त्योहारों के लिए आदर्श है। हमारे कारीगर परिवार द्वारा तीन पीढ़ियों से बनाई जा रही यह कलाकृति आपको भारतीय संस्कृति की गहराई से जोड़ती है।\n\nयह साड़ी शुद्ध रेशम से बनी है और इसकी धुलाई सूखी धुलाई से करनी चाहिए। इसका रंग कई सालों तक बना रहता है।",
        tags: ["बनारसी साड़ी", "हाथकरघा", "रेशम", "जरी", "शादी", "त्योहार"],
        priceRange: "₹8,500 - ₹12,000",
        marketplaceGuide: {
          amazon: "अमेज़न पर लिस्ट करने के लिए: गुणवत्ता की तस्वीरें, SEO टाइटल, और प्रोडक्ट की विस्तृत जानकारी जोड़ें",
          flipkart: "फ्लिपकार्ट के लिए: कैटेगरी में Fashion > Sarees चुनें और सभी attributes भरें"
        }
      };
      
      setGeneratedContent(mockContent);
      setIsGenerating(false);
      setActiveTab("preview");
      
      toast({
        title: "Catalog generated successfully!",
        description: "Your product catalog is ready to preview and share",
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

  const generateShareableLink = () => {
    const mockLink = `https://kalaconnect.app/catalog/priya-handloom/banarasi-silk-saree-${Date.now()}`;
    copyToClipboard(mockLink);
    toast({
      title: "Shareable link generated",
      description: "Link copied to clipboard - share it on WhatsApp or social media",
    });
  };

  const savedCatalogs = [
    {
      id: 1,
      title: "Traditional Brass Diya Set",
      date: "2 days ago",
      views: 45,
      status: "Active"
    },
    {
      id: 2,
      title: "Hand-carved Wooden Elephant",
      date: "5 days ago", 
      views: 23,
      status: "Draft"
    },
    {
      id: 3,
      title: "Rajasthani Mirror Work Bag",
      date: "1 week ago",
      views: 67,
      status: "Active"
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
                Catalog Builder
              </h1>
              <p className="text-muted-foreground mt-2">
                Transform your product photos into professional catalogs with AI
              </p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload" className="flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Upload & Generate
              </TabsTrigger>
              <TabsTrigger value="preview" disabled={!generatedContent}>
                <Eye className="w-4 h-4 mr-2" />
                Preview & Share
              </TabsTrigger>
              <TabsTrigger value="history">
                <Clock className="w-4 h-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>

            {/* Upload & Generate Tab */}
            <TabsContent value="upload" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Image Upload */}
                <Card className="shadow-warm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Upload className="w-5 h-5 mr-2 text-primary" />
                      Product Images
                    </CardTitle>
                    <CardDescription>
                      Upload up to 5 high-quality images of your product
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center craft-texture">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <div className="p-3 rounded-xl gradient-warm">
                          <Upload className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm font-medium">Click to upload images</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                      </label>
                    </div>

                    {/* Selected Images */}
                    {selectedImages.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {selectedImages.map((file, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square bg-secondary/20 rounded-lg craft-texture flex items-center justify-center">
                              <Palette className="w-8 h-8 text-muted-foreground/50" />
                            </div>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              ×
                            </Button>
                            <p className="text-xs text-muted-foreground mt-2 truncate">
                              {file.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Configuration */}
                <Card className="shadow-warm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Wand2 className="w-5 h-5 mr-2 text-primary" />
                      Generation Settings
                    </CardTitle>
                    <CardDescription>
                      Configure how your catalog content should be generated
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="category">Product Category</Label>
                      <Select onValueChange={(value) => setProductData(prev => ({...prev, category: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your craft category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="language">Content Language</Label>
                      <Select 
                        value={productData.language}
                        onValueChange={(value) => setProductData(prev => ({...prev, language: value}))}
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
                      <Label htmlFor="location">Target Location</Label>
                      <Input
                        id="location"
                        placeholder="e.g., Mumbai, Maharashtra"
                        value={productData.targetLocation}
                        onChange={(e) => setProductData(prev => ({...prev, targetLocation: e.target.value}))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="prompt">Additional Instructions (Optional)</Label>
                      <Textarea
                        id="prompt"
                        placeholder="Any specific details you want to highlight about your product..."
                        value={productData.customPrompt}
                        onChange={(e) => setProductData(prev => ({...prev, customPrompt: e.target.value}))}
                        rows={3}
                      />
                    </div>

                    <Button
                      onClick={generateCatalog}
                      disabled={isGenerating}
                      size="lg"
                      variant="hero"
                      className="w-full"
                    >
                      {isGenerating ? (
                        <>
                          <Wand2 className="w-5 h-5 mr-2 animate-spin" />
                          Generating Catalog...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-5 h-5 mr-2" />
                          Generate Catalog
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Preview & Share Tab */}
            <TabsContent value="preview" className="space-y-6">
              {generatedContent && (
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Generated Content */}
                  <Card className="shadow-warm">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center">
                          <CheckCircle2 className="w-5 h-5 mr-2 text-success" />
                          Generated Catalog
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(JSON.stringify(generatedContent, null, 2))}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy All
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label className="text-sm font-semibold">Product Title</Label>
                        <p className="mt-1 p-3 bg-secondary/20 rounded-lg">
                          {generatedContent.title}
                        </p>
                      </div>

                      <div>
                        <Label className="text-sm font-semibold">Description</Label>
                        <div className="mt-1 p-3 bg-secondary/20 rounded-lg max-h-48 overflow-y-auto">
                          <p className="whitespace-pre-wrap text-sm">
                            {generatedContent.description}
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-semibold">Tags & Keywords</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {generatedContent.tags.map((tag: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-semibold">Suggested Price Range</Label>
                        <p className="mt-1 text-lg font-semibold text-primary">
                          {generatedContent.priceRange}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actions & Sharing */}
                  <div className="space-y-6">
                    <Card className="shadow-warm">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Share2 className="w-5 h-5 mr-2 text-primary" />
                          Share & Export
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button
                          onClick={generateShareableLink}
                          variant="hero"
                          size="lg"
                          className="w-full"
                        >
                          <Share2 className="w-5 h-5 mr-2" />
                          Generate Shareable Link
                        </Button>

                        <div className="grid grid-cols-2 gap-3">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Text
                          </Button>
                        </div>

                        <div className="text-center pt-4">
                          <p className="text-sm text-muted-foreground mb-3">
                            Share directly to:
                          </p>
                          <div className="flex justify-center space-x-3">
                            <Button variant="secondary" size="sm">
                              WhatsApp
                            </Button>
                            <Button variant="secondary" size="sm">
                              Instagram
                            </Button>
                            <Button variant="secondary" size="sm">
                              Facebook
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-warm">
                      <CardHeader>
                        <CardTitle>Marketplace Guide</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-secondary/20 rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            Amazon Listing
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {generatedContent.marketplaceGuide.amazon}
                          </p>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            Flipkart Listing
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {generatedContent.marketplaceGuide.flipkart}
                          </p>
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
                    Saved Catalogs
                  </CardTitle>
                  <CardDescription>
                    Your previously generated product catalogs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {savedCatalogs.map((catalog) => (
                      <div
                        key={catalog.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-warm transition-all duration-200"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                            <Palette className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {catalog.title}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{catalog.date}</span>
                              <span className="flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {catalog.views} views
                              </span>
                              <Badge variant={catalog.status === "Active" ? "default" : "secondary"} className="text-xs">
                                {catalog.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Star className="w-4 h-4" />
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

export default CatalogBuilder;