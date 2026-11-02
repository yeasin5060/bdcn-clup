import { makeRandom, money } from '../utils/formatters';
import { TIER, OUT, MENU_DATA, OUTL, METH, DEPTS, TPL, FLOW } from './constants';

const R = makeRandom(2026);

export const MENU_ITEMS = {};
export const OUTLET_MENUS = {};

Object.keys(MENU_DATA).forEach((outletKey) => {
  OUTLET_MENUS[outletKey] = MENU_DATA[outletKey].map((m) => {
    const item = {
      k: m[0],
      n: m[1],
      z: m[2],
      p: m[3],
      c: m[4],
      alc: !!m[5]
    };
    MENU_ITEMS[m[0]] = item;
    return item;
  });
});

const MN = [
  ['Anika Rahman', 'আনিকা রহমান', 'Permanent', 'BD', 0],
  ['Tahmid Hasan', '', 'Associate', 'BD', 0],
  ['Nusrat Jahan', '', 'Life', 'BD', 1],
  ['Farhan Chowdhury', '', 'Corporate', 'BD', 0],
  ['Sadia Islam', '', 'Founder', 'BD', 0],
  ['Mahfuz Ahmed', '', 'Permanent', 'BD', 2],
  ['Rafiq Uddin', '', 'Life', 'BD', 0],
  ['Tasnim Akter', '', 'Associate', 'BD', 0],
  ['Li Wei', '李伟', 'Corporate', 'CN', 0],
  ['Wang Fang', '王芳', 'Temporary', 'CN', 0],
  ['Zhang Min', '张敏', 'Permanent', 'CN', 3],
  ['Chen Hao', '陈浩', 'Corporate', 'CN', 0],
  ['Liu Yang', '刘洋', 'Temporary', 'CN', 1],
  ['Zhao Lei', '赵磊', 'Associate', 'CN', 0],
  ['Sun Mei', '孙梅', 'Permanent', 'CN', 0],
  ['Zhou Jun', '周俊', 'Temporary', 'CN', 0],
  ['Amb. Sample One', '', 'Diplomatic', 'DIP', 0],
  ['Amb. Sample Two', '', 'Diplomatic', 'DIP', 0]
];

export const getInitialMembers = () =>
  MN.map((m, i) => ({
    id: i === 0 ? 'BCC-0482' : 'BCC-' + ('0000' + (100 + i * 37)).slice(-4),
    name: m[0],
    alt: m[1],
    tier: m[2],
    nat: m[3],
    over: m[4],
    spend: Math.round(R() * 40000 + 3000),
    year: 2008 + Math.floor(R() * 16)
  }));

export const getInitialApps = () => [
  { id: 'A-31', name: 'Imran Kabir', tier: 'Associate', prop: 'Anika Rahman', sec: 'Farhan Chowdhury', note: 'Software engineer, age 34' },
  { id: 'A-32', name: 'Huang Tao 黄涛', tier: 'Corporate', prop: 'Li Wei', sec: 'Chen Hao', note: 'Nominee for a Chinese engineering firm' },
  { id: 'A-33', name: 'Maliha Sultana', tier: 'Permanent', prop: 'Sadia Islam', sec: 'Rafiq Uddin', note: 'Physician, Gulshan' }
];

export const getInitialStaff = () => {
  const staffList = [
    ['Rahim Khan', 'Front desk', 'Duty manager', 'M', 42000],
    ['Shirin Akter', 'Front desk', 'Receptionist', 'E', 32000],
    ['Liang Yu 梁宇', 'Front desk', 'Chinese-language host', 'M', 46000],
    ['Jamal Hossain', 'Housekeeping', 'Supervisor', 'M', 30000],
    ['Rina Begum', 'Housekeeping', 'Room attendant', 'M', 22000],
    ['Kabir Ali', 'Housekeeping', 'Room attendant', 'E', 22000],
    ['Chef Wu 吴师傅', 'Kitchen', 'Head chef, Chinese', 'E', 95000],
    ['Chef Salam', 'Kitchen', 'Head chef, Bangladeshi', 'E', 80000],
    ['Mitu Das', 'Restaurant', 'Captain', 'E', 34000],
    ['Zaman Sheikh', 'Restaurant', 'Waiter', 'E', 24000],
    ['Nasir Uddin', 'Bar', 'Bartender', 'E', 36000],
    ['Peng Lin 彭琳', 'Café', 'Tea master', 'M', 38000],
    ['Coach Arif', 'Fitness', 'Gym trainer', 'M', 40000],
    ['Coach Mei 美', 'Fitness', 'Table tennis coach', 'E', 42000],
    ['Sabina Yasmin', 'Accounts', 'Accountant', 'M', 58000],
    ['Hanif Mia', 'Security', 'Security lead', 'N', 28000]
  ];

  const attStatuses = ['in', 'in', 'in', 'late', 'in', 'out', 'in', 'out', 'in', 'in', 'out', 'in', 'in', 'out', 'leave', 'in'];

  return staffList.map((s, i) => ({
    id: 'E-' + (1001 + i),
    name: s[0],
    dept: s[1],
    role: s[2],
    shift: s[3],
    basic: s[4],
    att: attStatuses[i],
    ot: Math.floor(R() * 14),
    adv: i % 5 === 0 ? 3000 : 0
  }));
};

export const getInitialGrid = () => {
  const grid = {};
  DEPTS.forEach((d) => {
    grid[d] = [0, 1, 2, 3, 4, 5, 6].map(() => ['M', 'E', 'N', 'off'][Math.floor(R() * 4)]);
  });
  return grid;
};

export const getInitialRooms = () => {
  const rooms = [
    [101, 'Deluxe', 6500],
    [102, 'Deluxe', 6500],
    [103, 'Deluxe', 6500],
    [104, 'Deluxe', 6500],
    [105, 'Deluxe', 6500],
    [106, 'Deluxe', 6500],
    [201, 'Executive', 8500],
    [202, 'Executive', 8500],
    [203, 'Executive', 8500],
    [204, 'Executive', 8500],
    [301, 'Jade suite', 12000],
    [302, 'Jade suite', 12000]
  ].map((r) => ({
    no: r[0],
    type: r[1],
    rate: r[2],
    st: 'vac',
    guest: '',
    nights: 0
  }));

  const setRoom = (no, st, g = '', n = 0) => {
    const room = rooms.find((x) => x.no === no);
    if (room) {
      room.st = st;
      room.guest = g;
      room.nights = n;
    }
  };

  setRoom(101, 'occ', 'Mr. Zhang, CN delegation', 3);
  setRoom(103, 'occ', 'Ms. Karim', 1);
  setRoom(104, 'cln');
  setRoom(105, 'res', 'Dr. Lin (arrives today)', 2);
  setRoom(201, 'occ', 'Mr. Ahmed', 2);
  setRoom(203, 'mnt');
  setRoom(204, 'res', 'Mr. Wang (arrives today)', 4);
  setRoom(301, 'occ', 'H.E. Commercial Counselor', 5);

  return rooms;
};

export const getInitialTables = () => {
  const tbl = {};
  Object.keys(OUT).forEach((o) => {
    tbl[o] = [];
    const c = OUT[o];
    for (let i = 1; i <= c.cnt; i++) {
      tbl[o].push({
        id: c.pre + i,
        cap: 2 + (i % 3) * 2,
        st: 'free',
        lines: [],
        member: '',
        permit: false
      });
    }
  });

  const tget = (o, id) => tbl[o].find((t) => t.id === id);

  const t2 = tget('silk', 'T2');
  if (t2) {
    t2.st = 'open';
    t2.lines = [
      { k: 'ds', q: 2, s: 'served' },
      { k: 'kp', q: 1, s: 'served' }
    ];
  }

  const t5 = tget('silk', 'T5');
  if (t5) {
    t5.st = 'open';
    t5.lines = [
      { k: 'pd', q: 1, s: 'ready' },
      { k: 'er', q: 2, s: 'cook' }
    ];
  }

  const t7 = tget('silk', 'T7');
  if (t7) {
    t7.st = 'bill';
    t7.lines = [
      { k: 'bb', q: 2, s: 'served' },
      { k: 'kb', q: 2, s: 'served' },
      { k: 'md', q: 4, s: 'served' }
    ];
  }

  const b2 = tget('bar', 'B2');
  if (b2) {
    b2.st = 'open';
    b2.lines = [{ k: 'jt', q: 2, s: 'served' }];
  }

  const c3 = tget('cafe', 'C3');
  if (c3) {
    c3.st = 'open';
    c3.lines = [
      { k: 'lj', q: 1, s: 'ready' },
      { k: 'ck', q: 2, s: 'cook' }
    ];
  }

  return tbl;
};

export const getInitialTransactions = (now = new Date()) => {
  const txn = [];
  const rr = makeRandom(99);
  const rg = {
    'Silk Route': [900, 6500],
    'Lantern Bar': [600, 3800],
    'Tea Garden': [250, 1600],
    'Guest house': [6500, 28000],
    'Membership dues': [1500, 5000],
    Fitness: [500, 2500],
    Events: [1500, 9000]
  };

  for (let i = 0; i < 30; i++) {
    const o = OUTL[Math.floor(rr() * 7)];
    const r = rg[o];
    let d = new Date(now);
    d.setHours(7 + Math.floor(i * 0.5), Math.floor(rr() * 60), 0, 0);
    if (d > now) d = new Date(now.getTime() - i * 60000 * 3);

    const st = rr() < 0.07 ? 'Failed' : rr() < 0.06 ? 'Pending' : 'Success';
    txn.push({
      id: 'TX-' + (48210 + i),
      t: d,
      outlet: o,
      method: METH[Math.floor(rr() * rr() * 7)],
      amount: Math.round((r[0] + rr() * (r[1] - r[0])) / 10) * 10,
      st: st
    });
  }

  txn.sort((a, b) => b.t - a.t);
  return txn;
};

export const getInitialEvents = () => {
  const events = [
    {
      id: 1,
      n: 'Inter-club table tennis tournament',
      cat: 'Sports',
      d: '2026-10-16',
      t: '15:00',
      venue: 'Table tennis room',
      cap: 64,
      reg: 42,
      price: 500,
      done: 3,
      x: ['Draw sheet and umpires', 'Trophies and medals', 'Warm-up tables']
    },
    {
      id: 2,
      n: 'Dim sum and pitha masterclass',
      cat: 'Dining',
      d: '2026-10-23',
      t: '16:00',
      venue: 'Silk Route kitchen',
      cap: 24,
      reg: 18,
      price: 2800,
      done: 4,
      x: TPL[5].x
    },
    {
      id: 3,
      n: 'Tea tasting: Sylhet meets Fujian',
      cat: 'Dining',
      d: '2026-10-31',
      t: '17:00',
      venue: 'Tea Garden Café',
      cap: 30,
      reg: 26,
      price: 1200,
      done: 5,
      x: TPL[6].x
    },
    {
      id: 4,
      n: 'Victory Day dinner',
      cat: 'Dining',
      d: '2026-12-16',
      t: '19:30',
      venue: 'Grand banquet hall',
      cap: 300,
      reg: 130,
      price: 3000,
      done: 2,
      x: TPL[3].x
    }
  ];

  events.forEach((e) => {
    e.chk = FLOW.lan.concat(e.x).map((s, i) => ({ s: s, d: i < e.done }));
  });

  return events;
};

export const FACILITIES = [
  ['Gym', '健身房', 30, 12],
  ['Swimming pool', '游泳池', 20, 7],
  ['Squash courts', '壁球', 4, 2],
  ['Table tennis', '乒乓球', 8, 5],
  ['Yoga studio', '瑜伽室', 16, 0]
];

export const CLASSES = [
  ['06:30', 'Tai chi on the lawn', '太极', 20, 14],
  ['07:30', 'Morning yoga', '', 16, 11],
  ['16:00', 'Kids squash coaching', '', 10, 8],
  ['17:00', 'Table tennis coaching', '乒乓球训练', 12, 9],
  ['18:00', 'Aqua fitness', '', 15, 6]
];

export const SLOT_T = ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
export const SLOT_F = ['Squash court 1', 'Squash court 2', 'Table tennis A', 'Table tennis B'];

export const getInitialSlots = () => {
  const slots = {};
  SLOT_F.forEach((f) => {
    SLOT_T.forEach((t) => {
      slots[f + t] = R() < 0.35;
    });
  });
  return slots;
};

export const ERP_SUPPLIERS = ['Dhaka Fresh Foods', 'Sino Trading Ltd', 'Padma Beverages', 'Hua Tai Imports', 'City Dairy', 'Bengal Spices', 'Dragon Logistics'];

export const ERP_POOLS = {
  acc: ['Silk Route', 'Lantern Bar', 'Tea Garden', 'Guest house', 'Fitness', 'Events', 'Administration'],
  inv: ['Silk Route Kitchen', 'Main Bar', 'Tea Garden Prep', 'Staff Canteen', 'Housekeeping Store']
};

export const ERP_OV = {
  'Supplier List': ERP_SUPPLIERS,
  'Store List': ['Main store', 'Kitchen store', 'Bar store', 'Cold room', 'Housekeeping store']
};

export const ERP_ACCOUNTS = [
  ['1010', 'Cash in hand', 'Asset'],
  ['1020', 'City Bank current', 'Asset'],
  ['1100', 'Member receivables', 'Asset'],
  ['1200', 'F&B inventory', 'Asset'],
  ['1500', 'Property, plant & equipment', 'Asset'],
  ['2010', 'Trade payables (suppliers)', 'Liability'],
  ['2020', 'Member deposit advance', 'Liability'],
  ['2050', 'Provident fund payable', 'Liability'],
  ['3010', 'Club general fund', 'Equity'],
  ['4010', 'Subscription revenue', 'Revenue'],
  ['4020', 'Dining & Bar sales', 'Revenue'],
  ['4030', 'Room accommodation revenue', 'Revenue'],
  ['5010', 'Food cost of sales', 'Expense'],
  ['5020', 'Employee payroll & benefits', 'Expense'],
  ['5030', 'Utilities & maintenance', 'Expense']
];

export const ERP_TASKS = [
  ['Replace AC filter, room 203', 'Engineering', 'High', 0],
  ['Deep clean Jade suite', 'Housekeeping', 'Medium', 1],
  ['Audit cold room seafood stock', 'Kitchen', 'High', 0],
  ['Renew bKash merchant key', 'Accounts', 'Low', 2],
  ['Repaint squash court line markings', 'Facility', 'Medium', 0],
  ['Update VIP guest list for CNY', 'Front desk', 'High', 1]
];

export const ERP_TASK_STATUSES = ['To do', 'In progress', 'Done'];

