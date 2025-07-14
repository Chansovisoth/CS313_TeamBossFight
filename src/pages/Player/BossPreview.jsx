// ===== LIBRARIES ===== //
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, X } from "lucide-react";

// ===== COMPONENTS ===== //
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ===== STYLES ===== //
import "@/index.css";

const BossPreview = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [playersOnline, setPlayersOnline] = useState(0);

  const goBack = () => {
    navigate("/qr"); // Go to QR page
  };

  const handleJoin = () => {
    if (nickname.trim()) {
      setIsJoined(true);
      setPlayersOnline(prev => prev + 1);
      console.log("Joining with nickname:", nickname);
      // Handle join logic here
    }
  };

  const handleUnjoin = () => {
    setIsJoined(false);
    setPlayersOnline(prev => Math.max(0, prev - 1));
    console.log("Unjoining from battle");
    // Handle unjoin logic here
  };

  return (
    <main className="flex-grow min-h-screen">
      <div className="container mx-auto p-3 sm:p-6 max-w-4xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button onClick={goBack} variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="mx-auto">
              <h1 className="text-2xl sm:text-3xl font-bold text-center">Boss Battle</h1>
              <p className="text-muted-foreground text-center">Join the battle and defeat the boss</p>
            </div>
          </div>
        </div>

        <div className="max-w-sm mx-auto">
          <Card className="overflow-hidden">
          {/* Boss Name Header */}
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold">
              CS BOSS
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4 px-6 pb-6">
            {/* Boss Image */}
            <div className="relative">
              <div className="w-full aspect-square bg-muted rounded-lg overflow-hidden">
                <img 
                  src="/src/assets/Swords.png" 
                  alt="CS Boss" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Players Online */}
            <div className="text-center py-2">
              <div className="flex items-center justify-center text-muted-foreground text-sm">
                <Users className="w-4 h-4 mr-2" />
                <span>Players online: {playersOnline}</span>
              </div>
            </div>

            {/* Join/Waiting Button */}
            {!isJoined ? (
              <Button 
                onClick={handleJoin}
                className="w-full"
                disabled={!nickname.trim()}
              >
                Join
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  className="flex-1"
                  disabled
                  variant="secondary"
                >
                  Waiting for 1 more player
                </Button>
                <Button
                  onClick={handleUnjoin}
                  variant="outline"
                  size="icon"
                  className="flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Nickname Input */}
            <div className="space-y-2">
              <Label htmlFor="nickname" className="text-sm">
                Nickname:
              </Label>
              <Input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your nickname"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </main>
  );
};

export default BossPreview;
