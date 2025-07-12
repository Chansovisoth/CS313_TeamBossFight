import React, { useState } from 'react';
import { Menu, Eye, EyeOff } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EditProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

          {/* Form Fields */}
          <div className="space-y-4 mb-6">
            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="User1@gmail.com"
                className="mt-1 w-full"
              />
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  defaultValue="12345678"
                  className="w-full pr-10"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                Confirm Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  defaultValue="12345678"
                  className="w-full pr-10"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
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

export default EditProfile;