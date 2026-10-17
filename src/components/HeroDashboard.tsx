import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MAHARASHTRA_SSC_SUBJECTS } from '../data/curriculumData';
import {
  Sparkles,
  Bot,
  FileScan,
  CheckSquare,
  Calendar,
  BookOpen,
  ArrowRight,
  Flame,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';

export const HeroDashboard: React.FC = () => {
  const { language, setActiveTab, stats, setSelectedSubjectId, tasks } = useApp();

  // SSC Board Exam Countdown (Target: approx March 1st of next SSC session)
  const [daysRemaining, setDaysRemaining] = useState<number>(128);

  useEffect(() => {
    // Target date: March 2, 2027
    const targetDate = new Date('2027-03-02T09:00:00');
    const now = new Date();
    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(diffDays > 0 ? diffDays : 90);
  }, []);

  const completedTodayTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 p-6 sm:p-10 shadow-2xl shadow-purple-950/40">
        
        {/* Futuristic glowing backdrop blurs */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-12 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'mr' ? 'महाराष्ट्र स्टेट बोर्ड इयत्ता १० वी विशेष प्लॅटफॉर्म' : 'Maharashtra State Board SSC Class 10 AI Hub'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {language === 'mr' ? (
                <>
                  तुमचा अभ्यास, आता <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">सुपरचार्ज्ड</span> AI सोबत!
                </>
              ) : (
                <>
                  Master Class 10 with <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">StudyVerse AI</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {language === 'mr'
                ? 'मराठी व इंग्रजी दोन्ही भाषांमध्ये शंकांचे निरसन, बोर्डाच्या प्रश्नपत्रिका स्कॅन करून अचूक उत्तरे, स्मार्ट क्विझ आणि दैनंदिन अभ्यास नियोजन एकाच ठिकाणी!'
                : 'Solve doubts in Marathi or English, scan past board papers for step-by-step solutions, generate targeted quizzes, and conquer your SSC exams with confidence.'}
            </p>

            {/* Call to action buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setActiveTab('tutor')}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Bot className="w-4 h-4 text-cyan-300" />
                <span>{language === 'mr' ? 'AI शिक्षकाशी बोला' : 'Ask AI Study Tutor'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('scanner')}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold text-sm shadow-md transition-all"
              >
                <FileScan className="w-4 h-4 text-cyan-400" />
                <span>{language === 'mr' ? 'बोर्ड पेपर स्कॅन करा' : 'Scan Board Paper'}</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold text-sm transition-all"
              >
                <CheckSquare className="w-4 h-4 text-purple-400" />
                <span>{language === 'mr' ? 'सराव क्विज' : 'Practice Quiz'}</span>
              </button>
            </div>
          </div>

          {/* SSC Countdown Widget */}
          <div className="w-full lg:w-80 flex-shrink-0 p-5 rounded-2xl bg-slate-950/70 border border-purple-500/30 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'बोर्ड परीक्षा काऊंटडाऊन' : 'SSC Board Exam Timer'}</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-purple-500/20 text-purple-300">
                Class 10
              </span>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-4xl sm:text-5xl font-black text-cyan-400 tracking-tight font-mono">
                {daysRemaining}
              </span>
              <span className="text-sm font-semibold text-slate-400">
                {language === 'mr' ? 'दिवस बाकी आहेत' : 'Days remaining'}
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2">
              {language === 'mr'
                ? 'प्रत्येक दिवसाचा अभ्यास तुम्हाला तुमच्या ९०%+ ध्येयाच्या जवळ नेतो!'
                : 'Every study session brings you closer to your 90%+ SSC goal!'}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">{language === 'mr' ? 'आजचे कार्य' : "Today's Tasks"}</span>
              <span className="font-bold text-cyan-300">
                {completedTodayTasks} / {tasks.length} {language === 'mr' ? 'पूर्ण' : 'Done'}
              </span>
            </div>
            
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${tasks.length ? Math.round((completedTodayTasks / tasks.length) * 100) : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Gamification Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* Streak */}
        <div
          onClick={() => setActiveTab('progress')}
          className="group cursor-pointer p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all duration-200"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{language === 'mr' ? 'दैनिक सातत्य' : 'Daily Streak'}</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{stats.streak}</span>
            <span className="text-xs text-amber-400 font-bold">{language === 'mr' ? 'दिवस' : 'Days'}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">{language === 'mr' ? 'दररोज शिकण्याची सवय' : 'Keep the momentum going'}</p>
        </div>

        {/* XP Points */}
        <div
          onClick={() => setActiveTab('progress')}
          className="group cursor-pointer p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all duration-200"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{language === 'mr' ? 'अनुभव गुण (XP)' : 'Total XP'}</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{stats.xp}</span>
            <span className="text-xs text-purple-400 font-bold">XP</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">{language === 'mr' ? `पातळी ${stats.level} (विद्यार्थी)` : `Level ${stats.level} Scholar`}</p>
        </div>

        {/* Quizzes Taken */}
        <div
          onClick={() => setActiveTab('quiz')}
          className="group cursor-pointer p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{language === 'mr' ? 'सराव चाचण्या' : 'Quizzes Taken'}</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{stats.quizzesCompleted}</span>
            <span className="text-xs text-cyan-400 font-bold">{language === 'mr' ? 'चाचण्या' : 'Tests'}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">{language === 'mr' ? 'MCQ व बोर्ड प्रश्न' : 'Targeted MCQ practice'}</p>
        </div>

        {/* Papers Scanned */}
        <div
          onClick={() => setActiveTab('scanner')}
          className="group cursor-pointer p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all duration-200"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{language === 'mr' ? 'स्कॅन केलेले पेपर्स' : 'Papers Analyzed'}</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <FileScan className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{stats.papersScanned}</span>
            <span className="text-xs text-emerald-400 font-bold">{language === 'mr' ? 'पेपर्स' : 'Sheets'}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">{language === 'mr' ? 'स्टेप बाय स्टेप उत्तरे' : 'Board marking solutions'}</p>
        </div>

      </div>

      {/* Feature Highlighters (4 Pillars) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* AI Tutor Card */}
        <div
          onClick={() => setActiveTab('tutor')}
          className="cursor-pointer group p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-purple-500/20 hover:border-purple-500/60 transition-all duration-300 relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
            <span>{language === 'mr' ? 'AI अभ्यास मित्र' : 'AI Study Tutor'}</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {language === 'mr'
              ? 'मराठी किंवा इंग्रजीत शंका विचारा. पाठ्यपुस्तकातील उदाहरणे, आकृत्या व गणिताची सोपी स्पष्टीकरणे मिळवा.'
              : 'Ask questions in Marathi or English. Get simple step-by-step guidance for tough formulas and concepts.'}
          </p>
        </div>

        {/* Board Paper Scanner Card */}
        <div
          onClick={() => setActiveTab('scanner')}
          className="cursor-pointer group p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-300 relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
            <FileScan className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
            <span>{language === 'mr' ? 'बोर्ड पेपर स्कॅनर' : 'Paper Scanner'}</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {language === 'mr'
              ? 'मोबाईलवरून प्रश्नपत्रिकेचा फोटो किंवा PDF अपलोड करा. अचूक गुणदान पद्धतीनुसार उत्तरे व सराव प्रश्न मिळवा.'
              : 'Upload question paper photos or PDFs. Extract questions and generate board-standard model solutions.'}
          </p>
        </div>

        {/* Smart Quiz Arena */}
        <div
          onClick={() => setActiveTab('quiz')}
          className="cursor-pointer group p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-pink-500/20 hover:border-pink-500/60 transition-all duration-300 relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform">
            <CheckSquare className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors flex items-center justify-between">
            <span>{language === 'mr' ? 'स्मार्ट क्विज जनरेटर' : 'Smart Quiz Generator'}</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {language === 'mr'
              ? 'विषय व पाठ निवडा आणि त्वरित MCQ सराव सुरू करा. प्रत्येक प्रश्नानंतर स्पष्टीकरण व बोर्ड टिप्स!'
              : 'Generate custom Class 10 MCQs for any chapter, test your speed, and earn XP badges.'}
          </p>
        </div>

        {/* Study Planner Card */}
        <div
          onClick={() => setActiveTab('planner')}
          className="cursor-pointer group p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-indigo-500/20 hover:border-indigo-500/60 transition-all duration-300 relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center justify-between">
            <span>{language === 'mr' ? 'स्मार्ट अभ्यास नियोजन' : 'Study Planner'}</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {language === 'mr'
              ? 'तुमच्या उपलब्ध अभ्यासाच्या वेळेनुसार (२, ४ किंवा ६ तास) दैनिक वेळापत्रक व ध्येये आपोआप तयार करा.'
              : 'Create a personalized timetable based on your available study hours. Track completed topics.'}
          </p>
        </div>

      </div>

      {/* Maharashtra SSC Class 10 Subjects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {language === 'mr' ? 'इयत्ता १० वी विषय व सूत्रसंग्रह' : 'Class 10 Subject Hub & Formulas'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'mr'
                ? 'पाठ्यपुस्तकातील पाठ, गुणविभागणी आणि महत्त्वाच्या सूत्रांचे झटपट पुनरावलोकन'
                : 'Chapter-wise syllabus, board weightage, formulas, definitions, and grammar rules.'}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('subjects')}
            className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
          >
            <span>{language === 'mr' ? 'सर्व विषय पहा' : 'View All'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MAHARASHTRA_SSC_SUBJECTS.slice(0, 6).map((sub) => (
            <div
              key={sub.id}
              onClick={() => {
                setSelectedSubjectId(sub.id);
                setActiveTab('subjects');
              }}
              className="cursor-pointer p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                  {sub.code}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {sub.totalMarks} Marks
                </span>
              </div>
              <h4 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                {language === 'mr' ? sub.nameMr : sub.name}
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                {sub.chapters.length} {language === 'mr' ? 'प्रकरणे समाविष्ट' : 'Board Chapters'}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="text-purple-300 font-medium">
                  {sub.formulaBook ? `${sub.formulaBook.length} Formulas` : sub.definitionsAndLaws ? `${sub.definitionsAndLaws.length} Laws & Defs` : 'Revision Notes'}
                </span>
                <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                  <span>{language === 'mr' ? 'उघडा' : 'Explore'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Honest Local Storage Privacy & Sync Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start space-x-3 text-xs text-slate-400">
        <AlertCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-slate-300">
            {language === 'mr' ? 'डेटा व गोपनीयता सूचना:' : 'Storage & Privacy Notice:'}
          </p>
          <p>
            {language === 'mr'
              ? 'तुमची प्रगती, XP गुण, अभ्यासाची कार्ये आणि क्विज स्कोअर सुरक्षितपणे तुमच्या या ब्राऊझरच्या स्थानिक स्टोरेजमध्ये (Local Storage) जतन केले जातात. ते इतर उपकरणांवर आपोआप सिंक होत नाहीत.'
              : 'Your study progress, XP, streak, and planner tasks are saved locally in your current browser. No fake telemetry or unwanted tracking is conducted.'}
          </p>
        </div>
      </div>

    </div>
  );
};
