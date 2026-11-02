export const ROLES = {
  admin: [
    'dash', 'members', 'staff', 'stay', 'pos', 'fit', 'pay', 'rep', 'events',
    'acc', 'inv', 'mnt', 'sfm', 'reg', 'smp', 'mis', 'hrm', 'mmg', 'res', 'hot', 'app'
  ],
  front: ['dash', 'members', 'stay', 'events', 'mmg', 'res', 'hot'],
  cashier: ['dash', 'pos', 'pay'],
  hr: ['dash', 'staff', 'pay', 'rep', 'acc', 'hrm']
};

export const ROLE_NAMES = {
  admin: 'General manager',
  front: 'Front desk',
  cashier: 'Outlet cashier',
  hr: 'HR and accounts'
};

export const CORE_NAV = [
  { id: 'dash', label: 'Dashboard', icon: 'M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z' },
  { id: 'members', label: 'Members', icon: 'M12 4a4 4 0 100 8 4 4 0 000-8zM4 21c0-4 4-6 8-6s8 2 8 6' },
  { id: 'staff', label: 'Employees', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm14 10v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' },
  { id: 'stay', label: 'Accommodation', icon: 'M3 21h18M3 7v14M21 7v14M6 11h3m6 0h3m-9 4h3m6 0h3M10 21V4a1 1 0 011-1h2a1 1 0 011 1v17' },
  { id: 'pos', label: 'Dining and Bar', icon: 'M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zm4-5v3m4-3v3m4-3v3' },
  { id: 'fit', label: 'Fitness and Sports', icon: 'M6 5v14M18 5v14M2 9h4v6H2zm16 0h4v6h-4zM6 12h12' },
  { id: 'pay', label: 'Payments', icon: 'M2 7h20v13a2 2 0 01-2 2H4a2 2 0 01-2-2V7zm0-3a2 2 0 012-2h16a2 2 0 012 2v3H2V4zm4 11h4' },
  { id: 'rep', label: 'Reports', icon: 'M3 3v18h18M7 16l4-4 4 3 6-7' },
  { id: 'events', label: 'Events and Templates', icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z' }
];

export const ERP_NAV = [
  { id: 'acc', icon: 'M4 20V10M10 20V4M16 20v-8M22 20H2', en: 'Accounts', bn: 'হিসাব', zh: '财务会计' },
  { id: 'inv', icon: 'M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4m0 0l9-4m-9 4v10', en: 'Inventory', bn: 'মজুদ', zh: '库存管理' },
  { id: 'mnt', icon: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z', en: 'Maintenance & Setup', bn: 'রক্ষণাবেক্ষণ', zh: '维护与设置' },
  { id: 'sfm', icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11', en: 'Facility Manager & Tasks', bn: 'সুবিধা ব্যবস্থাপক', zh: '设施与任务' },
  { id: 'reg', icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM4 9h16', en: 'Register', bn: 'রেজিস্টার', zh: '登记册' },
  { id: 'smp', icon: 'M18 20V10M12 20V4M6 20v-6', en: 'Sample Charts', bn: 'নমুনা প্রোগ্রাম', zh: '图表示例' },
  { id: 'mis', icon: 'M12 20V10M18 20V4M6 20v-4M2 20h20', en: 'MIS & Analysis', bn: 'এমআইএস ও বিশ্লেষণ', zh: '管理报表' },
  { id: 'hrm', icon: 'M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8zM20 8v6M23 11h-6', en: 'HRM Reports', bn: 'এইচআরএম রিপোর্ট', zh: '人力资源报表' },
  { id: 'mmg', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', en: 'Member Management', bn: 'সদস্য ব্যবস্থাপনা', zh: '会员管理' },
  { id: 'res', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', en: 'Reservations', bn: 'সংরক্ষণ', zh: '预订管理' },
  { id: 'hot', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', en: 'Front Desk & Hotel', bn: 'হোটেল ও অভ্যর্থনা', zh: '前台客房' },
  { id: 'app', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', en: 'Member Apps & Notices', bn: 'অ্যাপ ও নোটিশ', zh: '会员应用' }
];

export const ALL_NAV = [
  ...CORE_NAV,
  ...ERP_NAV.map((g) => ({ id: g.id, label: g.en, icon: g.icon }))
];

export const TRANSLATIONS = {
  en: {
    dash: 'Dashboard',
    members: 'Members',
    staff: 'Employees',
    stay: 'Accommodation',
    pos: 'Dining and Bar',
    fit: 'Fitness and Sports',
    pay: 'Payments',
    rep: 'Reports',
    events: 'Events and Templates'
  },
  bn: {
    dash: 'ড্যাশবোর্ড',
    members: 'সদস্য',
    staff: 'কর্মী',
    stay: 'থাকার ব্যবস্থা',
    pos: 'রেস্তোরাঁ ও বার',
    fit: 'ফিটনেস ও খেলাধুলা',
    pay: 'পেমেন্ট ও ক্যাশিয়ার',
    rep: 'প্রতিবেদন',
    events: 'অনুষ্ঠান ও টেমপ্লেট'
  },
  zh: {
    dash: '总览',
    members: '会员',
    staff: '员工',
    stay: '住宿',
    pos: '餐饮与酒吧',
    fit: '健身与运动',
    pay: '支付',
    rep: '报表',
    events: '活动与模板'
  }
};

ERP_NAV.forEach((g) => {
  TRANSLATIONS.en[g.id] = g.en;
  TRANSLATIONS.bn[g.id] = g.bn;
  TRANSLATIONS.zh[g.id] = g.zh;
});

export const TIER = {
  Founder: { adm: 0, m: 3000, g: 6 },
  Life: { adm: 800000, m: 2500, g: 5 },
  Permanent: { adm: 300000, m: 2000, g: 4 },
  Corporate: { adm: 500000, m: 5000, g: 6 },
  Associate: { adm: 100000, m: 1500, g: 2 },
  Diplomatic: { adm: 0, m: 1000, g: 3 },
  Temporary: { adm: 25000, m: 3000, g: 1 }
};

export const DEPTS = ['Front desk', 'Housekeeping', 'Kitchen', 'Restaurant', 'Bar', 'Café', 'Fitness', 'Accounts', 'Security'];

export const OUT = {
  silk: { n: 'Silk Route', z: '丝路餐厅', pre: 'T', cnt: 10 },
  bar: { n: 'Lantern Bar', z: '灯笼酒吧', pre: 'B', cnt: 9 },
  cafe: { n: 'Tea Garden Café', z: '茶园咖啡', pre: 'C', cnt: 8 }
};

export const MENU_DATA = {
  silk: [
    ['pd', 'Peking duck, half', '北京烤鸭', 3200, 'Chinese'],
    ['kp', 'Kung Pao chicken', '宫保鸡丁', 780, 'Chinese'],
    ['mt', 'Mapo tofu', '麻婆豆腐', 520, 'Chinese'],
    ['ds', 'Dim sum platter (8)', '点心拼盘', 980, 'Chinese'],
    ['bb', 'Beef bhuna, club style', 'বিফ ভুনা', 820, 'Bangladeshi'],
    ['kb', 'Kachchi biryani', 'কাচ্চি বিরিয়ানি', 890, 'Bangladeshi'],
    ['er', 'Egg fried rice', '蛋炒饭', 380, 'Rice'],
    ['md', 'Mishti doi and roshogolla', 'মিষ্টি দই', 320, 'Dessert']
  ],
  bar: [
    ['jt', 'Jasmine tea mocktail', '茉莉茶', 450, 'Soft'],
    ['lc', 'Lychee cooler', '荔枝', 420, 'Soft'],
    ['bs', 'Borhani spritz', 'বোরহানি', 380, 'Soft'],
    ['ts', 'Tsingtao (permit only)', '青岛啤酒', 650, 'Beer', true],
    ['wh', 'Scotch 12y (permit only)', '威士忌', 1100, 'Spirits', true],
    ['sn', 'Salted edamame and nuts', '毛豆', 320, 'Bar snack'],
    ['sk', 'Chicken satay skewers (4)', '沙爹', 620, 'Bar snack']
  ],
  cafe: [
    ['st', 'Sylhet tea, pot', 'সিলেট চা', 250, 'Tea'],
    ['lj', 'Longjing tea, pot', '龙井', 420, 'Tea'],
    ['cp', 'Cappuccino', '', 320, 'Coffee'],
    ['am', 'Americano', '', 260, 'Coffee'],
    ['ck', 'Baked cheesecake slice', '', 420, 'Bakery'],
    ['sc', 'Scones with clotted cream', '', 480, 'Bakery'],
    ['sw', 'Club sandwich and fries', '', 620, 'Light meal']
  ]
};

export const OUTL = ['Silk Route', 'Lantern Bar', 'Tea Garden', 'Guest house', 'Membership dues', 'Fitness', 'Events'];
export const METH = ['bKash', 'Nagad', 'Alipay', 'WeChat Pay', 'Card', 'Member account', 'Cash'];

export const FEE = {
  bKash: 0.015,
  Nagad: 0.014,
  Alipay: 0.028,
  'WeChat Pay': 0.028,
  Card: 0.022,
  'Member account': 0,
  Cash: 0
};

export const RS = {
  occ: ['Occupied', 'bad', 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400'],
  vac: ['Vacant', 'ok', 'border-emerald-600 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400'],
  res: ['Reserved', 'info', 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'],
  cln: ['Cleaning', 'warn', 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400'],
  mnt: ['Maintenance', 'muted', 'border-gray-400 bg-gray-400/10 text-gray-500']
};

export const TPL = [
  { id: 'cny', ic: '🏮', n: 'Chinese New Year Gala', z: '春节联欢', b: 'চীনা নববর্ষ উৎসব', cat: 'Cultural', venue: 'Grand banquet hall', cap: 300, price: 3500, budget: 450000, x: ['Lion dance team booked', 'Red envelope table', 'Fireworks permission (terrace)'] },
  { id: 'mid', ic: '🥮', n: 'Mid-Autumn Moon Night', z: '中秋赏月夜', b: 'মধ্য-শরৎ চাঁদনি রাত', cat: 'Cultural', venue: 'Terrace and Lantern Bar', cap: 120, price: 2200, budget: 180000, x: ['Mooncake order', 'Lantern riddles printed', 'Moon-viewing seating'] },
  { id: 'pb', ic: '🌅', n: 'Pohela Boishakh Morning', z: '孟加拉新年晨会', b: 'পহেলা বৈশাখ সকাল', cat: 'Cultural', venue: 'Tea Garden and lawn', cap: 200, price: 1500, budget: 220000, x: ['Panta-ilish breakfast set', 'Alpona artists', 'Red-and-white dress code note'] },
  { id: 'vd', ic: '🇧🇩', n: 'Victory Day Dinner', z: '胜利日晚宴', b: 'বিজয় দিবসের নৈশভোজ', cat: 'Dining', venue: 'Grand banquet hall', cap: 300, price: 3000, budget: 380000, x: ['Cultural programme lineup', 'Flag and stage décor', 'Guest-of-honour protocol'] },
  { id: 'tt', ic: '🏓', n: 'Friendship Table Tennis Cup', z: '友谊乒乓杯', b: 'মৈত্রী টেবিল টেনিস কাপ', cat: 'Sports', venue: 'Table tennis room', cap: 64, price: 500, budget: 90000, x: ['Draw sheet and umpires', 'Trophies and medals', 'Warm-up tables'] },
  { id: 'dm', ic: '🥟', n: 'Dim Sum and Pitha Masterclass', z: '点心与皮塔课', b: 'ডিম সাম ও পিঠা ক্লাস', cat: 'Dining', venue: 'Silk Route kitchen', cap: 24, price: 2800, budget: 60000, x: ['Ingredients per station', 'Aprons', 'Recipe cards in two languages'] },
  { id: 'ts', ic: '🍵', n: 'Tea Tasting: Sylhet meets Fujian', z: '锡尔赫特遇见福建', b: 'চা-চক্র', cat: 'Dining', venue: 'Tea Garden Café', cap: 30, price: 1200, budget: 35000, x: ['Six teas sourced', 'Tasting notes cards', 'Water temperature kettles'] },
  { id: 'dr', ic: '🕊️', n: 'Diplomatic Reception', z: '外交招待会', b: 'কূটনৈতিক সংবর্ধনা', cat: 'Diplomatic', venue: 'Banquet hall and conference room', cap: 150, price: 0, budget: 320000, x: ['Guest list from embassies', 'Protocol seating', 'Interpretation booth tested'] }
];

export const FLOW = {
  lan: ['Hire AV and sound', 'Confirm Bangla–Mandarin interpreter', 'Menu tasting with both kitchens', 'Send trilingual invitations', 'Open RSVP and seating plan', 'Brief staff and cover shifts']
};

export const ERP_MD = {
  acc: 'Chart of Accounts:coa|Voucher Entry:vform|Voucher Statement:vch|Cash / Bank Book:ledger|Control Ledger:tb|Trail Balance:tb|Profit & Loss:pl|Balance Sheet:bs|Member Aging:aging',
  inv: 'Item Info:master|Item List:qty|Item Assign Kitchen:master|Supplier List:master|Item Assign:master|Store List:master|Stock Valuation:qty',
  mnt: 'Department:master|Service Point:master|Table Number:master|User Update:master|Section:master|Card Type:master|Designation:master|Bank Name:master|Table Shift:master|Floor Info:master|Room Status:rchart|System Log:log',
  sfm: 'Hierarchy Setup:master|Task:task|Subtask:task|Task Assign:task|Task Status Update:task|Task Management Board:board',
  reg: 'File:doc|Group:master|File Manager:files',
  smp: 'Chart Samples:charts|Charts:bars',
  mis: 'Consumption Setup:qty|Management Dashboard:kpi|Consumption Analysis:bars|Raw Material Analysis:bars|Management Report:doc|Graphical Sales:charts',
  hrm: 'Employee Info (Full):go-staff|Employee List:hr|Manpower Report:bars|Custom Report:bars|Export Report:bars',
  mmg: 'Member Info View:go-members|Member List:go-members|Ledger Adjustment:vform|Member Ledger:ledger|Member Statement:doc|Member Status:mstat',
  res: 'Room Type:master|Room List:master|Guest Info:master|Reservation:doc|Reservation Status:doc|In-house Guest:doc',
  hot: 'Front Desk:doc|Guest Folio:doc|Housekeeping:task|Rate and Packages:master|Guest Services:doc|Night Audit:doc',
  app: 'User Info Apps:master|Assign Menu Apps:form|Notice Post:form|Event Post:form'
};

