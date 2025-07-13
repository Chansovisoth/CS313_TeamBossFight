import React from 'react';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const View = () => {
  // Static user data
  const users = [
    { id: 1, username: 'Chansovisoth' },
    { id: 2, username: 'Sovitep' },
    { id: 3, username: 'Chanreach' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Assign Role</h1>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <Input
              type="text"
              placeholder="Search"
              className="pr-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          </div>

          {/* Username Section */}
          <div className="space-y-4">
            <Label className="text-base font-semibold text-gray-900 dark:text-white">
              Username
            </Label>

            {/* Conditional rendering based on users array */}
            {users.length > 0 ? (
              /* User List */
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between gap-2 border border-gray-200 dark:border-gray-600 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.username}
                    </span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs px-3 py-1 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="text-xs px-3 py-1 bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* No users message */
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  No Users Found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;