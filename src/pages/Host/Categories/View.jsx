import React, { useState } from 'react';
import { Menu, Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const QuestionBankView = () => {
  const [viewMode, setViewMode] = useState('category');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Static data
  const categories = [
    { name: 'ARC', author: 'Chanreach [Admin]' },
    { name: 'ART', author: 'Sovitep [Admin]' },
    { name: 'BUS', author: 'Chanreach [Admin]' },
    { name: 'CS', author: 'Sovitep [Admin]' },
    { name: 'MIS', author: 'Sovitep [Admin]' },
    { name: 'ABA Bank', author: 'Chomroeun [Host]' }
  ];

  const questions = [
    { question: 'CPU full word?', tag: 'CS', author: 'Sovitep [Admin]' },
    { question: 'What is database?', tag: 'CS', author: 'Chanreach [Admin]' },
    { question: 'Why use MIS?', tag: 'MIS', author: 'Chanreach [Admin]' },
    { question: 'How to code?', tag: 'CS', author: 'Sovitep [Admin]' },
    { question: 'Is programming hard?', tag: 'CS', author: 'Sovitep [Admin]' },
    { question: 'What is marketing?', tag: 'BUS', author: 'Jerry [Admin]' },
    { question: 'Define architecture', tag: 'ARC', author: 'Chanreach [Admin]' },
    { question: 'Art history basics', tag: 'ART', author: 'Sovitep [Admin]' }
  ];

  const handleViewModeChange = (e) => {
    setViewMode(e.target.value);
    setSearchQuery(''); // Clear search when switching modes
    setCategoryFilter(''); // Clear category filter when switching modes
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  // Filter categories based on search query (for category view)
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter questions based on search query AND category filter (for question view)
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === '' || 
                           question.tag.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Get current data based on view mode
  const currentData = viewMode === 'category' ? filteredCategories : filteredQuestions;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Question Bank</h1>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="w-8 h-8 p-0 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Filter Controls */}
          <div className="flex gap-4 mb-4">
            {/* View Mode Select */}
            <select
              value={viewMode}
              onChange={handleViewModeChange}
              className="w-32 h-10 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            >
              <option value="category">Category</option>
              <option value="question">Question</option>
            </select>

            {/* Search Input */}
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder={viewMode === 'category' ? 'Search categories' : 'Search questions'}
                value={searchQuery}
                onChange={handleSearchChange}
                className="pr-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            </div>
          </div>

          {/* Category Filter (Only for Question view) */}
          {viewMode === 'question' && (
            <div className="flex items-center justify-between mb-4">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Category:
              </Label>
              <Input
                type="text"
                placeholder="Filter by tag (e.g., CS, MIS)"
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
                className="w-48 h-8 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>
          )}

          {/* Content Area */}
          {currentData.length === 0 ? (
            // Empty State
            <div className="text-center mt-12 mb-12">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No {viewMode === 'category' ? 'Categories' : 'Questions'} Found
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {searchQuery || categoryFilter
                  ? 'Try adjusting your search or filter criteria'
                  : `No ${viewMode === 'category' ? 'categories' : 'questions'} available`
                }
              </p>
            </div>
          ) : viewMode === 'category' ? (
            <>
              {/* Categories Header */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="text-sm font-medium text-gray-900 dark:text-white">Category</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white text-right">Author</div>
              </div>

              {/* Categories List */}
              <div className="space-y-3 mb-6">
                {filteredCategories.map((category, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-4 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-gray-300 dark:hover:border-gray-500 cursor-pointer bg-white dark:bg-gray-700"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {category.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
                      {category.author}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Questions Header */}
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-sm font-medium text-gray-900 dark:text-white">Question</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white text-center">Tag</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white text-right">Author</div>
              </div>

              {/* Questions List */}
              <div className="space-y-3 mb-6">
                {filteredQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-gray-300 dark:hover:border-gray-500 cursor-pointer bg-white dark:bg-gray-700"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {question.question}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      {question.tag}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
                      {question.author}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination - Only show if there's data */}
          {currentData.length > 0 && (
            <div className="flex items-center justify-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="w-8 h-8 p-0 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Button 
                size="sm"
                className="w-8 h-8 p-0 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                1
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="w-8 h-8 p-0 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                2
              </Button>
              
              <span className="text-sm text-gray-500 dark:text-gray-400 px-2">…</span>
              
              <Button 
                variant="outline" 
                size="sm"
                className="w-8 h-8 p-0 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                8
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="w-8 h-8 p-0 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionBankView;