import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CreateEvent = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Menu className="w-6 h-6 text-gray-600 mr-3" />
            <h1 className="text-lg font-semibold text-gray-900">Create Event</h1>
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
                placeholder=""
              />
            </div>

            {/* Description Field */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <textarea
                id="description"
                className="mt-1 w-full min-h-[80px] resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder=""
              />
            </div>

            {/* Start Date & Time Field */}
            <div>
              <Label htmlFor="start-datetime" className="text-sm font-medium text-gray-700">
                Start Date & Time
              </Label>
              <Input
                id="start-datetime"
                type="text"
                className="mt-1 w-full"
                placeholder="--/--/---- 08:00AM"
              />
            </div>

            {/* End Date & Time Field */}
            <div>
              <Label htmlFor="end-datetime" className="text-sm font-medium text-gray-700">
                End Date & Time
              </Label>
              <Input
                id="end-datetime"
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
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;