import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PeriodTracker = () => {
  const navigate = useNavigate();
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [results, setResults] = useState<{
    nextPeriod: string;
    fertileStart: string;
    fertileEnd: string;
  } | null>(null);

  const calculateCycle = () => {
    if (!lastPeriodDate) return;

    const parts = lastPeriodDate.split("/");
    if (parts.length !== 3) return;

    const [day, month, year] = parts.map(p => parseInt(p));
    const lastPeriod = new Date(year, month - 1, day);

    // Calculate next period (28 days)
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + 28);

    // Calculate fertile window (days 10-17 of cycle)
    const fertileStart = new Date(lastPeriod);
    fertileStart.setDate(fertileStart.getDate() + 10);

    const fertileEnd = new Date(lastPeriod);
    fertileEnd.setDate(fertileEnd.getDate() + 17);

    setResults({
      nextPeriod: nextPeriod.toLocaleDateString("en-GB"),
      fertileStart: fertileStart.toLocaleDateString("en-GB"),
      fertileEnd: fertileEnd.toLocaleDateString("en-GB")
    });
  };

  const resetTracker = () => {
    setLastPeriodDate("");
    setResults(null);
  };

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

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-in fade-in slide-in-from-top">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Period Tracker 🌸
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your cycle and stay informed about your body 💜
            </p>
          </div>

          <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-soft animate-in fade-in slide-in-from-bottom">
            <div className="p-8">
              {!results ? (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="lastPeriod" className="text-lg mb-2 block">
                      When did your last period start?
                    </Label>
                    <Input
                      id="lastPeriod"
                      type="text"
                      placeholder="DD/MM/YYYY"
                      value={lastPeriodDate}
                      onChange={(e) => setLastPeriodDate(e.target.value)}
                      className="text-lg p-6 rounded-2xl border-2 focus:border-primary"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Format: Day/Month/Year (e.g., 15/01/2024)
                    </p>
                  </div>

                  <Button
                    onClick={calculateCycle}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-lg p-6"
                    size="lg"
                  >
                    Calculate My Cycle 🌺
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in">
                  <div className="bg-secondary/50 rounded-2xl p-6 space-y-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold text-foreground mb-4">
                        Your Cycle Information 💜
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-background/50 rounded-xl p-4">
                        <p className="text-sm text-muted-foreground mb-1">Next Period Expected</p>
                        <p className="text-xl font-semibold text-foreground">{results.nextPeriod} 🌸</p>
                      </div>

                      <div className="bg-background/50 rounded-xl p-4">
                        <p className="text-sm text-muted-foreground mb-1">Fertile Window</p>
                        <p className="text-xl font-semibold text-foreground">
                          {results.fertileStart} - {results.fertileEnd} 🌺
                        </p>
                      </div>
                    </div>

                    <div className="bg-accent/20 rounded-xl p-4 mt-4">
                      <p className="text-center text-foreground">
                        Take care of yourself! 💜
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={resetTracker}
                    variant="outline"
                    className="w-full rounded-full text-lg p-6 border-2"
                    size="lg"
                  >
                    Update My Cycle
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>💡 Note: This tracker uses a 28-day cycle as a general estimate.</p>
            <p>Everyone's cycle is unique - consult with a healthcare provider for personalized advice.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodTracker;
