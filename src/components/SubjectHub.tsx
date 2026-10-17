import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MAHARASHTRA_SSC_SUBJECTS } from '../data/curriculumData';
import {
  BookOpen,
  Calculator,
  Compass,
  Atom,
  Dna,
  Languages,
  Globe,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  FileText
} from 'lucide-react';

export const SubjectHub: React.FC = () => {
  const { language, selectedSubjectId, setSelectedSubjectId, setActiveTab, addChatMessage } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'chapters' | 'formulas' | 'definitions' | 'grammar'>('chapters');

  const currentSubject = MAHARASHTRA_SSC_SUBJECTS.find(s => s.id === selectedSubjectId) || MAHARASHTRA_SSC_SUBJECTS[0];

  const getSubjectIcon = (id: string) => {
    switch (id) {
      case 'maths-1': return <Calculator className="w-5 h-5 text-blue-400" />;
      case 'maths-2': return <Compass className="w-5 h-5 text-purple-400" />;
      case 'science-1': return <Atom className="w-5 h-5 text-cyan-400" />;
      case 'science-2': return <Dna className="w-5 h-5 text-emerald-400" />;
      case 'marathi': return <BookOpen className="w-5 h-5 text-amber-400" />;
      case 'english': return <Languages className="w-5 h-5 text-rose-400" />;
      default: return <Globe className="w-5 h-5 text-teal-400" />;
    }
  };

  const handleAskAboutChapter = (chapterTitle: string) => {
    const prompt = language === 'mr'
      ? `मला इयत्ता १० वी ${currentSubject.nameMr} मधील '${chapterTitle}' या प्रकरणातील महत्त्वाचे बोर्ड परीक्षा प्रश्न आणि सोप्या संकल्पना समजवून सांगा.`
      : `Explain the most important Maharashtra SSC board exam concepts, key formulas, and expected questions for '${chapterTitle}' in ${currentSubject.name}.`;

    addChatMessage({
      id: 'quick-' + Date.now(),
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    setActiveTab('tutor');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center space-x-2">
              <span>{language === 'mr' ? 'महाराष्ट्र SSC विषय केंद्र' : 'SSC Maharashtra Subject Hub'}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Class 10
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'mr'
                ? 'पाठ्यपुस्तकातील पाठ, गुणभार, सूत्रसंग्रह, व्याख्या व व्याकरणाचे नियम'
                : 'Chapter weightage, formula bank, laws, and revision summaries.'}
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Subject Pill Picker */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {MAHARASHTRA_SSC_SUBJECTS.map((sub) => {
          const isSelected = sub.id === currentSubject.id;
          return (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubjectId(sub.id);
                // switch to available subtab
                if (sub.formulaBook && activeSubTab === 'grammar') setActiveSubTab('formulas');
                if (sub.grammarRules && activeSubTab === 'formulas') setActiveSubTab('grammar');
              }}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {getSubjectIcon(sub.id)}
              <span>{language === 'mr' ? sub.nameMr : sub.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Subject Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
              Code: {currentSubject.code}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {currentSubject.totalMarks} {language === 'mr' ? 'गुण (Marks)' : 'Marks'}
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">
            {language === 'mr' ? currentSubject.nameMr : currentSubject.name}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {currentSubject.chapters.length} {language === 'mr' ? 'पाठ समाविष्ट' : 'Chapters in SSC Maharashtra Syllabus'}
          </p>
        </div>

        {/* Section View Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => setActiveSubTab('chapters')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'chapters'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'mr' ? 'प्रकरणे व गुणभार' : 'Chapters & Weightage'}
          </button>

          {currentSubject.formulaBook && (
            <button
              onClick={() => setActiveSubTab('formulas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'formulas'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'mr' ? 'सूत्रसंग्रह (Formulas)' : 'Formula Bank'}
            </button>
          )}

          {currentSubject.definitionsAndLaws && (
            <button
              onClick={() => setActiveSubTab('definitions')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'definitions'
                  ? 'bg-cyan-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'mr' ? 'व्याख्या व नियम' : 'Definitions & Laws'}
            </button>
          )}

          {currentSubject.grammarRules && (
            <button
              onClick={() => setActiveSubTab('grammar')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'grammar'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'mr' ? 'व्याकरण नियम' : 'Grammar Rules'}
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: CHAPTERS & WEIGHTAGE */}
      {activeSubTab === 'chapters' && (
        <div className="space-y-3">
          {currentSubject.chapters.map((ch, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {language === 'mr' ? ch.titleMr : ch.title}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {ch.weightageMarks} Marks
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pl-8">
                  {ch.keyTopics.map((topic, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-2 pl-8 md:pl-0 flex-shrink-0">
                <button
                  onClick={() => handleAskAboutChapter(ch.title)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 text-xs font-semibold border border-purple-500/30 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{language === 'mr' ? 'AI कडून समजून घ्या' : 'Ask AI Tutor'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
                >
                  <span>{language === 'mr' ? 'सराव क्विज' : 'Quiz'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: FORMULA BOOK */}
      {activeSubTab === 'formulas' && currentSubject.formulaBook && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentSubject.formulaBook.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/90 border border-blue-500/30 space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400">{item.chapter}</span>
                <span className="text-[10px] text-slate-400">Board Essential</span>
              </div>
              <h4 className="font-bold text-white text-sm">{item.name}</h4>
              <div className="p-3 rounded-xl bg-slate-950 border border-blue-500/20 font-mono text-cyan-300 text-sm font-bold text-center tracking-wide overflow-x-auto">
                {item.formula}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: DEFINITIONS & LAWS */}
      {activeSubTab === 'definitions' && currentSubject.definitionsAndLaws && (
        <div className="space-y-4">
          {currentSubject.definitionsAndLaws.map((law, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-2.5 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400">{law.chapter}</span>
                <span className="text-[10px] font-semibold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  {law.importance}
                </span>
              </div>
              <h4 className="font-bold text-white text-base">{law.title}</h4>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 leading-relaxed font-sans">
                &ldquo;{law.statement}&rdquo;
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: GRAMMAR RULES */}
      {activeSubTab === 'grammar' && currentSubject.grammarRules && (
        <div className="space-y-4">
          {currentSubject.grammarRules.map((rule, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-3 shadow-lg"
            >
              <h4 className="font-bold text-amber-300 text-base">{rule.topic}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{rule.rule}</p>
              <div className="space-y-1.5 pl-3 border-l-2 border-amber-500/40">
                {rule.examples.map((ex, eIdx) => (
                  <p key={eIdx} className="text-xs font-medium text-slate-200">
                    • {ex}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
