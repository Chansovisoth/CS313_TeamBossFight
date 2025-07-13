import React from 'react';
import { Menu, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const EditQuestion = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Question</h1>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-8 h-8 p-0 group"
            >
              <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400" />
            </Button>
          </div>

          {/* Category and Time Limit Row */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <Label htmlFor="category-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Category name
              </Label>
              <Input
                id="category-name"
                type="text"
                defaultValue="CS"
                className="mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="time-limit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Time limit
              </Label>
              <Input
                id="time-limit"
                type="text"
                defaultValue="30s"
                className="mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Question Author */}
          <div className="mb-4">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Question Author
            </Label>
            <div className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
              Sovitep (You)
            </div>
          </div>

          {/* Question Input */}
          <div className="mb-4">
            <Label htmlFor="question" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Q: CPU full word?<span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="question"
              type="text"
              defaultValue="CPU full word?"
              className="mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>

          {/* Answer Options */}
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-6 bg-gray-50 dark:bg-gray-700/50">
            <div className="space-y-2">
              {/* A1 - Correct Answer */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    defaultValue="A1: Central Processing Unit"
                    className="text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white truncate"
                  />
                </div>
                <input
                  type="radio"
                  name="correct-answer"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500 focus:ring-blue-500 dark:focus:ring-blue-600"
                />
              </div>

              {/* A2 */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    defaultValue="A2: Central Peppero"
                    className="text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white truncate"
                  />
                </div>
                <input
                  type="radio"
                  name="correct-answer"
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500 focus:ring-blue-500 dark:focus:ring-blue-600"
                />
              </div>

              {/* A3 */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    defaultValue="A3: Cinnamon Peprik"
                    className="text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white truncate"
                  />
                </div>
                <input
                  type="radio"
                  name="correct-answer"
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500 focus:ring-blue-500 dark:focus:ring-blue-600"
                />
              </div>

              {/* A4 */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    defaultValue="A4: Cloud Processing"
                    className="text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white truncate"
                  />
                </div>
                <input
                  type="radio"
                  name="correct-answer"
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500 focus:ring-blue-500 dark:focus:ring-blue-600"
                />
              </div>

              {/* A5 */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    defaultValue="A5: Cappuccino Palm"
                    className="text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white truncate"
                  />
                </div>
                <input
                  type="radio"
                  name="correct-answer"
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500 focus:ring-blue-500 dark:focus:ring-blue-600"
                />
              </div>

              {/* A6 */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    defaultValue="A6: Centre Processin"
                    className="text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white truncate"
                  />
                </div>
                <input
                  type="radio"
                  name="correct-answer"
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500 focus:ring-blue-500 dark:focus:ring-blue-600"
                />
              </div>

              {/* A7 */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    defaultValue="A7: Crippling Pain Un"
                    className="text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white truncate"
                  />
                </div>
                <input
                  type="radio"
                  name="correct-answer"
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500 focus:ring-blue-500 dark:focus:ring-blue-600"
                />
              </div>

              {/* A8 */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    defaultValue="A8: Corn Plantation"
                    className="text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white truncate"
                  />
                </div>
                <input
                  type="radio"
                  name="correct-answer"
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500 focus:ring-blue-500 dark:focus:ring-blue-600"
                />
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
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;