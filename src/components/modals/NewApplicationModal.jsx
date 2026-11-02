import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TIER } from '../../data/constants';

export default function NewApplicationModal() {
  const { addApp, closeModal } = useApp();

  const [name, setName] = useState('');
  const [tier, setTier] = useState('Associate');
  const [prop, setProp] = useState('');
  const [sec, setSec] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Applicant name is required.');
      return;
    }
    addApp({
      name: name.trim(),
      tier,
      prop: prop.trim() || 'General committee',
      sec: sec.trim() || 'General committee',
      note: note.trim() || 'Application submitted via reception'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold font-serif mb-1">New Membership Application</h3>
      <p className="text-xs text-bcc-muted">
        Candidate details will be tabled at the upcoming Executive Committee meeting.
      </p>

      {error && <div className="text-xs text-rose-600 font-semibold">{error}</div>}

      <div>
        <label className="text-xs font-semibold text-bcc-muted block mb-1">
          Full Name of Applicant
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          placeholder="e.g. Tariq Mansoor"
          className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-bcc-muted block mb-1">
            Membership Tier
          </label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
          >
            {Object.keys(TIER).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-bcc-muted block mb-1">
            Profession / Note
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Architect, Gulshan"
            className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-bcc-muted block mb-1">
            Proposer (Active Member)
          </label>
          <input
            type="text"
            value={prop}
            onChange={(e) => setProp(e.target.value)}
            placeholder="e.g. Anika Rahman"
            className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-bcc-muted block mb-1">
            Seconder (Active Member)
          </label>
          <input
            type="text"
            value={sec}
            onChange={(e) => setSec(e.target.value)}
            placeholder="e.g. Farhan Chowdhury"
            className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-sm"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-3">
        <button
          type="button"
          onClick={closeModal}
          className="flex-1 py-2 px-4 rounded-lg border border-bcc-line text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-2 px-4 rounded-lg bg-bcc-btn text-white text-sm font-semibold hover:bg-bcc-btn-h shadow-md"
        >
          Submit Application
        </button>
      </div>
    </form>
  );
}

