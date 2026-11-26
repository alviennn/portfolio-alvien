import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Award,
  BriefcaseBusiness,
  FolderKanban,
  Menu,
  SFPhoneFill,
  SFSquareGrid2x2Fill,
  SFWrenchFill,
} from '../../components/icons/AppleIcons';

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: SFSquareGrid2x2Fill },
  { label: 'Projects', to: '/admin/projects', icon: FolderKanban },
  { label: 'Certifications', to: '/admin/certifications', icon: Award },
  { label: 'Experience', to: '/admin/experience', icon: BriefcaseBusiness },
  { label: 'Skills', to: '/admin/skills', icon: SFWrenchFill },
  { label: 'Contact', to: '/admin/contact', icon: SFPhoneFill },
];

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
              <item.icon size={16} />
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
              <Menu size={16} />
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
