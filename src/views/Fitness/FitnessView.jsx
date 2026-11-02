import React from 'react';
import { useApp } from '../../context/AppContext';
import { FACILITIES } from '../../data/initialData';
import { SLOT_T, SLOT_F } from '../../data/initialData';
import Pill from '../../components/common/Pill';

export default function FitnessView() {
  const { classesList, slots, bookClass, toggleSlot, scanCard, scanResult } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Facility Meters & Classes */}
        <div className="lg:col-span-7 space-y-6">
          {/* Inside the club capacity */}
          <div className="p-5 rounded-2xl bg-bcc-surface border border-bcc-line shadow-sm space-y-4">
            <h2 className="text-base font-bold font-serif">Inside the Club Now</h2>
            <div className="space-y-3">
              {FACILITIES.map(([name, zh, cap, curr], idx) => {
                const ratio = curr / cap;
                const isCrowded = ratio > 0.8;

                return (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <span className="w-36 text-bcc-text font-medium truncate">
                      {name} <span className="font-serif text-bcc-muted">{zh}</span>
                    </span>
                    <div className="flex-1 h-3 rounded-full bg-bcc-surface2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCrowded ? 'bg-bcc-bad' : 'bg-bcc-ok'
                        }`}
                        style={{ width: `${ratio * 100}%` }}
                      />
                    </div>
                    <span className="w-16 text-right font-mono font-semibold text-bcc-muted">
                      {curr} / {cap}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Today's Classes */}
          <div className="p-5 rounded-2xl bg-bcc-surface border border-bcc-line shadow-sm space-y-3">
            <h2 className="text-base font-bold font-serif">Today’s Classes</h2>
            <div className="overflow-x-auto">
              <table className="custom-table">
                <tbody>
                  {classesList.map((c, i) => {
                    const isFull = c[4] >= c[3];

                    return (
                      <tr key={i}>
                        <td className="font-mono text-xs font-semibold text-bcc-muted w-16">
                          {c[0]}
                        </td>
                        <td>
                          <b className="font-serif text-bcc-text text-sm">{c[1]}</b>
                          {c[2] && (
                            <span className="text-xs text-bcc-muted font-serif ml-2">{c[2]}</span>
                          )}
                        </td>
                        <td className="font-mono text-xs text-bcc-muted">
                          {c[4]} / {c[3]}
                        </td>
                        <td className="text-right">
                          <button
                            onClick={() => bookClass(i)}
                            disabled={isFull}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold shadow-sm transition-colors ${
                              isFull
                                ? 'bg-black/5 dark:bg-white/5 text-bcc-muted cursor-not-allowed'
                                : 'bg-bcc-btn text-white hover:bg-bcc-btn-h'
                            }`}
                          >
                            {isFull ? 'Full' : 'Add member'}
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

        {/* Right Column: Gate Check-in Card Scanner */}
        <div className="lg:col-span-5">
          <div className="p-5 rounded-2xl bg-bcc-surface border border-bcc-line shadow-sm space-y-4">
            <h2 className="text-base font-bold font-serif">Gate Check-in Terminal</h2>
            <p className="text-xs text-bcc-muted leading-relaxed">
              Members tap their digital RFID membership card or display QR code at the turnstile gate.
              Press below to simulate an incoming member scan.
            </p>

            <button
              onClick={scanCard}
              className="w-full py-2.5 px-4 rounded-xl bg-bcc-btn text-white text-sm font-semibold hover:bg-bcc-btn-h shadow-md transition-colors"
            >
              Simulate Card Tap
            </button>

            {scanResult && (
              <div
                className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in ${
                  scanResult.ok
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="text-sm font-serif">{scanResult.member.name}</span>
                  <Pill
                    text={scanResult.status}
                    variant={scanResult.ok ? 'ok' : 'bad'}
                  />
                </div>
                <div>{scanResult.message}</div>
                <div className="font-mono text-[11px] opacity-80 pt-1 border-t border-black/10 dark:border-white/10">
                  ID: {scanResult.member.id} · Tier: {scanResult.member.tier}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Court and Table Bookings Grid */}
      <div className="p-5 rounded-2xl bg-bcc-surface border border-bcc-line shadow-sm space-y-4">
        <h2 className="text-base font-bold font-serif">Court & Table Bookings Today</h2>
        <div className="overflow-x-auto">
          <table className="custom-table">
            <thead>
              <tr className="bg-black/5 dark:bg-white/5 border-b border-bcc-line">
                <th className="w-40">Facility</th>
                {SLOT_T.map((t) => (
                  <th key={t} className="text-center">
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SLOT_F.map((facility) => (
                <tr key={facility}>
                  <td className="font-serif font-bold text-xs">{facility}</td>
                  {SLOT_T.map((time) => {
                    const isBooked = slots[facility + time];

                    return (
                      <td key={time} className="text-center p-2">
                        <button
                          onClick={() => toggleSlot(facility + time)}
                          className={`w-full py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                            isBooked
                              ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30'
                              : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
                          }`}
                        >
                          {isBooked ? 'Booked' : 'Free'}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

