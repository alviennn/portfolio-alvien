import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './i18n/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

import Home from './pages/Home';
import ProjectDetail from "./pages/ProjectDetail";
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminCertifications from './pages/admin/AdminCertifications';
import AdminSkills from "./pages/admin/AdminSkills";
import AdminExperience from './pages/admin/AdminExperience';
import AdminContact from "./pages/admin/AdminContact";
import ProtectedRoute from './pages/admin/ProtectedRoute';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Navigate to="/admin/dashboard" replace />
                    </ProtectedRoute>
                  }
                />

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/projects"
                  element={
                    <ProtectedRoute>
                      <AdminProjects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/certifications"
                  element={
                    <ProtectedRoute>
                      <AdminCertifications />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/experience"
                  element={
                    <ProtectedRoute>
                      <AdminExperience />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/skills"
                  element={
                    <ProtectedRoute>
                      <AdminSkills />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/contact"
                  element={
                    <ProtectedRoute>
                      <AdminContact />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
