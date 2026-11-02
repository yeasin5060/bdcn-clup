import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ROLE_NAMES } from '../../data/constants';

export default function LoginScreen() {
  const { login, lang } = useApp();
  const [selectedRole, setSelectedRole] = useState('admin');

  const handleSignIn = (e) => {
    e.preventDefault();
    login(selectedRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-[#040e0b] via-[#071913] to-[#0d2e23] text-white">
      {/* Background Decorative Lattice Motif */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e8b04a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative w-full max-w-md p-8 rounded-3xl bg-[#081b15]/95 border border-white/10 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
        {/* Emblem Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#0b6e52] border border-[#e8b04a]/40 flex items-center justify-center shadow-lg mb-3">
            <svg viewBox="0 0 40 40" className="w-12 h-12" aria-hidden="true">
              <rect width="40" height="40" rx="9" fill="#0b6e52" />
              <circle cx="18" cy="20" r="8.5" fill="#e0412f" />
              <path d="M4 33 Q20 19 36 33" fill="none" stroke="#e8b04a" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
            BCC Club OS
          </h2>
          <p className="text-xs text-[#e8b04a] font-serif mt-0.5">
            বাংলাদেশ চীন ক্লাব · 孟中俱乐部
          </p>
          <div className="inline-block mt-3 px-3 py-1 rounded-full text-[11px] font-medium bg-rose-950/50 text-rose-300 border border-rose-800/40">
            {lang === 'bn' ? 'অধিবেশন সমাপ্ত হয়েছে · Session Logged Out' : 'Session Ended · Signed Out'}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">
              {lang === 'bn' ? 'ব্যবহারকারীর পদবী নির্বাচন করুন (Select Role)' : 'Select Access Role'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(ROLE_NAMES).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`py-2 px-3 rounded-xl text-xs font-serif font-semibold border text-left transition-all ${
                    selectedRole === r
                      ? 'bg-[#12382e] border-[#e8b04a] text-white shadow-md ring-1 ring-[#e8b04a]'
                      : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="text-[10px] text-[#e8b04a] uppercase tracking-wider font-mono">
                    {r}
                  </div>
                  <div className="truncate">{ROLE_NAMES[r]}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0b6e52] to-[#128a67] hover:from-[#0d7d5d] hover:to-[#159d76] text-white font-medium text-sm shadow-lg hover:shadow-emerald-900/40 transition-all duration-200 border border-emerald-400/30 flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{lang === 'bn' ? 'পুনরায় প্রবেশ করুন (Sign In)' : 'Sign In to Club OS'}</span>
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-white/5 text-center text-[11px] text-gray-500">
          Bangladesh China Club Management Portal · High Security Local Sandbox
        </div>
      </div>
    </div>
  );
}

