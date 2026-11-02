import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RS } from '../../data/constants';
import { money } from '../../utils/formatters';
import Pill from '../../components/common/Pill';

export default function StayView() {
  const {
    rooms,
    roomSelected,
    setRoomSelected,
    checkIn,
    arriveGuest,
    checkOut,
    markClean,
    setMaintenance
  } = useApp();

  const [guestName, setGuestName] = useState('');
  const [nights, setNights] = useState(2);

  // Status counts
  const statusCounts = {};
  rooms.forEach((r) => {
    statusCounts[r.st] = (statusCounts[r.st] || 0) + 1;
  });

  const selectedRoom = rooms.find((r) => r.no === roomSelected) || rooms[0];
  const arrivalsToday = rooms.filter((r) => r.st === 'res');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Status Counts */}
      <div className="flex gap-2 flex-wrap">
        {Object.keys(RS).map((k) => (
          <Pill
            key={k}
            text={`${statusCounts[k] || 0} ${RS[k][0].toLowerCase()}`}
            variant={RS[k][1]}
          />
        ))}
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Rooms Grid & Arrivals */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {rooms.map((r) => {
              const isSelected = roomSelected === r.no;
              const meta = RS[r.st];

              return (
                <button
                  key={r.no}
                  onClick={() => setRoomSelected(r.no)}
                  className={`p-3.5 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'ring-2 ring-bcc-gold shadow-md bg-bcc-surface'
                      : 'bg-bcc-surface hover:bg-black/5 dark:hover:bg-white/5 border-bcc-line'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <b className="text-lg font-serif font-bold text-bcc-text">
                      {r.no}
                    </b>
                    <Pill text={meta[0]} variant={meta[1]} />
                  </div>
                  <div className="text-xs text-bcc-muted mt-1">{r.type}</div>
                  <div className="text-[11px] text-bcc-text font-medium truncate mt-2">
                    {r.guest ? r.guest.split(',')[0] : '–'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Arrivals Today */}
          <div className="space-y-3">
            <h2 className="text-base font-bold font-serif">Arrivals Today</h2>
            {arrivalsToday.length > 0 ? (
              <div className="bg-bcc-surface border border-bcc-line rounded-2xl overflow-hidden shadow-sm">
                <table className="custom-table">
                  <tbody>
                    {arrivalsToday.map((r) => (
                      <tr key={r.no}>
                        <td>
                          <b className="font-serif text-bcc-text">
                            {r.guest.replace(' (arrives today)', '')}
                          </b>
                          <div className="text-xs text-bcc-muted">
                            Room {r.no} · {r.type}
                          </div>
                        </td>
                        <td className="text-xs">{r.nights} nights</td>
                        <td className="text-right">
                          <button
                            onClick={() => arriveGuest(r.no)}
                            className="px-3 py-1 rounded-lg bg-bcc-btn text-white text-xs font-semibold hover:bg-bcc-btn-h shadow-sm"
                          >
                            Check In
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-bcc-muted">No pending arrivals today.</p>
            )}
          </div>
        </div>

        {/* Right: Room Actions Drawer / Sidebar */}
        <div className="lg:col-span-4">
          <div className="p-5 rounded-2xl bg-bcc-surface border border-bcc-line shadow-sm space-y-4 sticky top-24">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold font-serif">Room {selectedRoom.no}</h3>
                <Pill text={RS[selectedRoom.st][0]} variant={RS[selectedRoom.st][1]} />
              </div>
              <p className="text-xs text-bcc-muted mt-1">
                {selectedRoom.type} · {money(selectedRoom.rate)} / night
              </p>
            </div>

            {/* If Vacant */}
            {selectedRoom.st === 'vac' && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-bcc-muted block mb-1">
                    Guest Name / Delegation
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Mr. Chen, Sinopec"
                    className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-bcc-muted block mb-1">
                    Nights
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={nights}
                    onChange={(e) => setNights(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm font-mono"
                  />
                </div>
                <button
                  onClick={() => {
                    checkIn(selectedRoom.no, guestName, nights);
                    setGuestName('');
                  }}
                  className="w-full py-2.5 rounded-xl bg-bcc-btn text-white text-sm font-semibold hover:bg-bcc-btn-h shadow-md transition-colors"
                >
                  Check In Guest
                </button>
                <button
                  onClick={() => setMaintenance(selectedRoom.no)}
                  className="w-full py-2 rounded-xl border border-bcc-line text-xs font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Block for Maintenance
                </button>
              </div>
            )}

            {/* If Occupied */}
            {selectedRoom.st === 'occ' && (
              <div className="space-y-4 pt-2">
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-bcc-line space-y-1 text-xs">
                  <div className="text-bcc-muted">Guest registered</div>
                  <div className="text-sm font-serif font-bold text-bcc-text">
                    {selectedRoom.guest}
                  </div>
                  <div className="text-bcc-muted">
                    Staying: <b>{selectedRoom.nights || 1} nights</b>
                  </div>
                  <div className="text-bcc-muted pt-1 border-t border-bcc-line flex justify-between">
                    <span>Room Folio Total:</span>
                    <b className="font-mono text-bcc-text">
                      {money((selectedRoom.nights || 1) * selectedRoom.rate)}
                    </b>
                  </div>
                </div>

                <button
                  onClick={() => checkOut(selectedRoom.no)}
                  className="w-full py-2.5 rounded-xl bg-bcc-btn text-white text-sm font-semibold hover:bg-bcc-btn-h shadow-md transition-colors"
                >
                  Check Out & Settle Folio
                </button>
              </div>
            )}

            {/* If Cleaning */}
            {selectedRoom.st === 'cln' && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-bcc-muted">
                  Housekeeping is servicing this room. Once inspected and replenished, mark it ready.
                </p>
                <button
                  onClick={() => markClean(selectedRoom.no)}
                  className="w-full py-2.5 rounded-xl bg-bcc-ok text-white text-sm font-semibold hover:opacity-90 shadow-md transition-colors"
                >
                  Mark Inspected & Vacant
                </button>
              </div>
            )}

            {/* If Reserved */}
            {selectedRoom.st === 'res' && (
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-xs">
                  <span className="text-blue-900 dark:text-blue-200">
                    Reserved for: <b>{selectedRoom.guest}</b> ({selectedRoom.nights} nights)
                  </span>
                </div>
                <button
                  onClick={() => arriveGuest(selectedRoom.no)}
                  className="w-full py-2.5 rounded-xl bg-bcc-btn text-white text-sm font-semibold hover:bg-bcc-btn-h shadow-md transition-colors"
                >
                  Check In Guest Now
                </button>
              </div>
            )}

            {/* If Maintenance */}
            {selectedRoom.st === 'mnt' && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-bcc-muted">
                  Room blocked for engineering repair or deep refurbishment.
                </p>
                <button
                  onClick={() => markClean(selectedRoom.no)}
                  className="w-full py-2.5 rounded-xl bg-bcc-ok text-white text-sm font-semibold hover:opacity-90 shadow-md transition-colors"
                >
                  Release to Vacant
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

