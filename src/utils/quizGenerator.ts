import { Quiz, QuizQuestion } from '../types';

/**
 * Mock AI Quiz Generator
 * Generates simple quizzes based on video topics
 */

const quizTemplates: { [key: string]: QuizQuestion[] } = {
  React: [
    {
      id: 'q1',
      question: 'What is the purpose of React Hooks?',
      options: [
        'To use state in functional components',
        'To style components',
        'To create classes',
        'To manage routing',
      ],
      correctAnswer: 0,
      explanation: 'React Hooks allow you to use state and other React features in functional components without writing a class.',
    },
    {
      id: 'q2',
      question: 'Which hook is used to manage side effects?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctAnswer: 1,
      explanation: 'useEffect is the Hook used to perform side effects in functional components.',
    },
  ],
  Python: [
    {
      id: 'q1',
      question: 'What is the difference between a list and a tuple in Python?',
      options: [
        'Lists are mutable, tuples are immutable',
        'Lists are immutable, tuples are mutable',
        'There is no difference',
        'Tuples can only store numbers',
      ],
      correctAnswer: 0,
      explanation: 'The main difference is that lists are mutable (can be changed) while tuples are immutable (cannot be changed after creation).',
    },
    {
      id: 'q2',
      question: 'Which symbol is used for comments in Python?',
      options: ['//', '/*', '#', '<!--'],
      correctAnswer: 2,
      explanation: 'In Python, the hash symbol (#) is used for single-line comments.',
    },
  ],
  JavaScript: [
    {
      id: 'q1',
      question: 'What does "const" do in JavaScript?',
      options: [
        'Creates a variable that cannot be reassigned',
        'Creates a constant number',
        'Creates a string constant',
        'Defines a function',
      ],
      correctAnswer: 0,
      explanation: 'const creates a variable that cannot be reassigned, though objects and arrays declared with const can still be modified.',
    },
  ],
  CSS: [
    {
      id: 'q1',
      question: 'What does Flexbox help you achieve?',
      options: [
        'Responsive layouts and alignment',
        'Animations',
        'Color gradients',
        'Font styling',
      ],
      correctAnswer: 0,
      explanation: 'Flexbox is a layout model that helps create responsive layouts and easily align items within containers.',
    },
  ],
  Design: [
    {
      id: 'q1',
      question: 'What are the primary colors in color theory?',
      options: [
        'Red, Yellow, Blue',
        'Red, Green, Blue',
        'Cyan, Magenta, Yellow',
        'Black, White, Gray',
      ],
      correctAnswer: 0,
      explanation: 'In traditional color theory, the primary colors are Red, Yellow, and Blue.',
    },
  ],
};

const defaultQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What did you learn from this video?',
    options: [
      'A new concept or skill',
      'How to apply it practically',
      'Both of the above',
      'Not sure yet',
    ],
    correctAnswer: 2,
    explanation: 'Great! The best learning happens when you understand both the concept and how to apply it.',
  },
  {
    id: 'q2',
    question: 'How confident do you feel about this topic?',
    options: [
      'Very confident - ready to use it',
      'Somewhat confident - need more practice',
      'Not confident - need to review',
      'Confused - need help',
    ],
    correctAnswer: 0,
    explanation: 'Self-assessment is important! Practice more if needed, and don\'t hesitate to review the material.',
  },
];

/**
 * Generate a quiz for a video based on its topics
 */
export const generateQuizForVideo = (videoId: string, topics: string[]): Quiz => {
  const questions: QuizQuestion[] = [];

  // Try to find relevant questions for each topic
  for (const topic of topics) {
    const topicQuestions = quizTemplates[topic];
    if (topicQuestions) {
      questions.push(...topicQuestions.slice(0, 2)); // Take up to 2 questions per topic
    }
  }

  // If no specific questions found, use default questions
  if (questions.length === 0) {
    questions.push(...defaultQuestions);
  }

  // Limit to 3-4 questions max
  const finalQuestions = questions.slice(0, 3);

  return {
    id: `quiz_${videoId}`,
    videoId,
    questions: finalQuestions,
    passingScore: 60, // 60% to pass
  };
};

/**
 * Generate AI summary for a video
 */
export const generateSummaryForVideo = (title: string, description: string, topics: string[]): string => {
  const summaries: { [key: string]: string } = {
    React: 'React is a JavaScript library for building user interfaces. Key concepts include components, props, state, and hooks for managing side effects.',
    Python: 'Python is a versatile programming language known for its simplicity. Core concepts include data types, functions, loops, and object-oriented programming.',
    JavaScript: 'JavaScript is the language of the web. Essential topics include variables, functions, asynchronous programming, and DOM manipulation.',
    CSS: 'CSS (Cascading Style Sheets) is used to style web pages. Important concepts include selectors, the box model, flexbox, and grid layouts.',
    Design: 'Design principles include color theory, typography, layout, and visual hierarchy. Good design improves user experience and communication.',
    'Machine Learning': 'Machine Learning enables computers to learn from data. Core concepts include supervised learning, unsupervised learning, and neural networks.',
    Marketing: 'Marketing involves understanding customer needs and creating value. Key topics include market research, branding, and customer acquisition.',
  };

  // Try to find a relevant summary based on topics
  for (const topic of topics) {
    if (summaries[topic]) {
      return `📝 **Quick Summary**\n\n${summaries[topic]}\n\n**Key Takeaway:** ${title}\n\n${description}`;
    }
  }

  // Default summary
  return `📝 **Quick Summary**\n\n**Topic:** ${title}\n\n${description}\n\n**Tags:** ${topics.join(', ')}\n\nGreat job watching this video! Keep learning and practicing to master this concept.`;
};

/**
 * Generate practice questions based on skill level
 */
export const generatePracticeQuestions = (topic: string, skillLevel: 'beginner' | 'intermediate' | 'advanced'): string[] => {
  const practices: { [key: string]: { [key: string]: string[] } } = {
    React: {
      beginner: [
        'Create a simple counter component using useState',
        'Build a todo list with add and delete functionality',
        'Make a component that fetches and displays data',
      ],
      intermediate: [
        'Implement a custom hook for form handling',
        'Create a context provider for theme switching',
        'Build a paginated data table with search',
      ],
      advanced: [
        'Optimize a large list with React.memo and useMemo',
        'Implement server-side rendering with Next.js',
        'Create a micro-frontend architecture',
      ],
    },
    Python: {
      beginner: [
        'Write a function to reverse a string',
        'Create a simple calculator program',
        'Build a program that reads and writes files',
      ],
      intermediate: [
        'Implement a class-based inventory system',
        'Create a web scraper using BeautifulSoup',
        'Build a REST API with Flask',
      ],
      advanced: [
        'Develop a machine learning model with scikit-learn',
        'Create asynchronous code with asyncio',
        'Build a data pipeline with pandas and SQL',
      ],
    },
  };

  return practices[topic]?.[skillLevel] || [
    `Practice the concepts from this video`,
    `Build a small project using what you learned`,
    `Explain the concept to someone else`,
  ];
};
