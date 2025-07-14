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

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    profilePic: "/src/assets/Placeholder/Profile1.jpg",
    username: "PlayerOne",
    email: "player.one@example.com",
    password: "••••••••",
    uuid: "fcaac3bf-2870-48d8-8e70-2205a41a"
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
      password: "",
      confirmPassword: ""
    });
  };

  const handleSave = () => {
    // Validation
    if (editData.password && editData.password !== editData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    if (editData.password.length > 0 && editData.password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    // Update profile data
    setProfileData({
      profilePic: editData.profilePic,
      username: editData.username,
      email: editData.email,
      password: editData.password ? "••••••••" : profileData.password
    });
    
    setIsEditing(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleBack = () => {
    navigate("/"); // Go to home page
  };

  const handleCancel = () => {
    setIsEditing(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setEditData({
      profilePic: profileData.profilePic,
      username: profileData.username,
      email: profileData.email,
      password: "",
      confirmPassword: ""
    });
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('profilePic', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-3 sm:p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <Button onClick={handleBack} variant="outline" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ===== PROFILE PICTURE ===== */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-32 h-32 sm:w-40 sm:h-40">
                  <AvatarImage 
                    src={isEditing ? editData.profilePic : profileData.profilePic} 
                    alt="Profile" 
                  />
                  <AvatarFallback className="text-2xl sm:text-3xl">
                    {(isEditing ? editData.username : profileData.username).charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold text-lg">
                  {isEditing ? editData.username : profileData.username}
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  UUID: {profileData.uuid}
                </p>
                <Badge variant="outline" className="mt-1">
                  Player
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ===== ACCOUNT INFORMATION ===== */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="Enter your username"
                  />
                ) : (
                  <Input
                    id="username"
                    value={profileData.username}
                    readOnly
                    className="bg-muted/60 border-muted text-muted-foreground cursor-default"
                  />
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
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                ) : (
                  <Input
                    id="email"
                    value={profileData.email}
                    readOnly
                    className="bg-muted/60 border-muted text-muted-foreground cursor-default"
                  />
                )}
              </div>

              <Separator />

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={editData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Enter new password"
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
                    
                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={editData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          placeholder="Confirm your new password"
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
                    
                    {editData.password && editData.confirmPassword && editData.password !== editData.confirmPassword && (
                      <p className="text-sm text-red-500">Passwords do not match</p>
                    )}
                  </div>
                ) : (
                  <Input
                    id="password"
                    type="password"
                    value={profileData.password}
                    readOnly
                    className="bg-muted/60 border-muted text-muted-foreground cursor-default font-mono tracking-wider"
                  />
                )}
              </div>

              {isEditing && (
                <>
                  <Separator />
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Password Requirements:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Leave blank to keep current password</li>
                      <li>• Confirm password must match</li>
                    </ul>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <Separator />
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleCancel} variant="outline" className="flex-1 flex items-center justify-center gap-2">
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2">
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleBack} variant="outline" className="flex-1 flex items-center justify-center gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleEdit} className="flex-1 flex items-center justify-center gap-2">
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
  );
};

export default Profile;
