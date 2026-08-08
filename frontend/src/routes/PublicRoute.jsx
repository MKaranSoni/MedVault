import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function PublicRoute() {
  const { isAuthenticated } = useContext(AuthContext);

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" />;
}
