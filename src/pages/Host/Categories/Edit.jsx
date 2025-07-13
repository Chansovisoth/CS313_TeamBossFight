import React from 'react';
import { Menu, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const EditCategory = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Category</h1>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-8 h-8 p-0 group"
            >
              <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400" />
            </Button>
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            {/* Author Information */}
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Author
              </Label>
              <div className="mt-1">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Sovitep (You)
                </span>
              </div>
            </div>

            {/* Category Name Input */}
            <div>
              <Label htmlFor="category-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Category name
              </Label>
              <Input
                id="category-name"
                type="text"
                defaultValue="CS"
                className="mt-1 w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
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
    </div>
  );
};

export default EditCategory;