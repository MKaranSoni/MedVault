import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/patient/Dashboard';
import Profile from '../pages/patient/Profile';
import EditProfile from '../pages/patient/EditProfile';
import EmergencyContacts from '../pages/patient/EmergencyContacts';
import MedicalHistory from '../pages/patient/MedicalHistory';
import MedicalReports from '../pages/patient/MedicalReports';
import AiDashboard from '../pages/patient/AiDashboard';
import AiChat from '../pages/patient/AiChat';
import EmergencyQrPage from '../pages/patient/EmergencyQrPage';
import EmergencyAccess from '../pages/public/EmergencyAccess';
import IceMode from '../pages/public/IceMode';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Public Emergency Route without Layout */}
      <Route path="/emergency/:token" element={<IceMode />} />
      <Route path="/emergency/:token/dashboard" element={<EmergencyAccess />} />

      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/emergency-contacts" element={<EmergencyContacts />} />
          <Route path="/medical-history" element={<MedicalHistory />} />
          <Route path="/reports" element={<MedicalReports />} />
          <Route path="/ai-dashboard" element={<AiDashboard />} />
          <Route path="/ai-chat" element={<AiChat />} />
          <Route path="/emergency-qr" element={<EmergencyQrPage />} />
        </Route>
      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
