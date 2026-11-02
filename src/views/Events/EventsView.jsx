import React from 'react';
import { useApp } from '../../context/AppContext';
import { TPL } from '../../data/constants';
import { money } from '../../utils/formatters';
import { getPosterSvgString } from '../../utils/helpers';
import Pill from '../../components/common/Pill';

export default function EventsView() {
  const {
    events,
    evTab,
    setEvTab,
    tplCat,
    setTplCat,
    invitation,
    setInvitation,
    createEventFromTemplate,
    createEventFromInvitation,
    openModal,
    showToast
  } = useApp();

  const tabs = [
    { id: 'list', label: 'Upcoming Events' },
    { id: 'tpl', label: 'Activity Templates' },
    { id: 'inv', label: 'Friendship Invitation Studio' }
  ];

  const categories = ['', 'Cultural', 'Dining', 'Sports', 'Diplomatic'];
  const filteredTemplates = tplCat ? TPL.filter((t) => t.cat === tplCat) : TPL;

  const handleCopyInvitation = () => {
    const text = [
      invitation.zh,
      invitation.bn,
      invitation.en,
      '',
      `Date: ${invitation.date}, ${invitation.time}`,
      `Venue: ${invitation.venue}`,
      invitation.rsvp,
      '',
      'Bangladesh China Club Ltd · বাংলাদেশ–চীন মৈত্রী · 孟中友好'
    ].join('\n');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast('Invitation text copied to clipboard!');
    } else {
      showToast('Copied invitation text.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-bcc-line pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setEvTab(t.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              evTab === t.id
                ? 'bg-bcc-text text-bcc-bg shadow-sm'
                : 'text-bcc-muted hover:text-bcc-text hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Events List Tab */}
      {evTab === 'list' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold font-serif">Scheduled Club Events</h2>
            <button
              onClick={() => setEvTab('tpl')}
              className="px-4 py-2 rounded-xl bg-bcc-btn text-white text-xs font-semibold hover:bg-bcc-btn-h shadow-md transition-colors"
            >
              New Event from Template
            </button>
          </div>

          <div className="bg-bcc-surface border border-bcc-line rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="custom-table">
                <thead>
                  <tr className="bg-black/5 dark:bg-white/5 border-b border-bcc-line">
                    <th>Date & Time</th>
                    <th>Event</th>
                    <th>Category</th>
                    <th>Venue</th>
                    <th>Registrations</th>
                    <th className="text-right">Ticket</th>
                    <th className="text-right">Readiness</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e) => {
                    const doneCount = e.chk?.filter((c) => c.d).length || 0;
                    const totalTasks = e.chk?.length || 1;
                    const pct = Math.round((doneCount / totalTasks) * 100);

                    return (
                      <tr key={e.id}>
                        <td>
                          <div className="font-mono text-xs font-semibold text-bcc-text">
                            {e.d}
                          </div>
                          <div className="text-[11px] text-bcc-muted font-mono">{e.t}</div>
                        </td>
                        <td>
                          <b className="font-serif text-sm text-bcc-text block">{e.n}</b>
                        </td>
                        <td className="text-xs">
                          <span className="px-2 py-0.5 rounded-full bg-bcc-surface2 text-bcc-muted font-medium text-[11px]">
                            {e.cat}
                          </span>
                        </td>
                        <td className="text-xs text-bcc-muted">{e.venue}</td>
                        <td className="text-xs font-mono">
                          {e.reg} / {e.cap}
                        </td>
                        <td className="text-right font-mono text-xs font-semibold text-bcc-red">
                          {e.price ? money(e.price) : 'Free'}
                        </td>
                        <td className="text-right">
                          <Pill
                            text={`${pct}% ready`}
                            variant={pct > 70 ? 'ok' : pct > 30 ? 'warn' : 'muted'}
                          />
                        </td>
                        <td className="text-right">
                          <button
                            onClick={() => openModal('event_detail', e)}
                            className="px-3 py-1 rounded-lg border border-bcc-line hover:bg-black/5 dark:hover:bg-white/5 text-xs font-semibold transition-colors"
                          >
                            Checklist & Register
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

      {/* Activity Templates Tab */}
      {evTab === 'tpl' && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-xs font-semibold text-bcc-muted mr-1">Filter Category:</span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setTplCat(c)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors border ${
                  tplCat === c
                    ? 'border-bcc-text bg-bcc-text text-bcc-bg'
                    : 'border-bcc-line text-bcc-muted hover:text-bcc-text'
                }`}
              >
                {c || 'All Templates'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((t) => (
              <div
                key={t.id}
                className="p-5 rounded-2xl bg-bcc-surface border border-bcc-line shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{t.ic}</span>
                    <Pill text={t.cat} variant="info" />
                  </div>
                  <h3 className="text-lg font-bold font-serif mt-2 text-bcc-text">{t.n}</h3>
                  <div className="text-xs text-bcc-muted font-serif flex gap-2 mt-0.5">
                    {t.z && <span>{t.z}</span>}
                    {t.b && <span>· {t.b}</span>}
                  </div>

                  <div className="space-y-1 mt-4 text-xs text-bcc-muted border-t border-bcc-line pt-3">
                    <div>Venue: <b>{t.venue}</b></div>
                    <div>Capacity: <b>{t.cap} guests</b></div>
                    <div>Suggested Ticket: <b>{t.price ? money(t.price) : 'Complimentary'}</b></div>
                    <div>Estimated Budget: <b>{money(t.budget)}</b></div>
                  </div>
                </div>

                <button
                  onClick={() => createEventFromTemplate(t.id)}
                  className="w-full py-2 px-3 rounded-xl bg-bcc-btn text-white text-xs font-semibold hover:bg-bcc-btn-h shadow-sm transition-colors text-center"
                >
                  Create Event from Template
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Friendship Invitation Studio Tab */}
      {evTab === 'inv' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-6 p-5 rounded-2xl bg-bcc-surface border border-bcc-line shadow-sm space-y-4">
            <h2 className="text-base font-bold font-serif">Invitation Studio</h2>
            <p className="text-xs text-bcc-muted leading-relaxed">
              Design trilingual bilateral friendship posters for formal receptions, dinners, and cultural galas.
            </p>

            {/* Theme Selector */}
            <div>
              <label className="text-xs font-semibold text-bcc-muted block mb-1.5">
                Decorative Theme
              </label>
              <div className="flex gap-2">
                {[
                  { id: 'lantern', label: 'Lantern Festival' },
                  { id: 'bridge', label: 'Bridge of Friendship' },
                  { id: 'tea', label: 'Tea Ceremony' }
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setInvitation((prev) => ({ ...prev, theme: th.id }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      invitation.theme === th.id
                        ? 'border-bcc-text bg-bcc-text text-bcc-bg shadow-sm'
                        : 'border-bcc-line hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trilingual Title Inputs */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-bcc-muted block mb-1">
                  Title in English
                </label>
                <input
                  type="text"
                  value={invitation.en}
                  onChange={(e) => setInvitation((prev) => ({ ...prev, en: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-bcc-muted block mb-1">
                  Title in Chinese (中文)
                </label>
                <input
                  type="text"
                  value={invitation.zh}
                  onChange={(e) => setInvitation((prev) => ({ ...prev, zh: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm font-serif"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-bcc-muted block mb-1">
                  Title in Bengali (বাংলা)
                </label>
                <input
                  type="text"
                  value={invitation.bn}
                  onChange={(e) => setInvitation((prev) => ({ ...prev, bn: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm font-serif"
                />
              </div>
            </div>

            {/* Logistics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-bcc-muted block mb-1">Date</label>
                <input
                  type="text"
                  value={invitation.date}
                  onChange={(e) => setInvitation((prev) => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-bcc-muted block mb-1">Time</label>
                <input
                  type="text"
                  value={invitation.time}
                  onChange={(e) => setInvitation((prev) => ({ ...prev, time: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-bcc-muted block mb-1">Venue</label>
              <input
                type="text"
                value={invitation.venue}
                onChange={(e) => setInvitation((prev) => ({ ...prev, venue: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-bcc-muted block mb-1">RSVP Notice</label>
              <input
                type="text"
                value={invitation.rsvp}
                onChange={(e) => setInvitation((prev) => ({ ...prev, rsvp: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
              />
            </div>

            <div className="flex gap-2 pt-3">
              <button
                onClick={handleCopyInvitation}
                className="flex-1 py-2 px-3 rounded-xl bg-bcc-btn text-white text-xs font-semibold hover:bg-bcc-btn-h shadow-md transition-colors"
              >
                Copy Invitation Text
              </button>
              <button
                onClick={createEventFromInvitation}
                className="flex-1 py-2 px-3 rounded-xl border border-bcc-line text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Create Event from This
              </button>
            </div>
          </div>

          {/* Real-time SVG Poster Preview */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="text-xs font-bold uppercase tracking-wider text-bcc-muted mb-2">
              Live Scaled Poster Preview
            </div>
            <div
              className="w-full max-w-sm drop-shadow-2xl"
              dangerouslySetInnerHTML={{ __html: getPosterSvgString(invitation) }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

