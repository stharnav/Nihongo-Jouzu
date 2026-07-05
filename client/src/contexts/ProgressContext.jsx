import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ProgressContext = createContext(null);

const STORAGE_KEY = 'nihongo_progress';

// Default progress for all 25 lessons
function getDefaultProgress() {
  const progress = {};
  for (let i = 1; i <= 25; i++) {
    progress[i] = {
      wordsViewed: false,
      grammarViewed: false,
      quizScore: 0,
      quizCompleted: false,
      quizAttempts: 0,
      lastAccessed: null,
    };
  }
  return progress;
}

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState(() => {
    // Try loading from localStorage first
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch { /* ignore */ }
    }
    return getDefaultProgress();
  });
  const [loading, setLoading] = useState(true);
  const progressRef = useRef(progress);

  // Keep ref in sync
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // Load from Firestore when user is authenticated
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadProgress = async () => {
      try {
        const docRef = doc(db, 'userProgress', user.uid, 'lessons', 'all');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProgress(docSnap.data().progress || getDefaultProgress());
        }
      } catch (err) {
        console.warn('Could not load progress from Firestore, using local:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [user]);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Sync to Firestore whenever progress changes (debounced for auth user)
  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => {
      const docRef = doc(db, 'userProgress', user.uid, 'lessons', 'all');
      setDoc(docRef, { progress: progressRef.current }, { merge: true })
        .catch((err) => console.warn('Could not save progress to Firestore:', err));
    }, 500);
    return () => clearTimeout(timer);
  }, [progress, user]);

  const updateLessonProgress = useCallback(async (lessonId, updates) => {
    const lessonNum = Number(lessonId);
    setProgress(prev => ({
      ...prev,
      [lessonNum]: { ...prev[lessonNum], ...updates, lastAccessed: new Date().toISOString() },
    }));
  }, []); // No deps — uses functional updater form

  const unlockAllLessons = useCallback(() => {
    const unlocked = {};
    for (let i = 1; i <= 25; i++) {
      unlocked[i] = {
        wordsViewed: true,
        grammarViewed: true,
        quizScore: 100,
        quizCompleted: true,
        quizAttempts: 1,
        lastAccessed: new Date().toISOString(),
      };
    }
    setProgress(unlocked);
  }, []);

  const isLessonUnlocked = useCallback((lessonId) => {
    const lessonNum = Number(lessonId);
    if (lessonNum === 1) return true;
    // Lesson N is unlocked if lesson N-1 has quiz score >= 60%
    const prevLesson = progress[lessonNum - 1];
    return prevLesson && prevLesson.quizCompleted && prevLesson.quizScore >= 60;
  }, [progress]);

  return (
    <ProgressContext.Provider value={{ progress, updateLessonProgress, isLessonUnlocked, unlockAllLessons, loading }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
