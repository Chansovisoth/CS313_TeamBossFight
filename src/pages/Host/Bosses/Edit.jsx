import React from 'react';
import { Menu, Trash2, Upload, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const EditBoss = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header with Menu and Delete Icons */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Menu className="w-6 h-6 text-gray-600 mr-3" />
              <h1 className="text-lg font-semibold text-gray-900">Edit Boss</h1>
            </div>
            <Trash2 className="w-6 h-6 text-gray-600 hover:text-red-600 cursor-pointer" />
          </div>

          {/* Change Boss Image */}
          <div className="mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 font-medium">Change Boss Image</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Boss Name and Boss Cooldown Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="boss-name" className="text-sm font-medium text-gray-700">
                  Boss Name
                </Label>
                <Input
                  id="boss-name"
                  defaultValue="Boss1"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="boss-cooldown" className="text-sm font-medium text-gray-700">
                  Boss Cooldown
                </Label>
                <Input
                  id="boss-cooldown"
                  defaultValue="00:00"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Category with Selected Chips */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Category
              </Label>
              <div className="border border-gray-300 rounded-md p-3 min-h-[40px] flex flex-wrap gap-2 items-center">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-800 text-sm rounded-md">
                  CS
                  <X className="w-3 h-3 cursor-pointer hover:text-red-600" />
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-800 text-sm rounded-md">
                  MIS
                  <X className="w-3 h-3 cursor-pointer hover:text-red-600" />
                </span>
              </div>
            </div>

            {/* Number of Teams to Start */}
            <div>
              <Label htmlFor="teams-count" className="text-sm font-medium text-gray-700">
                Number of Teams to Start
              </Label>
              <Input
                id="teams-count"
                type="number"
                placeholder="Enter number"
                min="1"
                className="mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <textarea
                id="description"
                rows={4}
                defaultValue="Cool boss 😎"
                className="mt-1 resize-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button 
              variant="outline" 
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-black hover:bg-gray-800"
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBoss;