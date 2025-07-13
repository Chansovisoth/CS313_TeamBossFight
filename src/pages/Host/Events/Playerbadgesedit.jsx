import React from 'react';
import { Menu, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';

const PlayerBadgesEdit = () => {
  // Static player data with badges and redemption status
  const players = [
    {
      id: 1,
      name: 'Sodavith',
      badges: [
        { image: '/badges/heart.png', redeemed: true },
        { image: '/badges/star.png', redeemed: false }
      ]
    },
    {
      id: 2,
      name: 'Chanreach',
      badges: [
        { image: '/badges/heart.png', redeemed: true }
      ]
    },
    {
      id: 3,
      name: 'Visoth',
      badges: [
        { image: '/badges/heart.png', redeemed: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          {/* Header */}
          <div className="flex items-center mb-4">
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Event1</h1>
          </div>

          {/* Instruction Text */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Click on the pencil icon to mark badge as redeemed
          </p>

          {/* Section Title with Editing Label */}
          <div className="flex items-center justify-between mb-4">
            <Label className="text-base font-semibold text-gray-900 dark:text-white">
              Player Badges
            </Label>
            <span className="text-sm text-gray-500 dark:text-gray-400 italic">
              Editing
            </span>
          </div>

          {/* Player Badges Table */}
          <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden mb-6">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 dark:border-gray-600">
                  <TableHead className="w-12 text-center font-medium text-gray-900 dark:text-white">No.</TableHead>
                  <TableHead className="font-medium text-gray-900 dark:text-white">Player</TableHead>
                  <TableHead className="font-medium text-gray-900 dark:text-white">Badges</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white dark:bg-gray-800">
                {players.map((player, index) => (
                  <TableRow 
                    key={player.id} 
                    className={`border-b border-gray-200 dark:border-gray-600 ${
                      index % 2 === 0 
                        ? 'bg-white dark:bg-gray-800' 
                        : 'bg-gray-50 dark:bg-gray-700'
                    }`}
                  >
                    <TableCell className="text-center text-sm font-medium text-gray-900 dark:text-white">
                      {player.id}
                    </TableCell>
                    <TableCell className="text-sm text-gray-900 dark:text-white">
                      {player.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {player.badges.map((badge, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={badge.image} 
                              alt="Badge"
                              className="w-6 h-6 object-contain" 
                            />
                            {badge.redeemed && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Discard
            </Button>
            <Button 
              className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBadgesEdit;