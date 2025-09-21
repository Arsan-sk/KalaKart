import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../App'; // Adjust path if App.tsx is moved or renamed

interface ProtectedRouteProps {
  requiredRole?: string; // Optional: for role-based access
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { session, loading } = useAuth();

  if (loading) {
    // Optionally render a loading spinner or skeleton
    return <div>Loading authentication...</div>;
  }

  // Temporary: Allow unrestricted access to admin route
  if (requiredRole === 'admin') {
    return <Outlet />;
  }

  if (!session) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If requiredRole is specified, check if the user has that role
  if (requiredRole && session.user?.user_metadata?.role !== requiredRole) {
    // Redirect to a different page (e.g., unauthorized) or show an error
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
