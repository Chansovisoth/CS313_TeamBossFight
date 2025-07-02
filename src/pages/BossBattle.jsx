// ===== LIBRARIES ===== //
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sword, Shield, Heart } from "lucide-react";

// ===== COMPONENTS ===== //
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ===== STYLES ===== //
import "../index.css";

const BossBattle = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back to previous page
  };

  const goHome = () => {
    navigate("/"); // Go to home page
  };

  return (
    <main className="flex-grow min-h-screen bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={goBack}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Boss Battle Arena
          </h1>
          <div className="w-16"></div> {/* Spacer for center alignment */}
        </div>

        {/* Main Content */}
        <div className="max-w-md mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Sword className="w-16 h-16 text-white" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                </div>
              </div>
              <CardTitle className="text-white text-xl">
                VITEP BOSS
              </CardTitle>
              <CardDescription className="text-white/80">
                You are about to enter the boss battle arena. Prepare yourself!
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-green-500/20 rounded-lg border border-green-400/30">
                <div className="flex justify-center space-x-4 mb-0">
                  <div className="flex items-center">
                    <Heart className="w-6 h-6 text-red-400 mr-2" />
                    <span className="text-white font-medium">100 HP</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-6 h-6 text-blue-400 mr-2" />
                    <span className="text-white font-medium">50 DEF</span>
                  </div>
                </div>
                {/* <p className="text-green-100 font-medium text-lg mb-2">
                  QR Code Scan Successful!
                </p>
                <p className="text-green-200/80 text-sm">
                  You are now ready to face the boss. Good luck, warrior!
                </p> */}
              </div>

              <div className="text-center p-6 bg-orange-500/20 rounded-lg border border-orange-400/30">
                <Sword className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <p className="text-orange-100 font-medium text-lg mb-2">
                  Boss Battle Coming Soon
                </p>
                <p className="text-orange-200/80 text-sm">
                  Googoogaagaa
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={goHome}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Return Home
                </Button>
                <Button 
                  onClick={goBack}
                  variant="outline"
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default BossBattle;
