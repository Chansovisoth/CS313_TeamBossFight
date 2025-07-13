import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const BossTemplate = () => {
  // Static boss templates data
  const bossTemplates = [
    { id: 1, name: 'Boss1' },
    { id: 2, name: 'Boss2' },
    { id: 3, name: 'Boss3' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Event1</h1>
          </div>

          {/* Back Button */}
          <div className="mb-6">
            <Button 
              variant="outline" 
              className="w-25 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Back
            </Button>
          </div>

          {/* Boss Templates Section */}
          <div className="mb-4">
            <Label className="text-base font-semibold text-gray-900 dark:text-white block mb-2">
              Boss Templates
            </Label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Choose bosses to add to current event
            </p>
          </div>

          {/* Boss Templates Grid */}
          <div className="grid grid-cols-2 gap-4">
            {bossTemplates.map((boss) => (
              <Card 
                key={boss.id}
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg p-6 aspect-square flex items-center justify-center hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer transition-colors"
              >
                <Label className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  {boss.name}
                </Label>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BossTemplate;