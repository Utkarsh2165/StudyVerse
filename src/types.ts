export type Language = 'en' | 'mr';

export type AppTab = 'dashboard' | 'tutor' | 'scanner' | 'quiz' | 'planner' | 'subjects' | 'progress';

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  quizzesCompleted: number;
  questionsSolved: number;
  papersScanned: number;
  tasksCompleted: number;
  unlockedBadges: string[];
}

export interface Badge {
  id: string;
  name: string;
  nameMr: string;
  description: string;
  descriptionMr: string;
  icon: string;
  category: 'quiz' | 'streak' | 'paper' | 'general';
  requiredXp?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  boardTip?: string;
}

export interface QuizSession {
  quizTitle: string;
  subject: string;
  chapter: string;
  difficulty: string;
  questions: QuizQuestion[];
  userAnswers: number[];
  score: number;
  total: number;
  completedAt?: string;
}

export interface PlannerTask {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

export interface ScannedQuestion {
  qNumber: string;
  question: string;
  marks?: string;
  solution: string;
  keyConcepts?: string[];
}

export interface SimilarPracticeQuestion {
  question: string;
  hint: string;
  answer: string;
}

export interface PaperScanResult {
  rawText: string;
  questions: ScannedQuestion[];
  similarPracticeQuestions: SimilarPracticeQuestion[];
  fileName?: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  image?: string;
  isFallback?: boolean;
}

export interface SubjectInfo {
  id: string;
  name: string;
  nameMr: string;
  code: string;
  iconName: string;
  color: string;
  gradient: string;
  totalMarks: number;
  chapters: Array<{
    title: string;
    titleMr: string;
    weightageMarks: number;
    keyTopics: string[];
  }>;
  formulaBook?: Array<{
    name: string;
    formula: string;
    description: string;
    chapter: string;
  }>;
  definitionsAndLaws?: Array<{
    title: string;
    statement: string;
    importance: string;
    chapter: string;
  }>;
  grammarRules?: Array<{
    topic: string;
    rule: string;
    examples: string[];
  }>;
}
