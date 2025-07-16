import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Edit3, Trash2, Grid3X3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/api';
import { useAuth } from '@/context/useAuth';
import { toast } from 'sonner';

const QuestionBankView = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const itemsPerPage = 8;

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      const errorMessage = err.response?.data?.message || 'Failed to fetch categories';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDeleteCategory = async (categoryId) => {
    if (!canEditCategory(categories.find(c => c.id === categoryId))) return;
    
    setDeleting(categoryId);
    try {
      await apiClient.delete(`/categories/${categoryId}`);
      toast.success('Category deleted successfully');
      setCategories(categories.filter(c => c.id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete category';
      toast.error(errorMessage);
    } finally {
      setDeleting(null);
    }
  };

  // Check if user can edit category
  const canEditCategory = (category) => {
    return user?.role === 'admin' || category.authorId === user?.id;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleAddNew = () => {
    navigate('/host/questionbank/categories/create');
  };

  const handleBack = () => {
    navigate('/host/events/view');
  };

  const handleEdit = (id) => {
    navigate(`/host/questionbank/categories/edit/${id}`);
  };

  const handleCategoryClick = (categoryName) => {
    // Navigate to questions view for this category
    navigate(`/host/questionbank/questions/view?category=${categoryName}`);
  };

  // Filter categories based on search query
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current data for categories only
  const currentData = filteredCategories;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = currentData.slice(startIndex, endIndex);

  
  const getAuthorBadgeColor = (author) => {
    if (author.includes('[Admin]')) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (author.includes('[Host]')) return 'bg-purple-100 text-purple-700 border-purple-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        {/* Header */}
        <Card className="mb-4 border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage your question categories</p>
                </div>
              </div>
              <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Card className="mb-4 border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 h-9 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
          </CardContent>
        </Card>

        {/* Content Area */}
        {loading ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading categories...</p>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchCategories} variant="outline">Try Again</Button>
            </CardContent>
          </Card>
        ) : paginatedData.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Grid3X3 className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                No Categories Found
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                {searchQuery ? 'Try adjusting your search criteria.' : 'No categories have been created yet.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-6">
            {paginatedData.map((category) => (
              <Card key={category.id} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer"
                    onClick={() => handleCategoryClick(category.name)}>
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">{category.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {category.questionsCount || 0} questions
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {canEditCategory(category) && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(category.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      )}
                      {canEditCategory(category) && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCategory(category.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0 text-red-600 hover:text-red-700"
                          disabled={deleting === category.id}
                        >
                          {deleting === category.id ? (
                            <div className="h-3 w-3 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {startIndex + 1} to {Math.min(endIndex, currentData.length)} of {currentData.length} categories
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuestionBankView;
