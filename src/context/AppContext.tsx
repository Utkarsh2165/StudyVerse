import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, AppTab, UserStats, PlannerTask, ChatMessage } from '../types';
import { STUDYVERSE_BADGES } from '../data/curriculumData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  stats: UserStats;
  addXp: (amount: number, reason?: string) => void;
  unlockBadge: (badgeId: string) => void;
  tasks: PlannerTask[];
  toggleTask: (id: string) => void;
  addTask: (title: string, subject: string, durationMinutes: number, priority: 'high' | 'medium' | 'low') => void;
  generateSmartSchedule: (availableHours: number) => void;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  addChatMessage: (msg: ChatMessage) => void;
  selectedSubjectId: string;
  setSelectedSubjectId: (id: string) => void;
  recentToast: string | null;
  clearToast: () => void;
}

const defaultStats: UserStats = {
  xp: 150,
  level: 1,
  streak: 2,
  lastActiveDate: new Date().toISOString().split('T')[0],
  quizzesCompleted: 1,
  questionsSolved: 5,
  papersScanned: 0,
  tasksCompleted: 2,
  unlockedBadges: ['first_question'],
};

const defaultTasks: PlannerTask[] = [
  {
    id: 't-1',
    title: 'Solve 5 Quadratic Equations (Factorization method)',
    subject: 'Mathematics 1',
    durationMinutes: 45,
    completed: true,
    priority: 'high',
    dueDate: 'Today'
  },
  {
    id: 't-2',
    title: 'Revise Kepler’s Three Laws & draw neat diagram',
    subject: 'Science 1',
    durationMinutes: 30,
    completed: true,
    priority: 'high',
    dueDate: 'Today'
  },
  {
    id: 't-3',
    title: 'Practice Marathi Grammar: समास आणि प्रकार (१० उदाहरणे)',
    subject: 'Marathi',
    durationMinutes: 40,
    completed: false,
    priority: 'medium',
    dueDate: 'Today'
  },
  {
    id: 't-4',
    title: 'Review Geography Map pointing: India & Brazil major rivers',
    subject: 'Geography',
    durationMinutes: 30,
    completed: false,
    priority: 'low',
    dueDate: 'Today'
  }
];

const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-welcome',
    role: 'assistant',
    content: `**नमस्कार आणि Welcome to StudyVerse AI! 🎓**\n\nमी तुमचा वैयक्तिक AI अभ्यास मित्र (AI Study Tutor) आहे. तुम्ही मला **गणित, विज्ञान, इंग्रजी, मराठी किंवा इतिहास-भूगोल** मधील कोणताही अवघड प्रश्न विचारू शकता.\n\n* **मराठी किंवा इंग्रजीत प्रश्न विचारा.**\n* **पुस्तकातील गणिताचा फोटो किंवा प्रश्नपत्रिका अपलोड करा.**\n* **स्टेप-बाय-स्टेप बोर्ड परीक्षा पद्धतीनुसार उत्तरे मिळवा!**\n\nतुम्हाला आज कोणता विषय समजून घ्यायचा आहे?`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Language preference
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('studyverse_lang');
    return (saved === 'mr' || saved === 'en') ? saved : 'en';
  });

  // Dark/Light Theme (default dark futuristic)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('studyverse_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');

  // Selected subject context
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('maths-1');

  // Gamification stats
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('studyverse_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved stats', e);
      }
    }
    return defaultStats;
  });

  // Study planner tasks
  const [tasks, setTasks] = useState<PlannerTask[]>(() => {
    const saved = localStorage.getItem('studyverse_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved tasks', e);
      }
    }
    return defaultTasks;
  });

  // Chat history
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('studyverse_chat');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved chat', e);
      }
    }
    return initialChatMessages;
  });

  const [recentToast, setRecentToast] = useState<string | null>(null);

  const clearToast = () => setRecentToast(null);

  // Sync theme to root element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('studyverse_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('studyverse_lang', lang);
  };

  // Sync stats to localStorage
  useEffect(() => {
    localStorage.setItem('studyverse_stats', JSON.stringify(stats));
  }, [stats]);

  // Sync tasks to localStorage
  useEffect(() => {
    localStorage.setItem('studyverse_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Sync chat to localStorage
  useEffect(() => {
    localStorage.setItem('studyverse_chat', JSON.stringify(chatMessages.slice(-30)));
  }, [chatMessages]);

  // Daily streak check on app load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = stats.lastActiveDate;

    if (lastActive !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      let newStreak = stats.streak;
      if (lastActive === yesterday) {
        newStreak += 1;
      } else {
        newStreak = 1; // reset streak if missed more than 1 day
      }

      setStats(prev => ({
        ...prev,
        streak: newStreak,
        lastActiveDate: today,
      }));

      if (newStreak >= 3 && !stats.unlockedBadges.includes('streak_3')) {
        unlockBadge('streak_3');
      }
    }
  }, []);

  const addXp = (amount: number, reason?: string) => {
    setStats(prev => {
      const nextXp = prev.xp + amount;
      // Calculate level: level 1: 0-199, level 2: 200-499, level 3: 500-999, level 4: 1000-1999, level 5: 2000+
      let calculatedLevel = 1;
      if (nextXp >= 2000) calculatedLevel = 5;
      else if (nextXp >= 1000) calculatedLevel = 4;
      else if (nextXp >= 500) calculatedLevel = 3;
      else if (nextXp >= 200) calculatedLevel = 2;

      if (calculatedLevel > prev.level) {
        setRecentToast(`🎉 Level Up! You reached Level ${calculatedLevel}!`);
      } else if (reason) {
        setRecentToast(`+${amount} XP: ${reason}`);
      }

      return {
        ...prev,
        xp: nextXp,
        level: calculatedLevel,
      };
    });
  };

  const unlockBadge = (badgeId: string) => {
    if (stats.unlockedBadges.includes(badgeId)) return;
    const badge = STUDYVERSE_BADGES.find(b => b.id === badgeId);
    setStats(prev => ({
      ...prev,
      unlockedBadges: [...prev.unlockedBadges, badgeId],
      xp: prev.xp + 50,
    }));
    if (badge) {
      setRecentToast(`🏆 Badge Unlocked: ${language === 'mr' ? badge.nameMr : badge.name}! (+50 XP)`);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(prev => {
      return prev.map(t => {
        if (t.id === id) {
          const nextState = !t.completed;
          if (nextState) {
            addXp(25, 'Completed Study Task');
            setStats(s => ({ ...s, tasksCompleted: s.tasksCompleted + 1 }));
          }
          return { ...t, completed: nextState };
        }
        return t;
      });
    });
  };

  const addTask = (title: string, subject: string, durationMinutes: number, priority: 'high' | 'medium' | 'low') => {
    const newTask: PlannerTask = {
      id: 'task-' + Date.now(),
      title,
      subject,
      durationMinutes,
      completed: false,
      priority,
      dueDate: 'Today'
    };
    setTasks(prev => [newTask, ...prev]);
    addXp(10, 'Created New Study Goal');
  };

  const generateSmartSchedule = (availableHours: number) => {
    const hours = Math.max(1, Math.min(8, availableHours));
    const generated: PlannerTask[] = [];

    if (hours >= 1) {
      generated.push({
        id: 'gen-1-' + Date.now(),
        title: 'Mathematics (Algebra) 5 practice numericals',
        subject: 'Mathematics 1',
        durationMinutes: 40,
        completed: false,
        priority: 'high',
        dueDate: 'Today'
      });
      generated.push({
        id: 'gen-2-' + Date.now(),
        title: 'Science 1: Gravitation or Periodic Table concept revision',
        subject: 'Science 1',
        durationMinutes: 20,
        completed: false,
        priority: 'high',
        dueDate: 'Today'
      });
    }

    if (hours >= 2) {
      generated.push({
        id: 'gen-3-' + Date.now(),
        title: 'Marathi Vyakaran: समास व वाक्यरूपांतर 10 प्रश्न सराव',
        subject: 'Marathi',
        durationMinutes: 30,
        completed: false,
        priority: 'medium',
        dueDate: 'Today'
      });
      generated.push({
        id: 'gen-4-' + Date.now(),
        title: 'Solve 1 Practice Quiz on StudyVerse AI',
        subject: 'Practice Quiz',
        durationMinutes: 30,
        completed: false,
        priority: 'medium',
        dueDate: 'Today'
      });
    }

    if (hours >= 4) {
      generated.push({
        id: 'gen-5-' + Date.now(),
        title: 'Geometry: Circle / Similarity Theorem Proof Memorization',
        subject: 'Mathematics 2',
        durationMinutes: 45,
        completed: false,
        priority: 'high',
        dueDate: 'Today'
      });
      generated.push({
        id: 'gen-6-' + Date.now(),
        title: 'English Kumarbharati: Appreciation of 1 Poem & Grammar',
        subject: 'English',
        durationMinutes: 45,
        completed: false,
        priority: 'low',
        dueDate: 'Today'
      });
      generated.push({
        id: 'gen-7-' + Date.now(),
        title: 'History / Geography Concept Flowchart and Map work',
        subject: 'Social Science',
        durationMinutes: 30,
        completed: false,
        priority: 'medium',
        dueDate: 'Today'
      });
    }

    setTasks(generated);
    addXp(30, 'Generated New Smart Study Plan');
    setRecentToast(`📅 Smart Schedule generated for ${hours} study hours!`);
  };

  const addChatMessage = (msg: ChatMessage) => {
    setChatMessages(prev => [...prev, msg]);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        stats,
        addXp,
        unlockBadge,
        tasks,
        toggleTask,
        addTask,
        generateSmartSchedule,
        chatMessages,
        setChatMessages,
        addChatMessage,
        selectedSubjectId,
        setSelectedSubjectId,
        recentToast,
        clearToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
