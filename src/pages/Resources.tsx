import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, HeartHandshake, Globe, AlertCircle } from "lucide-react";

const Resources = () => {
  const navigate = useNavigate();

  const resourceCategories = [
    {
      title: "Emergency Hotlines",
      icon: Phone,
      color: "bg-destructive/10 text-destructive",
      resources: [
        {
          name: "National Domestic Violence Hotline",
          contact: "1-800-799-7233",
          description: "24/7 confidential support for domestic violence survivors"
        },
        {
          name: "National Sexual Assault Hotline",
          contact: "1-800-656-4673",
          description: "Free, confidential support 24/7"
        },
        {
          name: "Crisis Text Line",
          contact: "Text HOME to 741741",
          description: "Free, 24/7 crisis support via text"
        }
      ]
    },
    {
      title: "Mental Health Support",
      icon: HeartHandshake,
      color: "bg-primary/10 text-primary",
      resources: [
        {
          name: "National Suicide Prevention Lifeline",
          contact: "1-800-273-8255",
          description: "24/7 emotional support and crisis intervention"
        },
        {
          name: "SAMHSA National Helpline",
          contact: "1-800-662-4357",
          description: "Treatment referral and information service"
        },
        {
          name: "BetterHelp",
          contact: "www.betterhelp.com",
          description: "Online therapy and counseling services"
        }
      ]
    },
    {
      title: "Online Harassment Reporting",
      icon: AlertCircle,
      color: "bg-accent/30 text-accent-foreground",
      resources: [
        {
          name: "Cyber Civil Rights Initiative",
          contact: "www.cybercivilrights.org",
          description: "Support for online harassment victims"
        },
        {
          name: "Report to Platform",
          contact: "Use in-app reporting tools",
          description: "Most social platforms have abuse reporting features"
        },
        {
          name: "FBI Internet Crime Complaint Center",
          contact: "www.ic3.gov",
          description: "Report internet-facilitated crimes"
        }
      ]
    },
    {
      title: "Additional Resources",
      icon: Globe,
      color: "bg-secondary/50 text-foreground",
      resources: [
        {
          name: "RAINN",
          contact: "www.rainn.org",
          description: "Nation's largest anti-sexual violence organization"
        },
        {
          name: "The Trevor Project",
          contact: "1-866-488-7386",
          description: "Crisis intervention for LGBTQ+ youth"
        },
        {
          name: "Love Is Respect",
          contact: "Text LOVEIS to 22522",
          description: "Support for dating abuse and unhealthy relationships"
        }
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
              Resources 📞
            </h1>
            <p className="text-lg text-muted-foreground">
              Help is always available - you're never alone 💜
            </p>
          </div>

          <Card className="bg-destructive/10 border-destructive/30 shadow-card mb-8 animate-in fade-in">
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                🚨 In Case of Emergency
              </h3>
              <p className="text-foreground mb-4">
                If you're in immediate danger, call 911 or your local emergency services
              </p>
              <p className="text-sm text-muted-foreground">
                Your safety is the top priority
              </p>
            </div>
          </Card>

          <div className="space-y-6">
            {resourceCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.title}
                  className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-card animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-3 rounded-xl ${category.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h2 className="text-2xl font-semibold text-foreground">
                        {category.title}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {category.resources.map((resource, resIndex) => (
                        <div
                          key={resIndex}
                          className="bg-background/50 rounded-xl p-5 hover:bg-background/70 transition-colors"
                        >
                          <h3 className="font-semibold text-foreground text-lg mb-2">
                            {resource.name}
                          </h3>
                          <p className="text-primary font-medium mb-2">
                            {resource.contact}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {resource.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="bg-accent/20 border-accent/50 shadow-card mt-8 animate-in fade-in">
            <div className="p-6 text-center">
              <p className="text-lg text-foreground mb-2">
                🌸 Remember: Asking for help is a sign of strength, not weakness 🌸
              </p>
              <p className="text-muted-foreground">
                You deserve support, care, and respect
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Resources;
