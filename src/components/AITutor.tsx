import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { QUICK_PROMPTS, MAHARASHTRA_SSC_SUBJECTS } from '../data/curriculumData';
import { ChatMessage } from '../types';
import {
  Bot,
  Send,
  Image as ImageIcon,
  X,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Languages,
  BookOpen,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

export const AITutor: React.FC = () => {
  const {
    language,
    setLanguage,
    chatMessages,
    addChatMessage,
    setChatMessages,
    addXp,
    unlockBadge,
  } = useApp();

  const [input, setInput] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics 1');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, loading]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    setImageMimeType(file.type);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query && !imagePreview) return;
    if (loading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: query || (language === 'mr' ? 'या चित्रातील गणिताचे/प्रश्नाचे स्पष्टीकरण द्या.' : 'Please analyze and explain the solution for this image.'),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: imagePreview || undefined,
    };

    addChatMessage(userMsg);
    setInput('');
    const currentImg = imagePreview;
    const currentMime = imageMimeType;
    clearImage();
    setLoading(true);

    try {
      const response = await fetch('/api/study-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          language,
          subject: selectedSubject,
          imageBase64: currentImg || undefined,
          imageMimeType: currentMime,
          history: chatMessages.slice(-6).map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: 'msg-bot-' + Date.now(),
        role: 'assistant',
        content: data.text || 'I could not generate an answer right now. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFallback: data.isFallback,
      };

      addChatMessage(botMsg);
      addXp(15, 'Solved a doubt with AI Tutor');
      unlockBadge('first_question');
    } catch (err: any) {
      console.error('AI Tutor error:', err);
      const errorMsg: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        role: 'assistant',
        content: language === 'mr'
          ? 'माफ करा, सर्व्हरशी संपर्क साधताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.'
          : 'Sorry, could not reach the AI service right now. Please check your connection and try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      addChatMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    if (window.confirm(language === 'mr' ? 'तुम्हाला संभाषण साफ करायचे आहे का?' : 'Do you want to reset the chat conversation?')) {
      setChatMessages([
        {
          id: 'msg-reset',
          role: 'assistant',
          content: language === 'mr'
            ? 'संभाषण रीसेट झाले. तुम्हाला कोणता नवीन विषय किंवा गणित सोडवायचे आहे?'
            : 'Conversation reset. Ask any question or upload a photo to start fresh!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[580px] max-w-5xl mx-auto rounded-3xl bg-slate-900/90 border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-950/40">
      
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-purple-900/40 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
              <span>{language === 'mr' ? 'StudyVerse AI शिक्षक' : 'StudyVerse AI Tutor'}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>SSC 10th Ready</span>
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              {language === 'mr' ? 'मराठी व इंग्रजी दोन्ही भाषांमध्ये पायरी-पायरीने उत्तरे' : 'Step-by-step board explanations in Marathi & English'}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Subject Selector */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="text-xs bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-purple-500 font-medium"
          >
            <option value="Mathematics 1">Maths 1 (Algebra)</option>
            <option value="Mathematics 2">Maths 2 (Geometry)</option>
            <option value="Science 1">Science 1</option>
            <option value="Science 2">Science 2</option>
            <option value="Marathi">Marathi (मराठी)</option>
            <option value="English">English</option>
            <option value="Social Science">History / Geography</option>
          </select>

          {/* Reset Chat */}
          <button
            onClick={clearChat}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Reset Chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 bg-slate-950/40 border-b border-slate-800/80 overflow-x-auto flex items-center space-x-2 no-scrollbar">
        <span className="text-[11px] font-semibold text-purple-400 flex items-center space-x-1 flex-shrink-0">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>{language === 'mr' ? 'महत्त्वाचे प्रश्न:' : 'Quick Questions:'}</span>
        </span>
        {QUICK_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(language === 'mr' ? p.textMr : p.textEn)}
            className="flex-shrink-0 text-xs px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-purple-900/40 text-slate-300 hover:text-white border border-slate-700/60 hover:border-purple-500/40 transition-all"
          >
            {language === 'mr' ? p.textMr : p.textEn}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {chatMessages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isUser
                    ? 'bg-gradient-to-tr from-cyan-600 to-blue-600 text-white font-bold text-xs'
                    : 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-cyan-300 p-0.5'
                }`}
              >
                {isUser ? 'YOU' : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`group relative max-w-[94%] sm:max-w-[85%] rounded-2xl p-3.5 sm:p-5 text-xs sm:text-sm leading-relaxed min-w-0 shadow-lg ${
                  isUser
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-900/20'
                    : 'bg-slate-950/85 border border-purple-500/25 text-slate-200 shadow-slate-950/50'
                }`}
              >
                {/* Image if attached */}
                {msg.image && (
                  <div className="mb-3 rounded-xl overflow-hidden border border-slate-700/80 max-h-60 max-w-sm">
                    <img src={msg.image} alt="Uploaded sum" className="object-cover w-full h-auto" />
                  </div>
                )}

                {/* Content */}
                <div className="min-w-0 overflow-hidden break-words">
                  {isUser ? (
                    <div className="whitespace-pre-wrap font-sans space-y-1">
                      {msg.content}
                    </div>
                  ) : (
                    <MarkdownRenderer content={msg.content} />
                  )}
                </div>

                {/* Footer details */}
                <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/10 text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-white rounded"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600/40 flex items-center justify-center text-cyan-300">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-300 text-sm flex items-center space-x-2">
              <div className="flex space-x-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs text-slate-400">
                {language === 'mr' ? 'AI उत्तर तयार करत आहे...' : 'StudyVerse AI is thinking and formulating step-by-step solution...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Image Preview attachment row */}
      {imagePreview && (
        <div className="px-4 py-2 bg-slate-950/90 border-t border-purple-900/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={imagePreview} alt="Preview" className="w-12 h-12 rounded object-cover border border-purple-500/50" />
            <div>
              <p className="text-xs font-semibold text-white">
                {language === 'mr' ? 'फोटो जोडला गेला आहे' : 'Question Photo Attached'}
              </p>
              <p className="text-[10px] text-slate-400">
                {language === 'mr' ? 'AI हे चित्र वाचून उत्तर देईल' : 'AI will analyze this textbook question/diagram'}
              </p>
            </div>
          </div>
          <button
            onClick={clearImage}
            className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input Form */}
      <div className="p-3 sm:p-4 bg-slate-950/90 border-t border-purple-900/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-end space-x-2"
        >
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />

          {/* Photo attach button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-purple-500/40 text-slate-300 hover:text-cyan-300 transition-all flex-shrink-0"
            title={language === 'mr' ? 'गणिताचा फोटो किंवा आकृती जोडा' : 'Attach sum photo or textbook question'}
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          {/* Textarea */}
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={
                language === 'mr'
                  ? 'मराठी किंवा इंग्रजीत शंका विचारा (उदा. पायथागोरसचे प्रमेय, समीकरणे, वाक्प्रचार)...'
                  : 'Ask any question or sum (e.g. Solve 2x + 3y = 12, Kepler\'s Laws, Marathi grammar)...'
              }
              rows={1}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/50 resize-none max-h-32"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={loading || (!input.trim() && !imagePreview)}
            className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-lg shadow-purple-600/30 transition-all flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

    </div>
  );
};
