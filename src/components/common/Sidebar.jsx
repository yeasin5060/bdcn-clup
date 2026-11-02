import React from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_NAV, ROLES, ROLE_NAMES, TRANSLATIONS } from '../../data/constants';

export default function Sidebar() {
  const { role, view, setView, lang, logout } = useApp();
  const allow = ROLES[role] || [];

  return (
    <aside className="side select-none">
      {/* Brand Header - Pinned at top */}
      <div className="sb-brand">
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <rect width="40" height="40" rx="9" fill="#0b6e52" />
          <circle cx="18" cy="20" r="8.5" fill="#e0412f" />
          <path d="M4 33 Q20 19 36 33" fill="none" stroke="#e8b04a" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        <div>
          <b>BCC Club OS</b>
          <small>বাংলাদেশ চীন ক্লাব · 孟中俱乐部</small>
        </div>
      </div>

      {/* Nav List - Independently scrollable with custom slim scrollbar */}
      <nav id="nav" aria-label="Modules">
        {ALL_NAV.map((n) => {
          const isAllowed = allow.includes(n.id);
          const isCurrent = view === n.id;
          const label = TRANSLATIONS[lang]?.[n.id] || n.label;

          return (
            <button
              key={n.id}
              className="nv"
              disabled={!isAllowed}
              aria-current={isCurrent ? 'page' : undefined}
              onClick={() => isAllowed && setView(n.id)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={n.icon} />
              </svg>
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Pinned & Fixed Footer - Never scrolls off screen */}
      <div className="sb-foot-fixed">
        {/* User Profile Card */}
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-white/[0.04] border border-white/5">
          <div className="w-8 h-8 rounded-full bg-emerald-800/90 border border-[#e8b04a]/40 flex items-center justify-center font-serif font-bold text-[#e8b04a] text-xs flex-shrink-0 shadow-sm">
            AR
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-white truncate flex items-center gap-1.5">
              <span>Anika Rahman</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" title="Active session" />
            </div>
            <div className="text-[10px] text-[#8fa89c] truncate font-serif">
              {ROLE_NAMES[role] || 'General Manager'}
            </div>
          </div>
        </div>

        {/* Fixed Logout Button */}
        <button
          type="button"
          onClick={logout}
          className="sb-logout-btn flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/30 hover:bg-rose-900/50 border border-rose-800/40 hover:border-rose-600/60 shadow-sm transition-all duration-200 group active:scale-[0.98]"
          title="Log out from BCC Club OS"
        >
          <svg
            className="w-4 h-4 stroke-current stroke-[2] fill-none transition-transform duration-200 group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{lang === 'bn' ? 'লগ আউট (Log Out)' : 'Log Out'}</span>
        </button>

        {/* Lattice Motif */}
        <div className="lattice" />

        {/* Demo Disclaimer */}
        <div className="text-[10.5px] text-[#7f998d] leading-tight text-center pb-1">
          Sample data. Nothing is saved or sent.
        </div>
      </div>
    </aside>
  );
}
