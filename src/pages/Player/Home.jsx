"use client"

// ===== LIBRARIES ===== //
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Users, ChevronRight, ArrowRight, QrCode, Sparkles, Zap, Trophy, Target, Swords, Badge as BadgeIcon } from "lucide-react"
import { startConfettiCelebration } from "@/lib/Confetti"

// ===== COMPONENTS ===== //
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EventCarousel from "@/layouts/EventCarousel"

// ===== STYLES ===== //
import "@/index.css"
import "@/home.css"

const Home = () => {
  const navigate = useNavigate()
  const [logoClicked, setLogoClicked] = useState(false)

  // ===== HANDLERS ===== //
  const handleLearnMore = () => {
    document.getElementById("features")?.scrollIntoView({
      behavior: "smooth",
    })
  }

  const handleQRCodeClick = () => {
    navigate("/qr")
  }

  const handleLogoClick = async () => {
    setLogoClicked(true)
    setTimeout(() => setLogoClicked(false), 600)

    await startConfettiCelebration({
      origin: { x: 0.5, y: 0.3 },
      maxBursts: 1,
      burstInterval: 1500,
    })
  }

  // ===== RENDER ===== //
  return (
    <main className="flex-grow">
      {/* Floating QR Code Button */}
      <Button
        onClick={handleQRCodeClick}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-2xl p-2 sm:p-3"
        size="lg"
      >
        <QrCode className="w-full h-full scale-250 text-white" />
      </Button>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen text-white overflow-hidden py-8 purple-gradient">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48">
          <div className="max-w-6xl mx-auto text-center w-full">

            {/* Main Hero Content */}
            <div className="mb-8 sm:mb-12">
              {/* Swords Image */}
              <div className="mb-0 sm:mb-0 flex justify-center">
                <img 
                  src="/src/assets/Swords.png" 
                  alt="Crossed Swords" 
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain drop-shadow-lg"
                />
              </div>
              <h1 className="hero-text-gradient text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-0 hero-text-gradient leading-tight">
                UniRAID
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-purple-200 max-w-4xl mx-auto leading-normal px-2">
                Answer questions, deal damage, claim victory!
              </p>
            </div>

            {/* Event Carousel */}
            <div className="mb-8 sm:mb-12">
              <EventCarousel />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-2">
              <Button
                onClick={handleQRCodeClick}
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 group"
              >
                <QrCode className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Scan to Join Battle
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>

              <Button
                onClick={handleLearnMore}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300 rounded-xl backdrop-blur-sm group bg-transparent"
              >
                Learn More
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto px-2">
              <div className="text-center p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold mb-1">50</div>
                <div className="text-xs sm:text-sm text-purple-200">Battles Fought</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold mb-1">3</div>
                <div className="text-xs sm:text-sm text-purple-200">Epic Bosses</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold mb-1">123</div>
                <div className="text-xs sm:text-sm text-purple-200">Unique Players</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-white/70 rotate-90" />
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section
        id="features"
        className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <Badge className="mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm">
              <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              How It Works
            </Badge>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white px-2">
              3 Steps to
              <span className="pb-3 block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Victory
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Join the ultimate team-based boss battle experience with our simple, yet thrilling three-step process that
              gets you into the action instantly.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Feature 1 */}
            <Card className="group relative overflow-hidden border-2 border-blue-200 dark:border-blue-700 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10 text-center pt-10 sm:pt-12 px-6 sm:px-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <QrCode className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <Badge className="mb-3 sm:mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm mx-auto inline-block">Step 1</Badge>
                <CardTitle className="text-xl sm:text-2xl mb-0 sm:mb-0 text-gray-900 dark:text-white">Scan & Join</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 px-6 sm:px-8 pb-6">
                <CardDescription className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  Simply scan the QR code displayed at the event to instantly join a boss battle. No app downloads or
                  complicated setup required!
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="group relative overflow-hidden border-2 border-purple-200 dark:border-purple-700 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10 text-center pt-10 sm:pt-12 px-6 sm:px-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Swords className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <Badge className="mb-3 sm:mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-sm mx-auto inline-block">
                  Step 2
                </Badge>
                <CardTitle className="text-xl sm:text-2xl mb-0 sm:mb-0 text-gray-900 dark:text-white">Answer & Attack</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 px-6 sm:px-8 pb-6">
                <CardDescription className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  Answer multiple-choice questions correctly to deal damage to the boss. The faster you answer, the more
                  damage you deal to help your team win!
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="group relative overflow-hidden border-2 border-green-200 dark:border-green-700 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10 text-center pt-10 sm:pt-12 px-6 sm:px-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BadgeIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <Badge className="mb-3 sm:mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm mx-auto inline-block">Step 3</Badge>
                <CardTitle className="text-xl sm:text-2xl mb-0 sm:mb-0 text-gray-900 dark:text-white">Win & Collect</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 px-6 sm:px-8 pb-6">
                <CardDescription className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  Work with your randomly assigned team to defeat bosses and earn exclusive badges. Compete on
                  leaderboards and become the ultimate boss fighter!
                </CardDescription>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>
    </main>
  )
}

export default Home
