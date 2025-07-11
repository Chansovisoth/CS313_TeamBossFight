import React from 'react';
import { Menu, Plus, X, QrCode, Play, BarChart3, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

const AssignBoss = () => {
  // Static assigned bosses data - change to empty array to see "No Bosses" state
  const assignedBosses = [
    {
      id: 1,
      name: 'Boss1',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Boss2',
      status: 'On Cooldown',
      cooldownTime: '5:32'
    }
  ];

  // Change to empty array to see "No Bosses Assigned" state
  // const assignedBosses = [];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Menu className="w-6 h-6 text-gray-600 mr-3" />
              <h1 className="text-lg font-semibold text-gray-900">Event1</h1>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="w-8 h-8 p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <Label className="text-base font-semibold text-gray-900">
              Bosses Assigned
            </Label>
            <Button 
              variant="secondary" 
              size="sm"
              className="text-xs hover:bg-gray-200 cursor-pointer transition-colors"
            >
              Player Badges
            </Button>
          </div>

          {/* Content Area */}
          {assignedBosses.length === 0 ? (
            // No Bosses Assigned State
            <div className="flex flex-col items-center justify-center h-96">
              <h2 className="text-lg font-medium text-gray-900 mb-2">No Bosses Assigned</h2>
              <p className="text-sm text-gray-600">Press the "+" to assign bosses to this event</p>
            </div>
          ) : (
            // Bosses Grid
            <div className="grid grid-cols-2 gap-3">
              {assignedBosses.map((boss) => (
                <Card key={boss.id} className="border border-gray-300">
                  <CardContent className="p-3 flex flex-col h-full">
                    {/* Boss Name */}
                    <Label className="text-sm font-medium text-gray-900 block mb-2">
                      {boss.name}
                    </Label>
                    
                    {/* Status - Fixed height container */}
                    <div className="mb-3 flex-1 flex flex-col justify-start">
                      {boss.status === 'Active' ? (
                        <Badge variant="default" className="text-xs bg-green-100 text-green-800 border-0 w-fit">
                          Active
                        </Badge>
                      ) : (
                        <div className="space-y-1">
                          <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800 border-0 w-fit">
                            On Cooldown
                          </Badge>
                          <p className="text-xs text-muted-foreground">{boss.cooldownTime}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Action Buttons Row - Always at bottom */}
                    <div className="flex items-center justify-between gap-1 mt-auto">
                      <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-gray-100">
                        <X className="w-3 h-3" />
                      </Button>
                      {boss.status === 'On Cooldown' && (
                        <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-gray-100">
                          <SkipForward className="w-3 h-3" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-gray-100">
                        <QrCode className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-gray-100">
                        <BarChart3 className="w-3 h-3" />
                      </Button>
                      
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignBoss;