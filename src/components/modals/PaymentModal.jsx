import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { METH } from '../../data/constants';
import { money, qrSVG } from '../../utils/formatters';
import { mStatus } from '../../utils/helpers';

export default function PaymentModal() {
  const { modal, closeModal, members, addTxn, showToast } = useApp();
  const { data } = modal;

  const [method, setMethod] = useState('bKash');
  const [step, setStep] = useState('form');
  const [failSimulate, setFailSimulate] = useState(false);
  const [memberId, setMemberId] = useState(data?.mem || (members[0]?.id || ''));
  const [cashAmount, setCashAmount] = useState(Math.ceil((data?.amount || 0) / 500) * 500);
  const [errorText, setErrorText] = useState('');

  if (!data) return null;

  const { amount, title, outlet, onSuccess } = data;

  const handleConfirm = () => {
    setStep('proc');

    setTimeout(() => {
      let failureReason = '';
      if (failSimulate) {
        failureReason =
          method === 'Card'
            ? 'The card issuer declined the payment (code 05: Do Not Honor).'
            : 'The wallet did not authorize the transaction (error 402).';
      }

      if (!failureReason && method === 'Member account') {
        const m = members.find((x) => x.id === memberId);
        if (!m || mStatus(m) !== 'Active') {
          failureReason = 'This member is overdue or suspended and cannot charge to their house account.';
        }
      }

      if (failureReason) {
        setErrorText(failureReason);
        setStep('fail');
        addTxn({ outlet: outlet || 'General', method, amount, st: 'Failed' });
      } else {
        setStep('ok');
        addTxn({ outlet: outlet || 'General', method, amount, st: 'Success' });
        if (onSuccess) onSuccess();
      }
    }, 1200);
  };

  return (
    <div>
      <h3 className="text-xl font-bold font-serif mb-1">{title || 'Take Payment'}</h3>
      <div className="text-3xl font-bold font-serif text-bcc-red mb-4">
        {money(amount)}
      </div>

      {step === 'form' && (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-bcc-muted uppercase tracking-wider block mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="group" aria-label="Payment method">
              {METH.map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all text-center ${
                    method === m
                      ? 'border-bcc-text bg-bcc-text text-bcc-bg shadow-sm'
                      : 'border-bcc-line bg-bcc-surface text-bcc-text hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Method specifics */}
          <div className="p-3.5 bg-black/5 dark:bg-white/5 rounded-xl border border-bcc-line">
            {(method === 'bKash' || method === 'Nagad') && (
              <div>
                <label className="text-xs text-bcc-muted block mb-1">
                  {method} Wallet / Merchant Number
                </label>
                <input
                  type="text"
                  defaultValue="01711 000000"
                  className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm font-mono"
                />
                <p className="text-[11px] text-bcc-muted mt-1.5">
                  Simulating merchant direct push prompt.
                </p>
              </div>
            )}

            {(method === 'Alipay' || method === 'WeChat Pay') && (
              <div className="text-center py-2">
                <div
                  className="inline-block p-3 bg-white rounded-xl shadow-md border border-gray-200"
                  dangerouslySetInnerHTML={{
                    __html: qrSVG(method === 'Alipay' ? 7 : 11, 160)
                  }}
                />
                <p className="text-xs text-bcc-muted mt-2">
                  Scan QR with <b>{method}</b> app ({method === 'Alipay' ? '支付宝' : '微信支付'})
                </p>
              </div>
            )}

            {method === 'Card' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-bcc-muted block mb-1">Card Number</label>
                  <input
                    type="text"
                    defaultValue="4242 •••• •••• 4242"
                    className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-bcc-muted block mb-1">Expiry</label>
                    <input
                      type="text"
                      defaultValue="12/28"
                      className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-bcc-muted block mb-1">CVV</label>
                    <input
                      type="text"
                      defaultValue="•••"
                      className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {method === 'Member account' && (
              <div>
                <label className="text-xs text-bcc-muted block mb-1">Charge to Member</label>
                <select
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.tier} · {m.id})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-bcc-muted mt-1.5">
                  Deducts from account receivables. Member must have active status.
                </p>
              </div>
            )}

            {method === 'Cash' && (
              <div>
                <label className="text-xs text-bcc-muted block mb-1">Cash Received</label>
                <input
                  type="number"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm font-mono"
                />
                <div className="text-xs text-bcc-muted mt-2">
                  Change due: <b className="text-emerald-600 font-bold">{money(Math.max(0, cashAmount - amount))}</b>
                </div>
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 text-xs text-bcc-muted cursor-pointer select-none">
            <input
              type="checkbox"
              checked={failSimulate}
              onChange={(e) => setFailSimulate(e.target.checked)}
              className="rounded border-bcc-line"
            />
            Simulate a declined / network failure response
          </label>

          <div className="flex gap-2 pt-2">
            <button
              onClick={closeModal}
              className="flex-1 px-4 py-2 rounded-lg border border-bcc-line text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 rounded-lg bg-bcc-btn text-white text-sm font-semibold hover:bg-bcc-btn-h shadow-md"
            >
              Confirm {money(amount)}
            </button>
          </div>
        </div>
      )}

      {step === 'proc' && (
        <div className="py-12 text-center space-y-4">
          <div className="w-12 h-12 border-4 border-bcc-red border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-bcc-muted">
            Connecting to {method} merchant gateway...
          </p>
        </div>
      )}

      {step === 'ok' && (
        <div className="py-6 text-center space-y-3 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-3xl">
            ✓
          </div>
          <h4 className="text-xl font-bold font-serif text-emerald-600 dark:text-emerald-400">
            Payment Completed
          </h4>
          <p className="text-sm text-bcc-muted">
            {money(amount)} successfully charged via <b>{method}</b>.
          </p>
          <div className="pt-4">
            <button
              onClick={closeModal}
              className="w-full px-4 py-2.5 rounded-lg bg-bcc-ok text-white text-sm font-semibold hover:opacity-90 shadow-md"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {step === 'fail' && (
        <div className="py-6 text-center space-y-3 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto text-3xl">
            ✕
          </div>
          <h4 className="text-xl font-bold font-serif text-rose-600 dark:text-rose-400">
            Payment Not Completed
          </h4>
          <p className="text-sm text-bcc-muted max-w-sm mx-auto">{errorText}</p>
          <div className="flex gap-2 pt-4">
            <button
              onClick={() => setStep('form')}
              className="flex-1 px-4 py-2 rounded-lg border border-bcc-line text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5"
            >
              Try Again
            </button>
            <button
              onClick={closeModal}
              className="flex-1 px-4 py-2 rounded-lg bg-bcc-muted text-white text-sm font-semibold hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

