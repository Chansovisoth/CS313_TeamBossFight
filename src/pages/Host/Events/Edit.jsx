import React from 'react';
import { Menu, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EditEvent = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Menu className="w-6 h-6 text-gray-600 mr-3" />
              <h1 className="text-lg font-semibold text-gray-900">Edit Event</h1>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-8 h-8 p-0 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 mb-6">
            {/* Event Name Field */}
            <div>
              <Label htmlFor="event-name" className="text-sm font-medium text-gray-700">
                Event Name
              </Label>
              <Input
                id="event-name"
                type="text"
                className="mt-1 w-full"
                defaultValue=""
              />
            </div>

            {/* Description Field */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <textarea
                id="description"
                className="w-full h-24 p-2 border rounded-md resize-none mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue=""
              />
            </div>

            {/* Start Date Field */}
            <div>
              <Label htmlFor="start-date" className="text-sm font-medium text-gray-700">
                Start Date
              </Label>
              <Input
                id="start-date"
                type="text"
                className="mt-1 w-full"
                placeholder="--/--/---- 08:00AM"
              />
            </div>

            {/* End Date Field */}
            <div>
              <Label htmlFor="end-date" className="text-sm font-medium text-gray-700">
                End Date
              </Label>
              <Input
                id="end-date"
                type="text"
                className="mt-1 w-full"
                placeholder="--/--/---- 05:00PM"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-black hover:bg-gray-800"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;