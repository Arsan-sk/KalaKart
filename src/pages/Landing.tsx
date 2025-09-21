import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Palette, Megaphone, TrendingUp, Users, Star, Zap, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Palette,
      title: "AI-Powered Catalog Builder",
      description: "Transform product photos into stunning digital catalogs with compelling descriptions in your preferred Indian language",
      color: "from-primary to-primary-glow",
    },
    {
      icon: Megaphone,
      title: "Viral Marketing Content",
      description: "Generate Instagram captions, WhatsApp messages, and hashtag packs tailored to your region and craft",
      color: "from-accent to-accent-glow",
    },
    {
      icon: TrendingUp,
      title: "Smart Insights",
      description: "Get actionable suggestions on trending products, optimal posting times, and market opportunities",
      color: "from-success to-primary",
    },
    {
      icon: Users,
      title: "Artisan Network",
      description: "Connect with fellow craftspeople, share experiences, and build a community of makers",
      color: "from-primary to-accent",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      craft: "Handloom Weaver",
      location: "Varanasi, UP",
      text: "My Instagram reach increased 10x after using KalaConnect's marketing tools. The captions in Hindi really connect with my customers!",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      craft: "Pottery Artist",
      location: "Khurja, UP",
      text: "The catalog builder helped me create professional product pages in minutes. My WhatsApp business is thriving now!",
      rating: 5,
    },
    {
      name: "Meera Patel",
      craft: "Jewelry Maker",
      location: "Jaipur, RJ",
      text: "Connected with artisans across India and learned new techniques. The community feature is amazing!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden craft-texture">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-base px-4 py-2 shadow-warm">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Platform for Indian Artisans
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-hero bg-clip-text text-transparent mb-8 leading-tight">
              Transform Your Craft into Digital Success
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Build beautiful digital catalogs, generate viral marketing content, 
              and connect with customers - all in your preferred Indian language
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button size="lg" variant="hero" className="group px-8 py-4 text-lg shadow-elegant">
                  Start Building Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/login">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-primary text-primary hover:bg-primary/10">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Everything You Need to Grow
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From catalog creation to community building - we have got you covered
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all duration-500 ${
                    activeFeature === index 
                      ? 'ring-2 ring-primary shadow-craft bg-card' 
                      : 'hover:shadow-warm bg-card/50'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color}`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl gradient-warm p-8 text-white text-center flex items-center justify-center shadow-elegant">
                <div>
                  {(() => {
                    const IconComponent = features[activeFeature].icon;
                    return <IconComponent className="w-20 h-20 mx-auto mb-6 opacity-80" />;
                  })()}
                  <h3 className="text-2xl font-bold mb-4">{features[activeFeature].title}</h3>
                  <p className="text-lg opacity-90">{features[activeFeature].description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Loved by Artisans Across India
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of craftspeople who are growing their business with KalaConnect
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-warm hover:shadow-craft transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mr-4">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.craft}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Craft Business?
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Join KalaConnect today and start building your digital presence with AI-powered tools designed for Indian artisans
          </p>
          
          <Link to="/register">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg shadow-elegant">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;