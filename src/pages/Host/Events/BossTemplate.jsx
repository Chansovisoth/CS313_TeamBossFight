import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sword, Plus, Check, Zap, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const BossTemplate = () => {
  const navigate = useNavigate();
  const [selectedBosses, setSelectedBosses] = useState([]);

  // Enhanced boss templates data
  const bossTemplates = [
    { 
      id: 1, 
      name: 'Dragon Lord', 
      image: 'https://via.placeholder.com/150x100',
      categories: ['CS', 'MIS'],
      cooldown: '30 min',
      teamsRequired: 4,
      status: 'Available'
    },
    { 
      id: 2, 
      name: 'Shadow Beast', 
      image: 'https://via.placeholder.com/150x100',
      categories: ['BUS', 'ARC'],
      cooldown: '15 min',
      teamsRequired: 3,
      status: 'Available'
    },
    { 
      id: 3, 
      name: 'Fire Elemental', 
      image: 'https://via.placeholder.com/150x100',
      categories: ['CE'],
      cooldown: '20 min',
      teamsRequired: 2,
      status: 'Available'
    },
    { 
      id: 4, 
      name: 'Ice Wizard', 
      image: 'https://via.placeholder.com/150x100',
      categories: ['CS', 'CE'],
      cooldown: '25 min',
      teamsRequired: 3,
      status: 'Assigned'
    },
    { 
      id: 5, 
      name: 'Thunder King', 
      image: 'https://via.placeholder.com/150x100',
      categories: ['MIS', 'BUS'],
      cooldown: '40 min',
      teamsRequired: 5,
      status: 'Available'
    },
    { 
      id: 6, 
      name: 'Stone Golem', 
      image: 'https://via.placeholder.com/150x100',
      categories: ['ARC'],
      cooldown: '10 min',
      teamsRequired: 2,
      status: 'Available'
    }
  ];

  const handleBack = () => {
    navigate('/host/events/assign_boss');
  };

  const handleBossSelect = (bossId) => {
    const boss = bossTemplates.find(b => b.id === bossId);
    if (boss.status === 'Assigned') return; // Can't select already assigned bosses

    if (selectedBosses.includes(bossId)) {
      setSelectedBosses(selectedBosses.filter(id => id !== bossId));
    } else {
      setSelectedBosses([...selectedBosses, bossId]);
    }
  };

  const handleAssignSelected = () => {
    console.log('Assigning bosses:', selectedBosses);
    // Here you would typically make an API call to assign the selected bosses
    navigate('/host/events/assign_boss');
  };

  const availableBosses = bossTemplates.filter(boss => boss.status === 'Available');
  const assignedBosses = bossTemplates.filter(boss => boss.status === 'Assigned');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Assign Boss</h1>
            </div>
          </div>
          {selectedBosses.length > 0 && (
            <Button onClick={handleAssignSelected} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Assign Selected ({selectedBosses.length})
            </Button>
          )}
        </div>

        {/* Event Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Event: Adventure Quest 2024</h2>
                <p className="text-sm text-muted-foreground">
                  Select bosses to add to this active event
                </p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Live
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Available Bosses Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-lg font-semibold">Available Boss Templates</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Select bosses to add to your event
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {availableBosses.length} Available • {assignedBosses.length} Already Assigned
            </div>
          </div>

          {/* Available Bosses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableBosses.map((boss) => (
              <Card 
                key={boss.id}
                className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                  selectedBosses.includes(boss.id) 
                    ? 'ring-2 ring-primary border-primary' 
                    : 'hover:border-primary/50'
                }`}
                onClick={() => handleBossSelect(boss.id)}
              >
                <CardContent className="p-0">
                  {/* Boss Image */}
                  <div className="relative h-32 bg-gradient-to-br from-primary/20 to-primary/5">
                    <img
                      src={boss.image}
                      alt={boss.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                        selectedBosses.includes(boss.id) 
                          ? 'bg-primary border-primary text-primary-foreground' 
                          : 'bg-background border-border'
                      }`}>
                        {selectedBosses.includes(boss.id) && (
                          <Check className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Boss Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-base mb-1">{boss.name}</h3>
                      <div className="flex flex-wrap gap-1">
                        {boss.categories.map((category) => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Boss Stats */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Cooldown:
                        </span>
                        <span className="font-medium">{boss.cooldown}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          Teams:
                        </span>
                        <span className="font-medium">{boss.teamsRequired}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Already Assigned Bosses */}
          {assignedBosses.length > 0 && (
            <div className="space-y-4">
              <div className="border-t pt-6">
                <Label className="text-lg font-semibold text-muted-foreground">Already Assigned to Event</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  These bosses are currently assigned to this event
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {assignedBosses.map((boss) => (
                  <Card 
                    key={boss.id}
                    className="overflow-hidden opacity-60 border-dashed"
                  >
                    <CardContent className="p-0">
                      <div className="relative h-32 bg-gradient-to-br from-muted/20 to-muted/5">
                        <img
                          src={boss.image}
                          alt={boss.name}
                          className="w-full h-full object-cover grayscale"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary">
                            <Check className="w-3 h-3 mr-1" />
                            Assigned
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold text-base mb-1">{boss.name}</h3>
                          <div className="flex flex-wrap gap-1">
                            {boss.categories.map((category) => (
                              <Badge key={category} variant="outline" className="text-xs">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {selectedBosses.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <Card className="px-4 py-3 shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">
                  {selectedBosses.length} boss{selectedBosses.length !== 1 ? 'es' : ''} selected
                </span>
                <Button onClick={handleAssignSelected} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Assign to Event
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BossTemplate;