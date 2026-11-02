import React from 'react';
import { useApp } from '../../context/AppContext';
import { money } from '../../utils/formatters';

export default function PayrollModal() {
  const { staff, runPayroll, closeModal } = useApp();

  const payrollSummary = staff.map((s) => {
    const al = s.basic * 0.3;
    const ot = Math.round((s.basic / 208) * 1.5 * s.ot);
    const pf = s.basic * 0.05;
    const gross = s.basic + al + ot;
    const net = gross - pf - s.adv;
    return { gross, pf, net };
  });

  const totalGross = payrollSummary.reduce((acc, x) => acc + x.gross, 0);
  const totalPf = payrollSummary.reduce((acc, x) => acc + x.pf, 0);
  const totalNet = payrollSummary.reduce((acc, x) => acc + x.net, 0);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold font-serif">Run Monthly Payroll</h3>
      <p className="text-xs text-bcc-muted">
        Review disbursements across all 9 club departments before committing to accounts ledger.
      </p>

      <div className="p-4 bg-black/5 dark:bg-white/5 rounded-xl border border-bcc-line space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-bcc-muted">Staff Headcount</span>
          <span className="font-semibold">{staff.length} employees</span>
        </div>
        <div className="flex justify-between">
          <span className="text-bcc-muted">Gross Earnings</span>
          <span className="font-semibold">{money(totalGross)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-bcc-muted">Provident Fund Deductions (5%)</span>
          <span className="font-semibold text-amber-600">−{money(totalPf)}</span>
        </div>
        <div className="pt-2 border-t border-bcc-line flex justify-between font-bold text-base text-emerald-600 dark:text-emerald-400">
          <span>Net Salary Payout</span>
          <span>{money(totalNet)}</span>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={closeModal}
          className="flex-1 py-2 px-4 rounded-lg border border-bcc-line text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={runPayroll}
          className="flex-1 py-2 px-4 rounded-lg bg-bcc-ok text-white text-sm font-semibold hover:opacity-90 shadow-md"
        >
          Approve & Run Payroll
        </button>
      </div>
    </div>
  );
}

