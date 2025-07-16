import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Save, Trash2, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

const EditQuestion = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const questionId = searchParams.get('id');
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState([]);
  const [correctAnswerId, setCorrectAnswerId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'CS', label: 'CS - Computer Science' },
    { value: 'ART', label: 'ART - Art History' },
    { value: 'BUS', label: 'BUS - Business' },
    { value: 'ARC', label: 'ARC - Architecture' },
    { value: 'MIS', label: 'MIS - Management Information Systems' },
    { value: 'ABA Bank', label: 'ABA Bank - ABA Banking' }
  ];

  // Mock data for questions
  const mockQuestions = {
    1: {
      id: 1,
      question: 'CPU full word?',
      category: 'CS',
      timeLimit: '30s',
      answers: [
        { id: 1, text: 'Central Processing Unit', isCorrect: true },
        { id: 2, text: 'Central Peppero', isCorrect: false },
        { id: 3, text: 'Cinnamon Peprik', isCorrect: false },
        { id: 4, text: 'Cloud Processing', isCorrect: false },
        { id: 5, text: 'Cappuccino Palm', isCorrect: false },
        { id: 6, text: 'Centre Processin', isCorrect: false },
        { id: 7, text: 'Crippling Pain Un', isCorrect: false },
        { id: 8, text: 'Corn Plantation', isCorrect: false }
      ]
    }
  };

  const currentQuestion = mockQuestions[questionId] || mockQuestions[1];

  useEffect(() => {
    setSelectedCategory(currentQuestion.category);
    setTimeLimit(currentQuestion.timeLimit);
    setQuestionText(currentQuestion.question);
    setAnswers(currentQuestion.answers);
    const correctAnswer = currentQuestion.answers.find(a => a.isCorrect);
    if (correctAnswer) {
      setCorrectAnswerId(correctAnswer.id);
    }
  }, [questionId]);

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

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving question:', {
        id: questionId,
        category: selectedCategory,
        timeLimit,
        question: questionText,
        answers,
        correctAnswerId
      });
      navigate(`/host/questionbank/questions/view?id=${questionId}`);
    } catch (error) {
      console.error('Error saving question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/host/questionbank/questions/view?id=${questionId}`);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Deleting question:', questionId);
      setShowDeleteDialog(false);
      navigate('/host/questionbank/questions');
    } catch (error) {
      console.error('Error deleting question:', error);
    } finally {
      setIsLoading(false);
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
              className="p-2 hover:bg-white/50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Question</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Update question details</p>
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
        <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="p-6 space-y-6">
            {/* Category and Time Limit Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
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
                <Label htmlFor="time-limit" className="text-sm font-medium text-gray-700">
                  Time Limit
                </Label>
                <Input
                  id="time-limit"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  placeholder="e.g., 30s"
                  className={`${errors.timeLimit ? 'border-red-500' : ''}`}
                />
                {errors.timeLimit && (
                  <p className="text-red-500 text-xs">{errors.timeLimit}</p>
                )}
              </div>
            </div>

            {/* Question Author (Read-only) */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Question Author
              </Label>
              <div className="p-3 bg-gray-50 rounded-md border">
                <p className="text-sm text-gray-600">Sovitep [Admin] (You)</p>
              </div>
            </div>

            {/* Question Input */}
            <div className="space-y-2">
              <Label htmlFor="question" className="text-sm font-medium text-gray-700">
                Question <span className="text-red-500">*</span>
              </Label>
              <Input
                id="question"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter your question here"
                className={`${errors.question ? 'border-red-500' : ''}`}
              />
              {errors.question && (
                <p className="text-red-500 text-xs">{errors.question}</p>
              )}
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Answer Options <span className="text-red-500">*</span>
              </Label>
              {errors.answers && (
                <p className="text-red-500 text-xs">{errors.answers}</p>
              )}
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3">
                {answers.map((answer, index) => (
                  <div key={answer.id} className="flex items-center gap-3">
                    <div className="flex-1">
                      <Input
                        value={answer.text}
                        onChange={(e) => handleAnswerChange(answer.id, e.target.value)}
                        placeholder={`A${index + 1}: Enter answer option`}
                        className="text-sm bg-white"
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
              <p className="text-xs text-gray-500">
                Select the radio button next to the correct answer
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
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
                Delete Question
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                Are you sure you want to delete this question?
                <br /><br />
                <span className="font-semibold text-gray-900">"{questionText}"</span>
                <br /><br />
                <span className="text-red-600 font-medium">
                  This action cannot be undone.
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
                  'Delete Question'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default EditQuestion;