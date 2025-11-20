import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Sparkles, Sun } from "lucide-react";

const TalkToMe = () => {
  const navigate = useNavigate();

  const affirmations = [
    "You are stronger than you know 💪",
    "Your feelings are valid and important 💜",
    "You deserve to be treated with respect and kindness",
    "It's okay to take things one day at a time 🌸",
    "You are worthy of love and happiness",
    "Your voice matters and deserves to be heard 🌺",
    "You have the right to set boundaries",
    "You are not alone in this journey",
    "Your wellbeing is a priority, not a luxury 💫",
    "You are doing better than you think"
  ];

  const copingStrategies = [
    {
      title: "Breathe Deeply",
      description: "Take 5 slow, deep breaths. Inhale for 4 counts, hold for 4, exhale for 4. Feel your body relax with each breath. 🌬️"
    },
    {
      title: "Ground Yourself",
      description: "Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. 🌿"
    },
    {
      title: "Move Your Body",
      description: "Gentle movement can help. Try stretching, dancing to your favorite song, or taking a short walk. 🚶‍♀️"
    },
    {
      title: "Connect",
      description: "Reach out to someone you trust. Sometimes just talking helps. You don't have to face things alone. 💬"
    },
    {
      title: "Self-Compassion",
      description: "Talk to yourself like you would to a good friend. Be gentle, understanding, and kind with yourself. 💝"
    }
  ];

  const supportiveMessages = [
    {
      icon: Heart,
      title: "You Matter",
      message: "Your existence makes a difference in this world. You are valuable exactly as you are."
    },
    {
      icon: Sparkles,
      title: "Progress, Not Perfection",
      message: "Every small step forward counts. Celebrate your victories, no matter how small they seem."
    },
    {
      icon: Sun,
      title: "Brighter Days Ahead",
      message: "It might not feel like it now, but things can and will get better. Hold on to hope."
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
              I'm Here For You 💜
            </h1>
            <p className="text-lg text-muted-foreground">
              A safe space for support, encouragement, and self-care
            </p>
          </div>

          {/* Supportive Messages */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {supportiveMessages.map((msg, index) => {
              const IconComponent = msg.icon;
              return (
                <Card
                  key={msg.title}
                  className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-card text-center animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-6">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">
                      {msg.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {msg.message}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Daily Affirmations */}
          <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-card mb-8 animate-in fade-in">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
                Daily Affirmations ✨
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {affirmations.map((affirmation, index) => (
                  <div
                    key={index}
                    className="bg-background/50 rounded-xl p-4 hover:bg-background/70 transition-colors"
                  >
                    <p className="text-foreground text-center">{affirmation}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Coping Strategies */}
          <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-card mb-8 animate-in fade-in">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
                Coping Strategies 🌸
              </h2>
              <div className="space-y-4">
                {copingStrategies.map((strategy, index) => (
                  <div
                    key={index}
                    className="bg-background/50 rounded-xl p-5 hover:bg-background/70 transition-colors"
                  >
                    <h3 className="font-semibold text-foreground text-lg mb-2">
                      {strategy.title}
                    </h3>
                    <p className="text-muted-foreground">{strategy.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Emergency Note */}
          <Card className="bg-accent/20 border-accent/50 shadow-card animate-in fade-in">
            <div className="p-6 text-center">
              <p className="text-lg text-foreground mb-2">
                🌺 If you're in crisis or need immediate support 🌺
              </p>
              <p className="text-muted-foreground mb-4">
                Please reach out to a crisis hotline or trusted person
              </p>
              <Button
                onClick={() => navigate("/resources")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
              >
                View Support Resources
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TalkToMe;
