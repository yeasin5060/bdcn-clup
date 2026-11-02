import React from 'react';

export default function Pill({ text, variant = 'muted', className = '' }) {
  const variantStyles = {
    ok: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20',
    warn: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/20',
    bad: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/20',
    info: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/20',
    muted: 'bg-gray-500/15 text-gray-700 dark:text-gray-300 border border-gray-500/20'
  };

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${
        variantStyles[variant] || variantStyles.muted
      } ${className}`}
    >
      {text}
    </span>
  );
}

