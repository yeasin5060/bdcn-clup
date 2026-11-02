import React from 'react';
import { useApp } from '../../context/AppContext';
import { OUT } from '../../data/constants';
import { OUTLET_MENUS, MENU_ITEMS } from '../../data/initialData';
import { money } from '../../utils/formatters';
import { calcBill } from '../../utils/helpers';
import Pill from '../../components/common/Pill';

export default function PosView() {
  const {
    outlet,
    setOutlet,
    tables,
    selectedTable,
    setSelectedTable,
    members,
    addOrderItem,
    changeOrderQty,
    sendToKitchen,
    markDishServed,
    requestBill,
    payTable,
    setTableMember,
    setTablePermit
  } = useApp();

  const currentOutletTables = tables[outlet] || [];
  const currentTableId = selectedTable[outlet] || currentOutletTables[0]?.id || 'T1';
  const table = currentOutletTables.find((t) => t.id === currentTableId) || currentOutletTables[0];
  const menu = OUTLET_MENUS[outlet] || [];

  // Group menu by categories
  const categories = [];
  menu.forEach((i) => {
    if (!categories.includes(i.c)) categories.push(i.c);
  });

  const bill = calcBill(table);

  // Kitchen tickets (dishes ready or cooking across tables in this outlet)
  const kitchenTickets = [];
  currentOutletTables.forEach((t) => {
    t.lines.forEach((l) => {
      if (l.s === 'cook' || l.s === 'ready') {
        kitchenTickets.push({ tableId: t.id, line: l });
      }
    });
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Outlet Selector Chips */}
      <div className="flex gap-2 border-b border-bcc-line pb-3">
        {Object.keys(OUT).map((k) => (
          <button
            key={k}
            onClick={() => setOutlet(k)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              outlet === k
                ? 'bg-bcc-text text-bcc-bg shadow-sm'
                : 'text-bcc-muted hover:text-bcc-text hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <span>{OUT[k].n}</span>
            <span className="font-serif opacity-70 text-xs">{OUT[k].z}</span>
          </button>
        ))}
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Table Grid & Kitchen Tickets */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h2 className="text-sm font-bold font-serif uppercase tracking-wider text-bcc-muted mb-3">
              Tables Floor Plan
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {currentOutletTables.map((t) => {
                const isSelected = t.id === currentTableId;
                const statusMeta = {
                  free: ['Free', 'ok'],
                  open: ['Open', 'warn'],
                  bill: ['Bill', 'bad']
                }[t.st] || ['Free', 'ok'];

                return (
                  <button
                    key={t.id}
                    onClick={() =>
                      setSelectedTable((prev) => ({ ...prev, [outlet]: t.id }))
                    }
                    className={`p-3 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? 'ring-2 ring-bcc-gold shadow-md bg-bcc-surface'
                        : 'bg-bcc-surface hover:bg-black/5 dark:hover:bg-white/5 border-bcc-line'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <b className="text-base font-serif font-bold text-bcc-text">{t.id}</b>
                      <Pill text={statusMeta[0]} variant={statusMeta[1]} />
                    </div>
                    <div className="text-[11px] text-bcc-muted mt-1">{t.cap} seats</div>
                    <div className="text-xs font-mono font-semibold text-bcc-text mt-2">
                      {t.lines.length ? money(calcBill(t).g) : '–'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kitchen Expediter Tickets */}
          <div className="space-y-3">
            <h2 className="text-base font-bold font-serif">Kitchen / Bar Expediter</h2>
            {kitchenTickets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {kitchenTickets.map((tk, idx) => {
                  const item = MENU_ITEMS[tk.line.k];
                  const isReady = tk.line.s === 'ready';

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                        isReady
                          ? 'bg-emerald-500/10 border-emerald-500/30'
                          : 'bg-black/5 dark:bg-white/5 border-bcc-line'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold font-serif">
                          Table {tk.tableId} · {tk.line.q}× {item?.n}
                        </div>
                        <div className="text-[11px] text-bcc-muted mt-0.5">
                          {isReady ? 'Ready for pickup' : 'Order in preparation'}
                        </div>
                      </div>

                      {isReady ? (
                        <button
                          onClick={() => markDishServed(outlet, tk.tableId, tk.line.k)}
                          className="px-2.5 py-1 rounded-lg bg-bcc-ok text-white text-xs font-semibold hover:opacity-90 shadow-sm"
                        >
                          Mark Served
                        </button>
                      ) : (
                        <Pill text="Cooking" variant="warn" />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-bcc-muted">
                No orders currently in the kitchen. Place an order to dispatch tickets.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Order & Billing Panel */}
        <div className="lg:col-span-5">
          {table && (
            <div className="p-5 rounded-2xl bg-bcc-surface border border-bcc-line shadow-sm space-y-4 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-bcc-line">
                <h3 className="text-xl font-bold font-serif">Table {table.id}</h3>
                <Pill
                  text={table.st === 'free' ? 'Free' : table.st === 'open' ? 'Open' : 'Bill requested'}
                  variant={table.st === 'free' ? 'ok' : table.st === 'open' ? 'warn' : 'bad'}
                />
              </div>

              {/* Member Selector */}
              <div>
                <label className="text-xs text-bcc-muted block mb-1">
                  Member on Table (optional for account charge)
                </label>
                <select
                  value={table.member || ''}
                  onChange={(e) => setTableMember(outlet, table.id, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-bcc-line bg-bcc-surface text-xs"
                >
                  <option value="">Walk-in Guest</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.tier})
                    </option>
                  ))}
                </select>
              </div>

              {/* Bar License Check */}
              {outlet === 'bar' && (
                <label className="flex items-center gap-2 text-xs text-bcc-muted cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={table.permit}
                    onChange={(e) => setTablePermit(outlet, table.id, e.target.checked)}
                    className="rounded border-bcc-line text-emerald-600"
                  />
                  Licence or permit verified for alcoholic drinks
                </label>
              )}

              {/* Menu Categories & Items */}
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {categories.map((cat) => (
                  <div key={cat}>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-bcc-muted mb-1.5">
                      {cat}
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {menu
                        .filter((i) => i.c === cat)
                        .map((item) => (
                          <button
                            key={item.k}
                            onClick={() => addOrderItem(outlet, table.id, item.k)}
                            className="p-2 rounded-lg border border-bcc-line bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/5 dark:hover:bg-white/5 text-left text-xs transition-colors"
                          >
                            <div className="font-medium truncate text-bcc-text">
                              {item.n}
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-bcc-muted mt-0.5">
                              {item.z && <span className="font-serif">{item.z}</span>}
                              <b className="font-mono">{money(item.p)}</b>
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Current Order Lines */}
              <div className="pt-3 border-t border-bcc-line space-y-2">
                <div className="text-xs font-bold font-serif uppercase tracking-wider text-bcc-muted">
                  Order Summary
                </div>

                {table.lines.length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {table.lines.map((line, idx) => {
                      const item = MENU_ITEMS[line.k];
                      const statusMeta = {
                        new: ['Not sent', 'muted'],
                        cook: ['Cooking', 'warn'],
                        ready: ['Ready', 'ok'],
                        served: ['Served', 'info']
                      }[line.s];

                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs py-1.5 border-b border-bcc-line/40"
                        >
                          <div>
                            <div className="font-medium text-bcc-text">{item?.n}</div>
                            <Pill text={statusMeta[0]} variant={statusMeta[1]} className="mt-0.5" />
                          </div>

                          <div className="flex items-center gap-3">
                            {line.s === 'new' ? (
                              <div className="flex items-center gap-1 border border-bcc-line rounded-lg bg-bcc-surface overflow-hidden">
                                <button
                                  onClick={() => changeOrderQty(outlet, table.id, line.k, -1)}
                                  className="px-2 py-0.5 hover:bg-black/10 text-xs font-bold"
                                >
                                  −
                                </button>
                                <span className="px-2 text-xs font-mono font-bold">{line.q}</span>
                                <button
                                  onClick={() => changeOrderQty(outlet, table.id, line.k, 1)}
                                  className="px-2 py-0.5 hover:bg-black/10 text-xs font-bold"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs font-mono text-bcc-muted">{line.q}×</span>
                            )}

                            <span className="font-mono font-semibold w-16 text-right">
                              {money((item?.p || 0) * line.q)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-bcc-muted py-2">
                    Tap any dish above to add items to this table order.
                  </p>
                )}
              </div>

              {/* Billing Totals */}
              <div className="pt-2 border-t border-bcc-line space-y-1 text-xs">
                <div className="flex justify-between text-bcc-muted">
                  <span>Subtotal</span>
                  <span className="font-mono">{money(bill.s)}</span>
                </div>
                <div className="flex justify-between text-bcc-muted">
                  <span>Service charge (10%)</span>
                  <span className="font-mono">{money(bill.sc)}</span>
                </div>
                <div className="flex justify-between text-bcc-muted">
                  <span>VAT (15%)</span>
                  <span className="font-mono">{money(bill.v)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-1 border-t border-bcc-line text-bcc-text">
                  <span>Total</span>
                  <span className="font-mono font-bold text-bcc-red">{money(bill.g)}</span>
                </div>
              </div>

              {/* POS Actions */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <button
                  onClick={() => sendToKitchen(outlet, table.id)}
                  disabled={!table.lines.some((l) => l.s === 'new')}
                  className="py-2 px-2 text-xs font-semibold rounded-xl border border-bcc-line hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-center"
                >
                  Send Kitchen
                </button>
                <button
                  onClick={() => requestBill(outlet, table.id)}
                  disabled={table.lines.length === 0 || table.st === 'bill'}
                  className="py-2 px-2 text-xs font-semibold rounded-xl border border-bcc-line hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-center"
                >
                  Request Bill
                </button>
                <button
                  onClick={() => payTable(outlet, table.id)}
                  disabled={table.lines.length === 0}
                  className="py-2 px-2 text-xs font-semibold rounded-xl bg-bcc-btn text-white hover:bg-bcc-btn-h disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-colors text-center"
                >
                  Take Payment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

