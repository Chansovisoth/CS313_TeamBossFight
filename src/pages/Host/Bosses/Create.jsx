import React, { useState } from 'react';
import { Upload, Menu, X, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const CreateBoss = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(['CS', 'MIS']); // Pre-selected for demo

  const availableCategories = [
    'ARC',
    'BUS', 
    'CE',
    'CS',
    'MIS',
    'Life is good'
  ];

  const handleCategorySelect = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
    setIsDropdownOpen(false);
  };

  const handleCategoryRemove = (categoryToRemove) => {
    setSelectedCategories(selectedCategories.filter(cat => cat !== categoryToRemove));
  };

  const unselectedCategories = availableCategories.filter(
    cat => !selectedCategories.includes(cat)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Menu className="w-6 h-6 text-gray-600 mr-3" />
            <h1 className="text-lg font-semibold text-gray-900">Create Boss</h1>
          </div>

          {/* Upload Boss Image */}
          <div className="mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 font-medium">Upload Boss Image</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Boss Name and Boss Cooldown Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="boss-name" className="text-sm font-medium text-gray-700">
                  Boss Name
                </Label>
                <Input
                  id="boss-name"
                  type="text"
                  placeholder="Enter boss name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="boss-cooldown" className="text-sm font-medium text-gray-700">
                  Boss Cooldown
                </Label>
                <Input
                  id="boss-cooldown"
                  type="text"
                  placeholder="00:00"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Category with Multi-Select Display */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Category
              </Label>
              
              <div className="relative">
                {/* Category Display Bar with Tags and Dropdown Arrow */}
                <div 
                  className="border border-gray-300 rounded-md p-3 min-h-[40px] flex flex-wrap gap-2 items-center cursor-pointer hover:border-gray-400"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {/* Selected Category Tags */}
                  {selectedCategories.map((category) => (
                    <span 
                      key={category}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-800 text-sm rounded-md"
                    >
                      {category}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-600" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryRemove(category);
                        }}
                      />
                    </span>
                  ))}
                  
                  {/* Placeholder when no categories selected */}
                  {selectedCategories.length === 0 && (
                    <span className="text-gray-500 text-sm">Select categories</span>
                  )}
                  
                  {/* Dropdown Arrow */}
                  <ChevronDown className={`w-4 h-4 text-gray-400 ml-auto transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Dropdown Options */}
                {isDropdownOpen && unselectedCategories.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {unselectedCategories.map((category) => (
                      <div
                        key={category}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Number of Teams to Start */}
            <div>
              <Label htmlFor="teams-count" className="text-sm font-medium text-gray-700">
                Number of Teams to Start
              </Label>
              <Input
                id="teams-count"
                type="number"
                placeholder="Enter number"
                min="1"
                className="mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <textarea
                id="description"
                rows={4}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter boss description..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button 
              variant="outline" 
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-black hover:bg-gray-800"
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBoss;