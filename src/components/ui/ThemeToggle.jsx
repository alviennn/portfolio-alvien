import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from '../icons/AppleIcons';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex h-9 w-[4.5rem] items-center rounded-full border p-1 transition-colors duration-300 ${
        isDark
          ? 'border-accent-green/40 bg-[#18221f]'
          : 'border-[#d9d0b0] bg-[#f4e7b9]'
      }`}
    >
      <Sun className="absolute left-2 h-3.5 w-3.5 text-[#8e7120]" />
      <Moon className="absolute right-2 h-3.5 w-3.5 text-[#b8d3c7]" />

      <span
        className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isDark
            ? 'translate-x-9 bg-[#d7e4dd] text-[#284438]'
            : 'translate-x-0 bg-[#fffaf0] text-[#9b7414]'
        }`}
      >
        {isDark ? (
          <Moon size={14} />
        ) : (
          <Sun size={14} />
        )}
      </span>
    </button>
  );
}
