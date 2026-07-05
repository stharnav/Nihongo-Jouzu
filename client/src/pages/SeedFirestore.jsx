import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vocabulary from '../data/vocabulary';
import grammar from '../data/grammar';
import { seedAllVocabulary } from '../services/wordService';
import { seedAllGrammar } from '../services/grammarService';
import { useAuth } from '../contexts/AuthContext';

export default function SeedFirestore() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vocabStatus, setVocabStatus] = useState('idle');
  const [grammarStatus, setGrammarStatus] = useState('idle');
  const [vocabResult, setVocabResult] = useState(null);
  const [grammarResult, setGrammarResult] = useState(null);
  const [error, setError] = useState(null);

  const lessonCount = Object.keys(vocabulary).length;
  const wordCount = Object.values(vocabulary).reduce(
    (sum, words) => sum + words.length,
    0
  );
  const grammarLessonCount = Object.keys(grammar).length;
  const grammarPointCount = Object.values(grammar).reduce(
    (sum, points) => sum + points.length,
    0
  );

  const handleSeedVocab = async () => {
    setVocabStatus('seeding');
    setError(null);
    try {
      const res = await seedAllVocabulary(vocabulary);
      setVocabResult({ ...res, lessons: lessonCount, totalWords: wordCount });
      setVocabStatus('done');
      if (res.failed > 0) {
        setError(
          'Some vocabulary lessons failed — check your Firestore security rules.'
        );
      }
    } catch (err) {
      setError(err.message || 'Vocabulary seeding failed');
      setVocabStatus('error');
    }
  };

  const handleSeedGrammar = async () => {
    setGrammarStatus('seeding');
    setError(null);
    try {
      const res = await seedAllGrammar(grammar);
      setGrammarResult({ ...res, lessons: grammarLessonCount, totalPoints: grammarPointCount });
      setGrammarStatus('done');
      if (res.failed > 0) {
        setError(
          'Some grammar lessons failed — check your Firestore security rules.'
        );
      }
    } catch (err) {
      setError(err.message || 'Grammar seeding failed');
      setGrammarStatus('error');
    }
  };

  const canSeed = () => status !== 'seeding' && !!user;

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-8">
      <button
        onClick={() => navigate('/dashboard')}
        className="text-sm text-duolingo-text-secondary hover:text-duolingo-green transition-colors mb-6 flex items-center gap-1"
      >
        ← Back to Dashboard
      </button>

      <div className="card space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
            <span className="text-2xl">🔥</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-duolingo-text-primary">
              Firestore Seed Tool
            </h1>
            <p className="text-sm text-duolingo-text-secondary">
              Upload vocabulary and grammar data for lessons 1–25 to Firestore
            </p>
          </div>
        </div>

        <div className="h-px bg-duolingo-card-border" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-duolingo-blue">{lessonCount}</div>
            <div className="text-xs text-duolingo-text-secondary mt-1">Vocab Lessons</div>
            <div className="text-lg font-bold text-duolingo-blue mt-1">{wordCount}</div>
            <div className="text-xs text-duolingo-text-secondary">Total Words</div>
          </div>
          <div className="bg-green-50 rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-duolingo-green">{grammarLessonCount}</div>
            <div className="text-xs text-duolingo-text-secondary mt-1">Grammar Lessons</div>
            <div className="text-lg font-bold text-duolingo-green mt-1">{grammarPointCount}</div>
            <div className="text-xs text-duolingo-text-secondary">Total Points</div>
          </div>
        </div>

        {/* Errors */}
        {error && (
          <div className="bg-red-50 rounded-2xl p-4 text-sm text-duolingo-red">
            ❌ {error}
          </div>
        )}

        {/* Vocabulary Seed Section */}
        <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <span className="text-lg">📖</span>
            </div>
            <div>
              <h2 className="font-bold text-duolingo-text-primary">Vocabulary</h2>
              <p className="text-xs text-duolingo-text-secondary">
                Upload {wordCount} words across {lessonCount} lessons
              </p>
            </div>
          </div>

          {vocabStatus === 'done' && vocabResult && (
            <div className="bg-green-50 rounded-xl p-3 text-sm text-green-700">
              ✅ {vocabResult.success}/{vocabResult.lessons} lessons uploaded
              ({vocabResult.totalWords} words)
            </div>
          )}

          <button
            onClick={handleSeedVocab}
            disabled={vocabStatus === 'seeding' || !user}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {vocabStatus === 'seeding'
              ? 'Uploading...'
              : '📖 Seed Vocabulary'}
          </button>
        </div>

        {/* Grammar Seed Section */}
        <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
              <span className="text-lg">📝</span>
            </div>
            <div>
              <h2 className="font-bold text-duolingo-text-primary">Grammar</h2>
              <p className="text-xs text-duolingo-text-secondary">
                Upload {grammarPointCount} grammar points across {grammarLessonCount} lessons
              </p>
            </div>
          </div>

          {grammarStatus === 'done' && grammarResult && (
            <div className="bg-green-50 rounded-xl p-3 text-sm text-green-700">
              ✅ {grammarResult.success}/{grammarResult.lessons} lessons uploaded
              ({grammarResult.totalPoints} grammar points)
            </div>
          )}

          <button
            onClick={handleSeedGrammar}
            disabled={grammarStatus === 'seeding' || !user}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {grammarStatus === 'seeding'
              ? 'Uploading...'
              : '📝 Seed Grammar'}
          </button>
        </div>

        {!user && (
          <div className="text-center text-sm text-duolingo-text-muted">
            Sign in with Google to run the seed.
          </div>
        )}

        {/* Info */}
        <div className="text-xs text-duolingo-text-muted text-center space-y-1">
          <div>
            Collection: <code className="bg-gray-100 px-1 rounded">vocabulary</code> →
            Document: <code className="bg-gray-100 px-1 rounded">lessonId</code> →
            Field: <code className="bg-gray-100 px-1 rounded">words[]</code>
          </div>
          <div>
            Collection: <code className="bg-gray-100 px-1 rounded">grammar</code> →
            Document: <code className="bg-gray-100 px-1 rounded">lessonId</code> →
            Field: <code className="bg-gray-100 px-1 rounded">grammar[]</code>
          </div>
        </div>
      </div>
    </div>
  );
}
