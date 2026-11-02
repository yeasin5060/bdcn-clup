import React from 'react';
import { useApp } from '../../context/AppContext';
import { money } from '../../utils/formatters';

export default function EventDetailModal() {
  const { modal, toggleEventChecklist, registerEvent } = useApp();
  const event = modal.data;

  if (!event) return null;

  const completedCount = event.chk?.filter((c) => c.d).length || 0;
  const totalCount = event.chk?.length || 1;
  const progressPercent = Math.round((completedCount / totalCount) * 100);
  const isFull = event.reg >= event.cap;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold font-serif">{event.n}</h3>
        <p className="text-xs text-bcc-muted mt-1">
          {event.d} at {event.t} · {event.venue}
        </p>
      </div>

      <div className="flex justify-between items-center p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-bcc-line">
        <div>
          <div className="text-xs text-bcc-muted">Registrations</div>
          <div className="text-sm font-bold mt-0.5">
            {event.reg} / {event.cap}
            <span className="text-xs font-normal text-bcc-muted ml-1.5">
              ({event.cap - event.reg} seats remaining)
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-bcc-muted">Ticket Fee</div>
          <div className="text-sm font-bold text-bcc-red mt-0.5">
            {event.price ? money(event.price) : 'Free for members'}
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
          <span>Event Readiness Checklist</span>
          <span className="text-bcc-muted">{progressPercent}% complete</span>
        </div>
        <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden mb-3">
          <div
            className="h-full bg-emerald-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {event.chk?.map((item, idx) => (
            <label
              key={idx}
              className={`flex items-start gap-2.5 p-2 rounded-lg text-xs cursor-pointer select-none transition-colors ${
                item.d
                  ? 'bg-emerald-500/10 text-emerald-900 dark:text-emerald-200'
                  : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 text-bcc-text'
              }`}
            >
              <input
                type="checkbox"
                checked={item.d}
                onChange={() => toggleEventChecklist(event.id, idx)}
                className="rounded border-bcc-line mt-0.5 text-emerald-600"
              />
              <span className={item.d ? 'line-through opacity-70' : ''}>{item.s}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={() => registerEvent(event.id)}
          disabled={isFull}
          className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold shadow-md transition-colors ${
            isFull
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-bcc-btn text-white hover:bg-bcc-btn-h'
          }`}
        >
          {isFull ? 'Event is at Full Capacity' : 'Register Member (+1 Seat)'}
        </button>
      </div>
    </div>
  );
}

