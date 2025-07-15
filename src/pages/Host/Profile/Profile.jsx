// ===== LIBRARIES ===== //
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Camera, Edit, Save, X, Eye, EyeOff, ArrowLeft } from "lucide-react";

// ===== COMPONENTS (Shadcn.ui) ===== //
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const HostProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    profilePic: "/src/assets/Placeholder/host-profile.jpg",
    username: "HostOne",
    email: "host.one@example.com",
    password: "••••••••",
    uuid: "fcae3bf-2870-4848-8e78-2205a41a"
  });
  
  const [editData, setEditData] = useState({
    profilePic: profileData.profilePic,
    username: profileData.username,
    email: profileData.email,
    password: "",
    confirmPassword: ""
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      profilePic: profileData.profilePic,
      username: profileData.username,
      email: profileData.email,
      password: '',
      confirmPassword: ''
    });
  };

  const handleSave = () => {
    // Validation
    if (editData.password && editData.password !== editData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // Update data
    setProfileData(prev => ({
      ...prev,
      username: editData.username,
      email: editData.email,
      ...(editData.password && { password: '••••••••' })
    }));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditData({
      profilePic: profileData.profilePic,
      username: profileData.username,
      email: profileData.email,
      password: '',
      confirmPassword: ''
    });
    setIsEditing(false);
  };

  const handleBack = () => {
    navigate('/host/events/view');
  };

  const isPasswordValid = editData.password.length >= 8;
  const doPasswordsMatch = editData.password === editData.confirmPassword;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Profile Picture Card */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profileData.profilePic} alt={profileData.username} />
                    <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      {profileData.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="text-center space-y-1">
                  <h3 className="font-semibold text-lg">{profileData.username}</h3>
                  <p className="text-sm text-muted-foreground">
                    UUID: {profileData.uuid}
                  </p>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Host
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Account Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Username
                  </Label>
                  {isEditing ? (
                    <Input
                      id="username"
                      value={editData.username}
                      onChange={(e) => setEditData(prev => ({ ...prev, username: e.target.value }))}
                    />
                  ) : (
                    <div className="p-2 bg-muted rounded-md">
                      {profileData.username}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  ) : (
                    <div className="p-2 bg-muted rounded-md">
                      {profileData.email}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  {isEditing ? (
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={editData.password}
                        onChange={(e) => setEditData(prev => ({ ...prev, password: e.target.value }))}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="p-2 bg-muted rounded-md">
                      {profileData.password}
                    </div>
                  )}
                </div>

                {/* Confirm Password (only when editing) */}
                {isEditing && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your new password"
                        value={editData.confirmPassword}
                        onChange={(e) => setEditData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Password Requirements (only when editing) */}
                {isEditing && (
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-sm font-medium mb-2">Password Requirements:</p>
                    <ul className="text-xs space-y-1">
                      <li className={`flex items-center gap-2 ${isPasswordValid ? 'text-green-600' : 'text-muted-foreground'}`}>
                        • At least 8 characters long
                      </li>
                      <li className="text-muted-foreground">
                        • Leave blank to keep current password
                      </li>
                      <li className={`flex items-center gap-2 ${doPasswordsMatch ? 'text-green-600' : 'text-muted-foreground'}`}>
                        • Confirm password must match
                      </li>
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  {isEditing ? (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={handleCancel}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSave}
                        className="flex-1"
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={handleBack}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button 
                        onClick={handleEdit}
                        className="flex-1 flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;