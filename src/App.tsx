import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroDashboard } from './components/HeroDashboard';
import { AITutor } from './components/AITutor';
import { PaperScanner } from './components/PaperScanner';
import { QuizGenerator } from './components/QuizGenerator';
import { StudyPlanner } from './components/StudyPlanner';
import { SubjectHub } from './components/SubjectHub';
import { ProgressView } from './components/ProgressView';
import {
  GraduationCap,
  Bot,
  FileScan,
  CheckSquare,
  Calendar,
  BookOpen,
  Award,
  Sparkles,
  X
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, recentToast, clearToast, language } = useApp();

  // Auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (recentToast) {
      const timer = setTimeout(() => {
        clearToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [recentToast, clearToast]);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white transition-colors duration-200">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Floating XP/Achievement Toast Notification */}
      {recentToast && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="flex items-center space-x-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-900/90 to-cyan-900/90 border border-purple-400/50 text-white shadow-2xl backdrop-blur-xl text-xs font-bold">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            <span>{recentToast}</span>
            <button
              onClick={clearToast}
              className="text-slate-400 hover:text-white p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 lg:pb-12">
        {activeTab === 'dashboard' && <HeroDashboard />}
        {activeTab === 'tutor' && <AITutor />}
        {activeTab === 'scanner' && <PaperScanner />}
        {activeTab === 'quiz' && <QuizGenerator />}
        {activeTab === 'planner' && <StudyPlanner />}
        {activeTab === 'subjects' && <SubjectHub />}
        {activeTab === 'progress' && <ProgressView />}
      </main>

      {/* Floating Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-purple-900/40 backdrop-blur-xl px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center p-1.5 rounded-lg text-[10px] font-semibold transition-all ${
            activeTab === 'dashboard' ? 'text-cyan-400' : 'text-slate-400'
          }`}
        >
          <GraduationCap className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('tutor')}
          className={`flex flex-col items-center p-1.5 rounded-lg text-[10px] font-semibold transition-all ${
            activeTab === 'tutor' ? 'text-cyan-400' : 'text-slate-400'
          }`}
        >
          <Bot className="w-4 h-4 mb-0.5" />
          <span>AI Tutor</span>
        </button>

        <button
          onClick={() => setActiveTab('scanner')}
          className={`flex flex-col items-center p-1.5 rounded-lg text-[10px] font-semibold transition-all ${
            activeTab === 'scanner' ? 'text-cyan-400' : 'text-slate-400'
          }`}
        >
          <FileScan className="w-4 h-4 mb-0.5" />
          <span>Scanner</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex flex-col items-center p-1.5 rounded-lg text-[10px] font-semibold transition-all ${
            activeTab === 'quiz' ? 'text-cyan-400' : 'text-slate-400'
          }`}
        >
          <CheckSquare className="w-4 h-4 mb-0.5" />
          <span>Quiz</span>
        </button>

        <button
          onClick={() => setActiveTab('planner')}
          className={`flex flex-col items-center p-1.5 rounded-lg text-[10px] font-semibold transition-all ${
            activeTab === 'planner' ? 'text-cyan-400' : 'text-slate-400'
          }`}
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span>Plan</span>
        </button>

        <button
          onClick={() => setActiveTab('progress')}
          className={`flex flex-col items-center p-1.5 rounded-lg text-[10px] font-semibold transition-all ${
            activeTab === 'progress' ? 'text-cyan-400' : 'text-slate-400'
          }`}
        >
          <Award className="w-4 h-4 mb-0.5" />
          <span>Stats</span>
        </button>
      </div>

      {/* Modern Startup Footer */}
      <footer className="border-t border-purple-900/30 bg-slate-950/80 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 hidden sm:block">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center p-0.5">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-slate-300">StudyVerse AI</span>
            <span>—</span>
            <span>{language === 'mr' ? 'महाराष्ट्र बोर्ड विद्यार्थ्यांसाठी विशेष AI सहाय्यक' : 'Empowering Maharashtra SSC Class 10 Students'}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">Maths • Science • Marathi • English • Social Science</span>
            <span>•</span>
            <span className="text-purple-400 font-semibold">Gemini 3.8 Multimodal AI</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
