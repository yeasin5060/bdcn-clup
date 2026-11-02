import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function Modal({ children, wide = false }) {
  const { modal, closeModal } = useApp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modal.isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modal.isOpen, closeModal]);

  if (!modal.isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${
          wide ? 'max-w-2xl' : 'max-w-md'
        } bg-bcc-surface text-bcc-text rounded-2xl shadow-2xl border border-bcc-line p-6 max-h-[90vh] overflow-y-auto transform transition-all animate-in fade-in zoom-in-95`}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-bcc-muted hover:text-bcc-text p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-xl leading-none"
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

