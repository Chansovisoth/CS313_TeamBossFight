import React from 'react';
import { Menu } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

const Leaderboard = () => {
  // Static leaderboard data
  const teamLeaderboard = [
    { rank: 1, team: 'Kangaroo', dmg: 100, correct: 9 },
    { rank: 2, team: 'Koala', dmg: 85, correct: 8 },
    { rank: 3, team: 'Shellfish', dmg: 68, correct: 7 }
  ];

  const individualLeaderboard = [
    { rank: 1, player: 'Sovitep', dmg: 100, correct: 9 },
    { rank: 2, player: 'Visoth', dmg: 90, correct: 8 },
    { rank: 3, player: 'Roth', dmg: 75, correct: 7 }
  ];

  const allTimeLeaderboard = [
    { rank: 1, player: 'Python', dmg: 300, correct: 25, lastPlayed: '12/15/2024' },
    { rank: 2, player: 'Sovitep', dmg: 180, correct: 15, lastPlayed: '12/14/2024' },
    { rank: 3, player: 'Visoth', dmg: 90, correct: 8, lastPlayed: '12/13/2024' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center mb-6">
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Leaderboard</h1>
          </div>

          {/* Boss HP Section */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Boss HP
            </Label>
            <div className="space-y-2">
              {/* Custom Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5 border border-gray-300 dark:border-gray-600">
                <div className="bg-red-500 dark:bg-red-600 h-5 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <p className="text-sm text-center text-gray-600 dark:text-gray-400">250/1000</p>
            </div>
          </div>

          {/* Boss Info Card */}
          <Card className="mb-6 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
            <CardContent className="p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">Boss Name:</span>
                  <span className="text-gray-900 dark:text-white">Boss1</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">Player Count:</span>
                  <span className="text-gray-900 dark:text-white">10</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">Battle's Status:</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Team Leaderboard */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          <Label className="text-base font-semibold text-gray-900 dark:text-white mb-4 block">
            Live Team Leaderboard
          </Label>
          <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 dark:border-gray-600">
                  <th className="text-left font-medium py-3 px-3 text-sm text-gray-900 dark:text-white">Rank</th>
                  <th className="text-left font-medium py-3 px-3 text-sm text-gray-900 dark:text-white">Team</th>
                  <th className="text-left font-medium py-3 px-3 text-sm text-gray-900 dark:text-white">DMG</th>
                  <th className="text-left font-medium py-3 px-3 text-sm text-gray-900 dark:text-white">Correct</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">1</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">Kangaroo</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">100</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">9</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">2</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">Koala</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">85</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">8</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">3</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">Shellfish</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">68</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Individual Leaderboard */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          <Label className="text-base font-semibold text-gray-900 dark:text-white mb-4 block">
            Live Individual Leaderboard
          </Label>
          <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 dark:border-gray-600">
                  <th className="text-left font-medium py-3 px-3 text-sm text-gray-900 dark:text-white">Rank</th>
                  <th className="text-left font-medium py-3 px-3 text-sm text-gray-900 dark:text-white">Player</th>
                  <th className="text-left font-medium py-3 px-3 text-sm text-gray-900 dark:text-white">DMG</th>
                  <th className="text-left font-medium py-3 px-3 text-sm text-gray-900 dark:text-white">Correct</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">1</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">Sovitep</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">100</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">9</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">2</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">Visoth</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">90</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">8</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">3</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">Roth</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">75</td>
                  <td className="py-3 px-3 text-sm text-gray-900 dark:text-white">7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* All-Time Individual Leaderboard */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          <Label className="text-base font-semibold text-gray-900 dark:text-white mb-4 block">
            All-Time Individual Leaderboard
          </Label>
          <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 dark:border-gray-600">
                  <th className="text-left font-medium py-3 px-3 text-xs text-gray-900 dark:text-white">Rank</th>
                  <th className="text-left font-medium py-3 px-3 text-xs text-gray-900 dark:text-white">Player</th>
                  <th className="text-left font-medium py-3 px-3 text-xs text-gray-900 dark:text-white">DMG</th>
                  <th className="text-left font-medium py-3 px-3 text-xs text-gray-900 dark:text-white">Correct</th>
                  <th className="text-left font-medium py-3 px-3 text-xs text-gray-900 dark:text-white">Last Played</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
                  <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">1</td>
                  <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">Python</td>
                  <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">300</td>
                  <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">25</td>
                  <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">12/15/2024</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">2</td>
                  <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">Sovitep</td>
                  <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">180</td>
                  <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">15</td>
                  <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">12/14/2024</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">3</td>
                  <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">Visoth</td>
                  <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">90</td>
                  <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">8</td>
                  <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">12/13/2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;