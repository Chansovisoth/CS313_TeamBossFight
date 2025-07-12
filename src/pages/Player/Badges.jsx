// ===== LIBRARIES ===== //
import { useState } from "react";
import { Award, Trophy, Star, Shield, Sword, Target, Crown, Medal, Zap, Lock, CheckCircle2, Users } from "lucide-react";

// ===== COMPONENTS (Shadcn.ui) ===== //
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Sample events and bosses data
const eventsData = [
  {
    id: 1,
    name: "Open House 2025",
    isActive: true,
    bosses: [
      {
        id: 1,
        name: "Knowledge Guardian",
        description: "A powerful boss that tests your general knowledge",
        badges: [
          {
            id: 1,
            name: "Boss Defeated",
            description: "Awarded to every player on the team that deals the highest total damage to the Knowledge Guardian during the fight.",
            icon: Users,
            earned: true,
            earnedDate: "2025-01-15"
          },
          {
            id: 2,
            name: "Last-Hit",
            description: "Awarded to the player who lands the final blow that defeats the Knowledge Guardian.",
            icon: Target,
            earned: true,
            earnedDate: "2025-01-15"
          },
          {
            id: 3,
            name: "MVP",
            description: "Awarded to the individual player with the highest total damage dealt during the Knowledge Guardian fight, regardless of team outcome.",
            icon: Crown,
            earned: false,
            earnedDate: null
          }
        ]
      },
      {
        id: 2,
        name: "Tech Titan",
        description: "Master of all things technology and programming",
        badges: [
          {
            id: 4,
            name: "Boss Defeated",
            description: "Awarded to every player on the team that deals the highest total damage to the Tech Titan during the fight.",
            icon: Users,
            earned: false,
            earnedDate: null
          },
          {
            id: 5,
            name: "Last-Hit",
            description: "Awarded to the player who lands the final blow that defeats the Tech Titan.",
            icon: Target,
            earned: false,
            earnedDate: null
          },
          {
            id: 6,
            name: "MVP",
            description: "Awarded to the individual player with the highest total damage dealt during the Tech Titan fight, regardless of team outcome.",
            icon: Crown,
            earned: false,
            earnedDate: null
          }
        ]
      }
    ],
    // Event-wide milestone badges
    milestones: [
      {
        id: 101,
        name: "10 Questions Milestone",
        description: "Answer 10 questions correctly during the Open House 2025 event.",
        icon: Medal,
        earned: true,
        earnedDate: "2025-01-12",
        progress: 15,
        target: 10
      },
      {
        id: 102,
        name: "25 Questions Milestone",
        description: "Answer 25 questions correctly during the Open House 2025 event.",
        icon: Medal,
        earned: false,
        earnedDate: null,
        progress: 15,
        target: 25
      },
      {
        id: 103,
        name: "50 Questions Milestone",
        description: "Answer 50 questions correctly during the Open House 2025 event.",
        icon: Medal,
        earned: false,
        earnedDate: null,
        progress: 15,
        target: 50
      },
      {
        id: 104,
        name: "100 Questions Milestone",
        description: "Answer 100 questions correctly during the Open House 2025 event.",
        icon: Medal,
        earned: false,
        earnedDate: null,
        progress: 15,
        target: 100
      },
      {
        id: 105,
        name: "Hero",
        description: "Awarded to the player who defeats every boss in the Open House 2025 event.",
        icon: Trophy,
        earned: false,
        earnedDate: null
      }
    ]
  },
  {
    id: 2,
    name: "Tech Conference 2025",
    isActive: false,
    bosses: [
      {
        id: 3,
        name: "Algorithm Beast",
        description: "A fierce boss that challenges your algorithmic thinking",
        badges: [
          {
            id: 7,
            name: "Boss Defeated",
            description: "Awarded to every player on the team that deals the highest total damage to the Algorithm Beast during the fight.",
            icon: Users,
            earned: false,
            earnedDate: null
          },
          {
            id: 8,
            name: "Last-Hit",
            description: "Awarded to the player who lands the final blow that defeats the Algorithm Beast.",
            icon: Target,
            earned: false,
            earnedDate: null
          },
          {
            id: 9,
            name: "MVP",
            description: "Awarded to the individual player with the highest total damage dealt during the Algorithm Beast fight, regardless of team outcome.",
            icon: Crown,
            earned: false,
            earnedDate: null
          }
        ]
      }
    ],
    milestones: [
      {
        id: 201,
        name: "10 Questions Milestone",
        description: "Answer 10 questions correctly during the Tech Conference 2025 event.",
        icon: Medal,
        earned: false,
        earnedDate: null,
        progress: 0,
        target: 10
      },
      {
        id: 202,
        name: "25 Questions Milestone",
        description: "Answer 25 questions correctly during the Tech Conference 2025 event.",
        icon: Medal,
        earned: false,
        earnedDate: null,
        progress: 0,
        target: 25
      },
      {
        id: 203,
        name: "50 Questions Milestone",
        description: "Answer 50 questions correctly during the Tech Conference 2025 event.",
        icon: Medal,
        earned: false,
        earnedDate: null,
        progress: 0,
        target: 50
      },
      {
        id: 204,
        name: "100 Questions Milestone",
        description: "Answer 100 questions correctly during the Tech Conference 2025 event.",
        icon: Medal,
        earned: false,
        earnedDate: null,
        progress: 0,
        target: 100
      },
      {
        id: 205,
        name: "Hero",
        description: "Awarded to the player who defeats every boss in the Tech Conference 2025 event.",
        icon: Trophy,
        earned: false,
        earnedDate: null
      }
    ]
  },
  {
    id: 3,
    name: "Science Fair 2025",
    isActive: false,
    bosses: [
      {
        id: 4,
        name: "Science Overlord",
        description: "The ultimate test of scientific knowledge",
        badges: [
          {
            id: 10,
            name: "Boss Defeated",
            description: "Awarded to every player on the team that deals the highest total damage to the Science Overlord during the fight.",
            icon: Users,
            earned: false,
            earnedDate: null
          },
          {
            id: 11,
            name: "Last-Hit",
            description: "Awarded to the player who lands the final blow that defeats the Science Overlord.",
            icon: Target,
            earned: false,
            earnedDate: null
          },
          {
            id: 12,
            name: "MVP",
            description: "Awarded to the individual player with the highest total damage dealt during the Science Overlord fight, regardless of team outcome.",
            icon: Crown,
            earned: false,
            earnedDate: null
          }
        ]
      }
    ],
    milestones: [
      {
        id: 301,
        name: "10 Questions Milestone",
        description: "Answer 10 questions correctly during the Science Fair 2025 event.",
        icon: Medal,
        earned: false,
        earnedDate: null,
        progress: 0,
        target: 10
      },
      {
        id: 302,
        name: "25 Questions Milestone",
        description: "Answer 25 questions correctly during the Science Fair 2025 event.",
        icon: Medal,
        earned: false,
        earnedDate: null,
        progress: 0,
        target: 25
      },
      {
        id: 303,
        name: "50 Questions Milestone",
        description: "Answer 50 questions correctly during the Science Fair 2025 event.",
        icon: Medal,
        earned: false,
        earnedDate: null,
        progress: 0,
        target: 50
      },
      {
        id: 304,
        name: "100 Questions Milestone",
        description: "Answer 100 questions correctly during the Science Fair 2025 event.",
        icon: Medal,
        earned: false,
        earnedDate: null,
        progress: 0,
        target: 100
      },
      {
        id: 305,
        name: "Hero",
        description: "Awarded to the player who defeats every boss in the Science Fair 2025 event.",
        icon: Trophy,
        earned: false,
        earnedDate: null
      }
    ]
  }
];

const Badges = () => {
  const [selectedEvent, setSelectedEvent] = useState(eventsData[0]);
  const [selectedBoss, setSelectedBoss] = useState(null); // null means show all bosses
  const [filter, setFilter] = useState("all"); // all, earned, unearned

  // Calculate total stats
  const allBadges = eventsData.flatMap(event => [
    ...event.bosses.flatMap(boss => boss.badges),
    ...event.milestones
  ]);
  const earnedBadges = allBadges.filter(badge => badge.earned);
  const totalBadges = allBadges.length;

  // Calculate progress for each event
  const getEventProgress = (event) => {
    const eventBadges = [
      ...event.bosses.flatMap(boss => boss.badges),
      ...event.milestones
    ];
    const eventEarnedBadges = eventBadges.filter(badge => badge.earned);
    return {
      earned: eventEarnedBadges.length,
      total: eventBadges.length,
      percentage: eventBadges.length > 0 ? Math.round((eventEarnedBadges.length / eventBadges.length) * 100) : 0
    };
  };

  // Filter badges based on current selection
  const getFilteredBadges = (badges) => {
    if (filter === "earned") return badges.filter(badge => badge.earned);
    if (filter === "unearned") return badges.filter(badge => !badge.earned);
    return badges;
  };

  // Reset boss selection when event changes
  const handleEventChange = (event) => {
    setSelectedEvent(event);
    setSelectedBoss(null); // Reset to show all bosses
  };

  return (
    <div className="container mx-auto p-3 sm:p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Badge Collection</h1>
        <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
          Track your achievements across all boss battles and events
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mb-1 sm:mb-0" />
                <div className="text-center sm:text-left">
                  <p className="text-lg sm:text-2xl font-bold">{earnedBadges.length}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mb-1 sm:mb-0" />
                <div className="text-center sm:text-left">
                  <p className="text-lg sm:text-2xl font-bold">{totalBadges}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mb-1 sm:mb-0" />
                <div className="text-center sm:text-left">
                  <p className="text-lg sm:text-2xl font-bold">
                    {Math.round((earnedBadges.length / totalBadges) * 100)}%
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Done</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Event Sidebar - Mobile: Horizontal scroll, Desktop: Vertical */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg">Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 sm:space-y-2">
              {/* Mobile: Horizontal scroll */}
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                {eventsData.map((event) => (
                  <Button
                    key={event.id}
                    variant={selectedEvent.id === event.id ? "default" : "ghost"}
                    className="flex-shrink-0 lg:w-full justify-start text-sm sm:text-base min-w-[140px] lg:min-w-0"
                    onClick={() => handleEventChange(event)}
                  >
                    <div className="flex items-center space-x-2">
                      {event.isActive && (
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      )}
                      <span className="truncate">{event.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div>
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-lg sm:text-xl">
                    <span>{selectedEvent.name}</span>
                    {selectedEvent.isActive && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800 text-xs sm:text-sm">
                        Active
                      </Badge>
                    )}
                  </CardTitle>
                  {/* Event Progress Summary */}
                  <div className="mt-2">
                    {(() => {
                      const progress = getEventProgress(selectedEvent);
                      return (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                          <span>{progress.earned} of {progress.total} badges earned</span>
                          <div className="flex items-center gap-2">
                            <div className="w-full sm:w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${progress.percentage}%` }}
                              ></div>
                            </div>
                            <span className="font-medium flex-shrink-0">{progress.percentage}%</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
                
                {/* Boss Navigation Tabs */}
                {selectedEvent.bosses.length > 1 && (
                  <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2">
                    <Button
                      variant={selectedBoss === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedBoss(null)}
                      className="text-xs sm:text-sm flex-shrink-0"
                    >
                      All Bosses
                    </Button>
                    {selectedEvent.bosses.map((boss) => (
                      <Button
                        key={boss.id}
                        variant={selectedBoss === boss.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedBoss(boss.id)}
                        className="text-xs sm:text-sm flex-shrink-0"
                      >
                        {boss.name}
                      </Button>
                    ))}
                  </div>
                )}
                
                {/* Filter Controls */}
                <div className="flex gap-1 sm:gap-2">
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("all")}
                    className="text-xs sm:text-sm"
                  >
                    All
                  </Button>
                  <Button
                    variant={filter === "earned" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("earned")}
                    className="text-xs sm:text-sm"
                  >
                    Earned
                  </Button>
                  <Button
                    variant={filter === "unearned" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("unearned")}
                    className="text-xs sm:text-sm"
                  >
                    Unearned
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6 sm:space-y-8">
              {selectedEvent.bosses.map((boss, bossIndex) => {
                const filteredBadges = getFilteredBadges(boss.badges);
                
                if (filteredBadges.length === 0) return null;
                
                return (
                  <div key={boss.id}>
                    {bossIndex > 0 && <Separator className="my-4 sm:my-6" />}
                    
                    {/* Boss Header */}
                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                        {boss.name}
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base">{boss.description}</p>
                    </div>
                    
                    {/* Boss Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {filteredBadges.map((badge) => {
                        const IconComponent = badge.icon;
                        return (
                          <Card 
                            key={badge.id} 
                            className={`relative transition-all duration-200 ${
                              badge.earned 
                                ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30" 
                                : "border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-800/50"
                            }`}
                          >
                            <CardContent className="p-3 sm:p-4">
                              {/* Badge Status Icon */}
                              <div className="absolute top-2 right-2">
                                {badge.earned ? (
                                  <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                                ) : (
                                  <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 dark:text-gray-500" />
                                )}
                              </div>
                              
                              {/* Badge Icon */}
                              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 sm:mb-3 ${
                                badge.earned 
                                  ? "bg-primary text-primary-foreground" 
                                  : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                              }`}>
                                <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                              </div>
                              
                              {/* Badge Info */}
                              <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{badge.name}</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 leading-relaxed line-clamp-3">
                                {badge.description}
                              </p>
                              
                              {/* Earned Date */}
                              {badge.earned && badge.earnedDate && (
                                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                                  Earned {new Date(badge.earnedDate).toLocaleDateString()}
                                </p>
                              )}
                              
                              {!badge.earned && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                  Not yet earned
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Event Milestone Badges */}
              {(() => {
                const filteredMilestones = getFilteredBadges(selectedEvent.milestones);
                if (filteredMilestones.length === 0) return null;
                
                return (
                  <div>
                    <Separator className="my-4 sm:my-6" />
                    
                    {/* Milestone Header */}
                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                        Event Milestones
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        Progress tracked across all boss sessions within this event
                      </p>
                    </div>
                    
                    {/* Milestone Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {filteredMilestones.map((milestone) => {
                        const IconComponent = milestone.icon;
                        return (
                          <Card 
                            key={milestone.id} 
                            className={`relative transition-all duration-200 ${
                              milestone.earned 
                                ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30" 
                                : "border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-800/50"
                            }`}
                          >
                            <CardContent className="p-3 sm:p-4">
                              {/* Badge Status Icon */}
                              <div className="absolute top-2 right-2">
                                {milestone.earned ? (
                                  <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                                ) : (
                                  <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 dark:text-gray-500" />
                                )}
                              </div>
                              
                              {/* Badge Icon */}
                              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 sm:mb-3 ${
                                milestone.earned 
                                  ? "bg-primary text-primary-foreground" 
                                  : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                              }`}>
                                <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                              </div>
                              
                              {/* Badge Info */}
                              <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{milestone.name}</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 leading-relaxed line-clamp-3">
                                {milestone.description}
                              </p>

                              {/* Progress Bar for Question Milestones */}
                              {milestone.target && (
                                <div className="mb-2 sm:mb-3">
                                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                    <span>Progress</span>
                                    <span>{milestone.progress}/{milestone.target}</span>
                                  </div>
                                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                    <div 
                                      className="bg-primary h-1.5 rounded-full transition-all duration-300" 
                                      style={{ width: `${Math.min((milestone.progress / milestone.target) * 100, 100)}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                              
                              {/* Earned Date */}
                              {milestone.earned && milestone.earnedDate && (
                                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                                  Earned {new Date(milestone.earnedDate).toLocaleDateString()}
                                </p>
                              )}
                              
                              {!milestone.earned && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                  {milestone.target ? `${milestone.target - milestone.progress} more needed` : "Not yet earned"}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
              
              {/* Empty State */}
              {selectedEvent.bosses.every(boss => getFilteredBadges(boss.badges).length === 0) && 
               getFilteredBadges(selectedEvent.milestones).length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <Trophy className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 dark:text-gray-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    No badges found
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 px-4">
                    {filter === "earned"
                      ? "You haven't earned any badges in this event yet."
                      : filter === "unearned"
                      ? "You've earned all badges in this event!"
                      : "No badges available in this event."
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Badges;

