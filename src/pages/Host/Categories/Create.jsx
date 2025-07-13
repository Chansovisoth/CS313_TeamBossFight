import React from 'react';
import { Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const CreateCategory = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Question Bank</h1>
          </div>

          {/* Create Category Form */}
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex flex-col gap-4">
              {/* Form Heading */}
              <h2 className="text-center text-base font-medium text-gray-900 dark:text-white">
                Create category name
              </h2>

              {/* Category Name Input */}
              <div>
                <Input
                  type="text"
                  placeholder="CS"
                  className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-2">
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
      </div>
    </div>
  );
};

export default CreateCategory;