import { db } from './firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';

const VOCAB_COLLECTION = 'vocabulary';

/**
 * Fetch words for a specific lesson from Firestore.
 * Returns the array of words, or null if not found.
 */
export async function getLessonWordsFromFirestore(lessonId) {
  try {
    const docRef = doc(db, VOCAB_COLLECTION, String(lessonId));
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data().words || null;
    }
    return null;
  } catch (err) {
    console.warn('Could not fetch words from Firestore:', err);
    return null;
  }
}

/**
 * Upload words for a single lesson to Firestore.
 * Called by the seed page.
 */
export async function seedLessonWords(lessonId, words) {
  const docRef = doc(db, VOCAB_COLLECTION, String(lessonId));
  await setDoc(docRef, {
    lessonId: Number(lessonId),
    words,
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Upload all lessons' vocabulary to Firestore.
 * Returns { success: number, failed: number }.
 */
export async function seedAllVocabulary(vocabularyData) {
  const results = await Promise.allSettled(
    Object.entries(vocabularyData).map(([lessonId, words]) =>
      seedLessonWords(lessonId, words)
    )
  );

  const success = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;

  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      const lessonId = Object.keys(vocabularyData)[i];
      console.error(`Failed to seed lesson ${lessonId}:`, r.reason);
    }
  });

  return { success, failed };
}

/**
 * Get total word count across all seeded lessons.
 */
export async function getSeededStats() {
  try {
    const colRef = collection(db, VOCAB_COLLECTION);
    const snap = await getDocs(colRef);
    let totalLessons = 0;
    let totalWords = 0;
    snap.forEach((d) => {
      const data = d.data();
      if (data.words) {
        totalLessons++;
        totalWords += data.words.length;
      }
    });
    return { totalLessons, totalWords };
  } catch (err) {
    console.warn('Could not get seeded stats:', err);
    return { totalLessons: 0, totalWords: 0 };
  }
}
