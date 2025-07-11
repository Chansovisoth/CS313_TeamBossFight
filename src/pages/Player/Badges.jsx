// ===== LIBRARIES ===== //
import { useState, useEffect } from "react";
import { Award, BadgeIcon, Trophy, Star, CalendarDays, Crown, Medal, Zap, Target, Swords, Shield, List as ListIcon, LayoutGrid, User } from "lucide-react";

// ===== COMPONENTS (Shadcn.ui) ===== //
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample badges data
const Badges = [
  {
    id: 1,
    name: "Boss Defeated",
    description: "Awarded to every player on the team that deals the highest total damage to the boss during the fight.",
    icon: Swords,
    color: "bg-red-500",
    earned: true,
    earnedDate: "2024-01-15",
    rarity: "Epic",
  },
  {
    id: 2,
    name: "Last-Hit",
    description: "Awarded to the player who lands the final blow that defeats the boss.",
    icon: Target,
    color: "bg-orange-500",
    earned: true,
    earnedDate: "2024-01-20",
    rarity: "Rare",
  },
  {
    id: 3,
    name: "MVP",
    description: "Awarded to the individual player with the highest total damage dealt during the fight, regardless of team outcome.",
    icon: Crown,
    color: "bg-yellow-500",
    earned: true,
    earnedDate: "2024-02-01",
    rarity: "Legendary",
  },
  {
    id: 4,
    name: "10 Questions Milestone",
    description: "Answer 10 questions correctly in the current event.",
    icon: Medal,
    color: "bg-blue-500",
    earned: true,
    earnedDate: "2024-01-12",
    rarity: "Common",
  },
  {
    id: 5,
    name: "25 Questions Milestone",
    description: "Answer 25 questions correctly in the current event.",
    icon: Medal,
    color: "bg-green-500",
    earned: true,
    earnedDate: "2024-01-25",
    rarity: "Uncommon",
  },
  {
    id: 6,
    name: "50 Questions Milestone",
    description: "Answer 50 questions correctly in the current event.",
    icon: Medal,
    color: "bg-purple-500",
    earned: false,
    earnedDate: null,
    rarity: "Rare",
  },
  {
    id: 7,
    name: "100 Questions Milestone",
    description: "Answer 100 questions correctly in the current event.",
    icon: Medal,
    color: "bg-indigo-500",
    earned: false,
    earnedDate: null,
    rarity: "Epic",
  },
  {
    id: 8,
    name: "Hero",
    description: "Awarded to the player who defeats every boss in the current event.",
    icon: Shield,
    color: "bg-pink-500",
    earned: false,
    earnedDate: null,
    rarity: "Legendary",
  },
];

const getRarityColor = (rarity) => {
  switch (rarity) {
    case "Common": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    case "Uncommon": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "Rare": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "Epic": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "Legendary": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  }
};

const MainBadges = () => {
  const [filter, setFilter] = useState("all"); // all, earned, unearned
  const [isGridView, setIsGridView] = useState(() => {
    // Load saved view preference from localStorage, default to true (grid view)
    const savedView = localStorage.getItem("badgesViewMode");
    return savedView ? JSON.parse(savedView) : true;
  });

  // Save view preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("badgesViewMode", JSON.stringify(isGridView));
  }, [isGridView]);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const filteredBadges = userBadges.filter(badge => {
    if (filter === "earned") return badge.earned;
    if (filter === "unearned") return !badge.earned;
    return true;
  });

  const earnedBadges = userBadges.filter(badge => badge.earned);
  const totalBadges = userBadges.length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ===== Header Section ===== */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Badges</h1>
            <p className="text-xl opacity-90 mb-6">
              Track your achievements and progress in Team Boss Fight
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-0">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">{earnedBadges.length}</div>
                <div className="text-sm opacity-80">Badges Earned</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">{totalBadges}</div>
                <div className="text-sm opacity-80">Total Badges</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">
                  {Math.round((earnedBadges.length / totalBadges) * 100)}%
                </div>
                <div className="text-sm opacity-80">Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>



      



      {/* ===== BADGES ===== */}
      <div className="flex-1 max-w-7xl mx-auto px-4 pb-8 mt-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BadgeIcon className="w-5 h-5" />
                  Badges
                </CardTitle>
                <CardDescription>
                  Your achievements and milestones in Team Boss Fight.
                </CardDescription>
              </div>
              
              {/* Controls Section */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Filter Controls */}
                <div className="flex gap-2">
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("all")}
                    className="text-sm"
                  >
                    All ({totalBadges})
                  </Button>
                  <Button
                    variant={filter === "earned" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("earned")}
                    className="text-sm"
                  >
                    Earned ({earnedBadges.length})
                  </Button>
                  <Button
                    variant={filter === "unearned" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("unearned")}
                    className="text-sm"
                  >
                    Unearned ({totalBadges - earnedBadges.length})
                  </Button>
                </div>

                {/* View Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsGridView(!isGridView)}
                  className="w-8 h-8 p-0"
                >
                  {isGridView ? <ListIcon className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className={isGridView ? "border-t py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "border-t py-6 flex flex-col gap-6 overflow-hidden"}>
            {filteredBadges.map((badge) => {
              const IconComponent = badge.icon;
              return isGridView ? (

                // ===== GRID VIEW ===== //
                <Card key={badge.id} className={`p-7 rounded-2xl bg-background shadow-sm text-center ${badge.earned ? '' : 'opacity-60 grayscale'}`}>
                  <div className="relative mx-auto mb-4">
                    <div className={`w-20 h-20 mx-auto rounded-full ${badge.color} flex items-center justify-center text-white`}>
                      <IconComponent className="w-10 h-10" />
                    </div>
                    {badge.earned && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white" fill="currentColor" />
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{badge.name}</h4>
                  <div className="flex justify-center gap-2 mb-3">
                    <Badge className={getRarityColor(badge.rarity)}>
                      {badge.rarity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 max-w-prose mx-auto text-justify">
                    {badge.description}
                  </p>
                  {badge.earned && badge.earnedDate && (
                    <div className="flex items-center justify-center text-xs text-green-600 dark:text-green-400">
                      <CalendarDays className="w-3 h-3 mr-1" />
                      Earned {new Date(badge.earnedDate).toLocaleDateString()}
                    </div>
                  )}
                </Card>

              ) : (

                // ===== LIST VIEW ===== //
                <Card key={badge.id} className={`min-w-[600px] grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 rounded-2xl bg-background shadow-sm ${badge.earned ? '' : 'opacity-60'}`}>
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-xl ${badge.color} flex items-center justify-center text-white ${!badge.earned ? 'grayscale' : ''}`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    {badge.earned && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Star className="w-2 h-2 text-white" fill="currentColor" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-lg">{badge.name}</h4>
                      <Badge className={getRarityColor(badge.rarity)}>
                        {badge.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground text-justify mb-2">
                      {badge.description}
                    </p>
                    {badge.earned && badge.earnedDate && (
                      <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                        <CalendarDays className="w-3 h-3 mr-1" />
                        Earned {new Date(badge.earnedDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {badge.earned ? (
                      <div className="text-green-600 dark:text-green-400 font-semibold text-sm">
                        ✓ Earned
                      </div>
                    ) : (
                      <div className="text-gray-500 dark:text-gray-400 font-semibold text-sm">
                        Not Earned
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </CardContent>
        </Card>



        {/* Empty State */}
        {filteredBadges.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No badges found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {filter === "earned"
                ? "You haven't earned any badges yet. Start fighting bosses and answering questions!"
                : filter === "unearned"
                  ? "Great job! You've earned all available badges."
                  : "No badges available."
              }
            </p>
          </div>
        )}



      </div>
    </div>
  );
};

export default Badges;

