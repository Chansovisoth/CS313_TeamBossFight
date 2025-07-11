import React, { useState } from 'react';
import { Menu, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ViewBosses = () => {
  // For demo purposes - toggle this to see different states
  const [bosses, setBosses] = useState([
    { id: 1, name: 'Boss1', image: null },
    { id: 2, name: 'Boss2', image: null }
  ]);
  
  // Change to empty array to see "No Bosses Found" state
  // const [bosses, setBosses] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 min-h-[500px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Menu className="w-6 h-6 text-gray-600 mr-3" />
              <h1 className="text-lg font-semibold text-gray-900">Bosses</h1>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="w-8 h-8 p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Content Area */}
          {bosses.length === 0 ? (
            // No Bosses Found State
            <div className="flex flex-col items-center justify-center h-96">
              <h2 className="text-lg font-medium text-gray-900 mb-2">No Bosses Found</h2>
              <p className="text-sm text-gray-600">Press the "+" to create boss</p>
            </div>
          ) : (
            // Bosses Grid
            <div className="grid grid-cols-2 gap-4">
              {bosses.map((boss) => (
                <div
                  key={boss.id}
                  className="border border-gray-300 rounded-lg p-4 aspect-square flex flex-col items-center justify-center hover:border-gray-400 cursor-pointer"
                >
                  {boss.image ? (
                    <img 
                      src={boss.image} 
                      alt={boss.name}
                      className="w-full h-3/4 object-cover rounded mb-2"
                    />
                  ) : (
                    <div className="w-full h-3/4 bg-gray-100 rounded mb-2 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No Image</span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-900">{boss.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBosses;