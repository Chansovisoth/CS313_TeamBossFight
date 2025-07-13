import React from 'react';
import { Menu, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';

const PlayerBadges = () => {
  // Static player data with badges
  const players = [
    {
      id: 1,
      name: 'Sodavith',
      badges: ['/badges/heart.png', '/badges/heart.png'] // Using actual badge images
    },
    {
      id: 2,
      name: 'Chanreach',
      badges: ['/badges/heart.png']
    },
    {
      id: 3,
      name: 'Visoth',
      badges: ['/badges/heart.png']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Event1</h1>
            </div>
          </div>

          {/* Instruction Text */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Click on the pencil icon to mark badge as redeemed
          </p>

          {/* Section Title with Edit Icon */}
          <div className="flex items-center justify-between mb-4">
            <Label className="text-base font-semibold text-gray-900 dark:text-white">
              Player Badges
            </Label>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-8 h-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </Button>
          </div>

          {/* Player Badges Table */}
          <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
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
                        {player.badges.map((badge, badgeIndex) => (
                          <img 
                            key={badgeIndex}
                            src={badge} 
                            alt="Badge"
                            className="w-6 h-6 object-contain" 
                          />
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBadges;