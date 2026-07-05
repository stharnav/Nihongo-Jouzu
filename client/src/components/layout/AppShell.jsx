import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Home', icon: '🏠' },
  { path: '/lesson/1', label: 'Learn', icon: '📚' },
];
const ADMIN_EMAILS = ['arnav@example.com', 'admin@nihongo-jouzu.com'];

export default function AppShell() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-duolingo-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-duolingo-card-border sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 font-bold text-lg text-duolingo-green"
          >
            <span className="text-2xl">🦉</span>
            <span className="hidden sm:inline">Nihongo Jouzu</span>
          </button>

          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-duolingo-green flex items-center justify-center text-white text-sm font-bold">
                {user?.displayName?.charAt(0)?.toUpperCase() || 'G'}
              </div>
            )}
            <button
              onClick={() => navigate('/settings')}
              className="text-duolingo-text-muted hover:text-duolingo-green transition-colors text-lg"
              title="Settings"
            >
              ⚙️
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 pb-24">
        <Outlet />
      </main>

      {/* Bottom Navigation (mobile-first) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-duolingo-card-border z-50">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-around">
          {[...NAV_ITEMS, ...(ADMIN_EMAILS.includes(user?.email) ? [{ path: '/admin', label: 'Admin', icon: '🛠️' }] : [])].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-4 py-2 transition-colors ${
                location.pathname === item.path || location.pathname.startsWith(item.path)
                  ? 'text-duolingo-green'
                  : 'text-duolingo-text-muted'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
