import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const QuestionsIndex = () => {
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleBack = () => {
    navigate('/host/questionbank/categories/view');
  };

  const handleAddNew = () => {
    navigate('/host/questionbank/questions/create');
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
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  // Categories for filter
  const categories = [
    { id: 1, name: 'ARC', fullName: 'Architecture' },
    { id: 2, name: 'ART', fullName: 'Art History' },
    { id: 3, name: 'BUS', fullName: 'Business' },
    { id: 4, name: 'CS', fullName: 'Computer Science' },
    { id: 5, name: 'MIS', fullName: 'Management Information Systems' },
    { id: 6, name: 'ABA Bank', fullName: 'ABA Banking' }
  ];

  // Mock data - Questions
  const questions = [
    { id: 1, question: 'What does CPU stand for?', tag: 'CS', difficulty: 'Easy', author: 'Sovitep [Admin]', timeLimit: '30s', lastModified: '2024-01-15' },
    { id: 2, question: 'What is a relational database?', tag: 'CS', difficulty: 'Medium', author: 'Chanreach [Admin]', timeLimit: '45s', lastModified: '2024-01-14' }, 
    { id: 3, question: 'Why do we use MIS in business?', tag: 'MIS', difficulty: 'Easy', author: 'Chanreach [Admin]', timeLimit: '30s', lastModified: '2024-01-13' },
    { id: 4, question: 'How do you implement object-oriented programming?', tag: 'CS', difficulty: 'Hard', author: 'Sovitep [Admin]', timeLimit: '60s', lastModified: '2024-01-12' },
    { id: 5, question: 'What are the principles of modern architecture?', tag: 'ARC', difficulty: 'Medium', author: 'Chanreach [Admin]', timeLimit: '45s', lastModified: '2024-01-11' },
    { id: 6, question: 'Describe Renaissance art characteristics', tag: 'ART', difficulty: 'Medium', author: 'Sovitep [Admin]', timeLimit: '40s', lastModified: '2024-01-10' },
    { id: 7, question: 'What is supply chain management?', tag: 'BUS', difficulty: 'Easy', author: 'Jerry [Admin]', timeLimit: '35s', lastModified: '2024-01-09' },
    { id: 8, question: 'How does machine learning work?', tag: 'CS', difficulty: 'Hard', author: 'Sovitep [Admin]', timeLimit: '90s', lastModified: '2024-01-08' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-black rounded-full"></div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Questions</h1>
            </div>
          </div>
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 dark:bg-black dark:hover:bg-gray-900"
          >
            <Plus className="h-4 w-4" />
            Create Question
          </button>
        </div>

        {/* Questions List */}
        <div className="space-y-3">
          {questions.map((question) => (
            <div 
              key={question.id} 
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleQuestionClick(question.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Q: {question.question}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded border border-gray-200 dark:border-gray-600">
                        {question.tag}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded border border-blue-200 dark:border-blue-700">
                        {question.author.split(' ')[0]}
                      </span>
                      <span className="px-2 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs rounded border border-blue-200 dark:border-blue-700">
                        {question.timeLimit}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      By {question.author}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuestionClick(question.id);
                  }}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-md transition-colors"
                  aria-label="View question"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionsIndex;                                                                                                                                            