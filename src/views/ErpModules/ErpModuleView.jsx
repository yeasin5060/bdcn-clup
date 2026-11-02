import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ERP_MD } from '../../data/constants';
import {
  ERP_ACCOUNTS,
  ERP_SUPPLIERS,
  ERP_POOLS,
  ERP_OV,
  MENU_ITEMS,
  ERP_TASK_STATUSES
} from '../../data/initialData';
import { money, makeRandom } from '../../utils/formatters';
import Pill from '../../components/common/Pill';

export default function ErpModuleView({ moduleKey }) {
  const {
    erpSubtabs,
    setErpSubtab,
    erpTasks,
    moveErpTask,
    members,
    staff,
    setView,
    showToast
  } = useApp();

  const activeTabIndex = erpSubtabs[moduleKey] || 0;
  const rawTabConfig = ERP_MD[moduleKey] || '';
  const tabs = rawTabConfig.split('|').map((item) => {
    const lastColon = item.lastIndexOf(':');
    return {
      title: item.slice(0, lastColon),
      type: item.slice(lastColon + 1)
    };
  });

  const activeTab = tabs[activeTabIndex] || tabs[0] || { title: 'Dashboard', type: 'master' };

  // Random generator for mock ERP values
  const R = makeRandom(moduleKey.charCodeAt(0) + activeTabIndex * 17);
  const amt = (min, max) => Math.round((min + R() * (max - min)) / 100) * 100;
  const pick = (arr) => arr[Math.floor(R() * arr.length)];
  const dt = () => {
    const d = new Date();
    d.setDate(d.getDate() - Math.floor(R() * 28));
    return d.toISOString().split('T')[0];
  };

  const [voucherForm, setVoucherForm] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Bank payment',
    account: ERP_ACCOUNTS[0][1],
    narration: '',
    amount: 15000
  });

  const handleVoucherSubmit = (e) => {
    e.preventDefault();
    showToast(`Voucher posted for ${money(voucherForm.amount)}`);
    setVoucherForm({ ...voucherForm, narration: '' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ERP Sub-Tabs */}
      <div className="flex gap-2 border-b border-bcc-line pb-3 overflow-x-auto">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setErpSubtab(moduleKey, idx)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTabIndex === idx
                ? 'bg-bcc-text text-bcc-bg shadow-sm'
                : 'text-bcc-muted hover:text-bcc-text hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Action Toolbar */}
      <div className="flex gap-2">
        <button
          onClick={() => showToast('New record entry form opened (Demo).')}
          className="px-3 py-1.5 rounded-lg bg-bcc-btn text-white text-xs font-semibold hover:bg-bcc-btn-h shadow-sm"
        >
          New Record
        </button>
        <button
          onClick={() => showToast('Exported dataset to spreadsheet (Demo).')}
          className="px-3 py-1.5 rounded-lg border border-bcc-line text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5"
        >
          Export Excel
        </button>
      </div>

      {/* Render Dynamic ERP Content based on tab.type */}
      <div className="bg-bcc-surface border border-bcc-line rounded-2xl overflow-hidden shadow-sm p-4">
        {/* Link to live system view */}
        {activeTab.type.startsWith('go-') && (
          <div className="p-8 text-center space-y-3">
            <h3 className="text-lg font-bold font-serif">Direct Operational Module</h3>
            <p className="text-xs text-bcc-muted">
              This sub-menu connects directly to the club's active live database.
            </p>
            <button
              onClick={() => setView(activeTab.type.slice(3))}
              className="px-4 py-2 rounded-xl bg-bcc-btn text-white text-xs font-semibold hover:bg-bcc-btn-h shadow-md"
            >
              Open Live {activeTab.title}
            </button>
          </div>
        )}

        {/* Chart of Accounts */}
        {activeTab.type === 'coa' && (
          <div className="overflow-x-auto">
            <table className="custom-table">
              <thead>
                <tr className="bg-black/5 dark:bg-white/5 border-b border-bcc-line">
                  <th>Code</th>
                  <th>Account Name</th>
                  <th>Class</th>
                  <th className="text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {ERP_ACCOUNTS.map((a, i) => (
                  <tr key={i}>
                    <td className="font-mono text-xs font-semibold">{a[0]}</td>
                    <td className="font-serif text-sm font-bold">{a[1]}</td>
                    <td className="text-xs">
                      <Pill
                        text={a[2]}
                        variant={
                          a[2] === 'Asset'
                            ? 'ok'
                            : a[2] === 'Liability'
                            ? 'warn'
                            : a[2] === 'Revenue'
                            ? 'info'
                            : 'bad'
                        }
                      />
                    </td>
                    <td className="text-right font-mono text-xs font-bold">
                      {money(amt(80000, 1200000))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Voucher Form */}
        {activeTab.type === 'vform' && (
          <form onSubmit={handleVoucherSubmit} className="max-w-xl mx-auto space-y-4 py-4">
            <h3 className="text-lg font-bold font-serif">Voucher Entry</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-bcc-muted block mb-1">Date</label>
                <input
                  type="date"
                  value={voucherForm.date}
                  onChange={(e) => setVoucherForm({ ...voucherForm, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-bcc-muted block mb-1">Type</label>
                <select
                  value={voucherForm.type}
                  onChange={(e) => setVoucherForm({ ...voucherForm, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
                >
                  <option>Bank payment</option>
                  <option>Cash payment</option>
                  <option>Journal voucher</option>
                  <option>Receipt voucher</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-bcc-muted block mb-1">Debit Account</label>
              <select
                value={voucherForm.account}
                onChange={(e) => setVoucherForm({ ...voucherForm, account: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
              >
                {ERP_ACCOUNTS.map((a) => (
                  <option key={a[0]} value={a[1]}>
                    {a[0]} · {a[1]} ({a[2]})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-bcc-muted block mb-1">Amount</label>
              <input
                type="number"
                value={voucherForm.amount}
                onChange={(e) => setVoucherForm({ ...voucherForm, amount: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm font-mono"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-bcc-muted block mb-1">Narration</label>
              <textarea
                value={voucherForm.narration}
                onChange={(e) => setVoucherForm({ ...voucherForm, narration: e.target.value })}
                rows={3}
                placeholder="Enter details for debit and credit postings..."
                className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-bcc-btn text-white text-sm font-semibold hover:bg-bcc-btn-h shadow-md transition-colors"
            >
              Post Voucher Entry
            </button>
          </form>
        )}

        {/* Voucher Statement & Ledger */}
        {(activeTab.type === 'vch' || activeTab.type === 'ledger') && (
          <div className="overflow-x-auto">
            <table className="custom-table">
              <thead>
                <tr className="bg-black/5 dark:bg-white/5 border-b border-bcc-line">
                  <th>Doc Ref</th>
                  <th>Date</th>
                  <th>Particulars</th>
                  <th className="text-right">Debit</th>
                  <th className="text-right">Credit</th>
                  <th className="text-right">Balance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(8)].map((_, i) => {
                  const debit = i % 2 === 0 ? amt(12000, 95000) : 0;
                  const credit = i % 2 !== 0 ? amt(15000, 80000) : 0;
                  return (
                    <tr key={i}>
                      <td className="font-mono text-xs font-semibold">VCH-{4090 + i}</td>
                      <td className="font-mono text-xs text-bcc-muted">{dt()}</td>
                      <td className="text-xs font-medium">
                        {pick([
                          'Supplier seafood settlement',
                          'Monthly subscription batch',
                          'Restaurant cash deposit',
                          'Gym equipment servicing'
                        ])}
                      </td>
                      <td className="text-right font-mono text-xs text-emerald-600">
                        {debit ? money(debit) : '–'}
                      </td>
                      <td className="text-right font-mono text-xs text-rose-600">
                        {credit ? money(credit) : '–'}
                      </td>
                      <td className="text-right font-mono text-xs font-bold">
                        {money(amt(350000, 890000))}
                      </td>
                      <td>
                        <Pill text="Posted" variant="ok" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Task Management Board */}
        {activeTab.type === 'board' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ERP_TASK_STATUSES.map((statusName, statusIndex) => {
              const tasksInStatus = erpTasks
                .map((t, idx) => ({ ...t, originalIndex: idx }))
                .filter((t) => t[3] === statusIndex);

              return (
                <div
                  key={statusName}
                  className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-bcc-line space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider font-serif">
                      {statusName}
                    </h4>
                    <span className="text-xs font-mono font-bold text-bcc-muted">
                      {tasksInStatus.length}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {tasksInStatus.map((task) => (
                      <div
                        key={task.originalIndex}
                        className="p-3 bg-bcc-surface rounded-xl border border-bcc-line shadow-sm space-y-2"
                      >
                        <div className="text-xs font-semibold text-bcc-text font-serif">
                          {task[0]}
                        </div>
                        <div className="flex justify-between items-center text-[11px] text-bcc-muted">
                          <span>{task[1]}</span>
                          <Pill
                            text={task[2]}
                            variant={task[2] === 'High' ? 'bad' : 'warn'}
                          />
                        </div>
                        {statusIndex < 2 && (
                          <button
                            onClick={() => moveErpTask(task.originalIndex)}
                            className="w-full mt-1 py-1 rounded bg-black/5 dark:bg-white/5 hover:bg-black/10 text-[11px] font-semibold text-bcc-muted hover:text-bcc-text transition-colors"
                          >
                            Advance Status &rarr;
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Task Table */}
        {activeTab.type === 'task' && (
          <div className="overflow-x-auto">
            <table className="custom-table">
              <thead>
                <tr className="bg-black/5 dark:bg-white/5 border-b border-bcc-line">
                  <th>Task Title</th>
                  <th>Department</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {erpTasks.map((t, i) => (
                  <tr key={i}>
                    <td className="font-serif font-bold text-xs">{t[0]}</td>
                    <td className="text-xs">{t[1]}</td>
                    <td>
                      <Pill text={t[2]} variant={t[2] === 'High' ? 'bad' : 'warn'} />
                    </td>
                    <td>
                      <Pill
                        text={ERP_TASK_STATUSES[t[3]]}
                        variant={t[3] === 2 ? 'ok' : t[3] === 1 ? 'warn' : 'muted'}
                      />
                    </td>
                    <td className="text-right">
                      {t[3] < 2 && (
                        <button
                          onClick={() => moveErpTask(i)}
                          className="px-2.5 py-1 text-xs rounded-lg border border-bcc-line hover:bg-black/5 font-semibold transition-colors"
                        >
                          Advance &rarr;
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Default Master Records / Document List */}
        {!['coa', 'vform', 'vch', 'ledger', 'board', 'task'].includes(activeTab.type) &&
          !activeTab.type.startsWith('go-') && (
            <div className="overflow-x-auto">
              <table className="custom-table">
                <thead>
                  <tr className="bg-black/5 dark:bg-white/5 border-b border-bcc-line">
                    <th>Code / Ref</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th className="text-right">Metric Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(6)].map((_, i) => (
                    <tr key={i}>
                      <td className="font-mono text-xs font-semibold">
                        REC-{100 + i * 14}
                      </td>
                      <td className="font-serif font-bold text-xs">
                        {pick(ERP_SUPPLIERS)} · Batch #{i + 1}
                      </td>
                      <td className="text-xs text-bcc-muted">Standard Master</td>
                      <td className="text-right font-mono text-xs font-bold">
                        {money(amt(45000, 320000))}
                      </td>
                      <td>
                        <Pill text="Verified" variant="ok" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </div>
  );
}
