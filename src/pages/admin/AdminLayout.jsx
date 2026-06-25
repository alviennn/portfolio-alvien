import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: 'grid' },
  { label: 'Projects', to: '/admin/projects', icon: 'folder' },
  { label: 'Certifications', to: '/admin/certifications', icon: 'award' },
  { label: 'Experience', to: '/admin/experience', icon: 'briefcase' },
  { label: 'Skills', to: '/admin/skills', icon: 'grid' },
  { label: 'Contact', to: '/admin/contact', icon: 'phone' },
];

const ICONS = {
  grid: (
    <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" />
  ),
  folder: <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />,
  award: <path d="M12 15a4 4 0 100-8 4 4 0 000 8zM8.21 13.89L7 23l5-3 5 3-1.21-9.12" />,
  briefcase: <path d="M3 7h18v12H3V7zM8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />,
  phone: <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.12.81.37 1.59.73 2.34a2 2 0 01-.45 2.11L9.91 10a16.06 16.06 0 006.09 6.09l1.83-1.83a2 2 0 012.11-.45c.75.36 1.53.61 2.34.73a2 2 0 011.72 2z" />,
};

export default function AdminLayout({ children, title }) {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-light-bgSecondary dark:bg-dark-bgSecondary">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 w-64 h-screen bg-light-bg dark:bg-dark-bg border-r border-light-border dark:border-dark-border flex flex-col transition-transform duration-200 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-light-border dark:border-dark-border">
          <span className="font-display font-semibold">Alvien Ridho</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-accent-green/10 text-accent-green'
                    : 'text-light-muted dark:text-dark-muted hover:bg-light-bgSecondary dark:hover:bg-dark-bgSecondary'
                }`
              }
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {ICONS[item.icon]}
              </svg>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-light-border dark:border-dark-border space-y-1">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-light-muted dark:text-dark-muted hover:bg-light-bgSecondary dark:hover:bg-dark-bgSecondary transition-colors duration-200"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-light-border dark:border-dark-border"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
            <h1 className="font-display text-lg font-semibold">{title}</h1>
          </div>
          <a href="/" target="_blank" rel="noreferrer" className="text-sm font-medium text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text">
            View Site →
          </a>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
