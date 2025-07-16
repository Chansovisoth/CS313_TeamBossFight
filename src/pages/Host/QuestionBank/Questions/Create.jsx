import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CreateQuestion = () => {
  const navigate = useNavigate();
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState([
    { id: 1, text: '', isCorrect: false },
    { id: 2, text: '', isCorrect: false },
    { id: 3, text: '', isCorrect: false },
    { id: 4, text: '', isCorrect: false },
    { id: 5, text: '', isCorrect: false },
    { id: 6, text: '', isCorrect: false },
    { id: 7, text: '', isCorrect: false },
    { id: 8, text: '', isCorrect: false }
  ]);
  const [correctAnswerId, setCorrectAnswerId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'CS', label: 'CS - Computer Science' },
    { value: 'ART', label: 'ART - Art History' },
    { value: 'BUS', label: 'BUS - Business' },
    { value: 'ARC', label: 'ARC - Architecture' },
    { value: 'MIS', label: 'MIS - Management Information Systems' },
    { value: 'ABA Bank', label: 'ABA Bank - ABA Banking' }
  ];

  const handleAnswerChange = (answerId, newText) => {
    setAnswers(prev => prev.map(answer => 
      answer.id === answerId ? { ...answer, text: newText } : answer
    ));
  };

  const handleCorrectAnswerChange = (answerId) => {
    setCorrectAnswerId(parseInt(answerId));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!selectedCategory) {
      newErrors.category = 'Category is required';
    }
    
    if (!timeLimit.trim()) {
      newErrors.timeLimit = 'Time limit is required';
    }
    
    if (!questionText.trim()) {
      newErrors.question = 'Question text is required';
    }
    
    const hasEmptyAnswers = answers.some(answer => !answer.text.trim());
    if (hasEmptyAnswers) {
      newErrors.answers = 'All answer options must be filled';
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
      console.log('Creating question:', {
        category: selectedCategory,
        timeLimit,
        question: questionText,
        answers,
        correctAnswerId
      });
      navigate('/host/questionbank/questions');
    } catch (error) {
      console.error('Error creating question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/host/questionbank/questions');
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Question</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Add a new question to the bank</p>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="p-6 space-y-6">
            {/* Category and Time Limit Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className={`${errors.category ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-500 text-xs">{errors.category}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time-limit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Time Limit <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="time-limit"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  placeholder="e.g., 30s"
                  className={`${errors.timeLimit ? 'border-red-500' : ''} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                />
                {errors.timeLimit && (
                  <p className="text-red-500 text-xs">{errors.timeLimit}</p>
                )}
              </div>
            </div>

            {/* Question Author (Read-only) */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Question Author
              </Label>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-600 dark:text-gray-400">Sovitep [Admin] (You)</p>
              </div>
            </div>

            {/* Question Input */}
            <div className="space-y-2">
              <Label htmlFor="question" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Question <span className="text-red-500">*</span>
              </Label>
              <Input
                id="question"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter your question here"
                className={`${errors.question ? 'border-red-500' : ''} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              />
              {errors.question && (
                <p className="text-red-500 text-xs">{errors.question}</p>
              )}
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Answer Options <span className="text-red-500">*</span>
              </Label>
              {errors.answers && (
                <p className="text-red-500 text-xs">{errors.answers}</p>
              )}
              
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 space-y-3">
                {answers.map((answer, index) => (
                  <div key={answer.id} className="flex items-center gap-3">
                    <div className="flex-1">                        <Input
                          value={answer.text}
                          onChange={(e) => handleAnswerChange(answer.id, e.target.value)}
                          placeholder={`A${index + 1}: Enter answer option`}
                          className="text-sm bg-white dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        />
                    </div>
                    <input
                      type="radio"
                      name="correct-answer"
                      value={answer.id}
                      checked={correctAnswerId === answer.id}
                      onChange={(e) => handleCorrectAnswerChange(e.target.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Select the radio button next to the correct answer
              </p>
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
                className="flex items-center gap-2 flex-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {isLoading ? 'Creating...' : 'Create Question'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateQuestion;
