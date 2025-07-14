import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, QrCode, SkipForward, Trophy, Users, Clock, Zap, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AssignBoss = () => {
  const navigate = useNavigate();
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, bossId: null, bossName: '' });
  
  const [assignedBosses, setAssignedBosses] = useState([
    {
      id: 1,
      name: 'Dragon Lord',
      status: 'Active',
      image: 'https://via.placeholder.com/80x60',
      categories: ['CS', 'MIS'],
      teamsEngaged: 3,
      totalTeams: 8
    },
    {
      id: 2,
      name: 'Shadow Beast',
      status: 'On Cooldown',
      cooldownTime: '5:32',
      image: 'https://via.placeholder.com/80x60',
      categories: ['BUS', 'ARC'],
      teamsEngaged: 0,
      totalTeams: 5
    },
    {
      id: 3,
      name: 'Fire Elemental',
      status: 'Active',
      image: 'https://via.placeholder.com/80x60',
      categories: ['CE'],
      teamsEngaged: 2,
      totalTeams: 4
    }
  ]);

  // Change to empty array to see "No Bosses Assigned" state
  // const [assignedBosses, setAssignedBosses] = useState([]);

  const handleRemoveBoss = (bossId) => {
    // Find the boss name for the confirmation message
    const boss = assignedBosses.find(b => b.id === bossId);
    const bossName = boss ? boss.name : 'this boss';
    
    // Open confirmation dialog
    setConfirmDialog({
      isOpen: true,
      bossId: bossId,
      bossName: bossName
    });
  };

  const confirmRemoveBoss = () => {
    if (confirmDialog.bossId) {
      setAssignedBosses(assignedBosses.filter(boss => boss.id !== confirmDialog.bossId));
    }
    setConfirmDialog({ isOpen: false, bossId: null, bossName: '' });
  };

  const cancelRemoveBoss = () => {
    setConfirmDialog({ isOpen: false, bossId: null, bossName: '' });
  };

  const handleSkipCooldown = (bossId) => {
    setAssignedBosses(assignedBosses.map(boss => 
      boss.id === bossId 
        ? { ...boss, status: 'Active', cooldownTime: undefined }
        : boss
    ));
  };

  const handleAssignBoss = () => {
    navigate('/host/events/boss_template');
  };

  const handleBack = () => {
    navigate('/host/events/view');
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 py-6 max-w-4xl">
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
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Player Badges</span>
              </Button>
              <Button 
                size="sm"
                onClick={handleAssignBoss}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Assign Boss</span>
              </Button>
            </div>
          </div>

          {/* Event Info Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Event: Adventure Quest 2024</h2>
                  <p className="text-sm text-muted-foreground">Active Event • {assignedBosses.length} Bosses Assigned</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Live
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Content Area */}
          {assignedBosses.length === 0 ? (
            // No Bosses Assigned State
            <Card>
              <CardContent className="py-16">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">No Bosses Assigned</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Get started by assigning bosses to this event. Players will be able to battle them once assigned.
                    </p>
                  </div>
                  <Button className="mt-4" onClick={handleAssignBoss}>
                    <Plus className="w-4 h-4 mr-2" />
                    Assign Your First Boss
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Bosses Grid
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Assigned Bosses</Label>
                <div className="text-sm text-muted-foreground">
                  {assignedBosses.filter(boss => boss.status === 'Active').length} Active • {assignedBosses.filter(boss => boss.status === 'On Cooldown').length} On Cooldown
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assignedBosses.map((boss) => (
                  <Card key={boss.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      {/* Boss Image */}
                      <div className="relative h-32 bg-gradient-to-br from-primary/20 to-primary/5">
                        <img
                          src={boss.image}
                          alt={boss.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          {boss.status === 'Active' ? (
                            <Badge className="bg-green-500 hover:bg-green-600">
                              <Zap className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                              <Clock className="w-3 h-3 mr-1" />
                              Cooldown
                            </Badge>
                          )}
                        </div>
                        <div className="absolute top-2 right-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-8 h-8 p-0 bg-background/80 hover:bg-background"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveBoss(boss.id);
                                }}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Unassign Boss</TooltipContent>
                          </Tooltip>
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

                        {/* Status Info */}
                        <div className="space-y-2">
                          {boss.status === 'On Cooldown' ? (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Cooldown:</span>
                              <span className="text-sm font-mono">{boss.cooldownTime}</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Teams Engaged:</span>
                              <span className="text-sm font-semibold">{boss.teamsEngaged}/{boss.totalTeams}</span>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-1">
                            {boss.status === 'On Cooldown' && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-8 h-8 p-0"
                                    onClick={() => handleSkipCooldown(boss.id)}
                                  >
                                    <SkipForward className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Skip Cooldown</TooltipContent>
                              </Tooltip>
                            )}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                                  <QrCode className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Generate QR Code</TooltipContent>
                            </Tooltip>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                                <Trophy className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Results</TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirmation Dialog */}
        <AlertDialog open={confirmDialog.isOpen} onOpenChange={cancelRemoveBoss}>
          <AlertDialogContent className="sm:max-w-md">
            <AlertDialogHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <AlertDialogTitle>Unassign Boss</AlertDialogTitle>
                  <AlertDialogDescription className="mt-1">
                    Are you sure you want to unassign <span className="font-semibold">{confirmDialog.bossName}</span> from this event?
                  </AlertDialogDescription>
                </div>
              </div>
            </AlertDialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                This action will remove the boss from the event and players will no longer be able to battle it. This cannot be undone.
              </p>
            </div>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel className="mt-0">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmRemoveBoss}
                className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              >
                Unassign Boss
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
};

export default AssignBoss;