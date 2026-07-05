import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-duolingo-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-duolingo-green border-t-transparent rounded-full animate-spin" />
          <p className="text-duolingo-text-secondary font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
