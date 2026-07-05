import { db } from './firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';

const GRAMMAR_COLLECTION = 'grammar';

/**
 * Fetch grammar points for a specific lesson from Firestore.
 * Returns the array of grammar points, or null if not found.
 */
export async function getLessonGrammarFromFirestore(lessonId) {
  try {
    const docRef = doc(db, GRAMMAR_COLLECTION, String(lessonId));
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data().grammar || null;
    }
    return null;
  } catch (err) {
    console.warn('Could not fetch grammar from Firestore:', err);
    return null;
  }
}

/**
 * Upload grammar points for a single lesson to Firestore.
 */
export async function seedLessonGrammar(lessonId, grammar) {
  const docRef = doc(db, GRAMMAR_COLLECTION, String(lessonId));
  await setDoc(docRef, {
    lessonId: Number(lessonId),
    grammar,
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Upload all lessons' grammar to Firestore.
 * Returns { success: number, failed: number }.
 */
export async function seedAllGrammar(grammarData) {
  const results = await Promise.allSettled(
    Object.entries(grammarData).map(([lessonId, grammar]) =>
      seedLessonGrammar(lessonId, grammar)
    )
  );

  const success = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;

  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      const lessonId = Object.keys(grammarData)[i];
      console.error(`Failed to seed grammar for lesson ${lessonId}:`, r.reason);
    }
  });

  return { success, failed };
}

/**
 * Get total grammar stats across all seeded lessons.
 */
export async function getSeededGrammarStats() {
  try {
    const colRef = collection(db, GRAMMAR_COLLECTION);
    const snap = await getDocs(colRef);
    let totalLessons = 0;
    let totalPoints = 0;
    snap.forEach((d) => {
      const data = d.data();
      if (data.grammar) {
        totalLessons++;
        totalPoints += data.grammar.length;
      }
    });
    return { totalLessons, totalPoints };
  } catch (err) {
    console.warn('Could not get grammar stats:', err);
    return { totalLessons: 0, totalPoints: 0 };
  }
}
