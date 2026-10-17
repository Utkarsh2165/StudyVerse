import React from 'react';
import { useApp } from '../context/AppContext';
import { STUDYVERSE_BADGES } from '../data/curriculumData';
import {
  Award,
  Flame,
  Zap,
  CheckSquare,
  FileScan,
  Trophy,
  Sparkles,
  Lock,
  CheckCircle2,
  Calendar,
  Layers,
  Settings,
  HelpCircle,
  Database
} from 'lucide-react';

export const ProgressView: React.FC = () => {
  const { language, setLanguage, stats, addXp } = useApp();

  // Level thresholds
  const levelThresholds = [
    { level: 1, titleEn: 'Novice Learner', titleMr: 'नवशिका विद्यार्थी', minXp: 0, maxXp: 200 },
    { level: 2, titleEn: 'SSC Challenger', titleMr: 'बोर्ड आव्हाक', minXp: 200, maxXp: 500 },
    { level: 3, titleEn: 'Concept Crusher', titleMr: 'संकल्पना विजेता', minXp: 500, maxXp: 1000 },
    { level: 4, titleEn: 'Board Topper Mindset', titleMr: 'बोर्ड टॉपर', minXp: 1000, maxXp: 2000 },
    { level: 5, titleEn: 'StudyVerse Legend', titleMr: 'StudyVerse महामेरू', minXp: 2000, maxXp: 5000 },
  ];

  const currentLevelInfo = levelThresholds.find(l => l.level === stats.level) || levelThresholds[0];
  const nextLevelInfo = levelThresholds.find(l => l.level === stats.level + 1) || levelThresholds[levelThresholds.length - 1];

  const currentXpProgress = Math.max(0, stats.xp - currentLevelInfo.minXp);
  const xpNeededForNext = nextLevelInfo.minXp - currentLevelInfo.minXp;
  const progressPercent = Math.min(100, Math.round((currentXpProgress / xpNeededForNext) * 100));

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center space-x-2">
              <span>{language === 'mr' ? 'माझी प्रगती व उपलब्धी' : 'My Progress & Achievements'}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Verified Local Data
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'mr'
                ? 'तुमचे प्रत्यक्ष सोडवलेले प्रश्न, चाचण्या, दैनिक सातत्य आणि मिळालेले बॅजेस.'
                : 'Real track record of your study hours, completed quizzes, and earned badges.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Level Progress Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 space-y-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 p-1 flex items-center justify-center text-white shadow-xl shadow-purple-600/30">
              <span className="text-2xl font-black">{stats.level}</span>
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-purple-400">
                {language === 'mr' ? `पातळी ${stats.level}` : `Level ${stats.level}`}
              </p>
              <h2 className="text-2xl font-black text-white">
                {language === 'mr' ? currentLevelInfo.titleMr : currentLevelInfo.titleEn}
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'mr'
                  ? `पुढील पातळी गाठण्यासाठी आणखी ${Math.max(0, nextLevelInfo.minXp - stats.xp)} XP हवे आहेत`
                  : `${Math.max(0, nextLevelInfo.minXp - stats.xp)} XP needed to reach Level ${nextLevelInfo.level}`}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">
              {stats.xp}
            </span>
            <span className="text-xs font-bold text-slate-400 ml-1">XP Total</span>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400 font-medium">
            <span>Level {stats.level} ({currentLevelInfo.minXp} XP)</span>
            <span>{progressPercent}% Complete</span>
            <span>Level {nextLevelInfo.level} ({nextLevelInfo.minXp} XP)</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden p-0.5 border border-slate-800">
            <div
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold">
            <Flame className="w-4 h-4" />
            <span>{language === 'mr' ? 'सलग अभ्यास' : 'Streak'}</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{stats.streak} {language === 'mr' ? 'दिवस' : 'Days'}</p>
          <p className="text-[10px] text-slate-400">{language === 'mr' ? 'शेवटचा अभ्यास: आज' : 'Active today'}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold">
            <CheckSquare className="w-4 h-4" />
            <span>{language === 'mr' ? 'चाचण्या' : 'Quizzes'}</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{stats.quizzesCompleted}</p>
          <p className="text-[10px] text-slate-400">{language === 'mr' ? 'पूर्ण चाचण्या' : 'Completed'}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-semibold">
            <FileScan className="w-4 h-4" />
            <span>{language === 'mr' ? 'स्कॅन पेपर्स' : 'Scanned'}</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{stats.papersScanned}</p>
          <p className="text-[10px] text-slate-400">{language === 'mr' ? 'बोर्ड प्रश्नपत्रिका' : 'Exam Papers'}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === 'mr' ? 'अभ्यास कार्ये' : 'Tasks Done'}</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{stats.tasksCompleted}</p>
          <p className="text-[10px] text-slate-400">{language === 'mr' ? 'नियोजनातील उद्दिष्टे' : 'Planner goals'}</p>
        </div>
      </div>

      {/* Achievement Badges Showcase */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-purple-500/20 space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>{language === 'mr' ? 'मिळालेले व आगामी बॅजेस' : 'Badges & Milestones'}</span>
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'mr'
                ? `${stats.unlockedBadges.length} / ${STUDYVERSE_BADGES.length} बॅजेस अनलॉक झाले आहेत.`
                : `${stats.unlockedBadges.length} of ${STUDYVERSE_BADGES.length} unlocked.`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {STUDYVERSE_BADGES.map((badge) => {
            const isUnlocked = stats.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                  isUnlocked
                    ? 'bg-slate-950/80 border-purple-500/40 shadow-md shadow-purple-500/10'
                    : 'bg-slate-950/30 border-slate-900 opacity-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-purple-600 to-amber-500 text-white shadow-md'
                      : 'bg-slate-900 text-slate-600'
                  }`}
                >
                  {isUnlocked ? <Trophy className="w-5 h-5 text-yellow-300" /> : <Lock className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <h4 className={`text-xs font-bold ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                      {language === 'mr' ? badge.nameMr : badge.name}
                    </h4>
                    {isUnlocked && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    {language === 'mr' ? badge.descriptionMr : badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Honest Local Data Storage Info Card */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold">
          <Database className="w-4 h-4" />
          <span>{language === 'mr' ? 'स्थानिक डेटा संग्रहण (Local Browser Storage):' : 'Local Browser Storage Guarantee:'}</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          {language === 'mr'
            ? 'StudyVerse AI तुमच्या कोणत्याही संवेदनशील माहितीची चोरी करत नाही. तुमचे मिळालेले गुण, सोडवलेले प्रश्न आणि सातत्य थेट तुमच्या याच ब्राऊझरमध्ये जतन राहते. तुम्ही केव्हाही पुन्हा येऊन अभ्यास चालू ठेवू शकता.'
            : 'StudyVerse AI stores your genuine XP, completed quizzes, study streak, and planner tasks directly in your browser\'s localStorage. We do not manufacture mock statistics.'}
        </p>

        <div className="pt-2 flex items-center justify-between text-xs">
          <span className="text-slate-500">Language Preference:</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs ${language === 'en' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs ${language === 'mr' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              मराठी
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
