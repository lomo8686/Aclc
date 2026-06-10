import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const role = sessionStorage.getItem('lactic_role');
  const location = useLocation();

  // If no role at all, redirect to gateway
  if (!role) {
    return <Navigate to="/" replace />;
  }

  // If going to /admin but not a teacher
  if (location.pathname.startsWith('/admin') && role !== 'teacher') {
    return <Navigate to="/" replace />;
  }

  // Otherwise, allow access
  return <>{children}</>;
}
