// ===== LIBRARIES ===== //
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Vote, Users, BarChart3, Shield, ChevronRight, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { startConfettiCelebration } from "@/lib/Confetti";
import { LiquidFloatingElement, LiquidPillElement, LiquidCircleElement } from "@/lib/LiquidParallax";

// ===== COMPONENTS ===== //
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";

// ===== STYLES ===== //
import "@/index.css";
import "@/home.css";



const About = () => {
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

      {/* ===== HERO SECTION ===== */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-4 min-h-64">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Project</h1>
            <p className="text-xl opacity-90 mb-6">
              This project was developed as part of our Software Engineering course (CS 313). 
              Each team member contributed their unique skills to create a comprehensive polling platform 
              that combines modern frontend technologies, robust backend architecture, and intuitive user experience design.
            </p>
          </div>
        </div>
      </div>

      {/* ===== TEAM SECTION ===== */}
      <section id="about" className="py-20 px-4 sm:px-12 md:px-20 lg:px-20 xl:px-50 2xl:px-80 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
        <div className="max-w-6xl mx-auto">

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet our Team</h1>
            <p className="text-xl opacity-90 mb-6">
              Meet the talented individuals who brought <b>UniRaid</b> to life through their dedication and expertise.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {/* First row - 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              <Card className="landing-feature text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <img 
                    src="/src/assets/About_Chansovisoth.jpg" 
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
                    src="/src/assets/About_Chanreach.jpg" 
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
                    src="/src/assets/About_Rithy.jpg" 
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
                    src="/src/assets/About_Sodavith.jpg" 
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
                    src="/src/assets/About_Sovitep.jpg" 
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
        </div>
      </section>

    </main>
  );
};

export default About;

