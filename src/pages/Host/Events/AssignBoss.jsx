import React, { useState } from 'react';
import { Menu, Plus, X, QrCode, Play, BarChart3, SkipForward, Trophy, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

const AssignBoss = () => {
  const navigate = useNavigate();
  const [showUnassignModal, setShowUnassignModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedBoss, setSelectedBoss] = useState(null);

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
    },
    {
      id: 3,
      name: 'Boss3',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Boss4',
      status: 'On Cooldown',
      cooldownTime: '2:15'
    }
  ];

  const handleUnassignClick = (boss) => {
    setSelectedBoss(boss);
    setShowUnassignModal(true);
  };

  const handleQRClick = (boss) => {
    setSelectedBoss(boss);
    setShowQRModal(true);
  };

  const handleLeaderboardClick = (boss) => {
    // Option 1: If routes are set up with full paths
    navigate('/host/events/leaderboard');
    
    // Option 2: If you're using nested routes and want relative navigation
    // navigate('leaderboard');
    
    // Option 3: If routes are configured differently
    // navigate('/events/leaderboard');
  };

  const handleCancelUnassign = () => {
    setShowUnassignModal(false);
    setSelectedBoss(null);
  };

  const handleConfirmUnassign = () => {
    // Unassign logic would go here
    console.log('Unassigning boss:', selectedBoss.name);
    setShowUnassignModal(false);
    setSelectedBoss(null);
  };

  const handleCloseQR = () => {
    setShowQRModal(false);
    setSelectedBoss(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8 px-4">
      {/* Responsive container - mobile: max-w-md, tablet: max-w-2xl, desktop: max-w-4xl */}
      <div className="max-w-md sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center">
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400 mr-2 sm:mr-3" />
              <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Event1</h1>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="w-7 h-7 sm:w-8 sm:h-8 p-0 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
            </Button>
          </div>

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
            <Label className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
              Bosses Assigned
            </Label>
            <Button 
              variant="secondary" 
              size="sm"
              className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 cursor-pointer transition-colors flex items-center gap-1 w-fit"
            >
              <Users className="w-3 h-3" />
              Player Badges
            </Button>
          </div>

          {/* Content Area */}
          {assignedBosses.length === 0 ? (
            // No Bosses Assigned State
            <div className="flex flex-col items-center justify-center h-64 sm:h-80 lg:h-96">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Bosses Assigned</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Press the "+" to assign bosses to this event</p>
            </div>
          ) : (
            // Responsive Bosses Grid
            // Mobile: 1 column, Tablet: 2 columns, Desktop: 3-4 columns
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {assignedBosses.map((boss) => (
                <Card key={boss.id} className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                  <CardContent className="p-3 sm:p-4 flex flex-col h-full">
                    {/* Boss Name */}
                    <Label className="text-sm font-medium text-gray-900 dark:text-white block mb-2">
                      {boss.name}
                    </Label>
                    
                    {/* Status - Fixed height container */}
                    <div className="mb-3 flex-1 flex flex-col justify-start">
                      {boss.status === 'Active' ? (
                        <Badge variant="default" className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-0 w-fit">
                          Active
                        </Badge>
                      ) : (
                        <div className="space-y-1">
                          <Badge variant="secondary" className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 border-0 w-fit">
                            On Cooldown
                          </Badge>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{boss.cooldownTime}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Action Buttons Row - Always at bottom */}
                    <div className="flex items-center justify-between gap-1 mt-auto">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-6 h-6 sm:w-7 sm:h-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => handleUnassignClick(boss)}
                      >
                        <X className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                      </Button>
                      {boss.status === 'On Cooldown' && (
                        <Button variant="ghost" size="sm" className="w-6 h-6 sm:w-7 sm:h-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-600">
                          <SkipForward className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-6 h-6 sm:w-7 sm:h-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => handleQRClick(boss)}
                      >
                        <QrCode className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-6 h-6 sm:w-7 sm:h-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => handleLeaderboardClick(boss)}
                      >
                        <Trophy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Unassign Warning Modal */}
      {showUnassignModal && selectedBoss && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4 sm:p-6 max-w-sm w-full shadow-lg">
            {/* Modal Header */}
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Warning
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You are about to unassign <span className="font-semibold text-gray-900 dark:text-white">"{selectedBoss.name}"</span> from Event1
              </p>
            </div>

            {/* Modal Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                onClick={handleCancelUnassign}
              >
                Cancel
              </button>
              <button 
                className="flex-1 px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
                onClick={handleConfirmUnassign}
              >
                Unassign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && selectedBoss && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4 sm:p-6 max-w-sm w-full shadow-lg">
            {/* Modal Header */}
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                QR Code
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                QR Code for <span className="font-semibold text-gray-900 dark:text-white">"{selectedBoss.name}"</span>
              </p>
            </div>

            {/* QR Code Display */}
            <div className="flex justify-center mb-6">
              <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                {/* Placeholder QR Code Pattern */}
                <div className="grid grid-cols-8 gap-1 p-2">
                  {[...Array(64)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center mb-4">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Show this QR code to players to join the boss fight
              </p>
            </div>

            {/* Modal Button */}
            <div className="flex justify-center">
              <button 
                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
                onClick={handleCloseQR}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignBoss;