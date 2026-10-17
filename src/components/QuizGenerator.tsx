import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { MAHARASHTRA_SSC_SUBJECTS } from '../data/curriculumData';
import { QuizQuestion, QuizSession } from '../types';
import {
  CheckSquare,
  Sparkles,
  Clock,
  Award,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Zap,
  HelpCircle,
  Trophy
} from 'lucide-react';

export const QuizGenerator: React.FC = () => {
  const { language, addXp, unlockBadge } = useApp();

  // Generator Configuration State
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('maths-1');
  const [selectedChapter, setSelectedChapter] = useState<string>('Linear Equations in Two Variables');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard (Board Level)'>('Medium');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Active Quiz State
  const [activeQuiz, setActiveQuiz] = useState<QuizSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentSubjectObj = MAHARASHTRA_SSC_SUBJECTS.find(s => s.id === selectedSubjectId) || MAHARASHTRA_SSC_SUBJECTS[0];

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    const sub = MAHARASHTRA_SSC_SUBJECTS.find(s => s.id === subjectId);
    if (sub && sub.chapters.length > 0) {
      setSelectedChapter(sub.chapters[0].title);
    }
  };

  const handleStartQuiz = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: currentSubjectObj.name,
          chapter: selectedChapter,
          difficulty,
          count: questionCount,
          language,
        }),
      });

      if (!res.ok) throw new Error('Quiz generation failed');
      const data = await res.json();

      if (data && data.questions && data.questions.length > 0) {
        setActiveQuiz({
          quizTitle: data.quizTitle || `${currentSubjectObj.name} - ${selectedChapter}`,
          subject: currentSubjectObj.name,
          chapter: selectedChapter,
          difficulty,
          questions: data.questions,
          userAnswers: new Array(data.questions.length).fill(-1),
          score: 0,
          total: data.questions.length,
        });
        setCurrentIndex(0);
        setSelectedOption(null);
        setIsAnswerSubmitted(false);
        setUserAnswers(new Array(data.questions.length).fill(-1));
        setQuizFinished(false);
      }
    } catch (err: any) {
      console.error(err);
      alert('Could not generate quiz right now. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !activeQuiz) return;

    const currentQ = activeQuiz.questions[currentIndex];
    const isCorrect = selectedOption === currentQ.correctAnswer;

    const nextAnswers = [...userAnswers];
    nextAnswers[currentIndex] = selectedOption;
    setUserAnswers(nextAnswers);
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      addXp(10, 'Correct MCQ Answer');
    }
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;

    if (currentIndex + 1 < activeQuiz.questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finished quiz! Calculate final score
      let finalScore = 0;
      activeQuiz.questions.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctAnswer) {
          finalScore += 1;
        }
      });

      setQuizFinished(true);
      setActiveQuiz(prev => prev ? { ...prev, score: finalScore } : null);

      // Trigger Confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      addXp(75, 'Completed Practice Quiz');
      unlockBadge('first_quiz');

      if (finalScore === activeQuiz.questions.length) {
        unlockBadge('quiz_master');
      }
    }
  };

  const handleRetakeQuiz = () => {
    setActiveQuiz(null);
    setQuizFinished(false);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-purple-500/30 flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center space-x-2">
              <span>{language === 'mr' ? 'महाराष्ट्र SSC स्मार्ट क्विज अरेना' : 'Maharashtra SSC Smart Quiz Arena'}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                Live MCQ Engine
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'mr'
                ? 'इयत्ता १० वी च्या प्रत्येक प्रकरणावर सराव परीक्षा, तत्काळ स्पष्टीकरणे आणि बोर्ड टिप्स!'
                : 'Customizable Class 10 chapter tests with instant explanations and board tips.'}
            </p>
          </div>
        </div>
      </div>

      {/* QUIZ CONFIGURATION PANEL (When no active quiz) */}
      {!activeQuiz && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-purple-500/30 space-y-6 shadow-xl">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>{language === 'mr' ? 'नवीन सराव परीक्षा निवडा' : 'Configure Your Practice Quiz'}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Subject Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {language === 'mr' ? '१. विषय निवडा (Subject):' : '1. Choose Subject:'}
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 font-medium"
              >
                {MAHARASHTRA_SSC_SUBJECTS.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name} ({sub.nameMr})
                  </option>
                ))}
              </select>
            </div>

            {/* Chapter Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {language === 'mr' ? '२. पाठ / प्रकरण निवडा (Chapter):' : '2. Choose Chapter:'}
              </label>
              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 font-medium"
              >
                {currentSubjectObj.chapters.map((ch, idx) => (
                  <option key={idx} value={ch.title}>
                    {ch.title} ({ch.titleMr}) - [{ch.weightageMarks}M]
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {language === 'mr' ? '३. काठिण्य पातळी (Difficulty):' : '3. Difficulty Level:'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Easy', 'Medium', 'Hard (Board Level)'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDifficulty(lvl)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                      difficulty === lvl
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-400'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {language === 'mr' ? '४. प्रश्नांची संख्या (Number of MCQs):' : '4. Number of Questions:'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 15].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setQuestionCount(cnt)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                      questionCount === cnt
                        ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 border border-cyan-400'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {cnt} {language === 'mr' ? 'प्रश्न' : 'Questions'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>{language === 'mr' ? 'चाचणी पूर्ण केल्यास +७५ XP मिळतील' : 'Earn +75 XP on completion'}</span>
            </span>

            <button
              onClick={handleStartQuiz}
              disabled={isGenerating}
              className="flex items-center space-x-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-40 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{language === 'mr' ? 'क्विज तयार करत आहे...' : 'Generating Questions...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>{language === 'mr' ? 'चाचणी सुरू करा' : 'Start Practice Quiz'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE QUIZ RUNNER */}
      {activeQuiz && !quizFinished && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-purple-500/30 space-y-6 shadow-2xl">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
            <div>
              <span className="text-slate-400">{activeQuiz.subject} • </span>
              <span className="text-purple-300 font-bold">{activeQuiz.chapter}</span>
            </div>
            <div className="flex items-center space-x-2 font-mono font-bold text-cyan-400">
              <Clock className="w-4 h-4" />
              <span>{currentIndex + 1} / {activeQuiz.questions.length}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / activeQuiz.questions.length) * 100}%` }}
            />
          </div>

          {/* Current Question */}
          {(() => {
            const currentQ = activeQuiz.questions[currentIndex];
            return (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1 block">
                    {language === 'mr' ? `प्रश्न ${currentIndex + 1}:` : `Question ${currentIndex + 1}:`}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                    {currentQ.question}
                  </h3>
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQ.options.map((opt, optIdx) => {
                    let optionStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-purple-500/60';
                    
                    if (isAnswerSubmitted) {
                      if (optIdx === currentQ.correctAnswer) {
                        optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/20';
                      } else if (selectedOption === optIdx && optIdx !== currentQ.correctAnswer) {
                        optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      } else {
                        optionStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                      }
                    } else if (selectedOption === optIdx) {
                      optionStyle = 'bg-purple-950/70 border-cyan-400 text-white shadow-md shadow-purple-500/20';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        disabled={isAnswerSubmitted}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between text-sm font-medium transition-all ${optionStyle}`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center font-bold text-xs text-purple-300">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isAnswerSubmitted && optIdx === currentQ.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        )}
                        {isAnswerSubmitted && selectedOption === optIdx && optIdx !== currentQ.correctAnswer && (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card (After Answer Submission) */}
                {isAnswerSubmitted && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2 text-xs animate-in fade-in duration-300">
                    <p className="font-bold text-cyan-300 flex items-center space-x-1.5">
                      <HelpCircle className="w-4 h-4 text-cyan-400" />
                      <span>{language === 'mr' ? 'स्पष्टीकरण (Explanation):' : 'Detailed Explanation:'}</span>
                    </p>
                    <p className="text-slate-300 leading-relaxed font-sans">
                      {currentQ.explanation}
                    </p>
                    {currentQ.boardTip && (
                      <p className="text-amber-300/90 pt-1 border-t border-slate-800 flex items-start space-x-1">
                        <span className="font-bold">Board Tip:</span>
                        <span>{currentQ.boardTip}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    onClick={handleRetakeQuiz}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    {language === 'mr' ? 'चाचणी सोडा' : 'Quit Quiz'}
                  </button>

                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedOption === null}
                      className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs shadow-md transition-all"
                    >
                      {language === 'mr' ? 'उत्तर नोंदवा' : 'Check Answer'}
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-cyan-600/30 transition-all"
                    >
                      <span>
                        {currentIndex + 1 < activeQuiz.questions.length
                          ? (language === 'mr' ? 'पुढील प्रश्न' : 'Next Question')
                          : (language === 'mr' ? 'निकाल पहा' : 'View Results')}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* QUIZ FINISHED / SCORE CARD */}
      {activeQuiz && quizFinished && (
        <div className="p-8 rounded-3xl bg-slate-900/95 border border-purple-500/40 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 p-1 flex items-center justify-center text-white shadow-xl shadow-purple-600/30">
            <Trophy className="w-8 h-8 text-yellow-300 animate-bounce" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'mr' ? 'अभिनंदन! परीक्षा पूर्ण झाली 🎉' : 'Awesome Job! Quiz Completed 🎉'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {activeQuiz.quizTitle}
            </p>
          </div>

          {/* Score display */}
          <div className="inline-flex items-center space-x-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                {language === 'mr' ? 'तुमचे गुण' : 'Your Score'}
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">
                {activeQuiz.score} / {activeQuiz.total}
              </p>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                {language === 'mr' ? 'अचूकता' : 'Accuracy'}
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono">
                {Math.round((activeQuiz.score / activeQuiz.total) * 100)}%
              </p>
            </div>
          </div>

          <div className="max-w-md mx-auto text-xs text-slate-300 bg-purple-950/30 border border-purple-800/30 p-3 rounded-xl">
            {activeQuiz.score === activeQuiz.total
              ? (language === 'mr' ? 'उत्कृष्ट! १००% गुण. तुमची तयारी बोर्ड परीक्षेसाठी मजबूत आहे!' : 'Flawless score! 100% accuracy. You have mastered this chapter!')
              : (language === 'mr' ? 'छान प्रयत्न! चुकलेल्या प्रश्नांची उत्तरे पुन्हा तपासा.' : 'Good effort! Review the questions you missed to lock in the concepts.')}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRetakeQuiz}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'mr' ? 'नवीन चाचणी द्या' : 'Take Another Quiz'}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
