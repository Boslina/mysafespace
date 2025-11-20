import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const navCards = [
    {
      title: "Get Safety Tips",
      icon: "🛡️",
      path: "/safety-tips",
      description: "Learn how to stay safe online"
    },
    {
      title: "Access Resources",
      icon: "📞",
      path: "/resources",
      description: "Hotlines and support links"
    },
    {
      title: "Talk to Me",
      icon: "💬",
      path: "/talk",
      description: "Get support and affirmations"
    },
    {
      title: "Track My Period",
      icon: "🌸",
      path: "/period-tracker",
      description: "Monitor your cycle"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-in fade-in slide-in-from-top duration-700">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            SafeSpace 💜
          </h1>
          <div className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft">
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              Hi there! 💜 I'm SafeSpace, your friendly guide to staying safe online and supporting your wellbeing. How can I help you today?
            </p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {navCards.map((card, index) => (
            <Card
              key={card.path}
              className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-card hover:shadow-soft transition-all duration-300 hover:scale-105 cursor-pointer animate-in fade-in slide-in-from-bottom"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate(card.path)}
            >
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">{card.icon}</div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  {card.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {card.description}
                </p>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-300"
                  size="lg"
                >
                  Open
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12 animate-in fade-in duration-1000" style={{ animationDelay: "500ms" }}>
          <p className="text-muted-foreground">
            Remember: You are strong, you are worthy, and you deserve support 🌺
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
