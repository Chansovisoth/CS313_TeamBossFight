import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, ChevronDown, ArrowLeft, Sword, ImageIcon, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const EditBoss = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(['CS', 'MIS']);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('https://via.placeholder.com/300x200'); // Pre-existing image
  const [formData, setFormData] = useState({
    name: 'Boss1',
    cooldown: '30',
    teamsCount: '4',
    description: 'Cool boss 😎'
  });

  const availableCategories = [
    'ARC',
    'BUS', 
    'CE',
    'CS',
    'MIS',
    'Life is good'
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategorySelect = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
    setIsDropdownOpen(false);
  };

  const handleCategoryRemove = (categoryToRemove) => {
    setSelectedCategories(selectedCategories.filter(cat => cat !== categoryToRemove));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated form data:', formData, selectedCategories, selectedImage);
    navigate('/host/bosses/view');
  };

  const handleCancel = () => {
    navigate('/host/bosses/view');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this boss?')) {
      console.log('Boss deleted');
      navigate('/host/bosses/view');
    }
  };

  const unselectedCategories = availableCategories.filter(
    cat => !selectedCategories.includes(cat)
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Edit Boss</h1>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="flex items-center gap-2 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Boss Image
              </h3>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-border rounded-lg p-6 sm:p-8 text-center hover:border-primary/50 transition-colors bg-muted/30">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Boss preview"
                        className="w-full max-w-sm h-48 object-cover rounded-lg mx-auto"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setImagePreview(null);
                          setSelectedImage(null);
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-base sm:text-lg font-medium">Change Boss Image</p>
                        <p className="text-sm text-muted-foreground">
                          Click to browse or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Boss Details Section */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Sword className="h-5 w-5" />
                Boss Details
              </h3>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Boss Name and Cooldown */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="boss-name">Boss Name *</Label>
                  <Input
                    id="boss-name"
                    placeholder="Enter boss name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="boss-cooldown">Boss Cooldown (minutes)</Label>
                  <Input
                    id="boss-cooldown"
                    type="number"
                    placeholder="e.g., 30"
                    min="1"
                    value={formData.cooldown}
                    onChange={(e) => handleInputChange('cooldown', e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Categories - UNCHANGED */}
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Category
                </Label>
                
                <div className="relative">
                  {/* Category Display Bar with Tags and Dropdown Arrow */}
                  <div 
                    className="border border-gray-300 dark:border-gray-600 rounded-md p-3 min-h-[40px] flex flex-wrap gap-2 items-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-700"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {/* Selected Category Tags */}
                    {selectedCategories.map((category) => (
                      <span 
                        key={category}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm rounded-md"
                      >
                        {category}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-red-600 dark:hover:text-red-400" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategoryRemove(category);
                          }}
                        />
                      </span>
                    ))}
                    
                    {/* Placeholder when no categories selected */}
                    {selectedCategories.length === 0 && (
                      <span className="text-gray-500 dark:text-gray-400 text-sm">Select categories</span>
                    )}
                    
                    {/* Dropdown Arrow */}
                    <ChevronDown className={`w-4 h-4 text-gray-400 dark:text-gray-500 ml-auto transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Dropdown Options */}
                  {isDropdownOpen && unselectedCategories.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10">
                      {unselectedCategories.map((category) => (
                        <div
                          key={category}
                          className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-sm border-b border-gray-100 dark:border-gray-600 last:border-b-0 text-gray-900 dark:text-white"
                          onClick={() => handleCategorySelect(category)}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Number of Teams */}
              <div className="space-y-2">
                <Label htmlFor="teams-count">Number of Teams to Start</Label>
                <Input
                  id="teams-count"
                  type="number"
                  placeholder="Enter number"
                  min="1"
                  value={formData.teamsCount}
                  onChange={(e) => handleInputChange('teamsCount', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Boss Description</Label>
                <textarea
                  id="description"
                  placeholder="Describe the boss, its abilities, difficulty level..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none bg-background text-foreground placeholder:text-muted-foreground text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="w-full sm:w-auto sm:min-w-[120px]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto sm:min-w-[120px]"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBoss;