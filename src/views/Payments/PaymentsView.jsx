import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { METH, FEE, OUTL } from '../../data/constants';
import { money, hhmm } from '../../utils/formatters';
import Pill from '../../components/common/Pill';

export default function PaymentsView() {
  const {
    transactions,
    payQ,
    setPayQ,
    payM,
    setPayM,
    payS,
    setPayS,
    refundTxn,
    settleTxn,
    openModal
  } = useApp();

  // Metrics
  const successTxns = transactions.filter((t) => t.st === 'Success');
  const gross = successTxns.reduce((acc, t) => acc + t.amount, 0);

  const byMethod = METH.map((m) => {
    const list = successTxns.filter((t) => t.method === m);
    const amount = list.reduce((acc, t) => acc + t.amount, 0);
    return { method: m, count: list.length, amount };
  });

  const totalFee = byMethod.reduce((acc, x) => acc + x.amount * (FEE[x.method] || 0), 0);
  const netSettlement = gross - totalFee;
  const pendingOrFailed = transactions.filter(
    (t) => t.st !== 'Success' && t.st !== 'Refunded'
  ).length;

  const maxMethodAmount = Math.max(...byMethod.map((x) => x.amount), 1);

  // Filtered transactions
  const q = payQ.toLowerCase();
  const filteredTxns = transactions.filter((t) => {
    const matchesQ = !q || (t.id + t.outlet + t.method).toLowerCase().includes(q);
    const matchesM = !payM || t.method === payM;
    const matchesS = !payS || t.st === payS;
    return matchesQ && matchesM && matchesS;
  });

  // Quick Charge state
  const [quickAmount, setQuickAmount] = useState(2500);
  const [quickOutlet, setQuickOutlet] = useState('Silk Route');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Financial KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-bcc-surface border border-bcc-line shadow-sm">
          <div className="text-xs text-bcc-muted">Gross collected today</div>
          <div className="text-2xl font-bold font-serif text-bcc-text mt-1">{money(gross)}</div>
        </div>

        <div className="p-4 rounded-xl bg-bcc-surface border border-bcc-line shadow-sm">
          <div className="text-xs text-bcc-muted">Gateway fees (illustrative)</div>
          <div className="text-2xl font-bold font-serif text-amber-600 mt-1">
            {money(totalFee)}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-bcc-surface border border-bcc-line shadow-sm">
          <div className="text-xs text-bcc-muted">Net settlement</div>
          <div className="text-2xl font-bold font-serif text-emerald-600 dark:text-emerald-400 mt-1">
            {money(netSettlement)}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-bcc-surface border border-bcc-line shadow-sm">
          <div className="text-xs text-bcc-muted">Failed or pending</div>
          <div className="text-2xl font-bold font-serif text-bcc-red mt-1">
            {pendingOrFailed}
          </div>
        </div>
      </div>

      {/* Grid: Method breakdown & Gateways */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: By Payment Method */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-bcc-surface border border-bcc-line shadow-sm space-y-4">
          <h2 className="text-base font-bold font-serif">Revenue by Payment Method</h2>
          <div className="space-y-3">
            {byMethod.map((x) => (
              <div key={x.method} className="flex items-center gap-3 text-xs">
                <span className="w-28 text-bcc-muted font-medium">{x.method}</span>
                <div className="flex-1 h-3 rounded-full bg-bcc-surface2 overflow-hidden">
                  <div
                    className="h-full bg-bcc-text rounded-full transition-all duration-500"
                    style={{ width: `${(x.amount / maxMethodAmount) * 100}%` }}
                  />
                </div>
                <span className="w-20 text-right font-mono font-semibold">
                  {money(x.amount)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-bcc-line flex gap-3 items-center flex-wrap">
            <input
              type="number"
              value={quickAmount}
              onChange={(e) => setQuickAmount(parseFloat(e.target.value) || 0)}
              className="w-32 px-3 py-1.5 rounded-lg border border-bcc-line text-sm font-mono"
              placeholder="Amount"
            />
            <select
              value={quickOutlet}
              onChange={(e) => setQuickOutlet(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-bcc-line text-sm"
            >
              {OUTL.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <button
              onClick={() =>
                openModal('payment', {
                  amount: quickAmount,
                  title: `Payment: ${quickOutlet}`,
                  outlet: quickOutlet
                })
              }
              className="px-4 py-2 rounded-xl bg-bcc-btn text-white text-xs font-semibold hover:bg-bcc-btn-h shadow-md transition-colors"
            >
              Take Custom Payment
            </button>
          </div>
        </div>

        {/* Right: Connected Gateways Status */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-bcc-surface border border-bcc-line shadow-sm space-y-4">
          <h2 className="text-base font-bold font-serif">Payment Integrations</h2>
          <div className="space-y-2.5">
            {[
              ['bKash', 'Direct Merchant API', 'Live'],
              ['Nagad', 'Direct Merchant API', 'Live'],
              ['Alipay', 'Cross-border QR Gateway', 'Live'],
              ['WeChat Pay', 'Cross-border QR Gateway', 'Live'],
              ['Cards', 'Visa, Mastercard, UnionPay POS', 'Live']
            ].map(([gw, desc, st], i) => (
              <div
                key={i}
                className="p-3 rounded-xl border border-bcc-line bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div>
                    <b className="text-xs text-bcc-text font-serif">{gw}</b>
                    <div className="text-[11px] text-bcc-muted">{desc}</div>
                  </div>
                </div>
                <Pill text={st} variant="ok" />
              </div>
            ))}
          </div>
          <p className="text-[11px] text-bcc-muted leading-relaxed">
            Card details and digital wallets are processed securely and tokens are never stored locally.
          </p>
        </div>
      </div>

      {/* Transactions Register */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-serif">Transactions Audit Log</h2>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          <input
            type="search"
            value={payQ}
            onChange={(e) => setPayQ(e.target.value)}
            placeholder="Search reference, outlet or method..."
            className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl border border-bcc-line bg-bcc-surface text-sm"
          />

          <select
            value={payM}
            onChange={(e) => setPayM(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-bcc-line bg-bcc-surface text-sm font-medium"
          >
            <option value="">All methods</option>
            {METH.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={payS}
            onChange={(e) => setPayS(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-bcc-line bg-bcc-surface text-sm font-medium"
          >
            <option value="">All statuses</option>
            {['Success', 'Pending', 'Failed', 'Refunded'].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-bcc-surface border border-bcc-line rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="custom-table">
              <thead>
                <tr className="bg-black/5 dark:bg-white/5 border-b border-bcc-line">
                  <th>Time</th>
                  <th>Reference</th>
                  <th>Outlet</th>
                  <th>Method</th>
                  <th className="text-right">Amount</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTxns.map((t) => {
                  const statusMeta = {
                    Success: 'ok',
                    Pending: 'warn',
                    Failed: 'bad',
                    Refunded: 'info'
                  }[t.st] || 'muted';

                  return (
                    <tr key={t.id}>
                      <td className="font-mono text-xs text-bcc-muted">{hhmm(t.t)}</td>
                      <td className="font-mono text-xs font-bold text-bcc-text">{t.id}</td>
                      <td className="text-xs">{t.outlet}</td>
                      <td className="text-xs font-medium">{t.method}</td>
                      <td className="text-right font-mono text-xs font-bold text-bcc-text">
                        {money(t.amount)}
                      </td>
                      <td>
                        <Pill text={t.st} variant={statusMeta} />
                      </td>
                      <td className="text-right space-x-2 whitespace-nowrap">
                        {t.st === 'Success' && (
                          <button
                            onClick={() => refundTxn(t.id)}
                            className="px-2.5 py-1 text-xs rounded-lg border border-bcc-line hover:bg-black/5 dark:hover:bg-white/5 font-medium transition-colors"
                          >
                            Refund
                          </button>
                        )}
                        {t.st === 'Pending' && (
                          <button
                            onClick={() => settleTxn(t.id)}
                            className="px-2.5 py-1 text-xs rounded-lg bg-bcc-ok text-white font-semibold hover:opacity-90 transition-colors shadow-sm"
                          >
                            Mark Settled
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {filteredTxns.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-bcc-muted text-sm">
                      No transactions match the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

