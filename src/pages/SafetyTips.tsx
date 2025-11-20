import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, AlertTriangle, Heart } from "lucide-react";

const SafetyTips = () => {
  const navigate = useNavigate();

  const safetyCategories = [
    {
      title: "Online Privacy",
      icon: Lock,
      tips: [
        "Use strong, unique passwords for each account 🔒",
        "Enable two-factor authentication wherever possible",
        "Be cautious about sharing personal information online",
        "Review your privacy settings regularly on social media"
      ]
    },
    {
      title: "Digital Safety",
      icon: Shield,
      tips: [
        "Think before you share - once online, always online 📱",
        "Block and report harassment immediately",
        "Keep screenshots of threatening messages",
        "Trust your instincts - if something feels wrong, it probably is"
      ]
    },
    {
      title: "Social Media Safety",
      icon: Eye,
      tips: [
        "Don't accept friend requests from strangers 👥",
        "Be careful about sharing your location",
        "Review tagged photos and posts regularly",
        "Remember: you can unfollow, block, or report anyone"
      ]
    },
    {
      title: "Dealing with Harassment",
      icon: AlertTriangle,
      tips: [
        "You are never to blame for someone else's behavior 💜",
        "Document everything - save messages and screenshots",
        "Reach out to trusted friends, family, or professionals",
        "Report to platform moderators and law enforcement if needed"
      ]
    },
    {
      title: "Self-Care Reminders",
      icon: Heart,
      tips: [
        "Take breaks from social media when needed 🌸",
        "Surround yourself with supportive people",
        "Your mental health matters - seek help when you need it",
        "Remember: you deserve to feel safe and respected"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-secondary/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Main Menu
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-in fade-in slide-in-from-top">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Safety Tips 🛡️
            </h1>
            <p className="text-lg text-muted-foreground">
              Your guide to staying safe online and protecting your wellbeing
            </p>
          </div>

          <div className="space-y-6">
            {safetyCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.title}
                  className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-card animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-primary/10 p-3 rounded-xl">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-semibold text-foreground">
                        {category.title}
                      </h2>
                    </div>

                    <ul className="space-y-3">
                      {category.tips.map((tip, tipIndex) => (
                        <li
                          key={tipIndex}
                          className="flex items-start gap-3 bg-background/50 rounded-xl p-4 hover:bg-background/70 transition-colors"
                        >
                          <span className="text-accent text-xl mt-0.5">•</span>
                          <span className="text-foreground flex-1">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="bg-accent/20 border-accent/50 shadow-card mt-8 animate-in fade-in">
            <div className="p-6 text-center">
              <p className="text-lg text-foreground mb-2">
                💜 Remember: Your safety and wellbeing come first 💜
              </p>
              <p className="text-muted-foreground">
                Never hesitate to reach out for help when you need it
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;
