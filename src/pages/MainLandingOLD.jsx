// ===== LIBRARIES ===== //
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Vote, Users, BarChart3, Shield, ChevronRight, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { startConfettiCelebration } from "@/lib/Confetti";
import { LiquidFloatingElement, LiquidPillElement, LiquidCircleElement } from "@/lib/LiquidParallax";


// ===== COMPONENTS ===== //
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

// ===== STYLES ===== //
import "../index.css";
import "../landing.css";



const MainLanding = () => {
  const navigate = useNavigate();
  const [logoClicked, setLogoClicked] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);

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

      {/* ===== DEMO SLIDER ===== */}
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md my-8">
        <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">Demo Slider</h3>
        <Slider 
          value={sliderValue} 
          max={100} 
          step={5}
          onValueChange={setSliderValue}
          className="mb-4"
        />
        <p className="text-center text-gray-600 mt-4">Value: {sliderValue[0]}</p>
      </div>

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
            {/* Logo Section - Fox only */}
            <div className="logo-container flex items-center justify-center min-w-0 mb-6">
              <img
                className={`logo-image ${logoClicked ? 'animate-bounce-click' : ''}`}
                src="/Fox.png"
                alt="Ballot Pilot"
                onClick={handleLogoClick}
                style={{ cursor: 'pointer' }}
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Welcome to <span className="logo-title">Team Boss Fight</span>
            </h2>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              The modern polling platform that makes creating, sharing, and analyzing polls effortless. 
              Get real-time insights and engage your audience like never before.
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
              Learn More <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="py-20 px-4 sm:px-12 md:px-20 lg:px-20 xl:px-50 2xl:px-80 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Choose BallotPilot?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to make polling simple, secure, and insightful.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="landing-feature text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle className="text-xl mb-2">Easy Poll Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Create beautiful, engaging polls in minutes with our intuitive interface. 
                  Multiple question types and customization options available.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="landing-feature text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <CardTitle className="text-xl mb-2">Real-time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Watch your results come in live with detailed analytics and beautiful 
                  visualizations. Export data for further analysis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="landing-feature text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Shield className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <CardTitle className="text-xl mb-2">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Your data is protected with enterprise-grade security. 
                  Anonymous voting options and privacy controls included.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="py-20 px-4 sm:px-12 md:px-20 lg:px-20 xl:px-50 2xl:px-80 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              About Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Meet the talented individuals who brought BallotPilot to life through their dedication and expertise.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {/* First row - 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              <Card className="landing-feature text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <img 
                    src="/About_Chansovisoth.jpg" 
                    alt="Chansovisoth Wattanak"
                    className="profile-image mx-auto mb-4"
                  />
                  <CardTitle className="text-lg mb-1">Chansovisoth Wattanak</CardTitle>
                  <CardDescription className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                    Frontend Developer
                  </CardDescription>
                  <div className="flex justify-center gap-3">
                    <a href="https://github.com/Chansovisoth" className="social-link text-gray-600 hover:text-blue-600 transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href="https://www.linkedin.com/in/Chansovisoth" className="social-link text-gray-600 hover:text-blue-600 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="https://mail.google.com/mail/u/0/?fs=1&to=cwattanak@paragoniu.edu.kh&tf=cm" className="social-link text-gray-600 hover:text-blue-600 transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </CardHeader>
              </Card>

              <Card className="landing-feature text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <img 
                    src="/About_Chanreach.jpg" 
                    alt="Chanreach Try"
                    className="profile-image mx-auto mb-4"
                  />
                  <CardTitle className="text-lg mb-1">Chanreach Try</CardTitle>
                  <CardDescription className="text-green-600 dark:text-green-400 font-semibold mb-3">
                    Backend Developer
                  </CardDescription>
                  <div className="flex justify-center gap-3">
                    <a href="https://github.com/ChanreachTry" className="social-link text-gray-600 hover:text-green-600 transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                    {/* <a href="#" className="social-link text-gray-600 hover:text-green-600 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a> */}
                    <a href="https://mail.google.com/mail/u/0/?fs=1&to=ctry1@paragoniu.edu.kh&tf=cm" className="social-link text-gray-600 hover:text-green-600 transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </CardHeader>
              </Card>

              <Card className="landing-feature text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <img 
                    src="/About_Rithy.jpg" 
                    alt="Rithy Chan"
                    className="profile-image mx-auto mb-4"
                  />
                  <CardTitle className="text-lg mb-1">Rithy Chan</CardTitle>
                  <CardDescription className="text-purple-600 dark:text-purple-400 font-semibold mb-3">
                    Backend Developer
                  </CardDescription>
                  <div className="flex justify-center gap-3">
                    <a href="https://github.com/Rithy404" className="social-link text-gray-600 hover:text-purple-600 transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href="https://www.linkedin.com/in/rithy-chan-67314033b/" className="social-link text-gray-600 hover:text-purple-600 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="https://mail.google.com/mail/u/0/?fs=1&to=rchan2@paragoniu.edu.kh&tf=cm" className="social-link text-gray-600 hover:text-purple-600 transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Second row - 2 cards centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl mx-auto">
              <Card className="landing-feature text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <img 
                    src="/About_Sodavith.jpg" 
                    alt="Sodavith Nuon"
                    className="profile-image mx-auto mb-4"
                  />
                  <CardTitle className="text-lg mb-1">Sodavith Nuon</CardTitle>
                  <CardDescription className="text-orange-600 dark:text-orange-400 font-semibold mb-3">
                    UI/UX Designer
                  </CardDescription>
                  <div className="flex justify-center gap-3">
                    <a href="https://github.com/SodavithNuon" className="social-link text-gray-600 hover:text-orange-600 transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                    {/* <a href="#" className="social-link text-gray-600 hover:text-orange-600 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a> */}
                    <a href="https://mail.google.com/mail/u/0/?fs=1&to=snuon@paragoniu.edu.kh&tf=cm" className="social-link text-gray-600 hover:text-orange-600 transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </CardHeader>
              </Card>

              <Card className="landing-feature text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <img 
                    src="/About_Sovitep.jpg" 
                    alt="Sovitep Chea"
                    className="profile-image mx-auto mb-4"
                  />
                  <CardTitle className="text-lg mb-1">Sovitep Chea</CardTitle>
                  <CardDescription className="text-cyan-600 dark:text-cyan-400 font-semibold mb-3">
                    UI/UX Designer
                  </CardDescription>
                  <div className="flex justify-center gap-3">
                    <a href="https://github.com/Sovitep" className="social-link text-gray-600 hover:text-cyan-600 transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                    {/* <a href="#" className="social-link text-gray-600 hover:text-cyan-600 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a> */}
                    <a href="https://mail.google.com/mail/u/0/?fs=1&to=schea8@paragoniu.edu.kh&tf=cm" className="social-link text-gray-600 hover:text-cyan-600 transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              This project was developed as part of our Advanced Database course (CS 394). 
              Each team member contributed their unique skills to create a comprehensive polling platform 
              that combines modern frontend technologies, robust backend architecture, and intuitive user experience design.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 px-4 sm:px-12 md:px-20 lg:px-20 xl:px-50 2xl:px-80 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Start Polling?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust BallotPilot for their polling needs. 
            Create your first poll today and see the difference.
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

