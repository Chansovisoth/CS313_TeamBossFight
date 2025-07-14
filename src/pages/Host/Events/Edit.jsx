import React, { useState } from 'react';
import { Menu, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EditEvent = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    // Delete logic would go here
    console.log('Event deleted');
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Event</h1>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-8 h-8 p-0 group"
              onClick={handleDeleteClick}
            >
              <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400" />
            </Button>
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
                defaultValue=""
              />
            </div>

            {/* Description Field */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </Label>
              <textarea
                id="description"
                className="w-full h-24 p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none mt-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                defaultValue=""
              />
            </div>

            {/* Start Date Field */}
            <div>
              <Label htmlFor="start-date" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Date
              </Label>
              <Input
                id="start-date"
                type="text"
                className="mt-1 w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                placeholder="--/--/---- 08:00AM"
              />
            </div>

            {/* End Date Field */}
            <div>
              <Label htmlFor="end-date" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                End Date
              </Label>
              <Input
                id="end-date"
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
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Warning Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6 max-w-sm w-full mx-4 shadow-lg">
            {/* Modal Header */}
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Warning
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You are about to delete <span className="font-semibold text-gray-900 dark:text-white">"Event1"</span>
              </p>
            </div>

            {/* Modal Buttons */}
            <div className="flex gap-3">
              <button 
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button 
                className="flex-1 px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditEvent;