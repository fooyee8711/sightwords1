import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  Eye, 
  Play, 
  MapPin, 
  Zap, 
  Timer, 
  Trophy, 
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  RefreshCcw,
  Volume2,
  Settings,
  X,
  Target,
  BarChart2,
  CheckCircle2,
  Clock,
  Layout,
  Ghost
} from 'lucide-react';
import { SIGHT_WORDS_BY_LEVEL, StorySegment, STORY_TEMPLATES, getPhonemes } from './constants';

const getApiKey = () => {
  return (
    import.meta.env.VITE_GEMINI_API_KEY_8 || 
    import.meta.env.VITE_GEMINI_API_KEY || 
    process.env.Gemini_API_Key_8 || 
    process.env.GEMINI_API_KEY || 
    ""
  );
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

// --- Types ---
interface WordStats {
  word: string;
  totalAttempts: number;
  learned: boolean;
}

interface DailyTask {
  words: string[];
  loopsDone: number;
  readsDone: number;
  lastReset: string;
}

interface AppSettings {
  wordsPerSession: number;
}

// --- Components ---

const GhostProgressBar = ({ 
  currentProgress, 
  ghostProgress, 
  label 
}: { 
  currentProgress: number; 
  ghostProgress: number; 
  label: string 
}) => {
  return (
    <div className="w-full bg-white rounded-full h-10 relative overflow-hidden border-4 border-brand-border shadow-inner">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-[xs] uppercase font-black text-brand-navy/30 tracking-widest hidden sm:block">
        {label}
      </div>

      <motion.div 
        className="absolute top-0 bottom-0 flex items-center z-20"
        animate={{ left: `${Math.min(ghostProgress, 100)}%` }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <div className="w-8 h-8 flex items-center justify-center opacity-40">
          <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center border-2 border-white">
            <Ghost className="text-white" size={12} />
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="absolute top-0 bottom-0 flex items-center z-30"
        style={{ left: `${Math.min(currentProgress, 100)}%` }}
      >
        <div className="w-10 h-10 flex items-center justify-center -translate-x-1/2">
          <motion.div 
            className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg"
            animate={{ 
              scale: currentProgress > ghostProgress ? [1, 1.2, 1] : 1,
              rotate: currentProgress > ghostProgress ? [0, 10, -10, 0] : 0
            }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            <Target className="text-white" size={16} />
          </motion.div>
        </div>
      </motion.div>

      {currentProgress > ghostProgress && (
        <motion.div 
          className="absolute inset-0 bg-yellow-400/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      )}
    </div>
  );
};

const PhonemeBox = ({ letters, onComplete }: { letters: string[], onComplete: () => void }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);

  useEffect(() => {
    const indices = letters.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledIndices(indices);
    setActiveIndex(0);
    setUsedIndices([]);
  }, [letters]);

  const handleTap = (originalIndex: number) => {
    const tappedLetter = letters[originalIndex];
    const targetLetter = letters[activeIndex];

    if (tappedLetter === targetLetter) {
      setUsedIndices(prev => [...prev, originalIndex]);
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
      
      if (nextIndex === letters.length) {
        setTimeout(onComplete, 1200);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-12">
      <div className="flex gap-2 p-4 bg-brand-beige rounded-[32px] border-4 border-dashed border-brand-border min-h-[120px] items-center justify-center min-w-[200px]">
        {letters.map((_, i) => (
          <motion.div
            key={`target-${i}`}
            initial={false}
            animate={{ 
              backgroundColor: i < activeIndex ? '#10b981' : '#ffffff',
              borderColor: i < activeIndex ? '#047857' : '#E0D8C3'
            }}
            className="w-14 h-18 sm:w-16 sm:h-20 rounded-2xl border-4 flex items-center justify-center text-2xl sm:text-3xl font-black shadow-inner"
          >
            <AnimatePresence>
              {i < activeIndex && (
                <motion.span
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="text-white"
                >
                  {letters[i]}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-4 justify-center flex-wrap">
        {shuffledIndices.map((originalIndex) => {
          const char = letters[originalIndex];
          const isUsed = usedIndices.includes(originalIndex);

          return (
            <motion.button
              key={originalIndex}
              onClick={() => handleTap(originalIndex)}
              disabled={isUsed}
              className={`w-16 h-20 sm:w-20 sm:h-24 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center text-2xl sm:text-3xl font-black border-4 transition-all
                ${isUsed ? 'bg-transparent border-transparent text-transparent pointer-events-none' : 
                  'bg-white border-brand-border text-brand-navy shadow-lg border-b-8 active:border-b-4 active:translate-y-1'}`}
              whileTap={!isUsed ? { scale: 0.95 } : {}}
            >
              {!isUsed ? char : ''}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  const [level, setLevel] = useState(() => localStorage.getItem('macaron_level') || 'Level 1 (Age 5)');
  const [step, setStep] = useState(0);
  const [gameState, setGameState] = useState<'home' | 'story' | 'challenge' | 'feedback' | 'parents' | 'fullStory'>('home');
  const [stats, setStats] = useState<Record<string, WordStats>>(() => {
    const saved = localStorage.getItem('macaron_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('macaron_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return { wordsPerSession: 5 };
      }
    }
    return { wordsPerSession: 5 };
  });
  const [streak, setStreak] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [sessionStartTime] = useState(Date.now());
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [generatedStories, setGeneratedStories] = useState<any[]>([]);
  const [isGeneratingStories, setIsGeneratingStories] = useState(false);
  const [dailyTask, setDailyTask] = useState<DailyTask>(() => {
    const saved = localStorage.getItem('macaron_daily_task');
    const today = new Date().toDateString();
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.lastReset === today) {
          return parsed;
        }
      } catch (e) {}
    }
    return { words: [], loopsDone: 0, readsDone: 0, lastReset: today };
  });

  // Save stats, settings, daily task and level to localStorage
  useEffect(() => {
    localStorage.setItem('macaron_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('macaron_level', level);
  }, [level]);

  useEffect(() => {
    localStorage.setItem('macaron_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('macaron_daily_task', JSON.stringify(dailyTask));
  }, [dailyTask]);

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) {
        setVoices(v);
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const wordsInLevel = useMemo(() => SIGHT_WORDS_BY_LEVEL[level] || [], [level]);
  
  // Initialize or maintain daily words
  useEffect(() => {
    if (dailyTask.words.length === 0 && wordsInLevel.length > 0) {
      const unlearned = wordsInLevel.filter(w => !stats[w]?.learned);
      const pool = unlearned.length > 0 ? unlearned : wordsInLevel;
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      const picked = shuffled.slice(0, settings.wordsPerSession);
      setDailyTask(prev => ({ ...prev, words: picked }));
    }
  }, [wordsInLevel, stats, settings.wordsPerSession, dailyTask.words.length]);

  const todaysWords = useMemo(() => dailyTask.words, [dailyTask.words]);

  const currentStoryData: StorySegment[] = useMemo(() => {
    if (todaysWords.length === 0) return [];
    return todaysWords.map((word, i) => {
      const template = (STORY_TEMPLATES as any)[word] || {
        text: `Foxy is looking for the word ${word}!`,
        emoji: "🌳🦊",
        question: `Can you find '${word}'?`,
        actionInstruction: `Tap the word '${word}'!`,
        type: 'spot'
      };
      return {
        id: `level-${level}-${word}-${i}`,
        word,
        ...template
      } as StorySegment;
    });
  }, [todaysWords, level]);

  const currentSegment = currentStoryData[step] || currentStoryData[0];

  const generateStories = async () => {
    if (todaysWords.length === 0 || isGeneratingStories) return;
    
    setIsGeneratingStories(true);
    try {
      const prompt = `Generate exactly 1 long educational adventure story for a 5-year-old child featuring Peppa Pig and her family. 
      The theme should combine Peppa Pig's daily life with simple educational facts or "how things work" (e.g., why we need rain, how plants grow from seeds, how bees make honey, or how a rainbow appears).
      The story MUST contain exactly 30 simple sentences in total.
      Structure the story into exactly 5 pages, with each page having exactly 6 short sentences.
      
      CRITICAL REQUIREMENT: The story MUST include ALL of the following sight words multiple times throughout the narrative: ${todaysWords.join(', ')}. 
      
      The tone must be gentle, reasonable (making logical sense), and educational. Use repetitive and predictable sentence structures.
      
      Return the result as a JSON object with:
      - 'title': A fun title for the story.
      - 'pages': An array of 5 objects, where each object has a 'lines' array of 6 strings.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              pages: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    lines: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ["lines"]
                }
              }
            },
            required: ["title", "pages"]
          }
        }
      });

      const data = JSON.parse(response.text);
      setGeneratedStories(data.pages.slice(0, 5).map((page: any, pageIdx: number) => ({
        id: `page-${pageIdx}`,
        title: data.title,
        lines: page.lines.map((line: string, lineIdx: number) => ({
          id: `page-${pageIdx}-line-${lineIdx}`,
          text: line
        }))
      })));
    } catch (error) {
      console.error("Failed to generate story:", error);
      const fallbacks = [];
      for (let i = 0; i < 5; i++) {
        fallbacks.push({
          title: "Peppa's Garden Discovery",
          lines: [
            "Today Peppa is in the big green garden.",
            "She sees a tiny brown seed in the dirt.",
            `She likes to ${todaysWords[0] || 'see'} the brown dirt.`,
            `The seed needs water to ${todaysWords[1] || 'grow'} up.`,
            "Rain falls from the gray clouds above.",
            "Water helps all the plants grow big."
          ].map((text, j) => ({ id: `fallback-${i}-${j}`, text }))
        });
      }
      setGeneratedStories(fallbacks);
    } finally {
      setIsGeneratingStories(false);
    }
  };

  useEffect(() => {
    setGeneratedStories([]);
    setStep(0);
  }, [level, todaysWords]);

  useEffect(() => {
    if (gameState === 'fullStory' && generatedStories.length === 0) {
      generateStories();
    }
  }, [gameState, generatedStories.length]);

  const [currentStoryIdx, setCurrentStoryIdx] = useState(0);

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    
    try {
      window.speechSynthesis.cancel();
      // Resume if it somehow got stuck
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (e) {
      console.error("Speech reset failed", e);
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    const availableVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
    const gbFemaleVoice = availableVoices.find(v => 
      v.lang.toLowerCase().includes('en-gb') && 
      (v.name.toLowerCase().includes('female') || 
       v.name.toLowerCase().includes('girl') || 
       v.name.toLowerCase().includes('hazel') || 
       v.name.toLowerCase().includes('serena') || 
       v.name.toLowerCase().includes('susan') ||
       v.name.toLowerCase().includes('libby') ||
       v.name.toLowerCase().includes('amy') ||
       v.name.toLowerCase().includes('google uk english female'))
    );
    
    if (gbFemaleVoice) {
      utterance.voice = gbFemaleVoice;
    } else {
      const gbVoice = availableVoices.find(v => v.lang.toLowerCase().includes('en-gb'));
      if (gbVoice) utterance.voice = gbVoice;
    }
    
    utterance.lang = 'en-GB';
    utterance.rate = 0.85;
    utterance.pitch = 1.1; // Slightly higher pitch for a "girl" feel if it's the generic voice

    utterance.onerror = (e) => {
      console.error("Speech synthesis error", e);
    };

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (gameState === 'story' && currentSegment) {
      speak(currentSegment.word);
    }
  }, [step, gameState, currentSegment]);

  const handleChallengeComplete = () => {
    speak(currentSegment.word);
    
    setStats(prev => {
      const word = currentSegment.word;
      const current = prev[word] || { word, totalAttempts: 0, learned: false };
      return {
        ...prev,
        [word]: {
          ...current,
          totalAttempts: current.totalAttempts + 1
        }
      };
    });

    setStreak(prev => prev + 1);
    setGameState('feedback');
  };

  const nextStep = () => {
    if (step < currentStoryData.length - 1) {
      setStep(prev => prev + 1);
      setGameState('story');
    } else {
      setStep(0);
      setGameState('home');
      setTotalScore(prev => prev + 100);
      setDailyTask(prev => {
        const nextLoops = prev.loopsDone + 1;
        if (nextLoops === 3) {
          setStats(s => {
            const newStats = { ...s };
            prev.words.forEach(w => {
              if (!newStats[w]) newStats[w] = { word: w, totalAttempts: 0, learned: true };
              else newStats[w] = { ...newStats[w], learned: true };
            });
            return newStats;
          });
        }
        return { ...prev, loopsDone: nextLoops };
      });
    }
  };

  const nextStory = () => {
    if (currentStoryIdx < generatedStories.length - 1) {
      setCurrentStoryIdx(prev => prev + 1);
    } else {
      setCurrentStoryIdx(0);
      setGameState('home');
      setDailyTask(prev => ({ ...prev, readsDone: prev.readsDone + 1 }));
      setTotalScore(prev => prev + 200);
    }
  };

  const toggleLearned = (word: string) => {
    setStats(prev => {
      const current = prev[word] || { word, totalAttempts: 0, learned: false };
      return {
        ...prev,
        [word]: { ...current, learned: !current.learned }
      };
    });
  };

  const toggleParentsView = () => {
    setGameState(prev => prev === 'parents' ? 'story' : 'parents');
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-between overflow-hidden font-sans transition-colors duration-1000 bg-brand-beige text-brand-navy`}>
      
      <header className="w-full h-20 sm:h-24 bg-white border-b-4 border-brand-border px-4 sm:px-8 flex items-center justify-center shrink-0">
        <div className="w-full max-w-5xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            {gameState !== 'home' && (
              <button 
                onClick={() => setGameState('home')}
                className="p-2 bg-brand-beige rounded-xl border-2 border-brand-border hover:bg-white transition-colors active:scale-90"
                aria-label="Go Back"
              >
                <ChevronLeft size={24} className="text-brand-navy/60" />
              </button>
            )}
            <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-2xl shadow-sm">🦊</div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">The Fox Quest</span>
              <h1 className="text-xl font-black leading-none italic">{level}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleParentsView}
              className="p-3 bg-brand-beige rounded-2xl border-2 border-brand-border hover:bg-white transition-colors active:scale-95 flex items-center gap-2"
            >
              <Settings size={20} className="text-brand-navy/60" />
              <span className="hidden sm:inline text-xs font-black uppercase tracking-widest">Parents</span>
            </button>

            <div className="hidden sm:flex px-4 py-2 bg-brand-beige rounded-2xl border-2 border-brand-border items-center gap-2">
              <Trophy size={14} className="text-orange-500 fill-orange-500" />
              <span className="text-xs font-black font-mono">{totalScore}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full max-w-5xl flex-1 flex flex-col p-4 sm:p-8 relative">
        <AnimatePresence mode="wait">
          {gameState === 'home' ? (
            <motion.div 
              key="home-view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col items-center justify-center gap-8 w-full"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-black text-brand-navy italic">Today's Walk</h2>
                <div className="flex gap-4 items-center justify-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-3 h-3 rounded-full ${dailyTask.loopsDone >= 3 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                    <span className="text-[10px] font-black uppercase text-slate-400">Step 1: Learn</span>
                  </div>
                  <div className="w-8 h-1 bg-slate-100 rounded-full" />
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-3 h-3 rounded-full ${dailyTask.readsDone >= 2 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                    <span className="text-[10px] font-black uppercase text-slate-400">Step 2: Read</span>
                  </div>
                </div>
              </div>

              {dailyTask.loopsDone >= 3 && dailyTask.readsDone >= 2 ? (
                <div className="bg-white p-12 rounded-[40px] border-4 border-brand-border text-center space-y-6 shadow-xl max-w-lg">
                  <div className="text-8xl">🥇</div>
                  <h3 className="text-4xl font-black text-brand-navy italic">Daily Mission Clear!</h3>
                  <p className="text-xl text-slate-500 font-bold">You've mastered today's words and finished your stories. See you tomorrow for a new quest!</p>
                  <div className="flex flex-wrap gap-2 justify-center pt-4">
                    {dailyTask.words.map(w => (
                      <span key={w} className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full font-black uppercase text-sm border-2 border-emerald-100">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl text-white">
                  <button 
                    onClick={() => setGameState('story')}
                    className={`p-8 rounded-[40px] border-b-8 shadow-xl hover:translate-y-1 hover:border-b-4 transition-all flex flex-col items-center gap-4 group relative
                      ${dailyTask.loopsDone >= 3 ? 'bg-slate-100 border-slate-200 grayscale' : 'bg-orange-400 border-orange-600'}`}
                  >
                    {dailyTask.loopsDone >= 3 && <CheckCircle2 className="absolute top-6 right-6 text-emerald-500" size={32} />}
                    <div className="text-6xl group-hover:scale-110 transition-transform">🔍</div>
                    <span className={`text-2xl font-black uppercase italic ${dailyTask.loopsDone >= 3 ? 'text-slate-400' : ''}`}>Find Words</span>
                    <div className="bg-black/10 px-4 py-1 rounded-full text-xs font-black">
                      {dailyTask.loopsDone}/3 LOOPS
                    </div>
                    <p className={`text-sm font-bold ${dailyTask.loopsDone >= 3 ? 'text-slate-300' : 'opacity-80'}`}>
                      Learn: {dailyTask.words.join(', ')}
                    </p>
                  </button>
                  <button 
                    onClick={() => setGameState('fullStory')}
                    className={`p-8 rounded-[40px] border-b-8 shadow-xl hover:translate-y-1 hover:border-b-4 transition-all flex flex-col items-center gap-4 group relative
                      ${dailyTask.loopsDone < 3 ? 'opacity-50' : dailyTask.readsDone >= 2 ? 'bg-slate-100 border-slate-200 grayscale' : 'bg-blue-500 border-blue-700'}`}
                  >
                    {dailyTask.readsDone >= 2 && <CheckCircle2 className="absolute top-6 right-6 text-emerald-500" size={32} />}
                    <div className="text-6xl group-hover:scale-110 transition-transform">📖</div>
                    <span className={`text-2xl font-black uppercase italic ${dailyTask.readsDone >= 2 ? 'text-slate-400' : ''}`}>Story Time</span>
                    <div className="bg-black/10 px-4 py-1 rounded-full text-xs font-black">
                      {dailyTask.readsDone}/2 READS
                    </div>
                    <p className={`text-sm font-bold ${dailyTask.readsDone >= 2 ? 'text-slate-300' : 'opacity-80'}`}>
                      {dailyTask.loopsDone < 3 ? 'Finish learning first!' : 'Read your daily adventure!'}
                    </p>
                  </button>
                </div>
              )}
            </motion.div>
          ) : gameState === 'parents' ? (
            <motion.div 
              key="parents-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="w-full h-full bg-white rounded-[40px] border-4 border-brand-border p-8 overflow-y-auto no-scrollbar shadow-xl"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-black text-brand-navy italic">Parents Dashboard</h2>
                  <p className="text-slate-400 font-bold">Manage learning and settings</p>
                </div>
                <button 
                  onClick={() => setGameState('home')} 
                  className="px-6 py-3 bg-brand-navy text-white rounded-2xl font-black shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                  <ArrowRight className="rotate-180" size={18} />
                  Home
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <section className="bg-slate-50 p-8 rounded-[32px] border-2 border-brand-border">
                  <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                    <Settings className="text-brand-navy" size={20} />
                    Learning Settings
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Words per session</label>
                      <div className="flex gap-4">
                        {[5, 10, 15, 20].map(val => (
                          <button
                            key={val}
                            onClick={() => setSettings(s => ({ ...s, wordsPerSession: val }))}
                            className={`flex-1 py-3 rounded-xl border-2 font-black ${settings.wordsPerSession === val ? 'bg-brand-navy text-white' : 'bg-white text-brand-navy border-brand-border'}`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Current Session Playtime: {Math.round((Date.now() - sessionStartTime) / 60000)}m</p>
                    </div>
                  </div>
                </section>

                <section className="bg-slate-50 p-8 rounded-[32px] border-2 border-brand-border">
                  <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                    <Layout className="text-brand-navy" size={20} />
                    Current Stage
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.keys(SIGHT_WORDS_BY_LEVEL).map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => { setLevel(lvl); setStep(0); setGameState('story'); }}
                        className={`p-4 rounded-2xl border-2 text-left font-black transition-all ${level === lvl ? 'bg-brand-navy text-white' : 'bg-white text-brand-navy border-brand-border hover:border-brand-navy'}`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </section>
              </div>

              <div>
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <BarChart2 className="text-brand-navy" size={20} />
                  Mastery
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {wordsInLevel.map(word => {
                    const isLearned = stats[word]?.learned;
                    return (
                      <div 
                        key={word} 
                        className={`px-3 py-2 rounded-xl border-2 transition-all flex items-center justify-between gap-2 ${isLearned ? 'bg-green-50 border-green-200' : 'bg-white border-brand-border'}`}
                      >
                        <span className="font-black uppercase text-[10px] truncate">{word}</span>
                        <input 
                          type="checkbox" 
                          checked={!!isLearned} 
                          onChange={() => toggleLearned(word)}
                          className="w-4 h-4 accent-emerald-500 cursor-pointer shrink-0"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col">
              {currentStoryData.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                   <Trophy size={80} className="text-orange-500 mb-6" />
                   <h2 className="text-4xl font-black text-brand-navy italic mb-4">STAGE CLEAR!</h2>
                   <p className="text-xl text-slate-500 max-w-md">You've learned all the words in this stage! Great job, little fox!</p>
                   <button 
                    onClick={toggleParentsView}
                    className="mt-8 bg-brand-navy text-white px-12 py-5 rounded-full text-xl font-black shadow-lg"
                   >
                    Go to Parents Dashboard
                   </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <motion.section 
                    key={gameState + step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full max-w-3xl bg-white rounded-[40px] border-4 border-brand-border flex flex-col items-center justify-center p-8 sm:p-16 text-center relative shadow-sm min-h-[500px]"
                  >
                    <AnimatePresence mode="wait">
                      {gameState === 'story' && (
                        <motion.div 
                          key="story-view"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          className="w-full space-y-12"
                        >
                          <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-bold leading-relaxed text-brand-navy">
                              {currentSegment?.text.split(/([^a-zA-Z0-9]+)/).map((part: string, i: number) => {
                                const isWord = /[a-zA-Z0-9]/.test(part);
                                const isTarget = part.toLowerCase() === currentSegment?.word.toLowerCase();
                                
                                if (!isWord) return <span key={i}>{part}</span>;
                                
                                return (
                                  <span 
                                    key={i} 
                                    onClick={() => {
                                      speak(part);
                                      if (isTarget) {
                                        setGameState('challenge');
                                      }
                                    }}
                                    className={`inline-block transition-all cursor-pointer hover:bg-slate-50 hover:text-orange-500 rounded-lg px-0.5`}
                                  >
                                    {part}
                                  </span>
                                );
                              })}
                            </h2>
                            <p className="text-xl text-slate-400 font-black uppercase tracking-widest italic pt-4">
                              Tap the word "{currentSegment?.word}" to start spelling!
                            </p>
                          </div>
                          <button 
                            className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto border-4 border-blue-200 hover:bg-blue-200 transition-all active:scale-90"
                            onClick={() => speak(currentSegment?.word)}
                          >
                            <Volume2 className="text-blue-600" size={32} />
                          </button>
                        </motion.div>
                      )}

                      {gameState === 'challenge' && (
                        <motion.div
                          key="challenge-view"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          className="w-full flex flex-col items-center"
                        >
                          <span className="text-sm font-black uppercase tracking-widest text-emerald-600 mb-6 px-6 py-2 bg-emerald-50 rounded-full italic">Spell the word</span>
                          <div className="text-6xl font-black text-brand-navy mb-12 tracking-tight">{currentSegment.word}</div>
                          <PhonemeBox 
                            letters={getPhonemes(currentSegment.word)} 
                            onComplete={handleChallengeComplete} 
                          />
                        </motion.div>
                      )}

                      {gameState === 'fullStory' && (
                        <motion.div
                          key="full-story-view"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="w-full space-y-8"
                        >
                          {isGeneratingStories ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-6">
                              <RefreshCcw className="animate-spin text-blue-500" size={48} />
                              <h3 className="text-2xl font-black text-brand-navy italic">Creating your Peppa stories...</h3>
                              <p className="text-slate-400 font-bold">Including today's words: {todaysWords.join(', ')}</p>
                            </div>
                          ) : (
                            <>
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-1 rounded-full italic w-fit">Page {currentStoryIdx + 1} of {generatedStories.length}</span>
                              <h3 className="text-xl font-black text-brand-navy italic">{generatedStories[currentStoryIdx]?.title}</h3>
                            </div>
                            <button 
                              onClick={() => speak(generatedStories[currentStoryIdx]?.lines.map((l: any) => l.text).join(' '))}
                              className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-200 hover:bg-blue-200 transition-all"
                            >
                              <Volume2 className="text-blue-600" size={24} />
                            </button>
                          </div>
                              
                              <div className="space-y-4 text-left">
                                {generatedStories[currentStoryIdx]?.lines.map((line: any) => (
                                  <p key={line.id} className="text-2xl md:text-3xl font-bold leading-relaxed text-brand-navy border-b border-dashed border-slate-100 pb-2 flex flex-wrap gap-x-1">
                                    {line.text.split(/([^a-zA-Z0-9]+)/).map((part: string, i: number) => {
                                      const isWord = /[a-zA-Z0-9]/.test(part);
                                      const isSightWord = todaysWords.some(tw => tw.toLowerCase() === part.toLowerCase());
                                      if (!isWord) return <span key={i} className="py-1">{part}</span>;
                                      return (
                                        <span 
                                          key={i} 
                                          onClick={() => speak(part)}
                                          className={`cursor-pointer hover:text-orange-500 transition-colors py-1 px-0.5 rounded hover:bg-slate-50 ${isSightWord ? 'text-blue-600 underline decoration-blue-300' : ''}`}
                                        >
                                          {part}
                                        </span>
                                      );
                                    })}
                                  </p>
                                ))}
                              </div>

                              <div className="pt-8 flex justify-between items-center">
                                <button 
                                  onClick={() => setGameState('home')}
                                  className="px-8 py-4 bg-slate-100 text-slate-500 rounded-full font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2"
                                >
                                  <ArrowRight className="rotate-180" size={18} />
                                  Menu
                                </button>
                                <button 
                                  onClick={nextStory}
                                  className="bg-blue-600 text-white px-12 py-5 rounded-full text-2xl font-black shadow-lg hover:bg-blue-700 transition-all flex items-center gap-4"
                                >
                                  {currentStoryIdx < generatedStories.length - 1 ? "Next Page ➔" : "Finish Story 🏁"}
                                </button>
                              </div>
                            </>
                          )}
                        </motion.div>
                      )}

                      {gameState === 'feedback' && (
                        <motion.div
                          key="feedback-view"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.2 }}
                          className="flex flex-col items-center"
                        >
                          <div className="text-[120px] mb-8 animate-bounce">⭐</div>
                          <div className="text-3xl font-black text-slate-400 mb-2 uppercase tracking-widest">
                            {currentSegment.word}
                          </div>
                          <div className="text-5xl font-black text-brand-navy mb-16 italic">Excellent!</div>
                          
                          <button 
                            onClick={nextStep}
                            className="bg-brand-navy text-white px-16 py-6 rounded-full text-3xl font-black shadow-xl hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-4"
                          >
                            NEXT WORD <ChevronRight size={32} />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.section>
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* {gameState !== 'parents' && currentStoryData.length > 0 && (
        <footer className="w-full h-20 sm:h-24 bg-white border-t-4 border-brand-border px-4 sm:px-12 flex items-center justify-center shrink-0">
          <div className="w-full max-w-5xl flex items-center justify-between">
            <div className="flex gap-6 sm:gap-12 overflow-x-auto no-scrollbar py-2">
              {currentStoryData.map((s, i) => (
                <div key={s.id} className={`flex flex-col items-center transition-all px-2 ${i === step ? 'opacity-100 scale-110' : 'opacity-40'}`}>
                  <div className="text-2xl mb-1">{s.emoji ? Array.from(s.emoji)[0] : '👀'}</div>
                  <span className="text-[10px] font-black uppercase tracking-tighter">{s.word}</span>
                  {i === step && <div className="w-8 h-1 bg-emerald-500 mt-1 rounded-full" />}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden sm:block text-right leading-tight">
                <span className="block font-black text-lg text-brand-navy uppercase italic">Ready to move?</span>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {step < currentStoryData.length - 1 ? `Next Word: ${currentStoryData[step+1].word}` : 'Finish Quest'}
                </span>
              </div>
              <button 
                className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0 border-2 border-blue-200 hover:bg-blue-200 transition-colors active:scale-90"
                onClick={() => speak(currentSegment?.word)}
              >
                <Volume2 className="text-blue-600" size={20} />
              </button>
            </div>
          </div>
        </footer>
      )} */}
    </div>
  );
}
