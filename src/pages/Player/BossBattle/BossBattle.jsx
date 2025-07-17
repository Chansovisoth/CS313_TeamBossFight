// BossBattle.jsx - Updated with WebSocket integration and Temp.jsx UI
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Heart, Timer, Trophy, LogOut, Sun, Moon, Smartphone, Ambulance, Skull, Wifi, WifiOff, AlertTriangle } from "lucide-react";

// WebSocket integration
import { useBossBattleContext } from "@/hooks/useBossBattle";

// Components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import BattleLeaderboard from "@/layouts/BossBattleLeaderboard";

// Styles
import "@/index.css";

// Audio imports
import punchSound from "@/assets/Audio/punch1.mp3";
import hurtSound1 from "@/assets/Audio/hurt1.mp3";
import hurtSound2 from "@/assets/Audio/hurt2.mp3";
import heartbeatsSound from "@/assets/Audio/heartbeats.mp3";

const BossBattle = () => {
  const navigate = useNavigate();
  
  // WebSocket context
  const {
    isConnected,
    connectionStatus,
    gameState,
    playerId: currentPlayerId,
    submitAnswer,
    requestQuestion,
    dealBossDamage,
    playerKnockedOut,
    revivePlayer,
    leaveGame,
    error: wsError
  } = useBossBattleContext();

  // ===== TIMING CONFIGURATION ===== //
  const BOSS_DEFEAT_MESSAGE_DELAY_MS = 1000;
  const BOSS_DEFEAT_COUNTDOWN_DELAY_MS = 1000;
  const BOSS_DEFEAT_COUNTDOWN_DURATION_SECONDS = 5;
  
  // ===== BOSS CONFIGURATION (from WebSocket) ===== //
  const bossDataFromBackend = gameState.bossData || {
    id: "boss_001",
    name: "CS Boss",
    image: "/src/assets/Placeholder/Falcon.png",
    description: "A challenging computer science boss battle",
    cooldown_duration: 300,
    number_of_teams: 4,
    creator_id: "admin_001",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  const BOSS_NAME = bossDataFromBackend.name;
  const BOSS_IMAGE_URL = bossDataFromBackend.image;
  const BOSS_MAX_HEALTH = gameState.maxBossHealth || 10;
  
  // ===== SYNCHRONIZED GAME STATE (from WebSocket) ===== //
  const bossCurrentHealth = gameState.bossHealth || BOSS_MAX_HEALTH;
  const connectedPlayers = gameState.connectedPlayers || [];
  const knockedOutPlayers = gameState.knockedOutPlayers || [];
  const liveLeaderboard = gameState.leaderboard || [];
  const teams = gameState.teams || [];
  const maxRevivesPerPlayer = gameState.maxRevivesPerPlayer || 1;
  const syncedTimeRemaining = gameState.questionTimeRemaining || 30; // Synced across all players
  const currentQuestionData = gameState.currentQuestion; // Current question from WebSocket
  const questionProgress = gameState.questionProgress || { current: 1, total: 5 };
  const gameStatus = gameState.gameStatus || 'waiting';
  
  // ===== LOCAL GAME STATE ===== //
  const [playerSelectedAnswer, setPlayerSelectedAnswer] = useState("");
  const [playerLivesRemaining, setPlayerLivesRemaining] = useState(3);

  // Use synced time from WebSocket, fallback to local timer
  const [questionTimeRemaining, setQuestionTimeRemaining] = useState(syncedTimeRemaining);
  
  // ===== UI ANIMATION STATES ===== //
  const [isBossTakingDamage, setIsBossTakingDamage] = useState(false);
  const [isPlayerHurt, setIsPlayerHurt] = useState(false);
  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [damageNumbersArray, setDamageNumbersArray] = useState([]);
  
  // ===== BOSS DEFEAT STATES ===== //
  const [isBossDefeatMessageVisible, setIsBossDefeatMessageVisible] = useState(false);
  const [isBossDefeatCountdownVisible, setIsBossDefeatCountdownVisible] = useState(false);
  const [bossDefeatCountdownNumber, setBossDefeatCountdownNumber] = useState(3);
  
  // ===== PLAYER REVIVAL SYSTEM ===== //
  const [isCurrentPlayerKnockedOut, setIsCurrentPlayerKnockedOut] = useState(false);
  const [isCurrentPlayerDead, setIsCurrentPlayerDead] = useState(false);
  const [currentPlayerRevivalCode, setCurrentPlayerRevivalCode] = useState("");
  const [currentPlayerRevivalTimeLeft, setCurrentPlayerRevivalTimeLeft] = useState(60);
  const [isRevivalDialogVisible, setIsRevivalDialogVisible] = useState(false);
  const [revivalOtpInput, setRevivalOtpInput] = useState("");

  // ===== QUESTION DATA (from WebSocket) ===== //
  const questionMaxTimeSeconds = currentQuestionData?.timeLimitSeconds || 30;

  // Audio refs
  const punchAudioRef = useRef(null);
  const hurtAudio1Ref = useRef(null);
  const hurtAudio2Ref = useRef(null);
  const heartbeatsAudioRef = useRef(null);

  // ===== REQUEST QUESTION WHEN NEEDED ===== //
  const lastQuestionRequestTime = useRef(0);
  useEffect(() => {
    const currentTime = Date.now();
    
    if (isConnected && 
        gameState.gameStatus === 'active' && 
        !gameState.currentQuestion &&
        currentTime - lastQuestionRequestTime.current > 1000) { // Throttle to once per second
      console.log('Requesting current question from server...');
      requestQuestion();
      lastQuestionRequestTime.current = currentTime;
    }
  }, [isConnected, gameState.gameStatus, gameState.currentQuestion, requestQuestion]);

  // ===== SYNC TIME WITH WEBSOCKET ===== //
  useEffect(() => {
    if (syncedTimeRemaining !== undefined) {
      setQuestionTimeRemaining(syncedTimeRemaining);
    }
  }, [syncedTimeRemaining]);

  // Initialize audio objects
  useEffect(() => {
    punchAudioRef.current = new Audio(punchSound);
    hurtAudio1Ref.current = new Audio(hurtSound1);
    hurtAudio2Ref.current = new Audio(hurtSound2);
    heartbeatsAudioRef.current = new Audio(heartbeatsSound);
    
    punchAudioRef.current.volume = 0.2;
    hurtAudio1Ref.current.volume = 0.1;
    hurtAudio2Ref.current.volume = 0.1;
    heartbeatsAudioRef.current.volume = 0.4;

    return () => {
      try {
        if (punchAudioRef.current) {
          punchAudioRef.current.pause();
          punchAudioRef.current = null;
        }
        if (hurtAudio1Ref.current) {
          hurtAudio1Ref.current.pause();
          hurtAudio1Ref.current = null;
        }
        if (hurtAudio2Ref.current) {
          hurtAudio2Ref.current.pause();
          hurtAudio2Ref.current = null;
        }
        if (heartbeatsAudioRef.current) {
          heartbeatsAudioRef.current.pause();
          heartbeatsAudioRef.current.currentTime = 0;
          heartbeatsAudioRef.current.loop = false;
          heartbeatsAudioRef.current = null;
        }
      } catch (error) {
        console.log("Error during audio cleanup:", error);
      }
    };
  }, []);

  // Function to play random hurt sound
  const playHurtSound = () => {
    const hurtSounds = [hurtAudio1Ref.current, hurtAudio2Ref.current];
    const randomHurtSound = hurtSounds[Math.floor(Math.random() * hurtSounds.length)];
    if (randomHurtSound) {
      randomHurtSound.currentTime = 0;
      randomHurtSound.play().catch(error => {
        console.log("Hurt audio play failed:", error);
      });
    }
  };

  // Remove unused goBack function

  // Updated answer selection with WebSocket integration
  const handleAnswerSelect = (answerText) => {
    if (isCurrentPlayerKnockedOut || isCurrentPlayerDead || bossCurrentHealth === 0 || !currentQuestionData) {
      return;
    }

    setPlayerSelectedAnswer(answerText);

    // Calculate response time
    const timeElapsed = questionMaxTimeSeconds - questionTimeRemaining;
    
    // Submit answer via WebSocket
    submitAnswer(currentQuestionData.questionId, answerText, timeElapsed);

    if (answerText === currentQuestionData.correctAnswerText) {
      // Calculate damage based on response speed
      const fastResponseThreshold = questionMaxTimeSeconds * 0.33;
      const normalResponseThreshold = questionMaxTimeSeconds * 0.66;

      let damageAmount;
      if (timeElapsed <= fastResponseThreshold) {
        damageAmount = 1.5;
      } else if (timeElapsed <= normalResponseThreshold) {
        damageAmount = 1.0;
      } else {
        damageAmount = 0.5;
      }

      // Send damage to boss via WebSocket
      dealBossDamage(damageAmount, currentQuestionData.questionId);
      
      // Local UI feedback
      setIsBossTakingDamage(true);

      // Add damage number animation
      const damageAnimationId = Date.now() + Math.random();
      setDamageNumbersArray(prev => [...prev, {
        id: damageAnimationId,
        damage: damageAmount,
        x: Math.random() * 60 + 20,
        y: Math.random() * 40 + 30
      }]);

      setTimeout(() => {
        setDamageNumbersArray(prev => prev.filter(dmg => dmg.id !== damageAnimationId));
      }, 2000);

      // Play punch sound
      if (punchAudioRef.current) {
        punchAudioRef.current.currentTime = 0;
        punchAudioRef.current.play().catch(error => {
          console.log("Punch audio play failed:", error);
        });
      }

      setTimeout(() => {
        setIsBossTakingDamage(false);
      }, 500);

      console.log(`Correct! Boss takes ${damageAmount} damage.`);

    } else {
      // Wrong answer - player takes damage
      const newLives = Math.max(0, playerLivesRemaining - 1);
      setPlayerLivesRemaining(newLives);
      setIsPlayerHurt(true);
      playHurtSound();

      setTimeout(() => {
        setIsPlayerHurt(false);
      }, 1000);

      // If player has no lives left, handle knockout
      if (newLives === 0) {
        handlePlayerKnockout();
      }

      console.log("Wrong! Lost a life.");
    }

    // Reset selection after delay
    setTimeout(() => {
      setPlayerSelectedAnswer("");
    }, 2000);
  };

  const handleLeave = () => {
    leaveGame();
    navigate("/qr");
  };

  const handleLiveLeaderboard = () => {
    setIsLeaderboardVisible(!isLeaderboardVisible);
  };

  const toggleDarkMode = () => {
    setIsDarkModeEnabled(!isDarkModeEnabled);
    document.documentElement.classList.toggle('dark');
  };

  // ===== REVIVAL SYSTEM FUNCTIONS ===== //
  const generatePlayerRevivalCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handlePlayerKnockout = useCallback(() => {
    if (isCurrentPlayerKnockedOut || isCurrentPlayerDead) return;

    const revivalCode = generatePlayerRevivalCode();
    setCurrentPlayerRevivalCode(revivalCode);
    setIsCurrentPlayerKnockedOut(true);
    setCurrentPlayerRevivalTimeLeft(60);

    // Send knockout message via WebSocket
    playerKnockedOut(revivalCode);

    // Start heartbeats sound
    if (heartbeatsAudioRef.current) {
      heartbeatsAudioRef.current.loop = true;
      heartbeatsAudioRef.current.play().catch(error => {
        console.log("Heartbeats audio play failed:", error);
      });
    }

    console.log(`Player knocked out! Revival code: ${revivalCode}`);
  }, [isCurrentPlayerKnockedOut, isCurrentPlayerDead, playerKnockedOut]);

  const handleRevivalCodeSubmission = (inputCode) => {
    // Find knocked out player with matching code
    const targetPlayer = knockedOutPlayers.find(player => player.revivalCode === inputCode);
    
    if (targetPlayer) {
      // Send revival message via WebSocket
      revivePlayer(targetPlayer.id, inputCode);
      setIsRevivalDialogVisible(false);
      console.log(`Successfully revived player with code: ${inputCode}`);
    } else {
      console.log(`Invalid revival code: ${inputCode}`);
    }

    // If this player was knocked out and the code matches, revive them
    if (currentPlayerRevivalCode === inputCode) {
      setIsCurrentPlayerKnockedOut(false);
      setIsCurrentPlayerDead(false);
      setPlayerLivesRemaining(3);
      setCurrentPlayerRevivalCode("");
      setCurrentPlayerRevivalTimeLeft(60);
      
      // Stop heartbeats sound when revived
      if (heartbeatsAudioRef.current) {
        heartbeatsAudioRef.current.pause();
        heartbeatsAudioRef.current.currentTime = 0;
        heartbeatsAudioRef.current.loop = false;
      }
      
      console.log("Player revived!");
    }
  };

  // Handle OTP completion
  const handleRevivalOtpComplete = (otpValue) => {
    setRevivalOtpInput(otpValue);
    handleRevivalCodeSubmission(otpValue);
  };

  // Simulate multiple teammates getting knocked out (for testing)
  const simulateMultiplePlayerKnockouts = () => {
    const mockKnockedOutPlayers = [
      {
        id: "player_456",
        name: "John Doe",
        revivalCode: generatePlayerRevivalCode(),
        timeLeftSeconds: 45
      },
      {
        id: "player_789",
        name: "Jane Smith",
        revivalCode: generatePlayerRevivalCode(),
        timeLeftSeconds: 30
      },
      {
        id: "player_012",
        name: "Bob Johnson",
        revivalCode: generatePlayerRevivalCode(),
        timeLeftSeconds: 15
      }
    ];
    
    // This would normally come from WebSocket updates
    console.log("Simulated knocked out players:", mockKnockedOutPlayers);
  };

  // Timer countdown effect (but prefer synced time from WebSocket)
  useEffect(() => {
    // Don't run local timer if we have synced time from WebSocket
    if (syncedTimeRemaining !== undefined) {
      return;
    }

    // Don't run timer if player is knocked out, dead, boss is defeated, or no question data
    if (isCurrentPlayerKnockedOut || isCurrentPlayerDead || bossCurrentHealth === 0 || !currentQuestionData) {
      return;
    }

    if (questionTimeRemaining > 0) {
      const timer = setTimeout(() => {
        setQuestionTimeRemaining(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // Time's up - lose a life
      const newLivesCount = Math.max(0, playerLivesRemaining - 1);
      setPlayerLivesRemaining(newLivesCount);
      setIsPlayerHurt(true);

      // Check if player is knocked out
      if (newLivesCount === 0) {
        handlePlayerKnockout();
      }

      // Play random hurt sound effect
      playHurtSound();

      console.log("Time's up! Lost a life.");

      // Remove wrong answer effect after animation
      setTimeout(() => {
        setIsPlayerHurt(false);
      }, 500);

      // Reset timer for next question
      setQuestionTimeRemaining(currentQuestionData?.timeLimitSeconds || 30);
    }
  }, [questionTimeRemaining, isCurrentPlayerKnockedOut, isCurrentPlayerDead, bossCurrentHealth, syncedTimeRemaining, playerLivesRemaining, handlePlayerKnockout, currentQuestionData]);

  // Revive timer countdown effect for knocked out current player
  useEffect(() => {
    if (isCurrentPlayerKnockedOut && !isCurrentPlayerDead && currentPlayerRevivalTimeLeft > 0) {
      const timer = setTimeout(() => {
        setCurrentPlayerRevivalTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCurrentPlayerKnockedOut, isCurrentPlayerDead, currentPlayerRevivalTimeLeft]);

  // Effect to handle when current player revival time expires
  useEffect(() => {
    if (isCurrentPlayerKnockedOut && currentPlayerRevivalTimeLeft === 0) {
      setIsCurrentPlayerDead(true);
      setIsCurrentPlayerKnockedOut(false);
      
      // Stop heartbeats sound
      if (heartbeatsAudioRef.current) {
        heartbeatsAudioRef.current.pause();
        heartbeatsAudioRef.current.currentTime = 0;
        heartbeatsAudioRef.current.loop = false;
      }

      // Trigger hurt animation and sound when player dies
      setIsPlayerHurt(true);
      playHurtSound();
      
      // Remove hurt animation after effect
      setTimeout(() => {
        setIsPlayerHurt(false);
      }, 500);
      
      console.log("Revival time expired - player is dead! Heartbeats stopped.");
    }
  }, [isCurrentPlayerKnockedOut, currentPlayerRevivalTimeLeft]);

  // Effect to handle player knockout when lives reach 0
  useEffect(() => {
    if (playerLivesRemaining === 0 && !isCurrentPlayerKnockedOut) {
      handlePlayerKnockout();
    }
  }, [playerLivesRemaining, isCurrentPlayerKnockedOut, handlePlayerKnockout]);

  // Effect to handle boss defeat sequence
  useEffect(() => {
    if (bossCurrentHealth === 0) {
      // Show defeat message after configurable delay
      const defeatMessageTimer = setTimeout(() => {
        setIsBossDefeatMessageVisible(true);
      }, BOSS_DEFEAT_MESSAGE_DELAY_MS);

      // Show countdown after configurable delay
      const countdownTimer = setTimeout(() => {
        setIsBossDefeatCountdownVisible(true);
        
        // Start countdown from configurable duration
        let countdownSeconds = BOSS_DEFEAT_COUNTDOWN_DURATION_SECONDS;
        setBossDefeatCountdownNumber(countdownSeconds);
        
        const countdownInterval = setInterval(() => {
          countdownSeconds--;
          if (countdownSeconds > 0) {
            setBossDefeatCountdownNumber(countdownSeconds);
          } else {
            clearInterval(countdownInterval);
            setIsBossDefeatCountdownVisible(false);
            setIsBossDefeatMessageVisible(false);
            console.log("Boss defeated! Going to podium...");
            navigate("/boss-podium");
          }
        }, 1000);
      }, BOSS_DEFEAT_COUNTDOWN_DELAY_MS);

      return () => {
        clearTimeout(defeatMessageTimer);
        clearTimeout(countdownTimer);
      };
    }
  }, [bossCurrentHealth, navigate, BOSS_DEFEAT_MESSAGE_DELAY_MS, BOSS_DEFEAT_COUNTDOWN_DELAY_MS, BOSS_DEFEAT_COUNTDOWN_DURATION_SECONDS]);

  // Get timer color based on time remaining
  const getTimerColor = () => {
    const timePercentage = (questionTimeRemaining / questionMaxTimeSeconds) * 100;
    if (timePercentage > 66) {
      return "text-green-500";
    } else if (timePercentage > 33) {
      return "text-yellow-500";
    } else {
      return "text-red-500";
    }
  };

  // Cleanup effect to stop heartbeats sound when component unmounts
  useEffect(() => {
    return () => {
      try {
        if (heartbeatsAudioRef.current) {
          heartbeatsAudioRef.current.pause();
          heartbeatsAudioRef.current.currentTime = 0;
          heartbeatsAudioRef.current.loop = false;
          console.log("Heartbeats stopped - component cleanup");
        }
      } catch (error) {
        console.log("Error stopping heartbeats audio during cleanup:", error);
      }
    };
  }, []);

  // Effect to stop heartbeats sound when player becomes dead
  useEffect(() => {
    if (isCurrentPlayerDead) {
      try {
        if (heartbeatsAudioRef.current) {
          heartbeatsAudioRef.current.pause();
          heartbeatsAudioRef.current.currentTime = 0;
          heartbeatsAudioRef.current.loop = false;
          console.log("Heartbeats stopped - player is dead");
        }
      } catch (error) {
        console.log("Error stopping heartbeats audio when player died:", error);
      }
    }
  }, [isCurrentPlayerDead]);

  // Get connection status icon and tooltip
  const getConnectionStatus = () => {
    if (!isConnected) {
      return {
        icon: <WifiOff className="w-4 h-4 text-red-500" />,
        tooltip: `Disconnected: ${wsError || 'Connection lost'}`
      };
    }
    
    if (connectionStatus.includes('Reconnecting')) {
      return {
        icon: <AlertTriangle className="w-4 h-4 text-yellow-500 animate-pulse" />,
        tooltip: connectionStatus
      };
    }
    
    return {
      icon: <Wifi className="w-4 h-4 text-green-500" />,
      tooltip: `Connected: ${connectedPlayers.length} players online`
    };
  };

  const connectionInfo = getConnectionStatus();

  // ===== RENDER ===== //
  return (
    <TooltipProvider>
      <main className={`h-screen overflow-hidden bg-background relative ${isPlayerHurt ? 'player-shake' : ''} portrait-only`}>
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
        {isPlayerHurt && (
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
              <h2 className="text-lg font-bold">{BOSS_NAME}</h2>
            </div>

            <div className="flex items-center gap-2">
              {/* Connection Status */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center w-8 h-8">
                    {connectionInfo.icon}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{connectionInfo.tooltip}</p>
                </TooltipContent>
              </Tooltip>

              <Button onClick={toggleDarkMode} variant="outline" size="sm" className="flex items-center justify-center">
                {isDarkModeEnabled ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
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
              <div className={`aspect-square bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg overflow-hidden border-2 border-slate-600 transition-all duration-500 ${isBossTakingDamage ? 'bg-red-500/50 shake' : ''}`}>
                <img
                  src={BOSS_IMAGE_URL}
                  alt={BOSS_NAME}
                  className={`w-full h-full object-cover transition-all duration-500 ${isBossTakingDamage ? 'opacity-70' : ''} ${bossCurrentHealth === 0 ? 'grayscale brightness-50 blur-sm' : ''}`}
                />

                {/* Damage Flash Overlay */}
                {isBossTakingDamage && (
                  <div className="absolute inset-0 bg-red-500/40 animate-pulse"></div>
                )}

                {/* Damage Numbers */}
                {damageNumbersArray.map((dmg) => (
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
                      <Progress value={(bossCurrentHealth / BOSS_MAX_HEALTH) * 100} className="h-6 [&>div]:bg-red-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-white drop-shadow-lg">{bossCurrentHealth}/{BOSS_MAX_HEALTH} HP</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Boss Defeat Message */}
                {isBossDefeatMessageVisible && (
                  <div className="absolute inset-0 flex items-center justify-center z-30 animate-fade-in">
                    <div className="text-center bg-black/80 p-4 rounded-lg">
                      <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-2 flex items-center justify-center gap-2">
                        <Skull className="w-6 h-6" />
                        {BOSS_NAME} has been defeated!
                      </h2>
                      {/* Show countdown under defeat message */}
                      {isBossDefeatCountdownVisible && (
                        <div className="text-center animate-fade-in">
                          <h3 className="text-lg text-white py-2">
                            Redirecting to Podium
                          </h3>
                          <div className="text-3xl font-bold text-white">
                            {bossDefeatCountdownNumber}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Live Leaderboard Section */}
          {liveLeaderboard.length > 0 && (
            <div className="bg-card border rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  Live Rankings
                </h3>
                <Button
                  onClick={() => setIsLeaderboardVisible(true)}
                  variant="ghost"
                  size="sm"
                  className="text-xs px-2 py-1 h-6"
                >
                  View All
                </Button>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {liveLeaderboard.slice(0, 5).map((player) => {
                  const isCurrentPlayer = player.playerId === currentPlayerId;
                  return (
                    <div 
                      key={player.playerId} 
                      className={`flex items-center justify-between text-xs p-2 rounded transition-colors ${
                        isCurrentPlayer ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className={`font-bold ${isCurrentPlayer ? 'text-primary' : ''}`}>
                          #{player.rank}
                        </span>
                        <span className={`truncate ${isCurrentPlayer ? 'font-bold text-primary' : ''}`}>
                          {player.username || player.playerId}
                        </span>
                        {player.isKnockedOut && <span className="text-red-500 text-[10px]">(KO)</span>}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={`font-bold ${isCurrentPlayer ? 'text-primary' : ''}`}>
                          {player.score} pts
                        </div>
                        <div className="text-muted-foreground text-[10px]">
                          {(player.totalDamage || 0).toFixed(1)} dmg
                        </div>
                      </div>
                    </div>
                  );
                })}
                {liveLeaderboard.length > 5 && (
                  <div className="text-center text-xs text-muted-foreground py-1">
                    +{liveLeaderboard.length - 5} more players
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Team Information */}
          {teams.length > 0 && (
            <div className="bg-card border rounded-lg p-3 mb-3">
              <h3 className="font-bold text-sm flex items-center gap-1 mb-2">
                <Users className="w-4 h-4" />
                Your Team
              </h3>
              {(() => {
                const currentPlayerTeam = teams.find(team => 
                  team.members.some(member => member.playerId === currentPlayerId)
                );
                
                if (!currentPlayerTeam) {
                  return (
                    <div className="text-xs text-muted-foreground">
                      Not assigned to a team yet
                    </div>
                  );
                }

                return (
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-primary">
                      {currentPlayerTeam.name}
                    </div>
                    <div className="space-y-1">
                      {currentPlayerTeam.members.map((member) => {
                        const isCurrentPlayer = member.playerId === currentPlayerId;
                        const isKnockedOut = knockedOutPlayers.some(ko => ko.playerId === member.playerId);
                        return (
                          <div 
                            key={member.playerId}
                            className={`flex items-center justify-between text-xs p-1.5 rounded ${
                              isCurrentPlayer ? 'bg-primary/10' : 'bg-muted/30'
                            }`}
                          >
                            <span className={`${isCurrentPlayer ? 'font-bold text-primary' : ''}`}>
                              {member.username || member.playerId}
                              {isCurrentPlayer && ' (You)'}
                            </span>
                            {isKnockedOut && (
                              <span className="text-red-500 text-[10px]">KO</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Question Section */}
          <Card className="flex-1 flex flex-col min-h-0">
            {/* Player Lives or Hearts */}
            <div className="flex justify-between items-center px-3 pt-0 -mt-2 -mb-5 h-8">
              {/* Hearts on the left */}
              <div className="flex gap-1">
                {[...Array(3)].map((_, index) => (
                  <Heart 
                    key={index}
                    className={`w-6 h-6 ${index < playerLivesRemaining ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              
              {/* Right side - Revive section and Timer */}
              <div className="flex items-center gap-2">
                {/* Revive section - show when any teammates are knocked out */}
                {knockedOutPlayers.length > 0 && !isCurrentPlayerKnockedOut && (
                  <>
                    <span className="text-xs font-bold text-muted-foreground">
                      {knockedOutPlayers.length} Player{knockedOutPlayers.length > 1 ? 's' : ''} Down
                    </span>
                    {/* Revive button */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-9 h-9 p-0 flex items-center justify-center text-green-500 border-background-500 border-3 hover:bg-green-500 hover:text-white rounded-full animate-pulse"
                      onClick={() => {
                        setIsRevivalDialogVisible(true);
                      }}
                    >
                      <Ambulance className="text-lg font-bold" />
                    </Button>
                  </>
                )}
                
                {/* Test button to simulate multiple knockouts (for development) */}
                {knockedOutPlayers.length === 0 && !isCurrentPlayerKnockedOut && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs text-muted-foreground"
                    onClick={simulateMultiplePlayerKnockouts}
                  >
                    Test Multi KO
                  </Button>
                )}
                
                {/* Circular Timer */}
                <div className="relative flex items-center justify-center w-9 h-9 p-0">
                  <svg className="w-12 h-12 transform rotate-0" viewBox="0 0 36 36">
                    {/* Background circle */}
                    <path
                      className="stroke-current text-muted-foreground/20"
                      fill="none"
                      strokeWidth="3"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  {/* Progress circle */}
                  <path
                    className={`stroke-current transition-all duration-200 ${getTimerColor()}`}
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: '100, 100',
                      strokeDashoffset: 100 - (questionTimeRemaining / questionMaxTimeSeconds) * 100
                    }}
                    d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                {/* Timer text in center */}
                <div className={`absolute inset-0 flex items-center justify-center ${getTimerColor()}`}>
                  <span className="text-xs font-mono font-bold">{questionTimeRemaining}</span>
                </div>
              </div>
              </div>
            </div>

            <CardContent className="px-3 pt-0 flex flex-col h-full">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-3 flex-shrink-0 pt-1">
                <Badge variant="outline" className="text-xs">
                  Question {questionProgress.current} of {questionProgress.total}
                </Badge>
                <div className="text-xs text-gray-500">
                  {currentQuestionData?.questionText || "Loading question..."}
                </div>
              </div>

              {/* Answer Options */}
              <div className="grid grid-cols-2 gap-2 flex-1 min-h-0 -mb-3">
                {currentQuestionData?.answerOptions?.length > 0 ? (
                  currentQuestionData.answerOptions.map((option, index) => {
                    const colors = [
                      "!bg-red-500 hover:!bg-red-600 !text-white !border-red-500", // Option A - Red
                      "!bg-purple-500 hover:!bg-purple-600 !text-white !border-purple-500", // Option B - Purple  
                      "!bg-yellow-500 hover:!bg-yellow-600 !text-white !border-yellow-500", // Option C - Yellow
                    "!bg-blue-500 hover:!bg-blue-600 !text-white !border-blue-500" // Option D - Blue
                  ];

                  const selectedColors = [
                    "!bg-red-700 !text-white !border-red-700", // Selected Red
                    "!bg-purple-700 !text-white !border-purple-700", // Selected Purple
                    "!bg-yellow-700 !text-white !border-yellow-700", // Selected Yellow  
                    "!bg-blue-700 !text-white !border-blue-700" // Selected Blue
                  ];

                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={`w-full p-2 h-full text-center whitespace-normal font-medium transition-all text-sm halftone-texture ${playerSelectedAnswer === option
                          ? selectedColors[index]
                          : colors[index]
                        }`}
                      onClick={() => handleAnswerSelect(option)}
                    >
                      {option}
                    </Button>
                  );
                  })
                ) : (
                  <div className="col-span-2 text-center text-gray-500">
                    {gameState.gameStatus === 'waiting' ? 'Waiting for game to start...' : 'Loading answer options...'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Battle Leaderboard */}
        <BattleLeaderboard
          isOpen={isLeaderboardVisible}
          onClose={() => setIsLeaderboardVisible(false)}
          leaderboard={liveLeaderboard}
          teams={teams}
        />

        {/* Game End Leaderboard */}
        {gameStatus === 'completed' && (
          <AlertDialog open={true}>
            <AlertDialogContent className="max-w-md mx-auto">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center text-xl font-bold">
                  🏆 Game Complete! 🏆
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  Boss defeated! Final results:
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="max-h-60 overflow-y-auto">
                {liveLeaderboard.map((player) => (
                  <div key={player.playerId} className="flex items-center justify-between p-2 border-b">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">#{player.rank}</span>
                      <span>{player.username}</span>
                      {player.isKnockedOut && <span className="text-red-500">(KO)</span>}
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{player.score} pts</div>
                      <div className="text-sm text-gray-500">{player.totalDamage.toFixed(1)} dmg</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleLeave} className="flex-1">
                  Leave Game
                </Button>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {/* Revival Interface for Knocked Out Players */}
        {knockedOutPlayers.length > 0 && !isCurrentPlayerKnockedOut && !isCurrentPlayerDead && (
          <div className="fixed bottom-4 right-4 bg-card border rounded-lg p-3 shadow-lg max-w-xs">
            <h3 className="font-bold text-sm mb-2">📞 Teammates Need Help</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {knockedOutPlayers.map((knockedPlayer) => (
                <div key={knockedPlayer.playerId} className="text-xs bg-muted p-2 rounded">
                  <div className="font-medium">{knockedPlayer.playerId}</div>
                  <div className="text-muted-foreground">
                    Code: <span className="font-mono font-bold">{knockedPlayer.revivalCode}</span>
                  </div>
                  <div className="text-muted-foreground">
                    Time: {knockedPlayer.timeRemaining}s
                  </div>
                </div>
              ))}
            </div>
            <Button 
              size="sm" 
              className="w-full mt-2" 
              onClick={() => setIsRevivalDialogVisible(true)}
            >
              Enter Revival Code
            </Button>
          </div>
        )}

        {/* Revival Code Input Dialog */}
        <AlertDialog open={isRevivalDialogVisible} onOpenChange={setIsRevivalDialogVisible}>
          <AlertDialogContent className="max-w-sm mx-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center flex items-center justify-center gap-2">
                <span>Enter Revival Code</span>
                <Ambulance className="w-5 h-5" />
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Enter the 6-character revival code from your teammate
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col items-center space-y-4 py-4">
              <InputOTP
                maxLength={6}
                value={revivalOtpInput}
                inputMode="text"
                onChange={(value) => {
                  setRevivalOtpInput(value);
                  if (value.length === 6) {
                    handleRevivalOtpComplete(value);
                  }
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                -
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <div className="text-xs text-muted-foreground">
                Max {maxRevivesPerPlayer} revival(s) per player
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsRevivalDialogVisible(false);
                    setRevivalOtpInput("");
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleRevivalOtpComplete(revivalOtpInput)}
                  disabled={revivalOtpInput.length !== 6}
                >
                  Revive
                </Button>
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>

        {/* Knocked Out Alert Dialog */}
        <AlertDialog open={isCurrentPlayerKnockedOut || isCurrentPlayerDead}>
          <AlertDialogContent className="max-w-sm mx-auto">
            <AlertDialogHeader>
              {isCurrentPlayerDead ? (
                // Dead state - show death message
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Skull className="w-8 h-8 text-foreground" />
                    <AlertDialogTitle className="text-center text-foreground text-xl font-bold">
                      You are Dead
                    </AlertDialogTitle>
                  </div>
                  
                  <AlertDialogDescription className="text-center text-muted-foreground text-base">
                    What kills you makes you stronger.
                  </AlertDialogDescription>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={() => navigate("/boss-preview")}
                      variant="outline"
                      className="w-full"
                    >
                      <LogOut className="w-8 h-8 text-foreground rotate-180" />
                      Leave
                    </Button>
                  </div>
                </div>
              ) : (
                // Knocked out state - show revival interface
                <div className="text-center space-y-4">
                  {/* Timer at the top */}
                  <div className="text-4xl font-bold text-foreground">
                    <Heart 
                      className="w-8 h-8 text-red-500 fill-red-500 mb-4 mx-auto heartbeat"
                    />
                    {currentPlayerRevivalTimeLeft}s
                  </div>
                  
                  {/* Main message */}
                  <AlertDialogTitle className="text-center text-foreground text-lg font-semibold">
                    You are down!
                  </AlertDialogTitle>
                  
                  {/* Instructions */}
                  <AlertDialogDescription className="text-center text-muted-foreground">
                    Show this code to a teammate to get revived!
                  </AlertDialogDescription>
                  
                  {/* Revival code */}
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <span className="text-2xl font-mono font-bold text-foreground tracking-wider">
                      {currentPlayerRevivalCode.slice(0, 3)}-{currentPlayerRevivalCode.slice(3)}
                    </span>
                  </div>
                </div>
              )}
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>

        {/* OTP Input Dialog for Revival Code */}
        <AlertDialog open={isRevivalDialogVisible} onOpenChange={setIsRevivalDialogVisible}>
          <AlertDialogContent className="max-w-sm mx-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center flex items-center justify-center gap-2">
                <span>Enter Revival Code</span>
                <Ambulance className="w-5 h-5" />
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Enter the 6-character revival code from your teammate
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col items-center space-y-4 py-4">
              <InputOTP
                maxLength={6}
                value={revivalOtpInput}
                inputMode="text"
                onChange={(value) => {
                  setRevivalOtpInput(value);
                  if (value.length === 6) {
                    handleRevivalOtpComplete(value);
                  }
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                -
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsRevivalDialogVisible(false);
                    setRevivalOtpInput("");
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleRevivalOtpComplete(revivalOtpInput)}
                  disabled={revivalOtpInput.length !== 6}
                >
                  Revive
                </Button>
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>

        {/* Answer Grid Overlay - Disable interactions when knocked out or dead */}
        {(isCurrentPlayerKnockedOut || isCurrentPlayerDead) && (
          <div className="absolute inset-0 bg-black/50 z-40 flex items-center justify-center">
            <div className="text-white text-center">
              {isCurrentPlayerDead ? (
                <>
                  <p className="text-lg font-bold mb-2">Game Over</p>
                  <p className="text-sm opacity-75">You are permanently out of this round</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold mb-2">Waiting for Revival...</p>
                  <p className="text-sm opacity-75">Share your code: {currentPlayerRevivalCode}</p>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </TooltipProvider>
  );
};

export default BossBattle;
