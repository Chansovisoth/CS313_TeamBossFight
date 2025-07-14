// ===== LIBRARIES ===== //
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Heart, Timer, Trophy, LogOut, Sun, Moon, Smartphone } from "lucide-react";

// ===== COMPONENTS ===== //
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import BattleLeaderboard from "@/layouts/BossBattleLeaderboard";

// ===== STYLES ===== //
import "@/index.css";

// ===== AUDIO ===== //
import punchSound from "@/assets/Audio/punch1.mp3";
import hurtSound1 from "@/assets/Audio/hurt1.mp3";
import hurtSound2 from "@/assets/Audio/hurt2.mp3";

const BossBattle = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [lives, setLives] = useState(3);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [bossHP, setBossHP] = useState(250);
  const [isDamaged, setIsDamaged] = useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [damageNumbers, setDamageNumbers] = useState([]);
  const maxBossHP = 1000;

  // Sample question data - each question has its own time limit
  const currentQuestion = {
    id: 1,
    category_id: 1,
    question_text: "What does PIU stand for?",
    time_limit: 30, // Individual time limit for this question
    author_id: 1,
    options: [
      "Paragon International University",
      "Programmers in Uniform", 
      "Placeholder In Underway",
      "Pain In Utopia"
    ],
    correctAnswer: "Paragon International University"
  };

  const maxTime = currentQuestion.time_limit; // Use question's specific time limit

  // Audio element for punch sound
  const punchAudio = new Audio(punchSound);
  const hurtAudio1 = new Audio(hurtSound1);
  const hurtAudio2 = new Audio(hurtSound2);

  // Function to play random hurt sound
  const playHurtSound = () => {
    const hurtSounds = [hurtAudio1, hurtAudio2];
    const randomHurtSound = hurtSounds[Math.floor(Math.random() * hurtSounds.length)];
    randomHurtSound.currentTime = 0; // Reset audio to start
    randomHurtSound.play().catch(error => {
      console.log("Hurt audio play failed:", error);
    });
  };

  const goBack = () => {
    navigate("/qr"); // Go to QR page
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    
    // Submit answer immediately
    if (answer === currentQuestion.correctAnswer) {
      // Calculate damage based on response speed
      const timeElapsed = maxTime - timeLeft;
      const fastThreshold = maxTime * 0.33; // First 33% of time (fast)
      const normalThreshold = maxTime * 0.66; // Second 33% of time (normal)
      
      let damageMultiplier;
      if (timeElapsed <= fastThreshold) {
        damageMultiplier = 1.5; // Fast response
      } else if (timeElapsed <= normalThreshold) {
        damageMultiplier = 1.0; // Normal pace
      } else {
        damageMultiplier = 0.5; // Slow response
      }
      
      const baseDamage = 50;
      const totalDamage = Math.round(baseDamage * damageMultiplier);
      
      // Correct answer - damage boss
      setBossHP(prev => Math.max(0, prev - totalDamage));
      setIsDamaged(true);
      
      // Add damage number animation
      const damageId = Date.now() + Math.random();
      setDamageNumbers(prev => [...prev, {
        id: damageId,
        damage: totalDamage,
        x: Math.random() * 60 + 20, // Random position between 20% and 80% from left (more constrained)
        y: Math.random() * 40 + 30 // Random position between 30% and 70% from top (more constrained)
      }]);
      
      // Remove damage number after animation
      setTimeout(() => {
        setDamageNumbers(prev => prev.filter(dmg => dmg.id !== damageId));
      }, 2000);
      
      // Play punch sound effect
      punchAudio.currentTime = 0; // Reset audio to start
      punchAudio.play().catch(error => {
        console.log("Audio play failed:", error);
      });
      
      console.log(`Correct! Boss takes ${totalDamage} damage (${damageMultiplier}x multiplier).`);
      
      // Remove damage effect after animation
      setTimeout(() => {
        setIsDamaged(false);
      }, 500);
    } else {
      // Wrong answer - lose life
      setLives(prev => Math.max(0, prev - 1));
      setIsWrongAnswer(true);
      
      // Play random hurt sound effect
      playHurtSound();
      
      console.log("Wrong! Lost a life.");
      
      // Remove wrong answer effect after animation
      setTimeout(() => {
        setIsWrongAnswer(false);
      }, 500);
    }
    
    // Reset timer and selection after a brief delay to show the selection
    setTimeout(() => {
      setSelectedAnswer("");
      setTimeLeft(currentQuestion.time_limit); // Reset to question's specific time limit
      setQuestionNumber(prev => prev + 1); // Move to next question
    }, 1000);
  };

  const handleLeave = () => {
    navigate("/boss-preview");
  };

  const handleLiveLeaderboard = () => {
    setIsLeaderboardOpen(prev => !prev);
    console.log("Toggling live leaderboard");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    // Toggle dark class on document element
    document.documentElement.classList.toggle('dark');
  };

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // Time's up - lose a life
      setLives(prev => Math.max(0, prev - 1));
      setIsWrongAnswer(true); // Trigger screen shake and red flash
      
      // Play random hurt sound effect
      playHurtSound();
      
      console.log("Time's up! Lost a life.");
      
      // Remove wrong answer effect after animation
      setTimeout(() => {
        setIsWrongAnswer(false);
      }, 500);
      
      // Reset timer for next question
      setTimeLeft(currentQuestion.time_limit); // Reset to question's specific time limit
      setQuestionNumber(prev => prev + 1); // Move to next question
    }
  }, [timeLeft]);

  // Get timer color based on time remaining
  const getTimerColor = () => {
    const timePercentage = (timeLeft / maxTime) * 100;
    if (timePercentage > 66) {
      return "text-green-500"; // Fast zone (green)
    } else if (timePercentage > 33) {
      return "text-yellow-500"; // Normal zone (yellow)
    } else {
      return "text-red-500"; // Slow zone (red)
    }
  };

  return (
    <main className={`h-screen overflow-hidden bg-background relative ${isWrongAnswer ? 'player-shake' : ''} portrait-only`}>
      {/* Landscape Rotation Warning */}
      <div className="landscape-warning fixed inset-0 bg-background z-[100] flex items-center justify-center p-4 md:hidden">
        <div className="text-center">
          <div className="mb-4">
            <Smartphone className="w-16 h-16 mx-auto text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">Rotate Your Device</h2>
          <p className="text-muted-foreground">Please rotate your device to portrait mode to play.</p>
        </div>
      </div>

      {/* Full Screen Wrong Answer Flash */}
      {isWrongAnswer && (
        <div className="absolute inset-0 bg-red-500/60 z-50 animate-pulse"></div>
      )}
      
      <div className="h-full flex flex-col p-3 max-w-md mx-auto relative z-10">
        
        {/* Top Controls */}
        <div className="flex items-center justify-between mb-3 flex-shrink-0 relative">
          <Button onClick={handleLeave} variant="outline" size="sm" className="flex items-center justify-center">
            <LogOut className="w-4 h-4 rotate-180" />
          </Button>
          
          {/* Boss Name - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h2 className="text-lg font-bold">CS Boss</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <Button onClick={toggleDarkMode} variant="outline" size="sm" className="flex items-center justify-center">
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button onClick={handleLiveLeaderboard} variant="outline" size="sm" className="flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Boss Health Section */}
        <div className="mb-3 flex-shrink-0">
          {/* Boss Image with Overlay */}
          <div className="relative">
            <div className={`aspect-square bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg overflow-hidden border-2 border-slate-600 transition-all duration-500 ${
              isDamaged ? 'bg-red-500/50 shake' : ''
            }`}>
              <img 
                src="/src/assets/Placeholder/Falcon.png" 
                alt="CS Boss" 
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isDamaged ? 'opacity-70' : ''
                }`}
              />
              
              {/* Damage Flash Overlay */}
              {isDamaged && (
                <div className="absolute inset-0 bg-red-500/40 animate-pulse"></div>
              )}
              
              {/* Damage Numbers */}
              {damageNumbers.map((dmg) => (
                <div
                  key={dmg.id}
                  className="absolute text-red-500 font-bold text-4xl pointer-events-none z-20 animate-pulse"
                  style={{
                    left: `${dmg.x}%`,
                    top: `${dmg.y}%`,
                    transform: 'translate(-50%, -50%)',
                    animation: 'damage-float 2s ease-out forwards',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                  }}
                >
                  -{dmg.damage}
                </div>
              ))}
              
              {/* Boss Info Overlay */}
              <div className="absolute top-3 left-0 right-0 z-10">
                <div className="px-3">
                  <div className="relative">
                    <Progress value={(bossHP / maxBossHP) * 100} className="h-6 [&>div]:bg-red-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-white drop-shadow-lg">{bossHP}/{maxBossHP} HP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Section */}
        <Card className="flex-1 flex flex-col min-h-0">
          {/* Player Lives */}
          <div className="flex justify-start gap-1 px-3 pt-0 -mb-2">
            {[...Array(3)].map((_, index) => (
              <Heart 
                key={index}
                className={`w-6 h-6 ${index < lives ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
              />
            ))}
          </div>
          
          <CardContent className="px-3 pt-0 flex flex-col h-full">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <Badge variant="outline" className="text-xs">
                {questionNumber}. {currentQuestion.question_text}
              </Badge>
              <div className={`flex items-center gap-1 ${getTimerColor()}`}>
                <Timer className="w-4 h-4" />
                <span className="text-sm font-mono">{timeLeft}s</span>
              </div>
            </div>
            
            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-2 flex-1 min-h-0 -mb-3">
              {currentQuestion.options.map((option, index) => {
                // Kahoot-style colors for each option - works in both light and dark mode
                const colors = [
                  "!bg-red-500 hover:!bg-red-600 !text-white !border-red-500", // Option A - Red
                  "!bg-blue-500 hover:!bg-blue-600 !text-white !border-blue-500", // Option B - Blue  
                  "!bg-yellow-500 hover:!bg-yellow-600 !text-white !border-yellow-500", // Option C - Yellow
                  "!bg-green-500 hover:!bg-green-600 !text-white !border-green-500" // Option D - Green
                ];
                
                const selectedColors = [
                  "!bg-red-700 !text-white !border-red-700", // Selected Red
                  "!bg-blue-700 !text-white !border-blue-700", // Selected Blue
                  "!bg-yellow-700 !text-white !border-yellow-700", // Selected Yellow  
                  "!bg-green-700 !text-white !border-green-700" // Selected Green
                ];

                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full p-2 h-full text-center whitespace-normal font-medium transition-all text-sm ${
                      selectedAnswer === option 
                        ? selectedColors[index]
                        : colors[index]
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    {option}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Battle Leaderboard */}
      <BattleLeaderboard 
        isOpen={isLeaderboardOpen} 
        onClose={() => setIsLeaderboardOpen(false)} 
      />
    </main>
  );
};

export default BossBattle;
