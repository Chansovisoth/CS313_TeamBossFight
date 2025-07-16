import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Save, Trash2, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const EditCategory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('id');
  
  const [categoryName, setCategoryName] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock data - replace with actual API call
  const mockCategories = {
    1: { name: 'ARC', fullName: 'Architecture', author: 'Chanreach [Admin]' },
    2: { name: 'ART', fullName: 'Art History', author: 'Sovitep [Admin]' },
    3: { name: 'BUS', fullName: 'Business', author: 'Chanreach [Admin]' },
    4: { name: 'CS', fullName: 'Computer Science', author: 'Sovitep [Admin]' },
    5: { name: 'MIS', fullName: 'Management Information Systems', author: 'Sovitep [Admin]' },
    6: { name: 'ABA Bank', fullName: 'ABA Banking', author: 'Chomroeun [Host]' }
  };

  const currentCategory = mockCategories[categoryId] || mockCategories[4]; // Default to CS

  useEffect(() => {
    setCategoryName(currentCategory.name);
    setFullName(currentCategory.fullName);
  }, [categoryId]);

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

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving category:', { id: categoryId, name: categoryName, fullName: fullName });
      navigate('/host/questionbank/categories/view');
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/host/questionbank/categories/view');
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Deleting category:', categoryId);
      setShowDeleteDialog(false);
      navigate('/host/questionbank/categories/view');
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'categoryName') {
      setCategoryName(value);
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCancel}
              className="p-2 hover:bg-white/50 dark:hover:bg-gray-800/50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Category</h1>
              <p className="text-sm text-gray-600">Update category information</p>
            </div>
          </div>
          
          {/* Trash Icon - Top Right */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
            className="p-2 hover:bg-red-50 hover:text-red-600"
            disabled={isLoading}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <div className="p-6 space-y-6">
            {/* Form Fields */}
            <div className="space-y-4">
              {/* Category Name */}
              <div className="space-y-2">
                <Label htmlFor="categoryName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category Name (Short Code) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g., CS, ART, BUS"
                  maxLength={10}
                  className={`${errors.categoryName ? 'border-red-500 focus:border-red-500' : ''} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
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
                  onChange={(e) => setFullName(e.target.value)}
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

              {/* Category Badge Preview - Below Input */}
              <div className="flex justify-center pt-2">
                <Badge 
                  className="bg-gray-600 text-white px-4 py-2 text-sm font-medium"
                >
                  {categoryName || currentCategory.name}
                </Badge>
              </div>

              {/* Author Info (Read-only) */}
              <div className="space-y-2 pt-4">
                <Label className="text-sm font-medium text-gray-700">
                  Created By
                </Label>
                <div className="p-3 bg-gray-50 rounded-md border">
                  <p className="text-sm text-gray-600">{currentCategory.author}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              {/* Cancel & Save Buttons */}
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="flex items-center gap-2 flex-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Delete Category
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                Are you sure you want to delete the category{' '}
                <span className="font-semibold text-gray-900">"{categoryName}"</span>?
                <br /><br />
                <span className="text-red-600 font-medium">
                  This action cannot be undone and will permanently remove all associated questions.
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel 
                onClick={() => setShowDeleteDialog(false)}
                disabled={isLoading}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Deleting...
                  </div>
                ) : (
                  'Delete Category'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default EditCategory;
