import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ROLES,
  ROLE_NAMES,
  TRANSLATIONS,
  DEPTS,
  OUT,
  OUTL,
  METH,
  FEE,
  TIER,
  TPL,
  FLOW,
  ERP_MD
} from '../data/constants';
import {
  getInitialMembers,
  getInitialApps,
  getInitialStaff,
  getInitialGrid,
  getInitialRooms,
  getInitialTables,
  getInitialTransactions,
  getInitialEvents,
  CLASSES,
  FACILITIES,
  getInitialSlots,
  MENU_ITEMS,
  ERP_TASKS,
  ERP_TASK_STATUSES
} from '../data/initialData';
import { mStatus, mDue, calcBill } from '../utils/helpers';
import { money, makeRandom } from '../utils/formatters';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & Localization
  const [role, setRoleState] = useState('admin');
  const [lang, setLang] = useState('en');
  const [view, setViewState] = useState('dash');

  // Core Data
  const [members, setMembers] = useState(getInitialMembers);
  const [apps, setApps] = useState(getInitialApps);
  const [staff, setStaff] = useState(getInitialStaff);
  const [grid, setGrid] = useState(getInitialGrid);
  const [payrollDone, setPayrollDone] = useState(false);
  const [rooms, setRooms] = useState(getInitialRooms);
  const [roomSelected, setRoomSelected] = useState(101);
  const [tables, setTables] = useState(getInitialTables);
  const [outlet, setOutlet] = useState('silk');
  const [selectedTable, setSelectedTable] = useState({ silk: 'T2', bar: 'B1', cafe: 'C1' });
  const [transactions, setTransactions] = useState(() => getInitialTransactions());
  const [events, setEvents] = useState(getInitialEvents);
  const [classesList, setClassesList] = useState(CLASSES);
  const [slots, setSlots] = useState(getInitialSlots);
  const [scanResult, setScanResult] = useState(null);

  // Invitation Studio state
  const [invitation, setInvitation] = useState({
    theme: 'lantern',
    en: 'Friendship Tea Evening',
    bn: 'বন্ধুত্বের চা-সন্ধ্যা',
    zh: '友谊茶会',
    date: '31 October 2026',
    time: '17:00 – 20:00',
    venue: 'Tea Garden & Terrace',
    rsvp: 'RSVP by 28 Oct · Reception desk / bcc@club.bd'
  });

  // ERP State
  const [erpSubtabs, setErpSubtabs] = useState({
    acc: 0,
    inv: 0,
    mnt: 0,
    sfm: 0,
    reg: 0,
    smp: 0,
    mis: 0,
    hrm: 0,
    mmg: 0,
    res: 0,
    hot: 0,
    app: 0
  });
  const [erpTasks, setErpTasks] = useState(ERP_TASKS);

  // Filters & Sub-views
  const [memQ, setMemQ] = useState('');
  const [memT, setMemT] = useState('');
  const [memS, setMemS] = useState('');
  const [empTab, setEmpTab] = useState('dir');
  const [empQ, setEmpQ] = useState('');
  const [empD, setEmpD] = useState('');
  const [payQ, setPayQ] = useState('');
  const [payM, setPayM] = useState('');
  const [payS, setPayS] = useState('');
  const [evTab, setEvTab] = useState('list');
  const [tplCat, setTplCat] = useState('');
  const [evSel, setEvSel] = useState(null);

  // Reports
  const [repType, setRepType] = useState('revenue');
  const [repRange, setRepRange] = useState('today');
  const [repBusy, setRepBusy] = useState(false);
  const [repDone, setRepDone] = useState(false);

  // Toast System
  const [toast, setToast] = useState({ message: '', visible: false });
  const showToast = useCallback((msg) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  }, []);

  // Modal System
  const [modal, setModal] = useState({ isOpen: false, type: null, data: null });
  const openModal = useCallback((type, data = null) => {
    setModal({ isOpen: true, type, data });
  }, []);
  const closeModal = useCallback(() => {
    setModal({ isOpen: false, type: null, data: null });
  }, []);

  // Authentication & Session
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState(null);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    showToast(lang === 'bn' ? 'লগ আউট সম্পন্ন হয়েছে' : 'Logged out from BCC Club OS');
  }, [lang, showToast]);

  const login = useCallback(
    (chosenRole = 'admin') => {
      setRoleState(chosenRole);
      setIsLoggedIn(true);
      showToast(
        lang === 'bn'
          ? `স্বাগতম! ${ROLE_NAMES[chosenRole] || chosenRole} হিসেবে লগ ইন করা হয়েছে`
          : `Signed in as ${ROLE_NAMES[chosenRole] || chosenRole}`
      );
    },
    [lang, showToast]
  );

  const openChat = useCallback((query = null) => {
    setIsChatOpen(true);
    if (query) setChatInitialQuery(query);
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  // Safe Navigation based on role
  const setRole = (newRole) => {
    setRoleState(newRole);
    if (!ROLES[newRole]?.includes(view)) {
      setViewState('dash');
    }
  };

  const setView = (newView) => {
    if (ROLES[role]?.includes(newView)) {
      setViewState(newView);
      window.scrollTo(0, 0);
    }
  };

  // Transaction Dispatcher
  const addTxn = useCallback(
    ({ outlet, method, amount, st = 'Success' }) => {
      const newTxn = {
        id: 'TX-' + (48300 + transactions.length + 1),
        t: new Date(),
        outlet,
        method,
        amount,
        st
      };
      setTransactions((prev) => [newTxn, ...prev]);
      return newTxn;
    },
    [transactions.length]
  );

  // Live Activity Simulation on Dashboard
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.hidden || view !== 'dash' || modal.isOpen) return;
      const randomOutlet = OUTL[Math.floor(Math.random() * OUTL.length)];
      const randomMethod = METH[Math.floor(Math.random() * 5)];
      const rg = {
        'Silk Route': [900, 6500],
        'Lantern Bar': [600, 3800],
        'Tea Garden': [250, 1600],
        'Guest house': [6500, 28000],
        'Membership dues': [1500, 5000],
        Fitness: [500, 2500],
        Events: [1500, 9000]
      };
      const bounds = rg[randomOutlet] || [500, 3000];
      const amount = Math.round((bounds[0] + Math.random() * (bounds[1] - bounds[0])) / 10) * 10;
      addTxn({ outlet: randomOutlet, method: randomMethod, amount, st: 'Success' });
    }, 14000);

    return () => clearInterval(interval);
  }, [view, modal.isOpen, addTxn]);

  // Actions: Members
  const collectDues = (member) => {
    openModal('payment', {
      amount: mDue(member),
      title: `Dues for ${member.name}`,
      outlet: 'Membership dues',
      mem: member.id,
      onSuccess: () => {
        setMembers((prev) =>
          prev.map((m) => (m.id === member.id ? { ...m, over: 0 } : m))
        );
        showToast(`Dues collected for ${member.name}`);
      }
    });
  };

  const approveApp = (appId) => {
    const app = apps.find((x) => x.id === appId);
    if (!app) return;
    setApps((prev) => prev.filter((x) => x.id !== appId));
    const newId = 'BCC-' + ('0000' + (100 + members.length * 37)).slice(-4);
    setMembers((prev) => [
      ...prev,
      {
        id: newId,
        name: app.name,
        alt: '',
        tier: app.tier,
        nat: 'BD',
        over: 0,
        spend: 0,
        year: new Date().getFullYear()
      }
    ]);
    showToast(`Approved ${app.name}. Member ${newId} created.`);
  };

  const declineApp = (appId) => {
    const app = apps.find((x) => x.id === appId);
    setApps((prev) => prev.filter((x) => x.id !== appId));
    if (app) showToast(`Declined application for ${app.name}`);
  };

  const addApp = ({ name, tier, prop, sec, note }) => {
    const newApp = {
      id: 'A-' + (30 + apps.length + 1),
      name,
      tier,
      prop,
      sec,
      note
    };
    setApps((prev) => [...prev, newApp]);
    closeModal();
    showToast(`Application submitted for ${name}`);
  };

  // Actions: Staff
  const cycleAttendance = (staffId) => {
    const order = ['in', 'late', 'out', 'leave'];
    setStaff((prev) =>
      prev.map((s) => {
        if (s.id !== staffId) return s;
        const nextAtt = order[(order.indexOf(s.att) + 1) % order.length];
        return { ...s, att: nextAtt };
      })
    );
  };

  const cycleShift = (dept, dayIndex) => {
    const order = ['M', 'E', 'N', 'off'];
    setGrid((prev) => {
      const current = prev[dept][dayIndex];
      const nextShift = order[(order.indexOf(current) + 1) % order.length];
      const newDeptShifts = [...prev[dept]];
      newDeptShifts[dayIndex] = nextShift;
      return { ...prev, [dept]: newDeptShifts };
    });
  };

  const runPayroll = () => {
    setPayrollDone(true);
    closeModal();
    showToast('Payroll processed. Payslips dispatched to staff accounts.');
  };

  // Actions: Stay / Rooms
  const checkIn = (roomNo, guest, nights) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.no === roomNo ? { ...r, st: 'occ', guest: guest || 'Guest', nights: parseInt(nights) || 1 } : r
      )
    );
    showToast(`Guest checked in to Room ${roomNo}`);
  };

  const arriveGuest = (roomNo) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.no === roomNo ? { ...r, st: 'occ', guest: r.guest.replace(' (arrives today)', '') } : r
      )
    );
    showToast(`Checked in Room ${roomNo}`);
  };

  const checkOut = (roomNo) => {
    const r = rooms.find((x) => x.no === roomNo);
    if (!r) return;
    const amount = (r.nights || 1) * r.rate;
    openModal('payment', {
      amount,
      title: `Folio Room ${roomNo} (${r.nights || 1} nights)`,
      outlet: 'Guest house',
      onSuccess: () => {
        setRooms((prev) =>
          prev.map((rm) => (rm.no === roomNo ? { ...rm, st: 'cln', guest: '', nights: 0 } : rm))
        );
        showToast(`Checked out Room ${roomNo}. Room marked for cleaning.`);
      }
    });
  };

  const markClean = (roomNo) => {
    setRooms((prev) =>
      prev.map((r) => (r.no === roomNo ? { ...r, st: 'vac', guest: '', nights: 0 } : r))
    );
    showToast(`Room ${roomNo} inspected and marked vacant.`);
  };

  const setMaintenance = (roomNo) => {
    setRooms((prev) =>
      prev.map((r) => (r.no === roomNo ? { ...r, st: 'mnt', guest: '', nights: 0 } : r))
    );
    showToast(`Room ${roomNo} blocked for maintenance.`);
  };

  // Actions: POS / Dining
  const addOrderItem = (outletKey, tableId, itemKey) => {
    const item = MENU_ITEMS[itemKey];
    const currentTable = tables[outletKey]?.find((t) => t.id === tableId);
    if (item.alc && !currentTable?.permit) {
      showToast('Licence or permit must be checked for alcoholic beverages.');
      return;
    }

    setTables((prev) => {
      const outletTables = [...prev[outletKey]];
      const tblIndex = outletTables.findIndex((t) => t.id === tableId);
      if (tblIndex < 0) return prev;

      const t = { ...outletTables[tblIndex] };
      const lines = [...t.lines];
      const existing = lines.find((l) => l.k === itemKey && l.s === 'new');

      if (existing) {
        existing.q += 1;
      } else {
        lines.push({ k: itemKey, q: 1, s: 'new' });
      }

      t.lines = lines;
      if (t.st === 'free') t.st = 'open';
      outletTables[tblIndex] = t;
      return { ...prev, [outletKey]: outletTables };
    });
    showToast(`Added ${item.n}`);
  };

  const changeOrderQty = (outletKey, tableId, itemKey, delta) => {
    setTables((prev) => {
      const outletTables = [...prev[outletKey]];
      const tblIndex = outletTables.findIndex((t) => t.id === tableId);
      if (tblIndex < 0) return prev;

      const t = { ...outletTables[tblIndex] };
      let lines = [...t.lines];
      const line = lines.find((l) => l.k === itemKey && l.s === 'new');
      if (line) {
        line.q += delta;
        if (line.q <= 0) {
          lines = lines.filter((l) => !(l.k === itemKey && l.s === 'new'));
        }
      }
      t.lines = lines;
      if (t.lines.length === 0) t.st = 'free';
      outletTables[tblIndex] = t;
      return { ...prev, [outletKey]: outletTables };
    });
  };

  const sendToKitchen = (outletKey, tableId) => {
    setTables((prev) => {
      const outletTables = [...prev[outletKey]];
      const tblIndex = outletTables.findIndex((t) => t.id === tableId);
      if (tblIndex < 0) return prev;

      const t = { ...outletTables[tblIndex] };
      t.lines = t.lines.map((l) => (l.s === 'new' ? { ...l, s: 'cook' } : l));
      outletTables[tblIndex] = t;
      return { ...prev, [outletKey]: outletTables };
    });
    showToast('Order sent to kitchen!');

    // Simulate cooking completion
    setTimeout(() => {
      setTables((prev) => {
        const outletTables = [...prev[outletKey]];
        const tblIndex = outletTables.findIndex((t) => t.id === tableId);
        if (tblIndex < 0) return prev;
        const t = { ...outletTables[tblIndex] };
        t.lines = t.lines.map((l) => (l.s === 'cook' ? { ...l, s: 'ready' } : l));
        outletTables[tblIndex] = t;
        return { ...prev, [outletKey]: outletTables };
      });
    }, 4500);
  };

  const markDishServed = (outletKey, tableId, itemKey) => {
    setTables((prev) => {
      const outletTables = [...prev[outletKey]];
      const tblIndex = outletTables.findIndex((t) => t.id === tableId);
      if (tblIndex < 0) return prev;

      const t = { ...outletTables[tblIndex] };
      t.lines = t.lines.map((l) => (l.k === itemKey && l.s === 'ready' ? { ...l, s: 'served' } : l));
      outletTables[tblIndex] = t;
      return { ...prev, [outletKey]: outletTables };
    });
    showToast('Marked dish as served.');
  };

  const requestBill = (outletKey, tableId) => {
    setTables((prev) => {
      const outletTables = [...prev[outletKey]];
      const tblIndex = outletTables.findIndex((t) => t.id === tableId);
      if (tblIndex < 0) return prev;
      outletTables[tblIndex] = { ...outletTables[tblIndex], st: 'bill' };
      return { ...prev, [outletKey]: outletTables };
    });
    showToast(`Bill requested for ${tableId}`);
  };

  const payTable = (outletKey, tableId) => {
    const t = tables[outletKey]?.find((x) => x.id === tableId);
    if (!t) return;
    const bill = calcBill(t);
    openModal('payment', {
      amount: bill.g,
      title: `${OUT[outletKey].n}, Table ${tableId}`,
      outlet: OUT[outletKey].n,
      mem: t.member,
      onSuccess: () => {
        setTables((prev) => {
          const outletTables = [...prev[outletKey]];
          const tblIndex = outletTables.findIndex((x) => x.id === tableId);
          if (tblIndex >= 0) {
            outletTables[tblIndex] = {
              id: tableId,
              cap: t.cap,
              st: 'free',
              lines: [],
              member: '',
              permit: false
            };
          }
          return { ...prev, [outletKey]: outletTables };
        });
        showToast(`Table ${tableId} bill settled.`);
      }
    });
  };

  const setTableMember = (outletKey, tableId, memberId) => {
    setTables((prev) => {
      const outletTables = [...prev[outletKey]];
      const tblIndex = outletTables.findIndex((t) => t.id === tableId);
      if (tblIndex < 0) return prev;
      outletTables[tblIndex] = { ...outletTables[tblIndex], member: memberId };
      return { ...prev, [outletKey]: outletTables };
    });
  };

  const setTablePermit = (outletKey, tableId, checked) => {
    setTables((prev) => {
      const outletTables = [...prev[outletKey]];
      const tblIndex = outletTables.findIndex((t) => t.id === tableId);
      if (tblIndex < 0) return prev;
      outletTables[tblIndex] = { ...outletTables[tblIndex], permit: checked };
      return { ...prev, [outletKey]: outletTables };
    });
  };

  // Actions: Fitness
  const bookClass = (classIdx) => {
    setClassesList((prev) => {
      const copy = [...prev];
      const item = [...copy[classIdx]];
      if (item[4] < item[3]) {
        item[4] += 1;
        copy[classIdx] = item;
        showToast(`Member registered for ${item[1]}`);
      }
      return copy;
    });
  };

  const toggleSlot = (slotKey) => {
    setSlots((prev) => ({ ...prev, [slotKey]: !prev[slotKey] }));
  };

  const scanCard = () => {
    const randomMember = members[Math.floor(Math.random() * members.length)];
    const status = mStatus(randomMember);
    const ok = status === 'Active';
    setScanResult({
      member: randomMember,
      status,
      ok,
      message: ok
        ? `Access granted — Welcome, ${randomMember.name} (${randomMember.tier} member)`
        : `Access alert: Member is ${status}. Overdue dues: ${money(mDue(randomMember))}`
    });
    showToast(ok ? 'Card scan verified' : 'Card scan warning');
  };

  // Actions: Payments
  const refundTxn = (txnId) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === txnId ? { ...t, st: 'Refunded' } : t))
    );
    showToast(`Refund processed for ${txnId}`);
  };

  const settleTxn = (txnId) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === txnId ? { ...t, st: 'Success' } : t))
    );
    showToast(`Transaction ${txnId} marked as settled.`);
  };

  // Actions: Events
  const createEventFromTemplate = (tplId) => {
    const t = TPL.find((x) => x.id === tplId);
    if (!t) return;
    const newEvent = {
      id: events.length + 1,
      n: t.n,
      cat: t.cat,
      d: '2026-11-20',
      t: '18:00',
      venue: t.venue,
      cap: t.cap,
      reg: 0,
      price: t.price,
      done: 0,
      x: t.x,
      chk: FLOW.lan.concat(t.x).map((s) => ({ s, d: false }))
    };
    setEvents((prev) => [...prev, newEvent]);
    setEvTab('list');
    showToast(`Created event: ${t.n}`);
  };

  const toggleEventChecklist = (eventId, chkIdx) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== eventId) return ev;
        const chk = ev.chk.map((c, i) => (i === chkIdx ? { ...c, d: !c.d } : c));
        return { ...ev, chk };
      })
    );
  };

  const registerEvent = (eventId) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== eventId) return ev;
        if (ev.reg < ev.cap) {
          showToast(`Registered member for ${ev.n}`);
          return { ...ev, reg: ev.reg + 1 };
        }
        return ev;
      })
    );
  };

  const createEventFromInvitation = () => {
    const newEvent = {
      id: events.length + 1,
      n: invitation.en,
      cat: 'Cultural',
      d: '2026-10-31',
      t: invitation.time.split('–')[0].trim(),
      venue: invitation.venue,
      cap: 100,
      reg: 1,
      price: 0,
      done: 1,
      x: ['Trilingual invitations distributed', 'Catering briefed'],
      chk: FLOW.lan.concat(['Trilingual invitations distributed', 'Catering briefed']).map((s, i) => ({
        s,
        d: i === 0
      }))
    };
    setEvents((prev) => [...prev, newEvent]);
    setEvTab('list');
    showToast(`Created "${invitation.en}" in Events calendar.`);
  };

  // Actions: ERP
  const setErpSubtab = (moduleKey, index) => {
    setErpSubtabs((prev) => ({ ...prev, [moduleKey]: index }));
  };

  const moveErpTask = (taskIndex) => {
    setErpTasks((prev) => {
      const copy = [...prev];
      const task = [...copy[taskIndex]];
      task[3] = Math.min(2, task[3] + 1);
      copy[taskIndex] = task;
      showToast(`Task moved to ${ERP_TASK_STATUSES[task[3]]}`);
      return copy;
    });
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        lang,
        setLang,
        view,
        setView,
        members,
        apps,
        staff,
        grid,
        payrollDone,
        rooms,
        roomSelected,
        setRoomSelected,
        tables,
        outlet,
        setOutlet,
        selectedTable,
        setSelectedTable,
        transactions,
        events,
        classesList,
        slots,
        scanResult,
        invitation,
        setInvitation,
        erpSubtabs,
        setErpSubtab,
        erpTasks,
        moveErpTask,
        memQ,
        setMemQ,
        memT,
        setMemT,
        memS,
        setMemS,
        empTab,
        setEmpTab,
        empQ,
        setEmpQ,
        empD,
        setEmpD,
        payQ,
        setPayQ,
        payM,
        setPayM,
        payS,
        setPayS,
        evTab,
        setEvTab,
        tplCat,
        setTplCat,
        evSel,
        setEvSel,
        repType,
        setRepType,
        repRange,
        setRepRange,
        repBusy,
        setRepBusy,
        repDone,
        setRepDone,
        toast,
        showToast,
        modal,
        openModal,
        closeModal,
        collectDues,
        approveApp,
        declineApp,
        addApp,
        cycleAttendance,
        cycleShift,
        runPayroll,
        checkIn,
        arriveGuest,
        checkOut,
        markClean,
        setMaintenance,
        addOrderItem,
        changeOrderQty,
        sendToKitchen,
        markDishServed,
        requestBill,
        payTable,
        setTableMember,
        setTablePermit,
        bookClass,
        toggleSlot,
        scanCard,
        refundTxn,
        settleTxn,
        createEventFromTemplate,
        toggleEventChecklist,
        registerEvent,
        createEventFromInvitation,
        addTxn,
        isLoggedIn,
        setIsLoggedIn,
        logout,
        login,
        isChatOpen,
        setIsChatOpen,
        chatInitialQuery,
        setChatInitialQuery,
        openChat,
        closeChat
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
