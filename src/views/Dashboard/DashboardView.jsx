import React from 'react';
import { useApp } from '../../context/AppContext';
import { ROLE_NAMES, OUTL } from '../../data/constants';
import { money, hhmm } from '../../utils/formatters';
import { mStatus, mDue } from '../../utils/helpers';
import RealisticSkyBanner from '../../components/dashboard/RealisticSkyBanner';

export default function DashboardView() {
  const { role, members, apps, rooms, tables, transactions, setView, openChat } = useApp();

  // Computations
  const successTxns = transactions.filter((t) => t.st === 'Success');
  const revenueToday = successTxns.reduce((acc, t) => acc + t.amount, 0);
  const occupiedRooms = rooms.filter((r) => r.st === 'occ').length;
  const activeMembers = members.filter((m) => mStatus(m) === 'Active').length;
  const overdueMembers = members.filter((m) => m.over > 0);
  const totalDuesOverdue = overdueMembers.reduce((acc, m) => acc + mDue(m), 0);

  let openTables = 0;
  let dishesReady = 0;
  Object.keys(tables).forEach((o) => {
    openTables += tables[o].filter((t) => t.st !== 'free').length;
    tables[o].forEach((t) => {
      t.lines.forEach((l) => {
        if (l.s === 'ready') dishesReady++;
      });
    });
  });

  const roomsNeedCleaning = rooms.filter((r) => r.st === 'cln').length;

  // Outlet Revenue Breakdown
  const outletData = OUTL.map((outletName) => {
    const val = successTxns
      .filter((t) => t.outlet === outletName)
      .reduce((acc, t) => acc + t.amount, 0);
    return { name: outletName, val };
  });
  const maxOutletVal = Math.max(...outletData.map((d) => d.val), 1);

  // 7 Days Trend
  const pastTrend = [412000, 466000, 438000, 521000, 498000, 587000];
  const allTrend = [...pastTrend, revenueToday];
  const maxTrend = Math.max(...allTrend) * 1.1;
  const svgWidth = 520;
  const svgHeight = 150;
  const trendPoints = allTrend.map((v, i) => [
    30 + (i * (svgWidth - 60)) / 6,
    svgHeight - 24 - (v / maxTrend) * (svgHeight - 40)
  ]);
  const trendDays = ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Today'];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Dynamic Realistic Sun & Moon Riverfront Banner */}
      <RealisticSkyBanner />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-bcc-surface border border-bcc-line shadow-sm">
          <div className="text-xs text-bcc-muted font-medium">Revenue today</div>
          <div className="text-2xl font-serif font-bold text-bcc-text mt-1">
            {money(revenueToday)}
          </div>
          <div className="text-[11px] text-bcc-muted mt-1 truncate">all outlets, successful</div>
        </div>

        <div className="p-4 rounded-xl bg-bcc-surface border border-bcc-line shadow-sm">
          <div className="text-xs text-bcc-muted font-medium">Rooms occupied</div>
          <div className="text-2xl font-serif font-bold text-bcc-text mt-1">{occupiedRooms}</div>
          <div className="text-[11px] text-bcc-muted mt-1">
            of 12 · {Math.round((occupiedRooms / 12) * 100)}% occupancy
          </div>
        </div>

        <div className="p-4 rounded-xl bg-bcc-surface border border-bcc-line shadow-sm">
          <div className="text-xs text-bcc-muted font-medium">Active members</div>
          <div className="text-2xl font-serif font-bold text-bcc-text mt-1">{activeMembers}</div>
          <div className="text-[11px] text-bcc-muted mt-1">of {members.length} on register</div>
        </div>

        <div className="p-4 rounded-xl bg-bcc-surface border border-bcc-line shadow-sm">
          <div className="text-xs text-bcc-muted font-medium">Tables open</div>
          <div className="text-2xl font-serif font-bold text-bcc-text mt-1">{openTables}</div>
          <div className="text-[11px] text-bcc-muted mt-1">across three outlets</div>
        </div>

        <div className="p-4 rounded-xl bg-bcc-surface border border-bcc-line shadow-sm col-span-2 sm:col-span-1">
          <div className="text-xs text-bcc-muted font-medium">Dues overdue</div>
          <div className="text-2xl font-serif font-bold text-bcc-red mt-1">
            {money(totalDuesOverdue)}
          </div>
          <div className="text-[11px] text-bcc-muted mt-1">
            {overdueMembers.length} members pending
          </div>
        </div>
      </div>

      {/* Detailed Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Charts) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-5 rounded-2xl bg-bcc-surface border border-bcc-line shadow-sm">
            <h2 className="text-base font-bold font-serif mb-4">Revenue today by outlet</h2>
            <div className="space-y-3">
              {outletData.map((x) => (
                <div key={x.name} className="flex items-center gap-3 text-xs">
                  <span className="w-28 text-bcc-muted truncate">{x.name}</span>
                  <div className="flex-1 h-3 rounded-full bg-bcc-surface2 overflow-hidden">
                    <div
                      className="h-full bg-bcc-text rounded-full transition-all duration-500"
                      style={{ width: `${(x.val / maxOutletVal) * 100}%` }}
                    />
                  </div>
                  <span className="w-20 text-right font-mono font-semibold">{money(x.val)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-bcc-surface border border-bcc-line shadow-sm">
            <h2 className="text-base font-bold font-serif mb-3">7-Day Revenue Trend</h2>
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
              <polyline
                fill="none"
                stroke="var(--muted)"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.4"
                points={trendPoints.map((p) => p.join(',')).join(' ')}
              />
              <polyline
                fill="none"
                stroke="var(--ok)"
                strokeWidth="2.5"
                points={trendPoints.map((p) => p.join(',')).join(' ')}
              />
              {trendPoints.map((p, i) => (
                <g key={i}>
                  <circle
                    cx={p[0]}
                    cy={p[1]}
                    r={i === 6 ? 6 : 3.5}
                    fill={i === 6 ? 'var(--bad)' : 'var(--ok)'}
                  />
                  <text
                    x={p[0]}
                    y={svgHeight - 6}
                    textAnchor="middle"
                    fontSize="11"
                    fill="var(--muted)"
                    className="font-mono font-medium"
                  >
                    {trendDays[i]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Right Column (Live Feed & Quick Action Tasks) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Interactive Concierge & Indoor Roadmap Assistant Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c2e23] to-[#071912] border border-[#e8b04a]/30 text-white shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#e0412f] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-2">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#e8b04a] leading-none">
                    BCC Concierge · Where it is
                  </h3>
                  <p className="text-[11px] text-[#9fc7b6] mt-0.5">
                    Ask for a table, gym, pool or service with 2D floor roadmap
                  </p>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Where is the gym?', 'Tea Garden Café', 'Swimming pool', 'Book a table tonight'].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => openChat(q)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 border border-white/10 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openChat()}
              className="w-full py-2 px-3 rounded-xl bg-[#c83220] hover:bg-[#b02a1b] text-white text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <span>Open Concierge & Floor Map Assistant</span>
              <span>→</span>
            </button>
          </div>

          {/* Quick Attention Actions */}
          <div className="p-5 rounded-2xl bg-bcc-surface border border-bcc-line shadow-sm space-y-3">
            <h2 className="text-base font-bold font-serif">Items Needing Attention</h2>
            <div className="space-y-2">
              {overdueMembers.length > 0 && (
                <button
                  onClick={() => setView('members')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 text-left transition-colors"
                >
                  <span className="text-xs font-medium text-amber-900 dark:text-amber-200">
                    {overdueMembers.length} members have overdue dues
                  </span>
                  <b className="text-xs font-bold text-amber-700 dark:text-amber-300">
                    {money(totalDuesOverdue)}
                  </b>
                </button>
              )}

              {apps.length > 0 && (
                <button
                  onClick={() => setView('members')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/20 text-left transition-colors"
                >
                  <span className="text-xs font-medium text-blue-900 dark:text-blue-200">
                    {apps.length} applications await committee approval
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-700 dark:text-blue-300">
                    Review
                  </span>
                </button>
              )}

              {roomsNeedCleaning > 0 && (
                <button
                  onClick={() => setView('stay')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 text-left transition-colors"
                >
                  <span className="text-xs font-medium text-rose-900 dark:text-rose-200">
                    {roomsNeedCleaning} room{roomsNeedCleaning > 1 ? 's' : ''} need cleaning
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-700 dark:text-rose-300">
                    Housekeeping
                  </span>
                </button>
              )}

              {dishesReady > 0 && (
                <button
                  onClick={() => setView('pos')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 text-left transition-colors"
                >
                  <span className="text-xs font-medium text-emerald-900 dark:text-emerald-200">
                    {dishesReady} dish{dishesReady > 1 ? 'es' : ''} ready to serve
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                    Kitchen
                  </span>
                </button>
              )}

              <button
                onClick={() => setView('pos')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 text-left transition-colors"
              >
                <span className="text-xs text-bcc-muted">
                  Low stock: Longjing tea (4 pots), Peking duck (6)
                </span>
                <span className="text-xs font-medium text-bcc-muted">Reorder</span>
              </button>
            </div>
          </div>

          {/* Live Activity Stream */}
          <div className="p-5 rounded-2xl bg-bcc-surface border border-bcc-line shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold font-serif">Live Activity</h2>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Stream
              </span>
            </div>

            <ul className="divide-y divide-bcc-line text-xs">
              {transactions.slice(0, 7).map((t, i) => (
                <li key={t.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <time className="font-mono text-bcc-muted font-medium">{hhmm(t.t)}</time>
                    <span className="text-bcc-text">
                      {money(t.amount)} · <b>{t.outlet}</b> via {t.method}
                    </span>
                  </div>
                  {i === 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600">
                      New
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

