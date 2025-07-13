import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CreateEvent = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Create Event</h1>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 mb-6">
            {/* Event Name Field */}
            <div>
              <Label htmlFor="event-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Event Name
              </Label>
              <Input
                id="event-name"
                type="text"
                className="mt-1 w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                placeholder=""
              />
            </div>

            {/* Description Field */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </Label>
              <textarea
                id="description"
                className="mt-1 w-full min-h-[80px] resize-none rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder=""
              />
            </div>

            {/* Start Date & Time Field */}
            <div>
              <Label htmlFor="start-datetime" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Date & Time
              </Label>
              <Input
                id="start-datetime"
                type="text"
                className="mt-1 w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                placeholder="--/--/---- 08:00AM"
              />
            </div>

            {/* End Date & Time Field */}
            <div>
              <Label htmlFor="end-datetime" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                End Date & Time
              </Label>
              <Input
                id="end-datetime"
                type="text"
                className="mt-1 w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                placeholder="--/--/---- 05:00PM"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
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