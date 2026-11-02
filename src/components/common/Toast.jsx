import React from 'react';
import { useApp } from '../../context/AppContext';

export default function Toast() {
  const { toast } = useApp();

  if (!toast.visible) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#07140f] text-white px-5 py-2.5 rounded-xl shadow-2xl border border-white/10 text-sm font-medium transition-all duration-300 transform scale-100 flex items-center gap-3 animate-bounce"
    >
      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
      {toast.message}
    </div>
  );
}

