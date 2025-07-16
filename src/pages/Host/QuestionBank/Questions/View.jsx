import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Edit3, Trash2, AlertTriangle } from 'lucide-react';
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

const ViewQuestionDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Mock data for the specific question
  const mockQuestions = {
    1: {
      id: 1,
      question: 'CPU full word?',
      category: 'CS',
      categoryColor: 'bg-orange-500',
      author: 'Sovitep [Admin]',
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
    },
    2: {
      id: 2,
      question: 'What is HTML?',
      category: 'CS',
      categoryColor: 'bg-orange-500',
      author: 'Chanreach [Admin]',
      timeLimit: '25s',
      answers: [
        { id: 1, text: 'HyperText Markup Language', isCorrect: true },
        { id: 2, text: 'HyperText Making Language', isCorrect: false },
        { id: 3, text: 'Home Tool Markup Language', isCorrect: false },
        { id: 4, text: 'Hyperlink Text Markup Language', isCorrect: false },
        { id: 5, text: 'High Tech Modern Language', isCorrect: false },
        { id: 6, text: 'HyperText Multiple Language', isCorrect: false },
        { id: 7, text: 'Hardware Text Markup Language', isCorrect: false },
        { id: 8, text: 'HyperText Method Language', isCorrect: false }
      ]
    }
  };

  const question = mockQuestions[id] || mockQuestions[1]; // Default to question 1

  const handleBackClick = () => {
    navigate('/host/questionbank/questions');
  };

  const handleEditClick = () => {
    navigate(`/host/questionbank/questions/edit?id=${id}`);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Deleting question:', id);
      setShowDeleteDialog(false);
      navigate('/host/questionbank/questions');
    } catch (error) {
      console.error('Error deleting question:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackClick}
              className="p-2 hover:bg-white/50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">View Question</h1>
              <p className="text-sm text-gray-600">Question details and answers</p>
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

        {/* Main Content Card */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <div className="p-6 space-y-6">
            {/* Category and Time Limit */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Category
                </Label>
                <div className="mt-1">
                  <Badge className={`${question.categoryColor} text-white px-3 py-1 text-sm font-medium`}>
                    {question.category}
                  </Badge>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <Label className="text-sm font-medium text-gray-700">
                  Time Limit
                </Label>
                <div className="text-lg font-semibold text-gray-900 mt-1">
                  {question.timeLimit}
                </div>
              </div>
            </div>

            {/* Question Author */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Question Author
              </Label>
              <div className="text-sm font-semibold text-gray-900 mt-1">
                {question.author}
              </div>
            </div>

            {/* Question */}
            <div className="border-t pt-4">
              <Label className="text-sm font-medium text-gray-700">
                Question
              </Label>
              <div className="text-lg font-bold text-gray-900 mt-2 p-4 bg-gray-50 rounded-lg border">
                Q: {question.question}
              </div>
            </div>

            {/* Answer Options */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Answer Options
              </Label>
              <div className="space-y-2">
                {question.answers.map((answer, index) => (
                  <div 
                    key={answer.id}
                    className={`flex items-center gap-3 p-3 border rounded-lg transition-colors ${
                      answer.isCorrect 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    {/* Correct Answer Indicator */}
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      answer.isCorrect 
                        ? 'bg-green-500' 
                        : 'border-2 border-gray-300'
                    }`}>
                      {answer.isCorrect && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    
                    {/* Answer Text */}
                    <div className={`text-sm flex-1 ${
                      answer.isCorrect 
                        ? 'text-green-800 font-medium' 
                        : 'text-gray-900'
                    }`}>
                      A{index + 1}: {answer.text}
                    </div>
                    
                    {/* Correct Badge */}
                    {answer.isCorrect && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Correct
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleBackClick}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditClick}
                className="flex items-center gap-2 flex-1"
                disabled={isLoading}
              >
                <Edit3 className="h-4 w-4" />
                Edit
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
                <span className="font-semibold text-gray-900">"{question.question}"</span>
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

export default ViewQuestionDetail;