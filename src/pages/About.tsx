import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, AlertTriangle, Heart, Users, ArrowLeft } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const problems = [
    {
      icon: AlertTriangle,
      title: 'Cyberstalking',
      description: 'Persistent online harassment and surveillance'
    },
    {
      icon: AlertTriangle,
      title: 'Revenge Porn',
      description: 'Non-consensual intimate image sharing'
    },
    {
      icon: AlertTriangle,
      title: 'Online Harassment',
      description: 'Targeted abuse on social media platforms'
    },
    {
      icon: AlertTriangle,
      title: 'Deepfake Imagery',
      description: 'Manipulated sexual content and impersonation'
    },
    {
      icon: AlertTriangle,
      title: 'Financial Coercion',
      description: 'Scams targeting vulnerable women'
    },
    {
      icon: AlertTriangle,
      title: 'Violent Threats',
      description: 'Direct threats of physical harm'
    }
  ];

  const solutions = [
    {
      icon: Shield,
      title: 'AI Screenshot Analyzer',
      description: 'Upload evidence for instant TFGBV risk assessment and recommended actions',
      color: 'text-primary'
    },
    {
      icon: Users,
      title: 'Digital Literacy Hub',
      description: 'Learn to detect online abuse, secure devices, and identify scams',
      color: 'text-accent'
    },
    {
      icon: Heart,
      title: '24/7 Support Chatbot',
      description: 'Trauma-sensitive AI providing crisis guidance and safety planning',
      color: 'text-primary'
    },
    {
      icon: Shield,
      title: 'Evidence Locker',
      description: 'Encrypted, timestamped storage for court-ready digital evidence',
      color: 'text-accent'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            SafeSpace TFGBV
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            An AI-Powered Platform to Detect, Report & Prevent Tech-Facilitated Gender-Based Violence
          </p>
          <p className="text-sm text-muted-foreground">
            Supporting the UN Women 16 Days of Activism Campaign
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 shadow-elevated bg-gradient-card">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              SafeSpace TFGBV is dedicated to empowering women and girls across Africa with cutting-edge 
              technology to combat online violence. We provide safe, confidential tools to detect, document, 
              and report tech-facilitated gender-based violence, while offering comprehensive support and 
              education to build digital resilience.
            </p>
          </CardContent>
        </Card>

        {/* The Problem */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">The Problem</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Women and girls in Nigeria and across Africa face increasing tech-facilitated gender-based violence
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-shadow">
                <CardContent className="p-6">
                  <problem.icon className="h-8 w-8 text-destructive mb-4" />
                  <h3 className="font-semibold mb-2">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Solutions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="shadow-elevated hover:shadow-elevated transition-all hover:scale-105">
                <CardContent className="p-8">
                  <solution.icon className={`h-12 w-12 ${solution.color} mb-4`} />
                  <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
                  <p className="text-muted-foreground">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="shadow-elevated bg-gradient-accent text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Take Action Now</h2>
            <p className="text-lg mb-8 opacity-90">
              If you're experiencing online violence, you're not alone. Get help immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/analyzer')}
                className="bg-white text-primary hover:bg-white/90"
              >
                Analyze Evidence
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/resources')}
                className="border-white text-white hover:bg-white/10"
              >
                Get Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;