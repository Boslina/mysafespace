import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, HeartHandshake, Globe, AlertCircle } from "lucide-react";

const Resources = () => {
  const navigate = useNavigate();

  const resourceCategories = [
    {
      title: "National Emergency Hotlines",
      icon: Phone,
      color: "bg-destructive/10 text-destructive",
      resources: [
        {
          name: "Nigeria Police Emergency",
          contact: "112 or 767",
          description: "National emergency response for immediate danger"
        },
        {
          name: "Mirabel Centre (Sexual Assault)",
          contact: "08077777732 or 08077757777",
          description: "Free medical and counseling support for sexual assault survivors"
        },
        {
          name: "National Human Rights Commission",
          contact: "08097000001-2 or 07057391849",
          description: "Report human rights violations and abuse"
        },
        {
          name: "Domestic & Sexual Violence Response Team",
          contact: "08137960048 or 08064474307",
          description: "Lagos State support for domestic and sexual violence"
        }
      ]
    },
    {
      title: "Mental Health Support",
      icon: HeartHandshake,
      color: "bg-primary/10 text-primary",
      resources: [
        {
          name: "Mental Health Foundation Nigeria",
          contact: "09090006463 or 07088177272",
          description: "Free mental health support and counseling"
        },
        {
          name: "Mentally Aware Nigeria Initiative",
          contact: "08091116264",
          description: "Mental health awareness and crisis support"
        },
        {
          name: "She Writes Woman",
          contact: "08033476783",
          description: "Women's mental health and emotional support"
        },
        {
          name: "Suicide Research & Prevention Initiative",
          contact: "08062106493 or 09080217555",
          description: "24/7 suicide prevention and crisis intervention"
        }
      ]
    },
    {
      title: "Women's Rights Organizations",
      icon: AlertCircle,
      color: "bg-accent/30 text-accent-foreground",
      resources: [
        {
          name: "Women's Rights and Health Project",
          contact: "08033132182",
          description: "Legal aid and support for women's rights violations"
        },
        {
          name: "Stand To End Rape (STER)",
          contact: "08151103510",
          description: "Support and advocacy for rape survivors"
        },
        {
          name: "Project Alert on Violence Against Women",
          contact: "08077777782 or 01-7741634",
          description: "Support for victims of gender-based violence"
        },
        {
          name: "Women at Risk International Foundation",
          contact: "08023036105",
          description: "Support for women at risk of violence"
        }
      ]
    },
    {
      title: "Additional Support Services",
      icon: Globe,
      color: "bg-secondary/50 text-foreground",
      resources: [
        {
          name: "National Agency for Prohibition of Trafficking",
          contact: "07030000203 or 08077202202",
          description: "Report human trafficking and get support"
        },
        {
          name: "Medical Women Association of Nigeria",
          contact: "08033134277",
          description: "Women's health and medical support"
        },
        {
          name: "International Federation of Women Lawyers",
          contact: "08091100100",
          description: "Free legal aid for women"
        },
        {
          name: "Cece Yara Foundation",
          contact: "08137960048",
          description: "Child protection and family support"
        }
      ]
    }
  ];

  const stateEmergencyNumbers = [
    { state: "Abia", number: "08079210003", location: "Umuahia" },
    { state: "Adamawa", number: "08089671313", location: "Yola" },
    { state: "Akwa Ibom", number: "08020913810", location: "Uyo" },
    { state: "Anambra", number: "07039194332", location: "Awka" },
    { state: "Bauchi", number: "08151849417", location: "Bauchi" },
    { state: "Bayelsa", number: "07019009419", location: "Yenagoa" },
    { state: "Benue", number: "09018356486", location: "Makurdi" },
    { state: "Borno", number: "08068075581", location: "Maiduguri" },
    { state: "Cross River", number: "08133568456", location: "Calabar" },
    { state: "Delta", number: "08036684974", location: "Asaba" },
    { state: "Ebonyi", number: "08131290079", location: "Abakaliki" },
    { state: "Edo", number: "08037646272", location: "Benin City" },
    { state: "Ekiti", number: "09064050086", location: "Ado-Ekiti" },
    { state: "Enugu", number: "08032003702", location: "Enugu" },
    { state: "FCT Abuja", number: "08061581938", location: "Abuja" },
    { state: "Gombe", number: "08150567762", location: "Gombe" },
    { state: "Imo", number: "08034773600", location: "Owerri" },
    { state: "Jigawa", number: "08164008888", location: "Dutse" },
    { state: "Kaduna", number: "08123822284", location: "Kaduna" },
    { state: "Kano", number: "08032419754", location: "Kano" },
    { state: "Katsina", number: "08033222895", location: "Katsina" },
    { state: "Kebbi", number: "08038797644", location: "Birnin Kebbi" },
    { state: "Kogi", number: "08075390511", location: "Lokoja" },
    { state: "Kwara", number: "08125275046", location: "Ilorin" },
    { state: "Lagos", number: "08127155132", location: "Ikeja" },
    { state: "Nasarawa", number: "08123780004", location: "Lafia" },
    { state: "Niger", number: "08081777498", location: "Minna" },
    { state: "Ogun", number: "08081770416", location: "Abeokuta" },
    { state: "Ondo", number: "08079999988", location: "Akure" },
    { state: "Osun", number: "08039537995", location: "Osogbo" },
    { state: "Oyo", number: "08150777888", location: "Ibadan" },
    { state: "Plateau", number: "08126375938", location: "Jos" },
    { state: "Rivers", number: "08138513939", location: "Port Harcourt" },
    { state: "Sokoto", number: "08133901778", location: "Sokoto" },
    { state: "Taraba", number: "08140089863", location: "Jalingo" },
    { state: "Yobe", number: "08151843014", location: "Damaturu" },
    { state: "Zamfara", number: "08106580123", location: "Gusau" }
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
                If you're in immediate danger, call <strong>112</strong> or <strong>767</strong> (Nigeria Police Emergency)
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

          {/* State Emergency Numbers */}
          <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-card mt-8 animate-in fade-in">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-destructive/10 p-3 rounded-xl text-destructive">
                  <Phone className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground">
                  State Emergency Numbers (All 36 States + FCT)
                </h2>
              </div>

              <p className="text-muted-foreground mb-6 text-center">
                Find your state's emergency contact number below 📍
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {stateEmergencyNumbers.map((stateInfo, index) => (
                  <div
                    key={stateInfo.state}
                    className="bg-background/50 rounded-xl p-4 hover:bg-background/70 transition-colors"
                  >
                    <h3 className="font-semibold text-foreground mb-1">
                      {stateInfo.state}
                    </h3>
                    <p className="text-primary font-medium text-lg mb-1">
                      {stateInfo.number}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stateInfo.location}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-secondary/50 rounded-xl p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  💡 Save your state's emergency number in your phone for quick access
                </p>
              </div>
            </div>
          </Card>

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
