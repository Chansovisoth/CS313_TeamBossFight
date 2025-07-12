import React from 'react';
import { Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Menu className="w-6 h-6 text-gray-600 mr-3" />
            <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
          </div>

          {/* User Info Section */}
          <div className="flex items-start gap-4 mb-6">
            {/* Avatar */}
            <Avatar className="w-12 h-12">
              <AvatarImage src="" alt="User Avatar" />
              <AvatarFallback className="bg-blue-500 text-white">
                S
              </AvatarFallback>
            </Avatar>

            {/* User Details */}
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <h2 className="text-base font-medium text-gray-900">Sovitep</h2>
                <span className="text-sm text-muted-foreground">(Admin)</span>
              </div>
              <p className="text-xs text-muted-foreground">
                UUId: kaedsUt-eb10-4b47-b2eata
              </p>
            </div>
          </div>

          {/* Email Section */}
          <div className="mb-8">
            <Label className="text-sm font-medium text-gray-700 block mb-2">
              Email
            </Label>
            <p className="text-sm text-gray-900">User1@gmail.com</p>
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
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;