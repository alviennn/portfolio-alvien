import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!authLoading && user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Email atau password salah. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-light-bgSecondary dark:bg-dark-bgSecondary">
      <div className="w-full max-w-sm bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-2xl p-8">
        <h1 className="font-display text-xl font-semibold">Admin Login</h1>
        <p className="mt-1 text-sm text-light-muted dark:text-dark-muted">
          Masuk untuk mengelola konten portfolio.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/40"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/40"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            {submitting ? 'Memproses...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
