import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ProgressProvider } from './contexts/ProgressContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AppShell from './components/layout/AppShell';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import LessonDetail from './pages/LessonDetail';
import QuizPage from './pages/QuizPage';
import WordQuizPage from './pages/WordQuizPage';
import Settings from './pages/Settings';
import SeedFirestore from './pages/SeedFirestore';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <ProgressProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/settings" element={<Settings />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<AppShell />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/lesson/:lessonId" element={<LessonDetail />} />
                  <Route path="/word-quiz/:lessonId" element={<WordQuizPage />} />
                  <Route path="/quiz" element={<QuizPage />} />
                  <Route path="/quiz/:lessonId" element={<QuizPage />} />
                  <Route path="/admin" element={<Admin />} />
                </Route>
                <Route path="/admin/seed" element={<SeedFirestore />} />
              </Route>
            </Routes>
          </ProgressProvider>
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
