import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Sparkles,
  Zap,
  Target,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const StudyPlanner: React.FC = () => {
  const { language, tasks, toggleTask, addTask, generateSmartSchedule } = useApp();

  const [studyHours, setStudyHours] = useState<number>(4);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newSubject, setNewSubject] = useState<string>('Mathematics 1');
  const [newDuration, setNewDuration] = useState<number>(30);
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const completedCount = tasks.filter(t => t.completed).length;
  const totalMinutes = tasks.reduce((sum, t) => sum + t.durationMinutes, 0);
  const completedMinutes = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.durationMinutes, 0);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask(newTitle, newSubject, newDuration, newPriority);
    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Title Header */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center space-x-2">
              <span>{language === 'mr' ? 'स्मार्ट अभ्यास नियोजन व वेळापत्रक' : 'Smart Study Planner & Timetable'}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                SSC 10th Optimized
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'mr'
                ? 'तुमच्या उपलब्ध अभ्यासाच्या वेळेनुसार दररोजचे वेळापत्रक तयार करा आणि प्रगती ट्रॅक करा.'
                : 'Balanced daily study plan aligned with Maharashtra State Board weightage.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'mr' ? 'नवीन ध्येय जोडा' : 'Add Custom Task'}</span>
        </button>
      </div>

      {/* Auto Timetable Generator Strip */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{language === 'mr' ? 'आज तुमच्याकडे अभ्यासासाठी किती तास आहेत?' : 'How many hours can you study today?'}</span>
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'mr' ? 'AI तुमच्या वेळेनुसार सर्व विषयांचे संतुलित नियोजन करेल.' : 'AI will generate an optimal revision distribution across subjects.'}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {[2, 4, 6].map((hrs) => (
              <button
                key={hrs}
                onClick={() => {
                  setStudyHours(hrs);
                  generateSmartSchedule(hrs);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  studyHours === hrs
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {hrs} {language === 'mr' ? 'तास' : 'Hours'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">{language === 'mr' ? 'पूर्ण झालेली कार्ये' : 'Tasks Completed'}</p>
          <p className="text-2xl font-extrabold text-white mt-1">
            {completedCount} <span className="text-xs font-normal text-slate-500">/ {tasks.length}</span>
          </p>
          <div className="w-full bg-slate-950 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-purple-500 h-1.5 rounded-full"
              style={{ width: `${tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">{language === 'mr' ? 'अभ्यासाचा वेळ' : 'Study Time Logged'}</p>
          <p className="text-2xl font-extrabold text-cyan-400 mt-1">
            {completedMinutes} <span className="text-xs font-normal text-slate-500">/ {totalMinutes} mins</span>
          </p>
          <div className="w-full bg-slate-950 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-cyan-400 h-1.5 rounded-full"
              style={{ width: `${totalMinutes ? Math.round((completedMinutes / totalMinutes) * 100) : 0}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">{language === 'mr' ? 'आजचे XP रिवॉर्ड्स' : 'Task Rewards Earned'}</p>
          <p className="text-2xl font-extrabold text-amber-400 mt-1">
            +{completedCount * 25} <span className="text-xs font-normal text-slate-500">XP</span>
          </p>
          <p className="text-[10px] text-slate-400 mt-2">{language === 'mr' ? 'प्रत्येक कार्यासाठी २५ XP' : '25 XP per finished task'}</p>
        </div>
      </div>

      {/* Task Checklist */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-purple-500/20 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center justify-between">
          <span>{language === 'mr' ? 'आजची अभ्यास उद्दिष्टे' : "Today's Study Checklist"}</span>
          <span className="text-xs text-slate-400 font-normal">
            {completedCount === tasks.length && tasks.length > 0 ? (
              <span className="text-emerald-400 font-bold">🎉 All done for today!</span>
            ) : (
              <span>{tasks.length - completedCount} tasks remaining</span>
            )}
          </span>
        </h3>

        <div className="space-y-2.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                task.completed
                  ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                  : 'bg-slate-950 border-slate-800 hover:border-purple-500/50'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <button
                  type="button"
                  className="flex-shrink-0 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600" />
                  )}
                </button>
                <div>
                  <p
                    className={`text-sm font-semibold text-slate-200 ${
                      task.completed ? 'line-through text-slate-500' : ''
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300">
                      {task.subject}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{task.durationMinutes} mins</span>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    task.priority === 'high'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : task.priority === 'medium'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs">
              No tasks added yet. Click &apos;Add Custom Task&apos; or pick a study hour above!
            </div>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-purple-500/40 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">
              {language === 'mr' ? 'नवीन अभ्यास कार्य जोडा' : 'Add New Study Goal'}
            </h3>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {language === 'mr' ? 'कार्याचे नाव (Task Title):' : 'Task Title:'}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Practice Pythagoras Theorem proofs"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'mr' ? 'विषय:' : 'Subject:'}
                  </label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Mathematics 1">Mathematics 1</option>
                    <option value="Mathematics 2">Mathematics 2</option>
                    <option value="Science 1">Science 1</option>
                    <option value="Science 2">Science 2</option>
                    <option value="Marathi">Marathi</option>
                    <option value="English">English</option>
                    <option value="Social Science">Social Science</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'mr' ? 'वेळ (मिनिटे):' : 'Duration (mins):'}
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="180"
                    step="5"
                    value={newDuration}
                    onChange={(e) => setNewDuration(parseInt(e.target.value, 10) || 30)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {language === 'mr' ? 'प्राधान्य (Priority):' : 'Priority:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setNewPriority(p)}
                      className={`py-1.5 rounded-lg text-xs font-bold uppercase ${
                        newPriority === p
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  {language === 'mr' ? 'रद्द करा' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold shadow-md"
                >
                  {language === 'mr' ? 'जतन करा' : 'Save Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
