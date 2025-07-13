import React from 'react';
import { Menu, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const ViewQuestionDetail = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">View Question</h1>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-8 h-8 p-0 group"
            >
              <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400" />
            </Button>
          </div>

          {/* Category and Time Limit */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Category name
              </Label>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                CS
              </div>
            </div>
            <div className="text-right">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Time limit
              </Label>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                30s
              </div>
            </div>
          </div>

          {/* Question Author */}
          <div className="mb-4">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Question Author
            </Label>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              Sovitep (You)
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <div className="text-base font-bold text-gray-900 dark:text-white">
              Q: CPU full word?
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {/* A1 - Correct Answer (with radio indicator) */}
            <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="text-sm text-gray-900 dark:text-white truncate">
                A1: Central Processing Unit
              </div>
            </div>

            {/* A2 */}
            <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded-full"></div>
              <div className="text-sm text-gray-900 dark:text-white truncate">
                A2: Central Peppero
              </div>
            </div>

            {/* A3 */}
            <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded-full"></div>
              <div className="text-sm text-gray-900 dark:text-white truncate">
                A3: Cinnamon Peprik
              </div>
            </div>

            {/* A4 */}
            <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded-full"></div>
              <div className="text-sm text-gray-900 dark:text-white truncate">
                A4: Cloud Processing
              </div>
            </div>

            {/* A5 */}
            <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded-full"></div>
              <div className="text-sm text-gray-900 dark:text-white truncate">
                A5: Cappuccino Palm
              </div>
            </div>

            {/* A6 */}
            <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded-full"></div>
              <div className="text-sm text-gray-900 dark:text-white truncate">
                A6: Centre Processin
              </div>
            </div>

            {/* A7 */}
            <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded-full"></div>
              <div className="text-sm text-gray-900 dark:text-white truncate">
                A7: Crippling Pain Un
              </div>
            </div>

            {/* A8 */}
            <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded-full"></div>
              <div className="text-sm text-gray-900 dark:text-white truncate">
                A8: Corn Plantation
              </div>
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
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuestionDetail;