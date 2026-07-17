import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const SettingsContext = createContext(null);

const STORAGE_KEY = 'nihongo_settings';

const DEFAULT_SETTINGS = {
  scriptMode: 'kanji',  // 'kanji' | 'hiragana' | 'furigana'
  language: 'en',        // 'en' | 'np'
};

function loadLocalSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch { /* ignore */ }
  return DEFAULT_SETTINGS;
}

export function SettingsProvider({ children }) {
  const { user } = useAuth();
  const [settings, setSettings] = useState(loadLocalSettings);
  const [loading, setLoading] = useState(true);
  const settingsRef = useRef(settings);

  // Keep ref in sync
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  // Load from Firestore when user is authenticated
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadRemote = async () => {
      try {
        const docRef = doc(db, 'userSettings', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const remote = docSnap.data();
          // Firestore values take precedence over localStorage
          setSettings((prev) => ({ ...prev, ...remote }));
        }
      } catch (err) {
        console.warn('Could not load settings from Firestore:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRemote();
  }, [user]);

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Sync to Firestore (debounced) when signed in
  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => {
      const docRef = doc(db, 'userSettings', user.uid);
      setDoc(docRef, settingsRef.current, { merge: true })
        .catch((err) => console.warn('Could not save settings to Firestore:', err));
    }, 500);
    return () => clearTimeout(timer);
  }, [settings, user]);

  const updateSettings = useCallback((updates) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return ctx;
}
