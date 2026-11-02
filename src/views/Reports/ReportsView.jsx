import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OUTL, METH, FEE } from '../../data/constants';
import { MENU_ITEMS } from '../../data/initialData';
import { money, makeRandom } from '../../utils/formatters';

export default function ReportsView() {
  const {
    repType,
    setRepType,
    repRange,
    setRepRange,
    repBusy,
    setRepBusy,
    repDone,
    setRepDone,
    transactions,
    members,
    rooms,
    staff,
    events,
    showToast
  } = useApp();

  const REPORT_TYPES = [
    { id: 'revenue', label: 'Revenue by outlet' },
    { id: 'payments', label: 'Payment reconciliation' },
    { id: 'dues', label: 'Member dues ageing' },
    { id: 'occupancy', label: 'Room occupancy' },
    { id: 'fnb', label: 'Food and drink sales' },
    { id: 'payroll', label: 'Payroll register' },
    { id: 'events', label: 'Event registrations' }
  ];

  const MULTIPLIERS = { today: 1, week: 6.6, month: 27.5 };

  const handleGenerate = () => {
    setRepBusy(true);
    setRepDone(false);
    setTimeout(() => {
      setRepBusy(false);
      setRepDone(true);
      showToast('Report generated successfully.');
    }, 600);
  };

  // Generate Report Data
  const mult = MULTIPLIERS[repRange] || 1;
  const successTxns = transactions.filter((t) => t.st === 'Success');
  let cols = [];
  let rows = [];
  let bars = [];
  let title = REPORT_TYPES.find((r) => r.id === repType)?.label || '';

  if (repType === 'revenue') {
    cols = ['Outlet', 'Transactions', 'Gross revenue', 'Share'];
    const totalRev =
      successTxns.reduce((acc, t) => acc + t.amount, 0) * mult || 1;
    OUTL.forEach((outletName) => {
      const list = successTxns.filter((t) => t.outlet === outletName);
      const gross = list.reduce((acc, t) => acc + t.amount, 0) * mult;
      const count = Math.round(list.length * mult);
      const share = Math.round((gross / totalRev) * 100) + '%';
      rows.push([outletName, count, money(gross), share]);
      bars.push([outletName, gross]);
    });
    rows.push(['Total', '', money(totalRev), '100%']);
  } else if (repType === 'payments') {
    cols = ['Method', 'Transactions', 'Gross', 'Gateway Fee', 'Net Settlement'];
    METH.forEach((m) => {
      const list = successTxns.filter((t) => t.method === m);
      const gross = list.reduce((acc, t) => acc + t.amount, 0) * mult;
      const count = Math.round(list.length * mult);
      const fee = gross * (FEE[m] || 0);
      const net = gross - fee;
      rows.push([m, count, money(gross), money(fee), money(net)]);
      bars.push([m, gross]);
    });
  } else if (repType === 'dues') {
    cols = ['Member', 'Tier', 'Months overdue', 'Amount', 'Ageing Category'];
    members
      .filter((m) => m.over > 0)
      .forEach((m) => {
        const cat = m.over === 1 ? '1–30 days' : m.over === 2 ? '31–60 days' : '61+ days';
        const due = m.over * 2000;
        rows.push([m.name, m.tier, m.over, money(due), cat]);
        bars.push([m.name, due]);
      });
  } else if (repType === 'occupancy') {
    cols = ['Room Type', 'Rooms Available', 'Nights Sold', 'Occupancy Rate', 'Revenue'];
    [
      ['Deluxe', 6, 6500],
      ['Executive', 4, 8500],
      ['Jade suite', 2, 12000]
    ].forEach(([type, count, rate]) => {
      const occ = rooms.filter((r) => r.type === type && r.st === 'occ').length;
      const sold = Math.round(occ * mult * 3);
      const occPct = Math.round((occ / count) * 100) + '%';
      const rev = sold * rate;
      rows.push([type, count, sold, occPct, money(rev)]);
      bars.push([type, rev]);
    });
  } else if (repType === 'fnb') {
    cols = ['Item', 'Outlet', 'Category', 'Unit Price'];
    Object.keys(MENU_ITEMS).forEach((k) => {
      const it = MENU_ITEMS[k];
      rows.push([it.n, it.alc ? 'Bar' : 'Kitchen', it.c, money(it.p)]);
      bars.push([it.n, it.p]);
    });
  } else if (repType === 'payroll') {
    cols = ['Employee', 'Department', 'Basic', 'Overtime', 'Net Pay'];
    staff.forEach((s) => {
      const al = s.basic * 0.3;
      const ot = Math.round((s.basic / 208) * 1.5 * s.ot);
      const pf = s.basic * 0.05;
      const net = s.basic + al + ot - pf - s.adv;
      rows.push([s.name, s.dept, money(s.basic), money(ot), money(net)]);
      bars.push([s.name, net]);
    });
  } else if (repType === 'events') {
    cols = ['Event', 'Date', 'Venue', 'Registered', 'Capacity', 'Ticket Price'];
    events.forEach((e) => {
      rows.push([e.n, e.d, e.venue, e.reg, e.cap, money(e.price)]);
      bars.push([e.n, e.reg]);
    });
  }

  const maxBarVal = Math.max(...bars.map((b) => b[1]), 1);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [cols.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${repType}_report_${repRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported CSV file.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Configuration Toolbar */}
      <div className="no-print flex gap-3 items-center flex-wrap p-4 bg-bcc-surface rounded-2xl border border-bcc-line shadow-sm">
        <select
          value={repType}
          onChange={(e) => {
            setRepType(e.target.value);
            setRepDone(false);
          }}
          className="px-3.5 py-2 rounded-xl border border-bcc-line bg-bcc-surface text-sm font-medium"
        >
          {REPORT_TYPES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>

        <select
          value={repRange}
          onChange={(e) => {
            setRepRange(e.target.value);
            setRepDone(false);
          }}
          className="px-3.5 py-2 rounded-xl border border-bcc-line bg-bcc-surface text-sm font-medium"
        >
          <option value="today">Today</option>
          <option value="week">This week</option>
          <option value="month">This month (MTD)</option>
        </select>

        <button
          onClick={handleGenerate}
          className="px-5 py-2 rounded-xl bg-bcc-btn text-white text-sm font-semibold hover:bg-bcc-btn-h shadow-md transition-colors"
        >
          Generate Report
        </button>

        {repDone && (
          <div className="flex gap-2 ml-auto">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl border border-bcc-line text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              Export CSV
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl border border-bcc-line text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              Print Report
            </button>
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {repBusy && (
        <div className="p-8 bg-bcc-surface rounded-2xl border border-bcc-line shadow-sm space-y-4 animate-pulse">
          <div className="h-6 bg-black/10 dark:bg-white/10 rounded w-1/3" />
          <div className="h-4 bg-black/10 dark:bg-white/10 rounded w-1/4" />
          <div className="h-40 bg-black/10 dark:bg-white/10 rounded" />
        </div>
      )}

      {/* Empty State */}
      {!repBusy && !repDone && (
        <div className="p-12 text-center bg-bcc-surface rounded-2xl border border-dashed border-bcc-line">
          <h3 className="text-lg font-serif font-bold text-bcc-text">No Report Generated Yet</h3>
          <p className="text-xs text-bcc-muted max-w-sm mx-auto mt-1">
            Choose a metric category and period from the toolbar above, then press <b>Generate Report</b> to compile live statements.
          </p>
        </div>
      )}

      {/* Rendered Report */}
      {!repBusy && repDone && (
        <div className="p-6 bg-bcc-surface rounded-2xl border border-bcc-line shadow-sm space-y-6">
          <div className="border-b border-bcc-line pb-4 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold font-serif">{title}</h2>
              <div className="text-xs text-bcc-muted mt-1">
                Bangladesh China Club Ltd. · Management Accounts Report ({repRange})
              </div>
            </div>
            <div className="text-right text-xs text-bcc-muted font-mono">
              Generated: {new Date().toLocaleDateString('en-GB')}
            </div>
          </div>

          {/* Bar Chart Visualization (if applicable) */}
          {bars.length > 0 && bars.length <= 10 && (
            <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-bcc-line space-y-2.5">
              {bars.map(([label, val], idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <span className="w-36 text-bcc-muted font-medium truncate">{label}</span>
                  <div className="flex-1 h-3 rounded-full bg-bcc-surface2 overflow-hidden">
                    <div
                      className="h-full bg-bcc-text rounded-full transition-all duration-500"
                      style={{ width: `${(val / maxBarVal) * 100}%` }}
                    />
                  </div>
                  <span className="w-24 text-right font-mono font-semibold">
                    {typeof val === 'number' && val > 100 ? money(val) : val}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tabular Details */}
          <div className="overflow-x-auto border border-bcc-line rounded-xl">
            <table className="custom-table">
              <thead>
                <tr className="bg-black/5 dark:bg-white/5 border-b border-bcc-line">
                  {cols.map((col, idx) => (
                    <th key={idx} className={idx > 0 ? 'text-right' : 'text-left'}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx === rows.length - 1 && repType === 'revenue' ? 'font-bold bg-black/5 dark:bg-white/5' : ''}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={cIdx > 0 ? 'text-right font-mono text-xs' : 'font-serif text-sm font-semibold'}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

