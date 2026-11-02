import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEPTS } from '../../data/constants';
import { money } from '../../utils/formatters';
import Pill from '../../components/common/Pill';

export default function StaffView() {
  const {
    staff,
    grid,
    payrollDone,
    empTab,
    setEmpTab,
    empQ,
    setEmpQ,
    empD,
    setEmpD,
    cycleAttendance,
    cycleShift,
    openModal
  } = useApp();

  const tabs = [
    { id: 'dir', label: 'Directory' },
    { id: 'att', label: 'Attendance today' },
    { id: 'shift', label: 'Shift planner' },
    { id: 'pay', label: 'Payroll' }
  ];

  // Directory filter
  const q = empQ.toLowerCase();
  const filteredStaff = staff.filter((s) => {
    const matchesQ = !q || (s.name + s.role + s.id).toLowerCase().includes(q);
    const matchesD = !empD || s.dept === empD;
    return matchesQ && matchesD;
  });

  // Attendance counts
  const attCounts = { in: 0, late: 0, out: 0, leave: 0 };
  staff.forEach((s) => {
    if (attCounts[s.att] !== undefined) attCounts[s.att]++;
  });

  // Payroll rows
  const payrollRows = staff.map((s) => {
    const al = s.basic * 0.3;
    const ot = Math.round((s.basic / 208) * 1.5 * s.ot);
    const pf = s.basic * 0.05;
    const gross = s.basic + al + ot;
    const net = gross - pf - s.adv;
    return { s, al, ot, pf, gross, net };
  });
  const totalGross = payrollRows.reduce((acc, r) => acc + r.gross, 0);
  const totalNet = payrollRows.reduce((acc, r) => acc + r.net, 0);

  const shiftDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b border-bcc-line pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setEmpTab(t.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              empTab === t.id
                ? 'bg-bcc-text text-bcc-bg shadow-sm'
                : 'text-bcc-muted hover:text-bcc-text hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Directory Tab */}
      {empTab === 'dir' && (
        <div className="space-y-4">
          <div className="flex gap-3 flex-wrap">
            <input
              type="search"
              value={empQ}
              onChange={(e) => setEmpQ(e.target.value)}
              placeholder="Search staff by name or role..."
              className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl border border-bcc-line bg-bcc-surface text-sm"
            />
            <select
              value={empD}
              onChange={(e) => setEmpD(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-bcc-line bg-bcc-surface text-sm font-medium"
            >
              <option value="">All departments</option>
              {DEPTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-bcc-surface border border-bcc-line rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="custom-table">
                <thead>
                  <tr className="bg-black/5 dark:bg-white/5 border-b border-bcc-line">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Role</th>
                    <th>Shift</th>
                    <th className="text-right">Basic Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((s) => (
                    <tr key={s.id}>
                      <td className="font-mono text-xs font-semibold text-bcc-muted">{s.id}</td>
                      <td className="font-serif font-bold text-bcc-text">{s.name}</td>
                      <td className="text-xs">{s.dept}</td>
                      <td className="text-xs text-bcc-muted">{s.role}</td>
                      <td className="text-xs">
                        {{
                          M: 'Morning 07–15',
                          E: 'Evening 15–23',
                          N: 'Night 23–07'
                        }[s.shift] || s.shift}
                      </td>
                      <td className="text-right font-mono text-xs font-semibold">
                        {money(s.basic)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Tab */}
      {empTab === 'att' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-bcc-surface border border-bcc-line shadow-sm">
              <div className="text-xs text-bcc-muted">Present</div>
              <div className="text-2xl font-bold font-serif text-emerald-600 mt-1">
                {attCounts.in}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-bcc-surface border border-bcc-line shadow-sm">
              <div className="text-xs text-bcc-muted">Late</div>
              <div className="text-2xl font-bold font-serif text-amber-600 mt-1">
                {attCounts.late}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-bcc-surface border border-bcc-line shadow-sm">
              <div className="text-xs text-bcc-muted">Not in yet</div>
              <div className="text-2xl font-bold font-serif text-rose-600 mt-1">
                {attCounts.out}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-bcc-surface border border-bcc-line shadow-sm">
              <div className="text-xs text-bcc-muted">On leave</div>
              <div className="text-2xl font-bold font-serif text-sky-600 mt-1">
                {attCounts.leave}
              </div>
            </div>
          </div>

          <p className="text-xs text-bcc-muted">
            Tap a status pill to cycle it: Present → Late → Not in → On leave.
          </p>

          <div className="bg-bcc-surface border border-bcc-line rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="custom-table">
                <tbody>
                  {staff.map((s) => {
                    const meta = {
                      in: ['Present', 'ok'],
                      late: ['Late', 'warn'],
                      out: ['Not in', 'bad'],
                      leave: ['On leave', 'info']
                    }[s.att] || ['Unknown', 'muted'];

                    return (
                      <tr key={s.id}>
                        <td>
                          <b className="text-bcc-text font-serif">{s.name}</b>
                          <div className="text-xs text-bcc-muted">
                            {s.dept} · {s.role}
                          </div>
                        </td>
                        <td className="text-right">
                          <button
                            onClick={() => cycleAttendance(s.id)}
                            className="cursor-pointer transition-transform active:scale-95"
                          >
                            <Pill text={meta[0]} variant={meta[1]} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Shift Planner Tab */}
      {empTab === 'shift' && (
        <div className="space-y-4">
          <p className="text-xs text-bcc-muted">
            Press a cell to cycle: Morning (M), Evening (E), Night (N) or Day Off (off).
          </p>

          <div className="bg-bcc-surface border border-bcc-line rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="custom-table">
                <thead>
                  <tr className="bg-black/5 dark:bg-white/5 border-b border-bcc-line">
                    <th>Department</th>
                    {shiftDays.map((d) => (
                      <th key={d} className="text-center">
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DEPTS.map((dept) => (
                    <tr key={dept}>
                      <td className="font-serif font-bold text-xs">{dept}</td>
                      {grid[dept]?.map((val, idx) => (
                        <td key={idx} className="text-center">
                          <button
                            onClick={() => cycleShift(dept, idx)}
                            className={`min-w-[42px] py-1 px-2 rounded-lg text-xs font-mono font-bold border transition-colors ${
                              val === 'off'
                                ? 'border-dashed border-bcc-line text-bcc-muted opacity-50 hover:opacity-100'
                                : 'border-bcc-line bg-black/5 dark:bg-white/5 hover:bg-black/10 text-bcc-text'
                            }`}
                          >
                            {val}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Payroll Tab */}
      {empTab === 'pay' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold font-serif">October Payroll Register</h2>
              <Pill text={payrollDone ? 'Processed' : 'Draft'} variant={payrollDone ? 'ok' : 'warn'} />
            </div>

            <button
              onClick={() => openModal('payroll')}
              disabled={payrollDone}
              className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition-colors ${
                payrollDone
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-bcc-btn text-white hover:bg-bcc-btn-h'
              }`}
            >
              {payrollDone ? 'Payroll Processed' : 'Run Payroll'}
            </button>
          </div>

          <div className="bg-bcc-surface border border-bcc-line rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="custom-table">
                <thead>
                  <tr className="bg-black/5 dark:bg-white/5 border-b border-bcc-line">
                    <th>Employee</th>
                    <th className="text-right">Basic</th>
                    <th className="text-right">Allowance (30%)</th>
                    <th className="text-right">Overtime</th>
                    <th className="text-right">PF (5%)</th>
                    <th className="text-right">Advance</th>
                    <th className="text-right">Net Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollRows.map((r) => (
                    <tr key={r.s.id}>
                      <td>
                        <b className="font-serif text-bcc-text">{r.s.name}</b>
                        <div className="text-[11px] text-bcc-muted">{r.s.dept}</div>
                      </td>
                      <td className="text-right font-mono text-xs">{money(r.s.basic)}</td>
                      <td className="text-right font-mono text-xs">{money(r.al)}</td>
                      <td className="text-right font-mono text-xs">{money(r.ot)}</td>
                      <td className="text-right font-mono text-xs text-amber-600">−{money(r.pf)}</td>
                      <td className="text-right font-mono text-xs text-bcc-muted">
                        {r.s.adv ? `−${money(r.s.adv)}` : '–'}
                      </td>
                      <td className="text-right font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {money(r.net)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-black/5 dark:bg-white/5 font-bold border-t-2 border-bcc-line">
                    <td>Total Club Disbursement</td>
                    <td colSpan="4" className="text-right text-xs font-mono">
                      Gross: {money(totalGross)}
                    </td>
                    <td colSpan="2" className="text-right text-sm font-mono text-emerald-600 dark:text-emerald-400">
                      Net: {money(totalNet)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

