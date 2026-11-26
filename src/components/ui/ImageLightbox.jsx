import { useEffect } from 'react';
import { X } from '../icons/AppleIcons';

export default function ImageLightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
      >
        <X size={16} />
      </button>

      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
      />
    </div>
  );
}