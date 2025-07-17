// Mock data service for boss and questions
const { v4: uuidv4 } = require('uuid');

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock boss data
const mockBosses = [
  {
    id: "boss_001",
    name: "The Algorithm Master",
    image: "/src/assets/Placeholder/Falcon.png",
    description: "A powerful boss who masters all computer science algorithms",
    baseHealth: 30,
    cooldown_duration: 300,
    max_teams: 8,
    creator_id: "admin_001",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "boss_002", 
    name: "Data Structure Demon",
    image: "/src/assets/Placeholder/ThePredator.png",
    description: "A fierce boss who controls all data structures",
    baseHealth: 30,
    cooldown_duration: 300,
    max_teams: 8,
    creator_id: "admin_001",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "boss_003",
    name: "Network Nightmare",
    image: "/src/assets/Placeholder/Tricera.png", 
    description: "A terrifying boss who dominates computer networks",
    baseHealth: 30,
    cooldown_duration: 300,
    max_teams: 8,
    creator_id: "admin_001",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Mock questions pool
const mockQuestions = [
  {
    questionId: 1,
    categoryId: 1,
    questionText: "What does PIU stand for?",
    timeLimitSeconds: 30,
    authorId: 1,
    answerOptions: [
      "Paragon International University",
      "Programmers in Uniform", 
      "Placeholder In Underway",
      "Pain In Utopia"
    ],
    correctAnswerText: "Paragon International University"
  },
  {
    questionId: 2,
    categoryId: 1,
    questionText: "Which of the following is a programming language?",
    timeLimitSeconds: 30,
    authorId: 1,
    answerOptions: [
      "HTML",
      "CSS",
      "JavaScript",
      "SQL"
    ],
    correctAnswerText: "JavaScript"
  },
  {
    questionId: 3,
    categoryId: 1,
    questionText: "What does CPU stand for?",
    timeLimitSeconds: 30,
    authorId: 1,
    answerOptions: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Personal Unit",
      "Computer Processing Unit"
    ],
    correctAnswerText: "Central Processing Unit"
  },
  {
    questionId: 4,
    categoryId: 1,
    questionText: "Which data structure follows LIFO principle?",
    timeLimitSeconds: 30,
    authorId: 1,
    answerOptions: [
      "Queue",
      "Stack",
      "Array",
      "LinkedList"
    ],
    correctAnswerText: "Stack"
  },
  {
    questionId: 5,
    categoryId: 1,
    questionText: "What is the time complexity of binary search?",
    timeLimitSeconds: 30,
    authorId: 1,
    answerOptions: [
      "O(n)",
      "O(log n)",
      "O(n²)",
      "O(1)"
    ],
    correctAnswerText: "O(log n)"
  },
  {
    questionId: 6,
    categoryId: 1,
    questionText: "Which sorting algorithm has the best average time complexity?",
    timeLimitSeconds: 30,
    authorId: 1,
    answerOptions: [
      "Bubble Sort",
      "Quick Sort",
      "Selection Sort",
      "Insertion Sort"
    ],
    correctAnswerText: "Quick Sort"
  },
  {
    questionId: 7,
    categoryId: 1,
    questionText: "What does HTTP stand for?",
    timeLimitSeconds: 30,
    authorId: 1,
    answerOptions: [
      "HyperText Transfer Protocol",
      "High Transfer Text Protocol",
      "HyperText Transport Protocol",
      "Home Transfer Text Protocol"
    ],
    correctAnswerText: "HyperText Transfer Protocol"
  },
  {
    questionId: 8,
    categoryId: 1,
    questionText: "Which language is primarily used for web development?",
    timeLimitSeconds: 30,
    authorId: 1,
    answerOptions: [
      "Python",
      "Java",
      "JavaScript",
      "C++"
    ],
    correctAnswerText: "JavaScript"
  },
  {
    questionId: 9,
    categoryId: 1,
    questionText: "What is the purpose of a database index?",
    timeLimitSeconds: 30,
    authorId: 1,
    answerOptions: [
      "To store data",
      "To speed up queries",
      "To backup data",
      "To encrypt data"
    ],
    correctAnswerText: "To speed up queries"
  },
  {
    questionId: 10,
    categoryId: 1,
    questionText: "Which protocol is used for secure web communication?",
    timeLimitSeconds: 30,
    authorId: 1,
    answerOptions: [
      "HTTP",
      "HTTPS",
      "FTP",
      "SMTP"
    ],
    correctAnswerText: "HTTPS"
  },
  {
    questionId: 11,
    categoryId: 1,
    questionText: "What does API stand for?",
    timeLimitSeconds: 30,
    authorId: 1,
    answerOptions: [
      "Application Programming Interface",
      "Automated Program Integration",
      "Advanced Programming Interface",
      "Application Process Integration"
    ],
    correctAnswerText: "Application Programming Interface"
  },
  {
    questionId: 12,
    categoryId: 1,
    questionText: "Which of these is a NoSQL database?",
    timeLimitSeconds: 30,
    authorId: 1,
    answerOptions: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "SQLite"
    ],
    correctAnswerText: "MongoDB"
  }
];

// Mock async functions
class MockDataService {
  static async getBossData(bossId = "boss_001") {
    console.log(`📊 Fetching boss data for: ${bossId}`);
    await delay(100); // Simulate network delay
    
    const boss = mockBosses.find(b => b.id === bossId) || mockBosses[0];
    console.log(`✅ Boss data fetched: ${boss.name}`);
    return boss;
  }

  static async getQuestionsPool(categoryId = 1) {
    console.log(`📊 Fetching questions pool for category: ${categoryId}`);
    await delay(150); // Simulate network delay
    
    const questions = mockQuestions.filter(q => q.categoryId === categoryId);
    console.log(`✅ Questions pool fetched: ${questions.length} questions`);
    return questions;
  }

  static async getRandomBoss() {
    console.log(`📊 Fetching random boss`);
    await delay(100);
    
    const randomBoss = mockBosses[Math.floor(Math.random() * mockBosses.length)];
    console.log(`✅ Random boss fetched: ${randomBoss.name}`);
    return randomBoss;
  }

  static async validateAnswer(questionId, answer) {
    console.log(`📊 Validating answer for question: ${questionId}`);
    await delay(50); // Simulate validation delay
    
    const question = mockQuestions.find(q => q.questionId === questionId);
    if (!question) {
      console.log(`❌ Question not found: ${questionId}`);
      return { valid: false, correct: false };
    }
    
    const isCorrect = question.correctAnswerText === answer;
    console.log(`✅ Answer validation: ${isCorrect ? 'Correct' : 'Wrong'}`);
    return { 
      valid: true, 
      correct: isCorrect,
      correctAnswer: question.correctAnswerText 
    };
  }

  // Utility function to shuffle array
  static shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Get shuffled questions for a player
  static async getShuffledQuestions(playerId, categoryId = 1) {
    console.log(`📊 Getting shuffled questions for player: ${playerId}`);
    await delay(100);
    
    const allQuestions = await this.getQuestionsPool(categoryId);
    const shuffled = this.shuffleArray(allQuestions);
    
    console.log(`✅ Shuffled questions for ${playerId}: ${shuffled.length} questions`);
    return shuffled;
  }
}

module.exports = MockDataService;
