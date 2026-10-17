import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppTab } from '../types';
import {
  Sparkles,
  Bot,
  FileScan,
  CheckSquare,
  Calendar,
  BookOpen,
  Award,
  Flame,
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  GraduationCap
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    activeTab,
    setActiveTab,
    stats,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: AppTab; labelEn: string; labelMr: string; icon: React.ReactNode }> = [
    { id: 'dashboard', labelEn: 'Dashboard', labelMr: 'डॅशबोर्ड', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'tutor', labelEn: 'AI Tutor', labelMr: 'AI शिक्षक', icon: <Bot className="w-4 h-4" /> },
    { id: 'scanner', labelEn: 'Scan Paper', labelMr: 'पेपर स्कॅनर', icon: <FileScan className="w-4 h-4" /> },
    { id: 'quiz', labelEn: 'Quiz Arena', labelMr: 'सराव क्विज', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'planner', labelEn: 'Study Planner', labelMr: 'अभ्यास नियोजन', icon: <Calendar className="w-4 h-4" /> },
    { id: 'subjects', labelEn: 'Subject Hub', labelMr: 'विषय केंद्र', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'progress', labelEn: 'My Progress', labelMr: 'माझी प्रगती', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-200 bg-slate-950/80 border-purple-900/30 dark:bg-[#070b14]/90 dark:border-purple-950/50 light:bg-white/90 light:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Badge */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                  StudyVerse
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 hidden sm:block">
                {language === 'mr' ? 'महाराष्ट्र SSC इयत्ता १० वी' : 'Maharashtra SSC Class 10'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600/30 to-cyan-600/20 text-cyan-300 border border-purple-500/40 shadow-sm shadow-purple-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{item.icon}</span>
                  <span>{language === 'mr' ? item.labelMr : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Streak, XP, Lang, Theme */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Daily Streak Indicator */}
            <div
              onClick={() => setActiveTab('progress')}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold cursor-pointer hover:bg-amber-500/20 transition-all"
              title="Daily Active Streak"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>{stats.streak}d</span>
            </div>

            {/* XP and Level Counter */}
            <div
              onClick={() => setActiveTab('progress')}
              className="hidden sm:flex items-center space-x-1 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold cursor-pointer hover:bg-purple-500/25 transition-all"
            >
              <span className="text-yellow-400">⚡</span>
              <span>{stats.xp} XP</span>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-400">Lvl {stats.level}</span>
            </div>

            {/* Language Switcher (EN / MR) */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'mr' : 'en')}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 border border-slate-700/80 hover:border-purple-500/50 text-slate-200 transition-all"
              title="Switch language between English and Marathi"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className={language === 'mr' ? 'text-purple-400 font-extrabold' : ''}>
                {language === 'en' ? 'मराठी' : 'English'}
              </span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-purple-500/50 text-slate-300 hover:text-white transition-all"
              aria-label="Toggle Dark/Light Mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 bg-slate-950/95 border-b border-purple-900/40 backdrop-blur-2xl">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-purple-950/30 border border-purple-800/30 text-xs">
              <span className="text-yellow-400 text-base">⚡</span>
              <div>
                <p className="text-[10px] text-slate-400">Total XP</p>
                <p className="font-bold text-purple-300">{stats.xp} XP (Lvl {stats.level})</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-amber-950/30 border border-amber-800/30 text-xs">
              <Flame className="w-4 h-4 text-amber-400" />
              <div>
                <p className="text-[10px] text-slate-400">Current Streak</p>
                <p className="font-bold text-amber-300">{stats.streak} Days Active</p>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-600/30 text-cyan-300 border border-purple-500/40'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{item.icon}</span>
                  <span>{language === 'mr' ? item.labelMr : item.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
