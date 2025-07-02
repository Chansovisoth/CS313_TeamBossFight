// ===== LIBRARIES ===== //
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Vote, Users, BarChart3, Shield, ChevronRight, ArrowRight, Github, Linkedin, Mail, QrCode } from "lucide-react";
import { startConfettiCelebration } from "@/lib/Confetti";
import { LiquidFloatingElement, LiquidPillElement, LiquidCircleElement } from "@/lib/LiquidParallax";


// ===== COMPONENTS ===== //
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ===== STYLES ===== //
import "../index.css";
import "../landing.css";



const MainLanding = () => {
  const navigate = useNavigate();
  const [logoClicked, setLogoClicked] = useState(false);

  // ===== AUTHENTICATION HANDLERS =====//
  // const handleGetStarted = () => {
  //   navigate("/auth");
  // };

  // =====HANDLERS ===== //
  const handleLearnMore = () => {
    // Scroll to features section or navigate to about page
    document.getElementById("features")?.scrollIntoView({ 
      behavior: "smooth" 
    });
  };

  const handleQRCodeClick = () => {
    navigate("/qr");
  };

  const handleLogoClick = async () => {
    // Trigger bounce animation
    setLogoClicked(true);
    
    // Reset animation after it completes
    setTimeout(() => setLogoClicked(false), 600);
    
    // Trigger confetti celebration
    await startConfettiCelebration({
      origin: { x: 0.5, y: 0.3 }, // Center top area where logo is
      maxBursts: 1,
      burstInterval: 1500,
    });
  };



  // ===== RENDER ===== //
  return (
    <main className="flex-grow">

      {/* Floating QR Code Button */}
      <Button
        onClick={handleQRCodeClick}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 border-0 p-2"
        size="lg"
      >
        <QrCode className="w-full h-full text-white scale-250" />
      </Button>

      {/* ===== HERO SECTION ===== */}
      <section className="landing-hero bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 px-4 sm:px-12 md:px-20 lg:px-20 xl:px-50 2xl:px-80 relative overflow-hidden">
        {/* Liquid Parallax Decorative Elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {/* Large perfect circle */}
          <LiquidCircleElement 
            className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full" 
            intensity={0.8}
            delay={0}
            floatRange={15}
          />
          <LiquidPillElement 
            className="absolute top-40 right-20 w-16 h-4 bg-orange-400 rounded-full transform rotate-12" 
            intensity={1.2}
            delay={200}
            floatRange={12}
          />
          <LiquidPillElement 
            className="absolute bottom-32 left-16 w-24 h-6 bg-pink-400 rounded-full transform -rotate-12" 
            intensity={1.0}
            delay={400}
            floatRange={10}
          />
          <LiquidPillElement 
            className="absolute bottom-20 right-10 w-18 h-5 bg-yellow-300 rounded-full transform rotate-45" 
            intensity={1.1}
            delay={600}
            floatRange={11}
          />
          
          {/* Medium perfect circles */}
          <LiquidCircleElement 
            className="absolute top-32 left-1/4 w-12 h-12 bg-cyan-400 rounded-full" 
            intensity={1.4}
            delay={100}
            floatRange={20}
          />
          <LiquidCircleElement 
            className="absolute top-60 right-1/3 w-8 h-8 bg-green-400 rounded-full" 
            intensity={1.6}
            delay={300}
            floatRange={14}
          />
          <LiquidPillElement 
            className="absolute bottom-40 right-1/4 w-14 h-3 bg-purple-400 rounded-full transform rotate-30" 
            intensity={1.3}
            delay={500}
            floatRange={9}
          />
          
          {/* Small perfect circles */}
          <LiquidCircleElement 
            className="absolute top-16 right-1/2 w-6 h-6 bg-red-400 rounded-full" 
            intensity={2.0}
            delay={700}
            floatRange={25}
          />
          <LiquidCircleElement 
            className="absolute bottom-16 left-1/3 w-10 h-10 bg-indigo-400 rounded-full" 
            intensity={1.3}
            delay={150}
            floatRange={22}
          />
          
          {/* Additional small perfect circles for more dynamic effect */}
          <LiquidCircleElement 
            className="absolute top-72 left-12 w-5 h-5 bg-cyan-400 rounded-full opacity-60" 
            intensity={2.2}
            delay={350}
            floatRange={18}
          />
          <LiquidCircleElement 
            className="absolute bottom-60 right-16 w-7 h-7 bg-orange-400 rounded-full opacity-70" 
            intensity={1.8}
            delay={450}
            floatRange={16}
          />
          <LiquidCircleElement 
            className="absolute top-96 right-12 w-4 h-4 bg-pink-400 rounded-full opacity-50" 
            intensity={2.5}
            delay={550}
            floatRange={20}
          />
          
          {/* Additional beautiful pill-shaped elements for dynamic liquid movement */}
          <LiquidPillElement 
            className="absolute top-72 left-20 w-20 h-4 bg-cyan-300 rounded-full transform -rotate-15" 
            intensity={0.9}
            delay={800}
            floatRange={13}
          />
          <LiquidPillElement 
            className="absolute top-28 left-1/3 w-12 h-3 bg-green-300 rounded-full transform rotate-60" 
            intensity={1.4}
            delay={1000}
            floatRange={8}
          />
          <LiquidPillElement 
            className="absolute bottom-60 right-1/3 w-22 h-5 bg-blue-300 rounded-full transform -rotate-25" 
            intensity={1.1}
            delay={300}
            floatRange={12}
          />
          <LiquidPillElement 
            className="absolute top-16 right-1/4 w-10 h-2 bg-red-300 rounded-full transform rotate-75" 
            intensity={1.5}
            delay={500}
            floatRange={7}
          />
          <LiquidPillElement 
            className="absolute bottom-12 left-1/4 w-16 h-3 bg-indigo-300 rounded-full transform -rotate-40" 
            intensity={1.0}
            delay={700}
            floatRange={10}
          />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8">
            {/* Event Banner Placeholder */}
            <div className="event-banner-container mb-8">
              <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
                  Open House 2025
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium">
                  Interactive Boss Battle Experience
                </p>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready for an Epic Adventure?
            </h2>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              Join forces with other participants and put your knowledge to the test! Answer questions, deal damage, and work together to defeat powerful bosses. Show your skills and compete for glory!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* <Button 
              onClick={handleGetStarted}
              size="lg"
              className=" bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button> */}
            <Button 
              onClick={handleLearnMore}
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300 bg-transparent"
            >
              Join Event <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="py-20 px-4 sm:px-12 md:px-20 lg:px-20 xl:px-50 2xl:px-80 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              How Does It Work?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Three simple steps to join the ultimate team-based boss battle experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="landing-feature text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle className="text-xl mb-2">1. Scan & Join</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Simply scan the QR code displayed at the event to instantly join a boss battle. 
                  No app downloads or complicated setup required!
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="landing-feature text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <CardTitle className="text-xl mb-2">2. Answer & Attack</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Answer multiple-choice questions correctly to deal damage to the boss. 
                  The faster you answer, the more damage you deal to help your team win!
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="landing-feature text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Shield className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <CardTitle className="text-xl mb-2">3. Win & Collect</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Work with your randomly assigned team to defeat bosses and earn exclusive badges. 
                  Compete on leaderboards and become the ultimate boss fighter!
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 px-4 sm:px-12 md:px-20 lg:px-20 xl:px-50 2xl:px-80 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Battle?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Look for the QR codes at the event and scan one to join your first boss battle. 
            Team up, answer questions, and become a legend!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* <Button 
              onClick={handleGetStarted}
              size="lg"
              className=" bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg border-0"
            >
              Create Your First Poll <Vote className="ml-2 w-5 h-5" />
            </Button> */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainLanding;

