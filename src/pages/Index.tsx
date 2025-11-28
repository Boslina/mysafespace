import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Phone, MessageCircle, Calendar, Scan, Info } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const navCards = [
    {
      title: "AI Screenshot Analyzer",
      icon: Scan,
      path: "/analyzer",
      description: "Detect and assess online threats with AI analysis",
      featured: true
    },
    {
      title: "Period Tracker",
      icon: Calendar,
      path: "/period-tracker",
      description: "Track your menstrual cycle privately and securely"
    },
    {
      title: "Safety Tips",
      icon: Shield,
      path: "/safety-tips",
      description: "Learn essential online and offline safety practices"
    },
    {
      title: "Resources",
      icon: Phone,
      path: "/resources",
      description: "Access emergency contacts and support services"
    },
    {
      title: "Talk to Me",
      icon: MessageCircle,
      path: "/talk",
      description: "Find supportive messages and coping strategies"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            SafeSpace TFGBV
          </h1>
          <p className="text-2xl text-foreground max-w-3xl mx-auto">
            AI-Powered Platform to Detect, Report & Prevent Tech-Facilitated Gender-Based Violence
          </p>
          <p className="text-muted-foreground">
            Supporting the UN Women 16 Days of Activism Campaign
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/about')}
              variant="outline"
            >
              <Info className="mr-2 h-4 w-4" />
              Learn More
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate('/analyzer')}
              className="bg-gradient-hero"
            >
              <Scan className="mr-2 h-4 w-4" />
              Analyze Evidence
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {navCards.map((card) => (
            <Card
              key={card.path}
              className={`cursor-pointer hover:shadow-elevated transition-all duration-300 hover:scale-105 ${
                card.featured ? 'md:col-span-2 lg:col-span-1 bg-gradient-card' : ''
              }`}
              onClick={() => navigate(card.path)}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${
                    card.featured ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                  }`}>
                    <card.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {card.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Banner */}
        <Card className="shadow-elevated bg-gradient-accent text-white">
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">You Are Not Alone</h2>
            <p className="text-lg mb-4 opacity-90">
              If you're experiencing online violence, immediate help is available
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="secondary"
                size="lg"
                onClick={() => navigate('/resources')}
                className="bg-white text-primary hover:bg-white/90"
              >
                <Phone className="mr-2 h-4 w-4" />
                Emergency Contacts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
