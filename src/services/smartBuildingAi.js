// ============================================================================
// SMART BUILDING AI ENGINE & 10-FLOOR KNOWLEDGE BASE
// Production-grade AI Assistant with Tool Calling, Product Discovery,
// Real-time Availability, Context Memory & Conversational Ordering
// ============================================================================

// 1. 10-Floor Smart Building Structure
export const BUILDING_FLOORS = [
  {
    floor: 1,
    name: 'Reception & Information Desk',
    bnName: 'অভ্যর্থনা ও তথ্য কেন্দ্র',
    zhName: '接待前台与信息中心',
    category: 'Lobby & Concierge',
    icon: '🛎️',
    hours: 'Open 24/7',
    desc: 'Main turnstiles, member check-in, concierge services, guest passes, airport transfers & smart RFID desk.',
    ext: '100',
    facilities: ['Main Turnstiles', 'Information Desk', 'Member Services', 'Concierge & Baggage'],
    color: '#0b6e52',
    gradient: 'from-emerald-600 to-teal-800'
  },
  {
    floor: 2,
    name: 'Restaurant & Food Court',
    bnName: 'রেস্তোরাঁ ও ফুড কোর্ট',
    zhName: '丝路餐厅与美食广场',
    category: 'Dining & Multi-Cuisine',
    icon: '🥢',
    hours: '11:00 – 23:00',
    desc: 'Silk Route multi-cuisine restaurant, authentic Beijing roast duck, Dim Sum, gourmet burgers, biryani & sizzlers.',
    ext: '210',
    facilities: ['Silk Route Chinese', 'Burger & Grill Corner', 'Bengal Cuisine Kitchen', 'VIP Private Dining'],
    color: '#e0412f',
    gradient: 'from-rose-600 to-red-800'
  },
  {
    floor: 3,
    name: 'Coffee Shop & Café',
    bnName: 'কফি শপ ও ক্যাফে',
    zhName: '茶园咖啡馆与烘焙坊',
    category: 'Café & Bakery',
    icon: '☕',
    hours: '07:30 – 22:00',
    desc: 'Tea Garden Café, artisanal espresso, cappuccino, Longjing green tea, cheesecake, waffles & club sandwiches.',
    ext: '220',
    facilities: ['Espresso & Brew Bar', 'Bakery & Dessert Showcase', 'Indoor Garden Seating', 'High-Speed Wi-Fi Work Zone'],
    color: '#d97706',
    gradient: 'from-amber-500 to-yellow-700'
  },
  {
    floor: 4,
    name: 'Mobile & Electronics Shop',
    bnName: 'মোবাইল ও ইলেকট্রনিক্স শপ',
    zhName: '数码配件与电子专卖店',
    category: 'Tech & Gadgets',
    icon: '📱',
    hours: '10:00 – 21:00',
    desc: 'Smart gadgets, iPhone & Android accessories, magnetic power banks, wireless earbuds, smart watch bands & repair.',
    ext: '230',
    facilities: ['Smartphone & Tablet Zone', 'Audio & Wearables', 'Fast Chargers & Cables', 'Express Device Tech Care'],
    color: '#2563eb',
    gradient: 'from-blue-600 to-indigo-800'
  },
  {
    floor: 5,
    name: 'Fashion & Clothing Store',
    bnName: 'ফ্যাশন ও ক্লথিং স্টোর',
    zhName: '时尚精品服饰馆',
    category: 'Apparel & Lifestyle',
    icon: '👔',
    hours: '10:00 – 21:30',
    desc: 'Club bespoke tailored blazers, handcrafted silk scarves, traditional Panjabi, formal shirts & genuine leather wallets.',
    ext: '235',
    facilities: ['Bespoke Blazers & Suits', 'Silk Scarves & Panjabi', 'Leather Accessories', 'Fitting & Alteration Studio'],
    color: '#7c3aed',
    gradient: 'from-purple-600 to-indigo-900'
  },
  {
    floor: 6,
    name: 'Corporate Offices & Boardrooms',
    bnName: 'কর্পোরেট অফিস ও কনফারেন্স',
    zhName: '商务办公与董事会议厅',
    category: 'Business & Coworking',
    icon: '💼',
    hours: '08:30 – 20:00',
    desc: 'Executive boardrooms, high-definition video conferencing suites, bilateral meeting rooms & secretarial services.',
    ext: '120',
    facilities: ['Grand Boardroom (24 seats)', 'Video Conference Studio', 'Meeting Suites A & B', 'Print & Business Hub'],
    color: '#0891b2',
    gradient: 'from-cyan-600 to-teal-800'
  },
  {
    floor: 7,
    name: 'Shopping & Lifestyle Mart',
    bnName: 'শপিং ও লাইফস্টাইল মার্ট',
    zhName: '生活便利百货中心',
    category: 'Retail & Souvenirs',
    icon: '🛍️',
    hours: '09:30 – 21:30',
    desc: 'Heritage tea gift boxes, imported gourmet snacks, Sundarbans raw honey, cosmetics, travel essentials & BCC gifts.',
    ext: '245',
    facilities: ['Heritage Tea Boutique', 'Organic & Gourmet Delights', 'Cosmetics & Perfumes', 'BCC Souvenirs'],
    color: '#db2777',
    gradient: 'from-pink-600 to-rose-800'
  },
  {
    floor: 8,
    name: 'Gym & Fitness Center',
    bnName: 'জিম ও ফিটনেস সেন্টার',
    zhName: '综合健身与运动中心',
    category: 'Sports & Fitness',
    icon: '🏋️',
    hours: '06:00 – 22:00',
    desc: 'State-of-the-art cardio zone, free weights, CrossFit rack, Table Tennis arena, Yoga & Tai Chi studio, certified trainers.',
    ext: '250',
    facilities: ['Cardio & Strength Arena', 'Yoga & Tai Chi Studio', 'Table Tennis Arena', 'Locker & Steam Rooms'],
    color: '#ea580c',
    gradient: 'from-orange-600 to-amber-800'
  },
  {
    floor: 9,
    name: 'Swimming Pool & Wellness Spa',
    bnName: 'সুইমিং পুল ও স্পা',
    zhName: '温水游泳池与水疗中心',
    category: 'Wellness & Aquatics',
    icon: '🏊',
    hours: '06:30 – 20:30',
    desc: 'Heated Olympic-length swimming pool, whirlpool jacuzzi, sauna, steam rooms & regulation glass-back squash courts.',
    ext: '251',
    facilities: ['Olympic Heated Pool', 'Whirlpool Jacuzzi', 'Sauna & Steam Spa', 'Squash Courts'],
    color: '#0284c7',
    gradient: 'from-sky-600 to-blue-800'
  },
  {
    floor: 10,
    name: 'Premium Lounge & Event Banquet',
    bnName: 'প্রিমিয়াম লাউঞ্জ ও ব্যাঙ্কুয়েট',
    zhName: '顶层贵宾酒廊与宴会厅',
    category: 'Lounge & Rooftop',
    icon: '🍸',
    hours: '12:00 – 00:00',
    desc: 'Lantern Bar terrace, open sky riverfront view, artisanal mocktails, rooftop BBQ grill & 300-seat grand gala banquet hall.',
    ext: '215',
    facilities: ['Lantern Rooftop Bar', 'Skyline River Terrace', 'Grand Banquet Hall (300 seats)', 'Live BBQ & Barbecue'],
    color: '#b91c1c',
    gradient: 'from-red-600 to-rose-900'
  }
];

// 2. Comprehensive Products & Services Catalog
export const PRODUCTS_CATALOG = [
  // Floor 2: Restaurant & Food Court
  {
    id: 'prod-burger',
    name: 'Classic Club Burger',
    bnName: 'ক্লাসিক ক্লাব বার্গার',
    category: 'Food',
    price: 250,
    stock: 18,
    inStock: true,
    floor: 2,
    business: 'Restaurant & Food Court',
    image: '🍔',
    desc: 'Juicy grilled patty, aged cheddar, crisp lettuce, tomato & secret club sauce on a brioche bun with French fries.',
    keywords: ['burger', 'bargar', 'burgers', 'cheeseburger', 'beef burger', 'chicken burger', 'বার্গার', 'খাবার']
  },
  {
    id: 'prod-peking-duck',
    name: 'Authentic Peking Duck (Half)',
    bnName: 'ঐতিহ্যবাহী বেইজিং রোস্ট ডাক',
    category: 'Food',
    price: 3200,
    stock: 8,
    inStock: true,
    floor: 2,
    business: 'Restaurant & Food Court',
    image: '🍗',
    desc: 'Crispy skin roasted Beijing duck served with handmade steamed pancakes, scallions, cucumber & sweet hoisin sauce.',
    keywords: ['peking duck', 'duck', 'roast duck', 'chinese duck', 'হাঁস', 'বেইজিং ডাক']
  },
  {
    id: 'prod-biryani',
    name: 'Kachchi Biryani Special',
    bnName: 'স্পেশাল কাচ্চি বিরিয়ানি',
    category: 'Food',
    price: 890,
    stock: 22,
    inStock: true,
    floor: 2,
    business: 'Restaurant & Food Court',
    image: '🍚',
    desc: 'Aromatic basmati rice cooked with tender mutton chunks, saffron, fried onions, roasted potato & boiled egg.',
    keywords: ['biryani', 'kachchi', 'kacchi', 'biriyani', 'mutton', 'কাচ্চি', 'বিরিয়ানি']
  },
  {
    id: 'prod-kung-pao',
    name: 'Kung Pao Chicken',
    bnName: 'কুং পাও চিকেন',
    category: 'Food',
    price: 780,
    stock: 14,
    inStock: true,
    floor: 2,
    business: 'Restaurant & Food Court',
    image: '🥘',
    desc: 'Tender wok-tossed chicken cubes with Sichuan peppercorns, roasted peanuts, chili peppers & zesty sauce.',
    keywords: ['kung pao', 'chicken', 'chinese chicken', 'চিকেন', 'কুং পাও']
  },
  {
    id: 'prod-dim-sum',
    name: 'Dim Sum Platter (8 pcs)',
    bnName: 'ডিম সাম প্লাটার (৮ পিস)',
    category: 'Food',
    price: 980,
    stock: 16,
    inStock: true,
    floor: 2,
    business: 'Restaurant & Food Court',
    image: '🥟',
    desc: 'Steamed crystal prawn har gao, chicken siu mai, and pan-fried dumplings served with chili oil.',
    keywords: ['dim sum', 'dimsum', 'dumpling', 'momo', 'dumplings', 'ডিম সাম']
  },
  {
    id: 'prod-beef-bhuna',
    name: 'Beef Bhuna (Club Style)',
    bnName: 'বিফ ভুনা (ক্লাব স্টাইল)',
    category: 'Food',
    price: 820,
    stock: 12,
    inStock: true,
    floor: 2,
    business: 'Restaurant & Food Court',
    image: '🥩',
    desc: 'Slow-cooked prime beef simmered in rich caramelized onions, fragrant mustard oil and heritage spices.',
    keywords: ['beef', 'bhuna', 'beef bhuna', 'মাংস', 'বিফ']
  },
  // Floor 2: Unavailable item for testing availability handling!
  {
    id: 'prod-pizza',
    name: 'Artisan Woodfired Pizza',
    bnName: 'উডফায়ার্ড পিজ্জা',
    category: 'Food',
    price: 750,
    stock: 0,
    inStock: false,
    floor: 2,
    business: 'Restaurant & Food Court',
    image: '🍕',
    desc: 'Thin crust Neapolitan pizza with San Marzano tomatoes, fresh buffalo mozzarella and fresh basil leaves.',
    keywords: ['pizza', 'pizaa', 'pizzas', 'cheese pizza', 'পিজ্জা']
  },

  // Floor 3: Coffee Shop & Café
  {
    id: 'prod-cappuccino',
    name: 'Artisan Cappuccino',
    bnName: 'আর্টিসান ক্যাপুচিনো',
    category: 'Beverage',
    price: 320,
    stock: 35,
    inStock: true,
    floor: 3,
    business: 'Coffee Shop & Café',
    image: '☕',
    desc: 'Rich double espresso pulled from medium-roast beans, crowned with velvety steamed milk froth & cocoa dusting.',
    keywords: ['coffee', 'cappuccino', 'hot coffee', 'espresso', 'কফি', 'ক্যাপুচিনো']
  },
  {
    id: 'prod-americano',
    name: 'Signature Americano',
    bnName: 'আমেরিকানো ব্ল্যাক কফি',
    category: 'Beverage',
    price: 260,
    stock: 40,
    inStock: true,
    floor: 3,
    business: 'Coffee Shop & Café',
    image: '☕',
    desc: 'Full-bodied double shot espresso topped with hot purified water, bold and invigorating.',
    keywords: ['americano', 'black coffee', 'coffee', 'আমেরিকানো']
  },
  {
    id: 'prod-sylhet-tea',
    name: 'Heritage Sylhet Tea Pot',
    bnName: 'সিলেট চা পট',
    category: 'Beverage',
    price: 250,
    stock: 30,
    inStock: true,
    floor: 3,
    business: 'Coffee Shop & Café',
    image: '🫖',
    desc: 'Fragrant orange pekoe black tea sourced from the lush hills of Sreemangal, served with milk and cardamom.',
    keywords: ['tea', 'sylhet tea', 'cha', 'milk tea', 'চা', 'সিলেট চা']
  },
  {
    id: 'prod-longjing-tea',
    name: 'Imperial Longjing Dragon Well Green Tea',
    bnName: 'লংজিং ড্রাগন গ্রিন টি',
    category: 'Beverage',
    price: 420,
    stock: 20,
    inStock: true,
    floor: 3,
    business: 'Coffee Shop & Café',
    image: '🍵',
    desc: 'First-harvest pan-roasted flat green tea leaves from West Lake Hangzhou, nutty, vegetal and sweet aftertaste.',
    keywords: ['green tea', 'longjing', 'chinese tea', 'গ্রিন টি', 'চা']
  },
  {
    id: 'prod-cheesecake',
    name: 'New York Baked Cheesecake',
    bnName: 'বেকড চিজকেক স্লাইস',
    category: 'Bakery',
    price: 420,
    stock: 15,
    inStock: true,
    floor: 3,
    business: 'Coffee Shop & Café',
    image: '🍰',
    desc: 'Classic velvety cream cheese cake baked over a buttery graham cracker crust, topped with wild berry compote.',
    keywords: ['cheesecake', 'cake', 'pastry', 'dessert', 'কেক', 'মিষ্টি']
  },
  {
    id: 'prod-club-sandwich',
    name: 'Club Sandwich with Golden Fries',
    bnName: 'ক্লাব স্যান্ডউইচ ও ফ্রাইস',
    category: 'Food',
    price: 620,
    stock: 20,
    inStock: true,
    floor: 3,
    business: 'Coffee Shop & Café',
    image: '🥪',
    desc: 'Triple-decker toasted sandwich layered with grilled chicken breast, boiled egg, turkey ham, crisp lettuce & mayo.',
    keywords: ['sandwich', 'club sandwich', 'snack', 'bread', 'স্যান্ডউইচ']
  },

  // Floor 4: Mobile & Electronics Shop
  {
    id: 'prod-iphone-cable',
    name: 'USB-C to Lightning Fast-Charge Cable (2m)',
    bnName: 'ফাস্ট চার্জিং আইফোন ক্যাবল',
    category: 'Electronics',
    price: 650,
    stock: 24,
    inStock: true,
    floor: 4,
    business: 'Mobile & Electronics Shop',
    image: '🔌',
    desc: 'MFi-certified nylon braided durable fast-charging cable compatible with all Apple iPhone and iPad devices.',
    keywords: ['iphone', 'cable', 'charger', 'lightning', 'apple', 'আইফোন', 'ক্যাবল', 'চার্জার']
  },
  {
    id: 'prod-powerbank',
    name: '20,000mAh Magnetic Wireless Power Bank',
    bnName: '২০,০০০ mAh পাওয়ার ব্যাংক',
    category: 'Electronics',
    price: 2800,
    stock: 11,
    inStock: true,
    floor: 4,
    business: 'Mobile & Electronics Shop',
    image: '🔋',
    desc: 'High-speed 22.5W Power Delivery power bank with digital percentage display and MagSafe magnetic docking.',
    keywords: ['power bank', 'powerbank', 'battery', 'charge', 'পাওয়ার ব্যাংক']
  },
  {
    id: 'prod-earbuds',
    name: 'Pro Wireless ANC Earbuds',
    bnName: 'ওয়্যারলেস নয়েজ-ক্যানসেলিং ইয়ারবাডস',
    category: 'Electronics',
    price: 3500,
    stock: 9,
    inStock: true,
    floor: 4,
    business: 'Mobile & Electronics Shop',
    image: '🎧',
    desc: 'Crystal clear HD audio with Active Noise Cancellation, Bluetooth 5.4, 32-hour battery life & water resistance.',
    keywords: ['earbuds', 'headphone', 'audio', 'earphone', 'bluetooth', 'ইয়ারবাডস']
  },
  {
    id: 'prod-smart-band',
    name: 'Silicone Breathable Watch Band',
    bnName: 'সিলিকন স্মার্ট ওয়াচ ব্যান্ড',
    category: 'Electronics',
    price: 450,
    stock: 30,
    inStock: true,
    floor: 4,
    business: 'Mobile & Electronics Shop',
    image: '⌚',
    desc: 'Comfortable sweat-resistant replacement strap for Apple Watch and standard smartwatches.',
    keywords: ['watch', 'smartwatch', 'band', 'strap', 'ঘড়ি', 'ব্যান্ড']
  },

  // Floor 5: Fashion & Clothing Store
  {
    id: 'prod-silk-scarf',
    name: 'Handcrafted Mulberry Silk Scarf',
    bnName: 'হাতে বোনা খাঁটি সিল্ক স্কার্ফ',
    category: 'Fashion',
    price: 2400,
    stock: 14,
    inStock: true,
    floor: 5,
    business: 'Fashion & Clothing Store',
    image: '🧣',
    desc: 'Pure 100% mulberry silk scarf printed with bilateral friendship calligraphy and heritage lotus motifs.',
    keywords: ['scarf', 'silk', 'silk scarf', 'clothing', 'সিল্ক', 'স্কার্ফ']
  },
  {
    id: 'prod-club-blazer',
    name: 'BCC Crest Tailored Navy Blazer',
    bnName: 'ক্লাব ক্রিস্ট নেভি ব্লেজার',
    category: 'Fashion',
    price: 8500,
    stock: 6,
    inStock: true,
    floor: 5,
    business: 'Fashion & Clothing Store',
    image: '🧥',
    desc: 'Super 120s wool tailored navy blazer featuring embroidered gold bullion club insignia and brass buttons.',
    keywords: ['blazer', 'suit', 'coat', 'jacket', 'ব্লেজার', 'কোট']
  },
  {
    id: 'prod-leather-wallet',
    name: 'Genuine Leather Bifold Wallet',
    bnName: 'খাঁটি চামড়ার মানিব্যাগ',
    category: 'Fashion',
    price: 1850,
    stock: 16,
    inStock: true,
    floor: 5,
    business: 'Fashion & Clothing Store',
    image: '👛',
    desc: 'Handcrafted top-grain cowhide leather wallet with RFID blocking layer and 8 card slots.',
    keywords: ['wallet', 'leather', 'purse', 'মানিব্যাগ', 'ওয়ালেট']
  },

  // Floor 7: Shopping & Lifestyle Mart
  {
    id: 'prod-wild-honey',
    name: 'Sundarbans Wild Raw Honey 500g',
    bnName: 'সুন্দরবনের প্রাকৃতিক খাঁটি মধু',
    category: 'Lifestyle',
    price: 850,
    stock: 25,
    inStock: true,
    floor: 7,
    business: 'Shopping & Lifestyle Mart',
    image: '🍯',
    desc: '100% pure unfiltered organic mangrove forest honey, rich in natural pollen and enzymes.',
    keywords: ['honey', 'organic', 'sundarbans', 'sweet', 'মধু']
  },
  {
    id: 'prod-tea-giftbox',
    name: 'Bilateral Heritage Tea Gift Box',
    bnName: 'হেরিটেজ চা গিফট বক্স',
    category: 'Lifestyle',
    price: 1950,
    stock: 15,
    inStock: true,
    floor: 7,
    business: 'Shopping & Lifestyle Mart',
    image: '🎁',
    desc: 'Luxurious gift wooden box containing 4 tins: Sylhet Gold, Wuyi Oolong, Jasmine Pearls & Sreemangal White.',
    keywords: ['gift', 'tea gift', 'gift box', 'souvenir', 'উপহার']
  },

  // Floor 8: Gym & Fitness Pass
  {
    id: 'prod-gym-pass',
    name: 'Gym & Fitness Center Day Pass',
    bnName: 'জিম ও ফিটনেস ডে পাস',
    category: 'Fitness',
    price: 500,
    stock: 50,
    inStock: true,
    floor: 8,
    business: 'Gym & Fitness Center',
    image: '🏋️',
    desc: 'Full day access to cardio deck, free weights, CrossFit rack, locker room, sauna & certified trainer consultation.',
    keywords: ['gym pass', 'gym', 'workout', 'fitness pass', 'জিম', 'ফিটনেস']
  },

  // Floor 9: Swimming Pool Pass
  {
    id: 'prod-pool-pass',
    name: 'Olympic Swimming Pool & Spa Pass',
    bnName: 'সুইমিং পুল ও স্পা পাস',
    category: 'Wellness',
    price: 600,
    stock: 40,
    inStock: true,
    floor: 9,
    business: 'Swimming Pool & Wellness Spa',
    image: '🏊',
    desc: 'Day pass for heated Olympic pool, whirlpool jacuzzi hydrotherapy, steam rooms and poolside sunloungers.',
    keywords: ['pool pass', 'swim pass', 'swimming pool', 'pool', 'সুইমিং পুল', 'সাঁতার']
  },

  // Floor 10: Rooftop Lounge Mocktail
  {
    id: 'prod-jasmine-mocktail',
    name: 'Jasmine Tea Sunset Mocktail',
    bnName: 'জেসমিন টি সানসেট মকটেল',
    category: 'Beverage',
    price: 450,
    stock: 30,
    inStock: true,
    floor: 10,
    business: 'Premium Lounge & Event Banquet',
    image: '🍹',
    desc: 'Chilled cold brew jasmine tea infused with fresh lychee juice, lime squeeze, mint leaves & sparkling soda.',
    keywords: ['mocktail', 'drink', 'cold drink', 'cocktail', 'beverage', 'পানীয়', 'মকটেল']
  }
];

// ============================================================================
// BACKEND-CONTROLLED AI TOOLS (Requirement #7)
// ============================================================================

/**
 * Tool 1: Search building services across all 10 floors
 */
export function searchBuildingServices(query) {
  if (!query) return BUILDING_FLOORS;
  const q = query.toLowerCase().trim();

  return BUILDING_FLOORS.filter((f) => {
    return (
      f.name.toLowerCase().includes(q) ||
      f.bnName.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      f.desc.toLowerCase().includes(q) ||
      f.facilities.some((fac) => fac.toLowerCase().includes(q))
    );
  });
}

/**
 * Tool 2: Find specific business or service location
 */
export function findBusinessLocation(keyword) {
  const q = keyword.toLowerCase().trim();

  // Match keyword to floor
  if (q.includes('gym') || q.includes('fitness') || q.includes('workout') || q.includes('জিম') || q.includes('kasorot')) {
    return BUILDING_FLOORS.find((f) => f.floor === 8);
  }
  if (q.includes('swim') || q.includes('pool') || q.includes('spa') || q.includes('jacuzzi') || q.includes('সাঁতার') || q.includes('পুল')) {
    return BUILDING_FLOORS.find((f) => f.floor === 9);
  }
  if (q.includes('coffee') || q.includes('cafe') || q.includes('tea') || q.includes('cheesecake') || q.includes('কফি') || q.includes('ক্যাফে')) {
    return BUILDING_FLOORS.find((f) => f.floor === 3);
  }
  if (q.includes('restaurant') || q.includes('food') || q.includes('burger') || q.includes('duck') || q.includes('biryani') || q.includes('রেস্তোরাঁ') || q.includes('খাবার')) {
    return BUILDING_FLOORS.find((f) => f.floor === 2);
  }
  if (q.includes('mobile') || q.includes('phone') || q.includes('electronics') || q.includes('charger') || q.includes('iphone') || q.includes('মোবাইল')) {
    return BUILDING_FLOORS.find((f) => f.floor === 4);
  }
  if (q.includes('cloth') || q.includes('fashion') || q.includes('dress') || q.includes('blazer') || q.includes('panjabi') || q.includes('পোশাক')) {
    return BUILDING_FLOORS.find((f) => f.floor === 5);
  }
  if (q.includes('office') || q.includes('meeting') || q.includes('conference') || q.includes('boardroom') || q.includes('কর্পোরেট')) {
    return BUILDING_FLOORS.find((f) => f.floor === 6);
  }
  if (q.includes('mart') || q.includes('shopping') || q.includes('store') || q.includes('honey') || q.includes('gift') || q.includes('শপিং')) {
    return BUILDING_FLOORS.find((f) => f.floor === 7);
  }
  if (q.includes('reception') || q.includes('lobby') || q.includes('concierge') || q.includes('desk') || q.includes('entrance') || q.includes('অভ্যর্থনা')) {
    return BUILDING_FLOORS.find((f) => f.floor === 1);
  }
  if (q.includes('lounge') || q.includes('bar') || q.includes('banquet') || q.includes('rooftop') || q.includes('terrace') || q.includes('লাউঞ্জ')) {
    return BUILDING_FLOORS.find((f) => f.floor === 10);
  }

  // Fallback search in floor descriptions
  return (
    BUILDING_FLOORS.find((f) => f.name.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q)) ||
    null
  );
}

/**
 * Tool 3: Search products in catalog by query, max price, or category
 */
export function searchProducts(query, maxPrice = null, category = null) {
  let list = [...PRODUCTS_CATALOG];

  if (category) {
    list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (maxPrice && !isNaN(maxPrice)) {
    list = list.filter((p) => p.price <= maxPrice);
  }

  if (!query) return list;

  const q = query.toLowerCase().trim();
  return list.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.bnName.toLowerCase().includes(q) ||
      p.keywords.some((k) => k.toLowerCase().includes(q) || q.includes(k.toLowerCase()))
    );
  });
}

/**
 * Tool 4: Check product availability from real database/catalog
 */
export function checkProductAvailability(productId) {
  const prod = PRODUCTS_CATALOG.find((p) => p.id === productId);
  if (!prod) return { exists: false, inStock: false, stock: 0 };
  return {
    exists: true,
    inStock: prod.inStock && prod.stock > 0,
    stock: prod.stock,
    product: prod
  };
}

/**
 * Tool 5: Get product details
 */
export function getProductDetails(productId) {
  return PRODUCTS_CATALOG.find((p) => p.id === productId) || null;
}

/**
 * Tool 6: Get business hours
 */
export function getBusinessHours(floorOrBusiness) {
  let f = null;
  if (typeof floorOrBusiness === 'number') {
    f = BUILDING_FLOORS.find((item) => item.floor === floorOrBusiness);
  } else {
    f = BUILDING_FLOORS.find(
      (item) => item.name.toLowerCase().includes(floorOrBusiness.toLowerCase())
    );
  }
  return f ? { floor: f.floor, business: f.name, hours: f.hours } : null;
}

/**
 * Tool 7: Create Order with validation
 */
export function createOrder({ product, quantity = 1, memberName = 'Anika Rahman' }) {
  if (!product) throw new Error('Product is required to place an order.');
  if (product.stock < quantity || !product.inStock) {
    throw new Error(`Insufficient stock. Only ${product.stock} available.`);
  }

  const orderId = 'BCC-ORD-' + (70000 + Math.floor(Math.random() * 9000));
  const total = product.price * quantity;

  // Decrease stock in catalog
  product.stock -= quantity;
  if (product.stock <= 0) product.inStock = false;

  return {
    orderId,
    product,
    quantity,
    total,
    status: 'Confirmed',
    placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    pickupLocation: `${product.business}, Floor ${product.floor}`,
    floor: product.floor,
    memberName
  };
}

/**
 * Tool 8: Find alternative products if requested item is out of stock
 */
export function findAlternativeProducts(requestedCategoryOrFloor) {
  return PRODUCTS_CATALOG.filter(
    (p) =>
      p.inStock &&
      p.stock > 0 &&
      (p.category === requestedCategoryOrFloor || p.floor === requestedCategoryOrFloor)
  ).slice(0, 3);
}

// ============================================================================
// CONVERSATIONAL INTENT PARSER & AI REASONING ENGINE
// Handles Bangla + English + Phonetic Banglish natural language with spelling mistakes
// ============================================================================

export function processSmartConversation({ text, context = {}, activeFloor = 1 }) {
  if (!text || !text.trim()) return null;

  const raw = text.trim();
  const lower = raw.toLowerCase();

  // 1. QUANTITY EXTRACTION (e.g. "2 burgers", "two coffees", "want 3 burgers", "2ta burger")
  let requestedQty = 1;
  const numMatch = lower.match(/(\d+)\s*(ta|ti|pcs|pieces)?/);
  if (numMatch && numMatch[1]) {
    requestedQty = Math.max(1, parseInt(numMatch[1], 10));
  } else if (lower.includes('two') || lower.includes('duto') || lower.includes('দুই')) {
    requestedQty = 2;
  } else if (lower.includes('three') || lower.includes('tin') || lower.includes('তিন')) {
    requestedQty = 3;
  } else if (lower.includes('four') || lower.includes('char') || lower.includes('চার')) {
    requestedQty = 4;
  }

  // Common order intent flags
  const isOrderIntent =
    lower.includes('want') ||
    lower.includes('order') ||
    lower.includes('buy') ||
    lower.includes('chai') ||
    lower.includes('kinbo') ||
    lower.includes('dao') ||
    lower.includes('দাও') ||
    lower.includes('চাই');

  // 2. CHECK FOR DIRECT ORDER CONFIRMATION / CANCELLATION ACTIONS
  if (lower === 'confirm order' || lower === 'yes confirm' || lower === 'confirm') {
    if (context.pendingOrder) {
      const confirmed = createOrder({
        product: context.pendingOrder.product,
        quantity: context.pendingOrder.quantity
      });
      return {
        reply: `🎉 **Order Confirmed!** Your order **#${confirmed.orderId}** has been placed successfully.\n\n📍 **Pickup:** ${confirmed.pickupLocation}\n⏱️ **Prep Time:** ~15 minutes\n💵 **Total Paid:** ৳${confirmed.total}`,
        type: 'order_success',
        order: confirmed,
        targetFloor: confirmed.floor,
        context: { ...context, pendingOrder: null, lastOrder: confirmed }
      };
    }
  }

  if (lower === 'cancel order' || lower === 'cancel') {
    if (context.pendingOrder) {
      return {
        reply: '❌ Order proposal has been cancelled. What else can I help you find across our 10 floors?',
        type: 'text',
        targetFloor: activeFloor,
        context: { ...context, pendingOrder: null }
      };
    }
  }

  // 3. CHECK FOR ORDER TRACKING INTENT
  if (lower.includes('track') || lower.includes('my order') || lower.includes('order status') || lower.includes('অর্ডার')) {
    if (context.lastOrder) {
      return {
        reply: `📦 **Order Status for #${context.lastOrder.orderId}**:\n- **Item:** ${context.lastOrder.product.name} × ${context.lastOrder.quantity}\n- **Status:** In Preparation (Ready soon!)\n- **Location:** ${context.lastOrder.pickupLocation}`,
        type: 'order_tracking',
        order: context.lastOrder,
        targetFloor: context.lastOrder.floor,
        context
      };
    } else {
      return {
        reply: 'You currently have no active orders. Would you like to order something delicious from Floor 2 (Restaurant) or Floor 3 (Café)?',
        type: 'text',
        suggestions: ['Order a burger', 'Order coffee', 'View menu'],
        targetFloor: 2,
        context
      };
    }
  }

  // 4. CHECK FOR 10-FLOOR BUILDING NAVIGATION & LOCATION INQUIRIES FIRST
  // (e.g. "Where is the gym?", "What about swimming?", "Where is mobile shop?", "Floor 8 a ki ache?")
  const isLocationQuestion =
    lower.includes('where') ||
    lower.includes('location') ||
    lower.includes('which floor') ||
    lower.includes('what floor') ||
    lower.includes('kothay') ||
    lower.includes('koi') ||
    lower.includes('কোথায়') ||
    lower.includes('কোন ফ্লোরে') ||
    lower.includes('what about') ||
    lower.includes('how to go') ||
    lower.includes('directions');

  const detectedFloor = findBusinessLocation(lower);

  // If it's explicitly a location question, or matches a facility without buy/order words
  if (detectedFloor && (isLocationQuestion || (!isOrderIntent && !lower.includes('price')))) {
    let conversationalResponse = '';

    if (detectedFloor.floor === 8) {
      conversationalResponse = `🏋️ The **Gym & Fitness Center** is located on **Floor 8**.\n\nOpen daily 06:00 – 22:00. Equipped with cardio gear, free weights, CrossFit rack, Table Tennis and Yoga studio. Certified trainers on duty!`;
    } else if (detectedFloor.floor === 9) {
      conversationalResponse = `🏊 The **Swimming Pool & Wellness Spa** is located on **Floor 9**.\n\nOpen until 20:30. Features an Olympic-length heated pool, whirlpool jacuzzi hydrotherapy, Finnish sauna and squash courts.`;
    } else if (detectedFloor.floor === 3) {
      conversationalResponse = `☕ The **Coffee Shop & Café (Tea Garden)** is located on **Floor 3**.\n\nServing artisanal cappuccino, Americano, Longjing green tea, cheesecake and club sandwiches.`;
    } else if (detectedFloor.floor === 2) {
      conversationalResponse = `🥢 The **Restaurant & Food Court (Silk Route)** is located on **Floor 2**.\n\nAuthentic Beijing roast duck, dim sum, burgers, kachchi biryani and club specialties.`;
    } else if (detectedFloor.floor === 4) {
      conversationalResponse = `📱 The **Mobile & Electronics Shop** is located on **Floor 4**.\n\nSmartphones, iPhone accessories, fast-charging cables, power banks and express device repair.`;
    } else if (detectedFloor.floor === 5) {
      conversationalResponse = `👔 The **Fashion & Clothing Store** is located on **Floor 5**.\n\nBespoke tailored blazers, handcrafted silk scarves, traditional Panjabi and leather lifestyle goods.`;
    } else if (detectedFloor.floor === 6) {
      conversationalResponse = `💼 **Corporate Offices & Boardrooms** are located on **Floor 6**.\n\nExecutive boardrooms, high-definition video conferencing suites and secretarial meeting rooms.`;
    } else if (detectedFloor.floor === 7) {
      conversationalResponse = `🛍️ The **Shopping & Lifestyle Mart** is located on **Floor 7**.\n\nHeritage tea gift boxes, Sundarbans wild raw honey, imported treats and BCC souvenirs.`;
    } else if (detectedFloor.floor === 1) {
      conversationalResponse = `🛎️ The **Reception & Information Desk** is located on **Floor 1 (Lobby)**.\n\nOpen 24/7. Assistance with member check-in, guest passes, airport transfers and smart cards.`;
    } else if (detectedFloor.floor === 10) {
      conversationalResponse = `🍸 The **Premium Lounge & Lantern Bar** is located on **Floor 10 (Rooftop)**.\n\nPanoramic riverfront skyline view, evening BBQ grill, artisanal mocktails and 300-seat grand banquet hall.`;
    } else {
      conversationalResponse = `📍 **${detectedFloor.name}** is located on **Floor ${detectedFloor.floor}** (${detectedFloor.hours}).`;
    }

    return {
      reply: conversationalResponse,
      type: 'floor_navigation',
      targetFloor: detectedFloor.floor,
      floorDetails: detectedFloor,
      suggestions: [
        detectedFloor.floor === 8 ? 'What about swimming?' : 'Where is the gym?',
        'Can I order coffee?',
        'Explore All Floors'
      ],
      context: { ...context, lastFloor: detectedFloor.floor }
    };
  }

  // 5. CHECK IF A SPECIFIC PRODUCT IS MENTIONED OR ORDERED
  let matchedProduct = null;
  for (const prod of PRODUCTS_CATALOG) {
    if (
      lower.includes(prod.name.toLowerCase()) ||
      lower.includes(prod.bnName.toLowerCase()) ||
      prod.keywords.some((kw) => lower.includes(kw.toLowerCase()))
    ) {
      matchedProduct = prod;
      break;
    }
  }

  if (matchedProduct) {
    // A) If product is OUT OF STOCK (Requirement #5: "Do you have pizza? -> Sorry, pizza is currently unavailable")
    if (!matchedProduct.inStock || matchedProduct.stock <= 0) {
      const alternatives = findAlternativeProducts(matchedProduct.category || matchedProduct.floor);
      const altText = alternatives.length
        ? `\n\nWould you like to try this alternative?\n` +
        alternatives.map((a) => `• **${a.name}** — ৳${a.price} (${a.business}, Floor ${a.floor})`).join('\n')
        : '';

      return {
        reply: `Sorry, **${matchedProduct.name}** is currently unavailable.${altText}`,
        type: 'unavailable',
        product: matchedProduct,
        alternatives,
        targetFloor: matchedProduct.floor,
        suggestions: alternatives.map((a) => `Order ${a.name}`),
        context
      };
    }

    // B) Product is IN STOCK!
    // If user has order intent or asks for product quantity / want / order:
    if (isOrderIntent || lower.includes('burger') || lower.includes('bargar') || lower.includes('coffee') || lower.includes('duck') || lower.includes('biryani') || lower.includes('pass')) {
      const total = matchedProduct.price * requestedQty;
      const pending = {
        product: matchedProduct,
        quantity: requestedQty,
        total,
        location: `${matchedProduct.business}, Floor ${matchedProduct.floor}`
      };

      return {
        reply: `I found your requested product.\n\n**${matchedProduct.name}** × ${requestedQty}\n**Price:** ৳${matchedProduct.price} each\n**Total:** ৳${total}\n**Location:** ${matchedProduct.business}, Floor ${matchedProduct.floor}\n\nWould you like to confirm your order?`,
        type: 'order_proposal',
        pendingOrder: pending,
        targetFloor: matchedProduct.floor,
        suggestions: ['Confirm Order', 'Cancel'],
        context: { ...context, pendingOrder: pending, lastMentionedProduct: matchedProduct }
      };
    }

    // C) Product inquiry (e.g. "Do you have cappuccino?", "Tell me about duck")
    return {
      reply: `Yes! **${matchedProduct.name}** is available.\n\n• **Price:** ৳${matchedProduct.price}\n• **Status:** In Stock (${matchedProduct.stock} available)\n• **Location:** ${matchedProduct.business}, Floor ${matchedProduct.floor}\n• **Description:** ${matchedProduct.desc}`,
      type: 'product_card',
      product: matchedProduct,
      targetFloor: matchedProduct.floor,
      suggestions: [`Order ${matchedProduct.name}`, `Where is Floor ${matchedProduct.floor}?`],
      context: { ...context, lastMentionedProduct: matchedProduct }
    };
  }

  // 6. PRODUCT DISCOVERY & SEARCH (e.g. "Do you have iPhone?", "Find burger", "cold drink", "under 500")
  if (
    lower.includes('find') ||
    lower.includes('show') ||
    lower.includes('search') ||
    lower.includes('do you have') ||
    lower.includes('available') ||
    lower.includes('ache') ||
    lower.includes('under') ||
    lower.includes('price') ||
    lower.includes('খুঁজ') ||
    lower.includes('আছে')
  ) {
    // Check for price filter: "under 500" / "under ৳500"
    const priceMatch = lower.match(/under\s*৳?(\d+)/);
    const maxPrice = priceMatch ? parseInt(priceMatch[1], 10) : null;

    let searchKw = lower
      .replace(/find|show|me|search|do|you|have|under|৳|\d+|is|there|any|available|products|items/gi, '')
      .trim();

    const matches = searchProducts(searchKw || '', maxPrice);

    if (matches.length > 0) {
      const topMatch = matches[0];
      return {
        reply: maxPrice
          ? `Here are available products under ৳${maxPrice}:`
          : `Here are available items matching your search:`,
        type: 'product_list',
        products: matches.slice(0, 4),
        targetFloor: topMatch.floor,
        suggestions: matches.slice(0, 3).map((m) => `Order ${m.name}`),
        context: { ...context, lastSearchResults: matches }
      };
    } else {
      return {
        reply: `I couldn't find products matching "${raw}". You can explore food on Floor 2, coffee on Floor 3, electronics on Floor 4, or shopping on Floor 7.`,
        type: 'text',
        targetFloor: activeFloor,
        suggestions: ['Order a burger', 'Show me coffee', 'Explore All Floors'],
        context
      };
    }
  }

  // 7. EXPLORE ALL FLOORS INTENT
  if (lower.includes('all floor') || lower.includes('explore') || lower.includes('building') || lower.includes('বিল্ডিং')) {
    return {
      reply: `🏢 **Our 10-Floor Smart Building Directory:**\n\n` +
        BUILDING_FLOORS.map((f) => `• **Floor ${f.floor}:** ${f.name} ${f.icon}`).join('\n') +
        `\n\nAsk me about any floor, service, or product!`,
      type: 'directory',
      targetFloor: activeFloor,
      suggestions: ['Where is the gym?', 'Order a burger', 'Where is swimming pool?'],
      context
    };
  }

  // 8. HOURS & OPENINGS INQUIRY
  if (lower.includes('hour') || lower.includes('open') || lower.includes('time') || lower.includes('কখন')) {
    return {
      reply: `🕒 **Facility Hours Today:**\n• **Front Desk (Floor 1):** 24/7\n• **Café & Coffee (Floor 3):** 07:30 – 22:00\n• **Restaurant (Floor 2):** 11:00 – 23:00\n• **Gym & Fitness (Floor 8):** 06:00 – 22:00\n• **Swimming Pool (Floor 9):** 06:30 – 20:30\n• **Rooftop Lounge (Floor 10):** 12:00 – 00:00`,
      type: 'hours',
      targetFloor: activeFloor,
      suggestions: ['Find Gym', 'Order Food', 'Find Coffee'],
      context
    };
  }

  // 9. GENERAL GREETINGS / BILINGUAL FALLBACK
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('salam') || lower.includes('সালাম')) {
    return {
      reply: `Hello! Welcome to our Smart Building. I can help you find shops, restaurants, products, and facilities across all 10 floors. What are you looking for today?`,
      type: 'greeting',
      targetFloor: activeFloor,
      suggestions: ['Where is the gym?', 'I want a burger', 'Show me coffee', 'Explore All Floors'],
      context
    };
  }

  // 10. INTELLIGENT BILINGUAL FALLBACK
  return {
    reply: `I understand you're asking about "${raw}". I can guide you to any of our 10 floors, search products, or take your food & drink order.\n\nTry asking: *"Where is the gym?"*, *"I want 2 burgers"*, or *"Do you have an iPhone cable?"*`,
    type: 'help',
    targetFloor: activeFloor,
    suggestions: ['Where is the gym?', 'I want a burger', 'Can I order coffee?'],
    context
  };
}
