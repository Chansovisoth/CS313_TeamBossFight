import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CreateCategory = () => {
  const navigate = useNavigate();
  
  const [categoryName, setCategoryName] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!categoryName.trim()) {
      newErrors.categoryName = 'Category name is required';
    } else if (categoryName.length > 10) {
      newErrors.categoryName = 'Category name must be 10 characters or less';
    }

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.length > 50) {
      newErrors.fullName = 'Full name must be 50 characters or less';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Creating category:', {
        name: categoryName,
        fullName: fullName
      });
      navigate('/host/questionbank/categories/view');
    } catch (error) {
      console.error('Error creating category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/host/questionbank/categories/view');
  };

  const clearErrors = (field) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCancel}
            className="p-2 hover:bg-white/50 dark:hover:bg-gray-800/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Category</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Add a new category to organize questions</p>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-200 dark:border-gray-600">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Category Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            
            {/* Category Name (Short Code) */}
            <div className="space-y-2">
              <Label htmlFor="categoryName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Category Name (Short Code) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="categoryName"
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value.toUpperCase());
                  clearErrors('categoryName');
                }}
                placeholder="e.g., CS, ART, BUS"
                maxLength={10}
                className={`${errors.categoryName ? 'border-red-500 focus:border-red-500' : ''} dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-center text-lg`}
              />
              {errors.categoryName && (
                <p className="text-red-500 text-xs">{errors.categoryName}</p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {categoryName.length}/10 characters
              </p>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  clearErrors('fullName');
                }}
                placeholder="e.g., Computer Science, Art History, Business"
                maxLength={50}
                className={`${errors.fullName ? 'border-red-500 focus:border-red-500' : ''} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs">{errors.fullName}</p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {fullName.length}/50 characters
              </p>
            </div>

            {/* Author Info */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Category Author
              </Label>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-600 dark:text-gray-400">Sovitep</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                className="flex items-center gap-2 flex-1 bg-black hover:bg-gray-800 dark:bg-black dark:hover:bg-gray-900"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {isLoading ? 'Creating...' : 'Create Category'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateCategory;
