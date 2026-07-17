import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import vocabulary from '../data/vocabulary';
import grammarData from '../data/grammar';
import { getLessonWordsFromFirestore, seedLessonWords } from '../services/wordService';
import { getLessonGrammarFromFirestore, seedLessonGrammar } from '../services/grammarService';

const LESSON_IDS = Array.from({ length: 25 }, (_, i) => i + 1);
const TABS = [
  { id: 'vocabulary', label: 'Vocabulary', icon: '📖' },
  { id: 'grammar', label: 'Grammar', icon: '📝' },
];

const EMPTY_WORD = () => ({ japanese: '', reading: '', meaning: '', meaningNp: '' });
const EMPTY_EXAMPLE = () => ({ japanese: '', reading: '', meaning: '', meaningNp: '' });
const EMPTY_GRAMMAR = () => ({
  pattern: '',
  explanation: '',
  explanationNp: '',
  examples: [],
});

const ADMIN_EMAILS = ['arnavshrestha.as@gmail.com', 'admin@nihongo-jouzu.com'];

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default function Admin() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Selection state
  const [selectedLesson, setSelectedLesson] = useState(1);
  const [activeTab, setActiveTab] = useState('vocabulary');

  // Data source
  const [dataSource, setDataSource] = useState('local'); // 'local' | 'firestore'

  // Editable data
  const [vocabWords, setVocabWords] = useState([]);
  const [grammarPoints, setGrammarPoints] = useState([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [error, setError] = useState(null);
  const [expandedGrammar, setExpandedGrammar] = useState({}); // { [index]: true/false }
  const [confirmingDelete, setConfirmingDelete] = useState(null);
  // confirmingDelete: { type: 'word', index } | { type: 'grammar', index } | { type: 'example', grammarIndex, exampleIndex } | null

  // Load data when lesson or source changes
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSaveMessage(null);

    try {
      if (dataSource === 'local') {
        const localWords = vocabulary[selectedLesson];
        setVocabWords(localWords ? deepClone(localWords) : []);
        const localGrammar = grammarData[selectedLesson];
        setGrammarPoints(localGrammar ? deepClone(localGrammar) : []);
      } else {
        // Load from Firestore
        const [words, grammar] = await Promise.all([
          getLessonWordsFromFirestore(selectedLesson),
          getLessonGrammarFromFirestore(selectedLesson),
        ]);
        setVocabWords(words || []);
        setGrammarPoints(grammar || []);
      }
    } catch (err) {
      setError('Failed to load data: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedLesson, dataSource]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Auto-clear save message after 3 seconds
  useEffect(() => {
    if (saveMessage) {
      const timer = setTimeout(() => setSaveMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveMessage]);

  // ─── Vocabulary Handlers ───

  function handleVocabChange(index, field, value) {
    setVocabWords((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function addVocabRow() {
    setVocabWords((prev) => [...prev, EMPTY_WORD()]);
  }

  function confirmDeleteVocabRow(index) {
    setConfirmingDelete({ type: 'word', index });
  }

  function executeDeleteVocabRow() {
    if (confirmingDelete?.type === 'word') {
      setVocabWords((prev) => prev.filter((_, i) => i !== confirmingDelete.index));
      setConfirmingDelete(null);
    }
  }

  async function saveVocabulary() {
    setSaving(true);
    setError(null);
    setSaveMessage(null);
    try {
      await seedLessonWords(selectedLesson, vocabWords);
      setSaveMessage(`Lesson ${selectedLesson} vocabulary saved to Firestore!`);
    } catch (err) {
      setError('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  // ─── Grammar Handlers ───

  function handleGrammarChange(index, field, value) {
    setGrammarPoints((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function handleExampleChange(grammarIndex, exampleIndex, field, value) {
    setGrammarPoints((prev) => {
      const next = [...prev];
      const examples = [...(next[grammarIndex].examples || [])];
      examples[exampleIndex] = { ...examples[exampleIndex], [field]: value };
      next[grammarIndex] = { ...next[grammarIndex], examples };
      return next;
    });
  }

  function addGrammarPoint() {
    const newIndex = grammarPoints.length;
    setGrammarPoints((prev) => [...prev, EMPTY_GRAMMAR()]);
    setExpandedGrammar((prev) => ({ ...prev, [newIndex]: true }));
  }

  function confirmDeleteGrammarPoint(index) {
    setConfirmingDelete({ type: 'grammar', index });
  }

  function executeDeleteGrammarPoint() {
    if (confirmingDelete?.type === 'grammar') {
      setGrammarPoints((prev) => prev.filter((_, i) => i !== confirmingDelete.index));
      setConfirmingDelete(null);
    }
  }

  function addExample(grammarIndex) {
    setGrammarPoints((prev) => {
      const next = [...prev];
      const examples = [...(next[grammarIndex].examples || []), EMPTY_EXAMPLE()];
      next[grammarIndex] = { ...next[grammarIndex], examples };
      return next;
    });
  }

  function confirmDeleteExample(grammarIndex, exampleIndex) {
    setConfirmingDelete({ type: 'example', grammarIndex, exampleIndex });
  }

  function executeDeleteExample() {
    if (confirmingDelete?.type === 'example') {
      setGrammarPoints((prev) => {
        const next = [...prev];
        const examples = next[confirmingDelete.grammarIndex].examples.filter(
          (_, i) => i !== confirmingDelete.exampleIndex
        );
        next[confirmingDelete.grammarIndex] = { ...next[confirmingDelete.grammarIndex], examples };
        return next;
      });
      setConfirmingDelete(null);
    }
  }

  async function saveGrammar() {
    setSaving(true);
    setError(null);
    setSaveMessage(null);
    try {
      await seedLessonGrammar(selectedLesson, grammarPoints);
      setSaveMessage(`Lesson ${selectedLesson} grammar saved to Firestore!`);
    } catch (err) {
      setError('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  // ─── Render Helpers ───

  function renderVocabEditor() {
    return (
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <button onClick={addVocabRow} className="btn-secondary text-sm flex items-center gap-1.5">
            <span>＋</span> Add Word
          </button>
          <div className="flex items-center gap-2">
            {vocabWords.length > 0 && (
              <span className="text-xs text-duolingo-text-muted">
                {vocabWords.length} word{vocabWords.length !== 1 ? 's' : ''}
              </span>
            )}
            <button
              onClick={saveVocabulary}
              disabled={saving}
              className="btn-primary text-sm flex items-center gap-1.5 disabled:opacity-50"
            >
              {saving ? 'Saving...' : '💾 Save to Firestore'}
            </button>
          </div>
        </div>

        {vocabWords.length === 0 ? (
          <div className="card text-center py-8 text-duolingo-text-muted">
            <div className="text-3xl mb-2">📭</div>
            <p className="font-medium">No vocabulary words for this lesson.</p>
            <p className="text-sm mt-1">Click "Add Word" to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-duolingo-card-border text-left text-xs text-duolingo-text-muted uppercase tracking-wider">
                  <th className="py-2 pr-2 font-semibold w-[22%]">Japanese</th>
                  <th className="py-2 px-2 font-semibold w-[18%]">Reading</th>
                  <th className="py-2 px-2 font-semibold w-[22%]">Meaning (EN)</th>
                  <th className="py-2 px-2 font-semibold w-[22%]">Meaning (NP)</th>
                  <th className="py-2 pl-2 font-semibold w-[16%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vocabWords.map((word, i) => (
                  <tr key={i} className="border-b border-duolingo-card-border/50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-1.5 pr-2">
                      <input
                        type="text"
                        value={word.japanese}
                        onChange={(e) => handleVocabChange(i, 'japanese', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-duolingo-card-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-duolingo-green/40 focus:border-duolingo-green transition-all"
                        placeholder="e.g. 私"
                      />
                    </td>
                    <td className="py-1.5 px-2">
                      <input
                        type="text"
                        value={word.reading}
                        onChange={(e) => handleVocabChange(i, 'reading', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-duolingo-card-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-duolingo-green/40 focus:border-duolingo-green transition-all"
                        placeholder="e.g. わたし"
                      />
                    </td>
                    <td className="py-1.5 px-2">
                      <input
                        type="text"
                        value={word.meaning}
                        onChange={(e) => handleVocabChange(i, 'meaning', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-duolingo-card-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-duolingo-green/40 focus:border-duolingo-green transition-all"
                        placeholder="I; me"
                      />
                    </td>
                    <td className="py-1.5 px-2">
                      <input
                        type="text"
                        value={word.meaningNp || ''}
                        onChange={(e) => handleVocabChange(i, 'meaningNp', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-duolingo-card-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-duolingo-green/40 focus:border-duolingo-green transition-all"
                        placeholder="म"
                      />
                    </td>
                    <td className="py-1.5 pl-2">
                      <button
                        onClick={() => confirmDeleteVocabRow(i)}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-duolingo-red hover:bg-red-50 transition-colors"
                        title="Delete word"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  function renderGrammarEditor() {
    return (
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <button onClick={addGrammarPoint} className="btn-secondary text-sm flex items-center gap-1.5">
            <span>＋</span> Add Grammar Point
          </button>
          <div className="flex items-center gap-2">
            {grammarPoints.length > 0 && (
              <span className="text-xs text-duolingo-text-muted">
                {grammarPoints.length} point{grammarPoints.length !== 1 ? 's' : ''}
              </span>
            )}
            <button
              onClick={saveGrammar}
              disabled={saving}
              className="btn-primary text-sm flex items-center gap-1.5 disabled:opacity-50"
            >
              {saving ? 'Saving...' : '💾 Save to Firestore'}
            </button>
          </div>
        </div>

        {grammarPoints.length === 0 ? (
          <div className="card text-center py-8 text-duolingo-text-muted">
            <div className="text-3xl mb-2">📭</div>
            <p className="font-medium">No grammar points for this lesson.</p>
            <p className="text-sm mt-1">Click "Add Grammar Point" to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {grammarPoints.map((point, gi) => (
              <GrammarPointCard
                key={gi}
                point={point}
                index={gi}
                isExpanded={expandedGrammar[gi] !== false}
                onToggleExpand={() =>
                  setExpandedGrammar((prev) => ({ ...prev, [gi]: !prev[gi] }))
                }
                onChange={(field, value) => handleGrammarChange(gi, field, value)}
                onDelete={() => confirmDeleteGrammarPoint(gi)}
                onAddExample={() => addExample(gi)}
                onDeleteExample={(ei) => confirmDeleteExample(gi, ei)}
                onExampleChange={(ei, field, value) =>
                  handleExampleChange(gi, ei, field, value)
                }
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ─── Main Render ───

  // Admin gate — only allow specific users
  const isAuthorized = user && ADMIN_EMAILS.includes(user.email);

  if (!isAuthorized) {
    return (
      <div className="animate-fade-in text-center py-16">
        <div className="text-6xl mb-6">🔒</div>
        <h1 className="text-2xl font-bold text-duolingo-text-primary mb-2">Access Denied</h1>
        <p className="text-duolingo-text-secondary mb-6 max-w-sm mx-auto">
          This admin page is restricted to authorized users only. Sign in with an approved account to continue.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-primary inline-flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>
        {user && (
          <p className="text-xs text-duolingo-text-muted mt-4">
            Signed in as {user.email}. Contact the developer to request access.
          </p>
        )}
      </div>
    );
  }

  function cancelConfirm() {
    setConfirmingDelete(null);
  }

  function executeConfirmedDelete() {
    if (!confirmingDelete) return;
    switch (confirmingDelete.type) {
      case 'word':
        executeDeleteVocabRow();
        break;
      case 'grammar':
        executeDeleteGrammarPoint();
        break;
      case 'example':
        executeDeleteExample();
        break;
    }
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          aria-label="Go back"
          className="w-10 h-10 rounded-xl bg-white border border-duolingo-card-border flex items-center justify-center text-duolingo-text-secondary hover:text-duolingo-green hover:border-duolingo-green/30 transition-all shadow-sm"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-duolingo-text-primary">Admin</h1>
          <p className="text-sm text-duolingo-text-secondary">Manage vocabulary and grammar content</p>
        </div>
      </div>

      {/* Lesson Selector */}
      <div className="card">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
            <span className="text-lg">📚</span>
          </div>
          <div>
            <h2 className="font-bold text-duolingo-text-primary">Lesson Selector</h2>
            <p className="text-xs text-duolingo-text-secondary">Choose a lesson to edit</p>
          </div>
        </div>
        <div className="h-px bg-duolingo-card-border -mx-6 mb-4" />

        <div className="flex flex-wrap gap-1.5">
          {LESSON_IDS.map((id) => (
            <button
              key={id}
              onClick={() => setSelectedLesson(id)}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                selectedLesson === id
                  ? 'bg-duolingo-green text-white shadow-sm shadow-green-200 scale-110'
                  : 'bg-gray-100 text-duolingo-text-secondary hover:bg-gray-200'
              }`}
            >
              {id}
            </button>
          ))}
        </div>

        {/* Data Source Toggle */}
        <div className="mt-4 flex items-center gap-3 text-sm">
          <span className="text-duolingo-text-muted font-medium">Data source:</span>
          <button
            onClick={() => setDataSource('local')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              dataSource === 'local'
                ? 'bg-duolingo-green text-white shadow-sm'
                : 'bg-gray-100 text-duolingo-text-secondary hover:bg-gray-200'
            }`}
          >
            📄 Local
          </button>
          <button
            onClick={() => setDataSource('firestore')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              dataSource === 'firestore'
                ? 'bg-duolingo-green text-white shadow-sm'
                : 'bg-gray-100 text-duolingo-text-secondary hover:bg-gray-200'
            }`}
          >
            ☁️ Firestore
          </button>
          <button
            onClick={loadData}
            disabled={loading}
            className="ml-auto px-3 py-1.5 rounded-lg font-semibold bg-gray-100 text-duolingo-text-secondary hover:bg-gray-200 transition-all text-xs disabled:opacity-50"
          >
            {loading ? 'Loading...' : '↻ Reload'}
          </button>
        </div>
      </div>

      {/* Feedback Messages */}
      {saveMessage && (
        <div className="animate-slide-up bg-duolingo-green/10 border border-duolingo-green/20 rounded-2xl px-4 py-3 text-sm text-duolingo-green-dark font-medium flex items-center gap-2">
          <span>✅</span> {saveMessage}
        </div>
      )}
      {error && (
        <div className="animate-slide-up bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-sm text-duolingo-red font-medium flex items-center gap-2">
          <span>❌</span> {error}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex bg-duolingo-gray rounded-2xl p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-white text-duolingo-green shadow-sm'
                : 'text-duolingo-text-secondary hover:text-duolingo-text-primary'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="min-h-[300px]">
        {loading ? (
          <div className="card text-center py-12 text-duolingo-text-muted">
            <div className="w-6 h-6 border-2 border-duolingo-green border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm">Loading data...</p>
          </div>
        ) : activeTab === 'vocabulary' ? (
          renderVocabEditor()
        ) : (
          renderGrammarEditor()
        )}
      </div>

      {/* Confirm Delete Dialog */}
      {confirmingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={cancelConfirm} />
          <div className="relative bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full animate-bounce-in border border-duolingo-card-border">
            <div className="text-center">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-lg font-bold text-duolingo-text-primary mb-2">Confirm Deletion</h3>
              <p className="text-sm text-duolingo-text-secondary mb-6">
                {confirmingDelete.type === 'word' && 'Are you sure you want to delete this vocabulary word? This cannot be undone.'}
                {confirmingDelete.type === 'grammar' && 'Are you sure you want to delete this grammar point and all its examples? This cannot be undone.'}
                {confirmingDelete.type === 'example' && 'Are you sure you want to delete this example sentence? This cannot be undone.'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={cancelConfirm}
                  className="flex-1 py-3 px-4 rounded-2xl border-2 border-duolingo-card-border font-bold text-sm text-duolingo-text-primary hover:border-duolingo-text-secondary transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={executeConfirmedDelete}
                  className="flex-1 py-3 px-4 rounded-2xl bg-duolingo-red text-white font-bold text-sm shadow-md hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Grammar Point Card Sub-component ───

function GrammarPointCard({
  point,
  index,
  isExpanded,
  onToggleExpand,
  onChange,
  onDelete,
  onAddExample,
  onDeleteExample,
  onExampleChange,
}) {
  return (
    <div className="card p-4 space-y-3">
      {/* Header row */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onToggleExpand}
          className="flex items-center gap-2 text-sm font-bold text-duolingo-text-primary hover:text-duolingo-green transition-colors"
        >
          <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>▶</span>
          <span className="text-xs text-duolingo-text-muted font-mono">#{index + 1}</span>
          {point.pattern ? (
            <span className="truncate max-w-[200px]">{point.pattern}</span>
          ) : (
            <span className="text-duolingo-text-muted italic">New grammar point</span>
          )}
        </button>
        <button
          onClick={onDelete}
          className="px-2 py-1 rounded-lg text-xs font-semibold text-duolingo-red hover:bg-red-50 transition-colors"
          title="Delete grammar point"
        >
          ✕ Delete
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-3 pt-2 border-t border-duolingo-card-border/50">
          {/* Pattern */}
          <div>
            <label className="block text-xs font-semibold text-duolingo-text-muted mb-1 uppercase tracking-wider">
              Pattern
            </label>
            <input
              type="text"
              value={point.pattern}
              onChange={(e) => onChange('pattern', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-duolingo-card-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-duolingo-green/40 focus:border-duolingo-green transition-all font-mono"
              placeholder="e.g. N1 は N2 です"
            />
          </div>

          {/* Explanation */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-duolingo-text-muted mb-1 uppercase tracking-wider">
                Explanation (EN)
              </label>
              <textarea
                value={point.explanation}
                onChange={(e) => onChange('explanation', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-duolingo-card-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-duolingo-green/40 focus:border-duolingo-green transition-all resize-y"
                placeholder="English explanation..."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-duolingo-text-muted mb-1 uppercase tracking-wider">
                Explanation (NP)
              </label>
              <textarea
                value={point.explanationNp || ''}
                onChange={(e) => onChange('explanationNp', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-duolingo-card-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-duolingo-green/40 focus:border-duolingo-green transition-all resize-y"
                placeholder="नेपाली व्याख्या..."
              />
            </div>
          </div>

          {/* Examples */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-duolingo-text-muted uppercase tracking-wider">
                Examples ({point.examples?.length || 0})
              </h4>
              <button
                onClick={onAddExample}
                className="text-xs font-semibold text-duolingo-green hover:bg-duolingo-green/10 px-2.5 py-1 rounded-lg transition-colors"
              >
                ＋ Add Example
              </button>
            </div>

            {(!point.examples || point.examples.length === 0) ? (
              <p className="text-xs text-duolingo-text-muted italic py-2 text-center">
                No examples yet. Click "Add Example" to add one.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-duolingo-card-border text-left text-[10px] text-duolingo-text-muted uppercase tracking-wider">
                      <th className="py-1.5 pr-1.5 font-semibold w-[22%]">Japanese</th>
                      <th className="py-1.5 px-1.5 font-semibold w-[18%]">Reading</th>
                      <th className="py-1.5 px-1.5 font-semibold w-[22%]">Meaning (EN)</th>
                      <th className="py-1.5 px-1.5 font-semibold w-[22%]">Meaning (NP)</th>
                      <th className="py-1.5 pl-1.5 font-semibold w-[16%]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {point.examples.map((ex, ei) => (
                      <tr key={ei} className="border-b border-duolingo-card-border/30 hover:bg-gray-50/50">
                        <td className="py-1 pr-1.5">
                          <input
                            type="text"
                            value={ex.japanese}
                            onChange={(e) => onExampleChange(ei, 'japanese', e.target.value)}
                            className="w-full px-2 py-1 rounded-lg border border-duolingo-card-border bg-white text-xs focus:outline-none focus:ring-2 focus:ring-duolingo-green/40 focus:border-duolingo-green transition-all"
                            placeholder="例文"
                          />
                        </td>
                        <td className="py-1 px-1.5">
                          <input
                            type="text"
                            value={ex.reading}
                            onChange={(e) => onExampleChange(ei, 'reading', e.target.value)}
                            className="w-full px-2 py-1 rounded-lg border border-duolingo-card-border bg-white text-xs focus:outline-none focus:ring-2 focus:ring-duolingo-green/40 focus:border-duolingo-green transition-all"
                            placeholder="れいぶん"
                          />
                        </td>
                        <td className="py-1 px-1.5">
                          <input
                            type="text"
                            value={ex.meaning}
                            onChange={(e) => onExampleChange(ei, 'meaning', e.target.value)}
                            className="w-full px-2 py-1 rounded-lg border border-duolingo-card-border bg-white text-xs focus:outline-none focus:ring-2 focus:ring-duolingo-green/40 focus:border-duolingo-green transition-all"
                            placeholder="Example sentence"
                          />
                        </td>
                        <td className="py-1 px-1.5">
                          <input
                            type="text"
                            value={ex.meaningNp || ''}
                            onChange={(e) => onExampleChange(ei, 'meaningNp', e.target.value)}
                            className="w-full px-2 py-1 rounded-lg border border-duolingo-card-border bg-white text-xs focus:outline-none focus:ring-2 focus:ring-duolingo-green/40 focus:border-duolingo-green transition-all"
                            placeholder="उदाहरण वाक्य"
                          />
                        </td>
                        <td className="py-1 pl-1.5">
                          <button
                            onClick={() => onDeleteExample(ei)}
                            className="px-1.5 py-1 rounded text-xs font-semibold text-duolingo-red hover:bg-red-50 transition-colors"
                            title="Delete example"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
