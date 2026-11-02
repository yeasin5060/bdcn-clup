import React from 'react';
import { useApp } from '../../context/AppContext';
import { TIER } from '../../data/constants';
import { money } from '../../utils/formatters';
import { mStatus, mDue } from '../../utils/helpers';
import Pill from '../../components/common/Pill';

export default function MembersView() {
  const {
    members,
    apps,
    memQ,
    setMemQ,
    memT,
    setMemT,
    memS,
    setMemS,
    openModal,
    collectDues,
    approveApp,
    declineApp
  } = useApp();

  const q = memQ.toLowerCase();
  const filteredMembers = members.filter((m) => {
    const matchesQuery = !q || (m.name + (m.alt || '') + m.id).toLowerCase().includes(q);
    const matchesTier = !memT || m.tier === memT;
    const matchesStatus = !memS || mStatus(m) === memS;
    return matchesQuery && matchesTier && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Search & Filter Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <input
          type="search"
          value={memQ}
          onChange={(e) => setMemQ(e.target.value)}
          placeholder="Search name or member number..."
          className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl border border-bcc-line bg-bcc-surface text-sm"
          aria-label="Search members"
        />

        <select
          value={memT}
          onChange={(e) => setMemT(e.target.value)}
          className="px-3.5 py-2 rounded-xl border border-bcc-line bg-bcc-surface text-sm font-medium"
          aria-label="Filter Tier"
        >
          <option value="">All tiers</option>
          {Object.keys(TIER).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={memS}
          onChange={(e) => setMemS(e.target.value)}
          className="px-3.5 py-2 rounded-xl border border-bcc-line bg-bcc-surface text-sm font-medium"
          aria-label="Filter Status"
        >
          <option value="">All statuses</option>
          {['Active', 'Overdue', 'Suspended'].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button
          onClick={() => openModal('new_app')}
          className="px-4 py-2 rounded-xl bg-bcc-btn text-white text-sm font-semibold hover:bg-bcc-btn-h shadow-md transition-colors"
        >
          New application
        </button>
      </div>

      {/* Members Directory Table */}
      <div className="bg-bcc-surface border border-bcc-line rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="custom-table">
            <thead>
              <tr className="bg-black/5 dark:bg-white/5 border-b border-bcc-line">
                <th>No.</th>
                <th>Member</th>
                <th>Tier</th>
                <th>Status</th>
                <th className="text-right">Dues owed</th>
                <th className="text-right">Spend (MTD)</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((m) => {
                const status = mStatus(m);
                const due = mDue(m);

                return (
                  <tr key={m.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                    <td className="font-mono text-xs font-semibold text-bcc-muted">{m.id}</td>
                    <td>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <b className="text-bcc-text font-serif">{m.name}</b>
                        {m.alt && (
                          <span className="text-xs text-bcc-muted font-serif">{m.alt}</span>
                        )}
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-bcc-surface2 text-bcc-muted font-semibold">
                          {m.nat}
                        </span>
                      </div>
                    </td>
                    <td className="text-xs font-medium">{m.tier}</td>
                    <td>
                      <Pill
                        text={status}
                        variant={status === 'Active' ? 'ok' : status === 'Overdue' ? 'warn' : 'bad'}
                      />
                    </td>
                    <td className="text-right font-mono text-xs font-semibold text-bcc-red">
                      {due ? money(due) : '–'}
                    </td>
                    <td className="text-right font-mono text-xs">{money(m.spend)}</td>
                    <td className="text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openModal('member_detail', m)}
                        className="px-2.5 py-1 text-xs rounded-lg border border-bcc-line hover:bg-black/5 dark:hover:bg-white/5 font-medium transition-colors"
                      >
                        View
                      </button>
                      {due > 0 && (
                        <button
                          onClick={() => collectDues(m)}
                          className="px-2.5 py-1 text-xs rounded-lg bg-bcc-btn text-white font-semibold hover:bg-bcc-btn-h shadow-sm transition-colors"
                        >
                          Collect
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-bcc-muted text-sm">
                    No members match your criteria. Clear filters or adjust search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applications awaiting Executive Committee */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-serif">
          Applications awaiting the executive committee
        </h2>

        {apps.length > 0 ? (
          <div className="bg-bcc-surface border border-bcc-line rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="custom-table">
                <thead>
                  <tr className="bg-black/5 dark:bg-white/5 border-b border-bcc-line">
                    <th>Applicant</th>
                    <th>Tier</th>
                    <th>Proposer</th>
                    <th>Seconder</th>
                    <th>Note</th>
                    <th className="text-right">Decision</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.map((a) => (
                    <tr key={a.id}>
                      <td className="font-serif font-bold text-bcc-text">{a.name}</td>
                      <td className="text-xs">{a.tier}</td>
                      <td className="text-xs">{a.prop}</td>
                      <td className="text-xs">{a.sec}</td>
                      <td className="text-xs text-bcc-muted">{a.note}</td>
                      <td className="text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => approveApp(a.id)}
                          className="px-3 py-1 rounded-lg bg-bcc-ok text-white text-xs font-semibold hover:opacity-90 transition-colors shadow-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => declineApp(a.id)}
                          className="px-3 py-1 rounded-lg border border-bcc-line text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                          Decline
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-sm text-bcc-muted">No pending applications at this time.</p>
        )}
      </div>
    </div>
  );
}

