import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft,
  Filter,
  Grid3X3,
  List,
  Edit3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { apiClient } from '@/api';
import { useAuth } from '@/context/useAuth';
import { toast } from 'sonner';

const QuestionsIndex = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [viewMode] = useState('question'); // Always question view for this component
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;

  // Check for category filter from URL params on component mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setCategoryFilter(categoryFromUrl);
    }
    fetchCategories();
    fetchQuestions();
  }, [searchParams]);

  const handleViewModeChange = (value) => {
    if (value === 'category') {
      navigate('/host/questionbank/categories/view');
    } else if (value === 'question') {
      navigate('/host/questionbank/questions');
    }
  };

  const handleBack = () => {
    navigate('/host/questionbank/categories/view');
  };

  const handleAddNew = () => {
    // Pass the current category filter to the create page if one is active
    const createUrl = categoryFilter && categoryFilter !== 'all' 
      ? `/host/questionbank/questions/create?category=${encodeURIComponent(categoryFilter)}`
      : '/host/questionbank/questions/create';
    navigate(createUrl);
  };

  const handleQuestionClick = (questionId) => {
    navigate(`/host/questionbank/questions/view?id=${questionId}`);
  };

  const handleEdit = (questionId) => {
    navigate(`/host/questionbank/questions/edit?id=${questionId}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryFilterChange = (value) => {
    setCategoryFilter(value === 'all' ? '' : value);
    setCurrentPage(1);
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/categories');
      const categoriesData = response.data?.categories || response.data;
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      const errorMessage = err.response?.data?.message || 'Failed to fetch categories';
      toast.error(errorMessage);
    }
  };

  // Fetch questions from API
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/questions');
      
      // Extract questions from response object
      const questionsData = response.data?.questions || response.data;
      setQuestions(Array.isArray(questionsData) ? questionsData : []);
    } catch (err) {
      console.error('Error fetching questions:', err);
      const errorMessage = err.response?.data?.message || 'Failed to fetch questions';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Get author name from question
  const getQuestionAuthor = (question) => {
    if (question.creator?.username) {
      return `${question.creator.username} [${user?.role === 'admin' ? 'Admin' : 'Host'}]`;
    }
    return 'Unknown';
  };

  // Check if user can edit question
  const canEditQuestion = (question) => {
    // Admin can edit any question
    if (user?.role === 'admin') {
      return true;
    }
    // User can only edit their own questions
    return question.creator?.id === user?.id;
  };

  // Filter questions based on search query AND category filter
  const filteredQuestions = (questions || []).filter(question => {
    const matchesSearch = question.questionText?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === '' || categoryFilter === 'all' || question.category?.name === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Get current data for pagination
  const currentData = filteredQuestions;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = currentData.slice(startIndex, endIndex);

  const getAuthorBadgeColor = (author) => {
    return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-4 max-w-7xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 bg-primary rounded-full"></div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Question Bank
              </h1>
            </div>
          </div>
          <Button onClick={handleAddNew} className="flex items-center gap-2 shadow-sm text-sm">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Question</span>
          </Button>
        </div>

        {/* Controls */}
        <Card className="mb-4 border-0 shadow-sm">
          <CardContent className="p-3">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* View Mode Select */}
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  View:
                </Label>
                <Select value={viewMode} onValueChange={handleViewModeChange}>
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category">Categories</SelectItem>
                    <SelectItem value="question">Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 h-9 bg-white dark:bg-black border-gray-200 dark:border-gray-700 dark:text-white"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <Select value={categoryFilter === '' ? 'all' : categoryFilter} onValueChange={handleCategoryFilterChange}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Area */}
        {loading ? (
          // Loading State
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading questions...</p>
            </CardContent>
          </Card>
        ) : error ? (
          // Error State
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
              <Button onClick={fetchQuestions} variant="outline">Try Again</Button>
            </CardContent>
          </Card>
        ) : paginatedData.length === 0 ? (
          // Empty State
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-muted rounded-full flex items-center justify-center">
                <List className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                No Questions Found
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                {searchQuery || categoryFilter
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No questions have been created yet.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          // Questions List View - Compact Layout
          <div className="space-y-3 mb-6">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <Card className="border-0 shadow-sm">
                <CardHeader className="border-b bg-muted/50 py-1.5 px-4">
                  <div className="grid grid-cols-12 gap-3 text-sm font-semibold text-gray-800 dark:text-gray-200">
                    <div className="col-span-7">Question</div>
                    <div className="col-span-2 text-center">Category</div>
                    <div className="col-span-2 text-center">Author</div>
                    <div className="col-span-1 text-center">Edit</div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedData.map((question) => (
                      <div key={question.id} className="grid grid-cols-12 gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                           onClick={() => handleQuestionClick(question.id)}>
                        <div className="col-span-7">
                          <p className="font-medium text-sm text-gray-900 dark:text-white truncate" title={question.questionText}>
                            {question.questionText}
                          </p>
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                            {question.category?.name || 'No Category'}
                          </Badge>
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <Badge variant="outline" className={`text-xs px-1.5 py-0.5 ${getAuthorBadgeColor(getQuestionAuthor(question))}`}>
                            {getQuestionAuthor(question).split(' ')[0]}
                          </Badge>
                        </div>
                        <div className="col-span-1 flex justify-center">
                          {canEditQuestion(question) && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(question.id);
                              }}
                              className="h-7 w-7 p-0 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-2">
              {paginatedData.map((question) => (
                <Card key={question.id} className="border-0 shadow-sm" onClick={() => handleQuestionClick(question.id)}>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 dark:text-white leading-tight mb-1.5">
                          {question.questionText}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-1.5">
                          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                            {question.category?.name || 'No Category'}
                          </Badge>
                          <Badge variant="outline" className={`text-xs px-1.5 py-0.5 ${getAuthorBadgeColor(getQuestionAuthor(question))}`}>
                            {getQuestionAuthor(question).split(' ')[0]}
                          </Badge>
                        </div>
                      </div>
                      {canEditQuestion(question) && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(question.id);
                          }}
                          className="h-7 w-7 p-0 flex-shrink-0 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Pagination - Compact */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-700 dark:text-gray-300 text-center sm:text-left">
              Showing {startIndex + 1} to {Math.min(endIndex, currentData.length)} of {currentData.length} results
            </p>
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="h-7 w-7 p-0"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              
              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                const page = currentPage <= 2 ? i + 1 : currentPage - 1 + i;
                if (page > totalPages) return null;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="h-7 w-7 p-0 text-xs"
                  >
                    {page}
                  </Button>
                );
              })}
              
              {totalPages > 3 && currentPage < totalPages - 1 && (
                <span className="text-gray-400 text-xs px-1">...</span>
              )}
              
              <Button 
                variant="outline" 
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="h-7 w-7 p-0"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsIndex;