import React, { useState, useEffect } from 'react';

export const CLUB_FLOORS = [
  {
    level: 4,
    short: 'Roof',
    name: 'Rooftop & Terrace',
    bnName: 'ছাদ ও উন্মুক্ত বাগান',
    facilities: [
      { id: 'bar', name: 'Lantern Bar (灯笼酒吧)', icon: '🏮', desc: 'Craft drinks & mocktails' },
      { id: 'terrace', name: 'Moon-viewing Lawn', icon: '🌙', desc: 'Open terrace lounge' }
    ]
  },
  {
    level: 3,
    short: 'L3',
    name: 'Guest House Accommodation',
    bnName: 'গেস্টহাউস ও স্যুট',
    facilities: [
      { id: 'rooms-deluxe', name: 'Deluxe Rooms (101–106)', icon: '🛏️', desc: 'Standard luxury stay' },
      { id: 'rooms-exec', name: 'Executive Rooms (201–204)', icon: '🛋️', desc: 'Business executive suites' },
      { id: 'rooms-jade', name: 'Jade Suites (301–302)', icon: '👑', desc: 'VIP Presidential suites' }
    ]
  },
  {
    level: 2,
    short: 'L2',
    name: 'Fitness & Sports Complex',
    bnName: 'ফিটনেস ও খেলাধুলা',
    facilities: [
      { id: 'gym', name: 'Modern Gymnasium', icon: '🏋️‍♂️', desc: 'Cardio & weight machines' },
      { id: 'pool', name: 'Swimming Pool', icon: '🏊‍♂️', desc: 'Temperature-controlled lap pool' },
      { id: 'squash', name: 'Squash Courts (1 & 2)', icon: '🎾', desc: 'Glass-back courts' },
      { id: 'tt', name: 'Table Tennis Arena', icon: '🏓', desc: 'Olympic tables' },
      { id: 'yoga', name: 'Yoga & Tai Chi Studio', icon: '🧘', desc: 'Morning meditation' }
    ]
  },
  {
    level: 1,
    short: 'L1',
    name: 'Dining & Banquets',
    bnName: 'রেস্তোরাঁ ও ব্যাঙ্কুয়েট হল',
    facilities: [
      { id: 'silk', name: 'Silk Route Chinese Restaurant', icon: '🥢', desc: 'Authentic Beijing & Sichuan' },
      { id: 'banquet', name: 'Grand Banquet Hall', icon: '🏛️', desc: 'Events & galas' },
      { id: 'kitchen', name: 'Master Chef Kitchen', icon: '👨‍🍳', desc: 'Central preparation' }
    ]
  },
  {
    level: 0,
    short: 'G',
    name: 'Ground Floor Lobby & Reception',
    bnName: 'অভ্যর্থনা ও লবি',
    facilities: [
      { id: 'reception', name: 'Front Desk & Turnstiles', icon: '🛎️', desc: 'Member check-in' },
      { id: 'cafe', name: 'Tea Garden Café', icon: '☕', desc: 'Sylhet & Longjing teas' },
      { id: 'parking', name: 'Valet Parking & Security', icon: '🚗', desc: 'Main gate' }
    ]
  }
];

export default function IndoorRoadmap({ targetFacilityId = 'gym' }) {
  // Find which floor has the target facility
  const initialFloor =
    CLUB_FLOORS.find((f) => f.facilities.some((fac) => fac.id === targetFacilityId))?.level ?? 2;

  const [selectedLevel, setSelectedLevel] = useState(initialFloor);
  const [elevatorPos, setElevatorPos] = useState(0); // starts at ground (0)
  const [isNavigating, setIsNavigating] = useState(true);

  useEffect(() => {
    // Animate elevator cabin from Ground (0) to destination level
    setIsNavigating(true);
    setElevatorPos(0);
    const timeout = setTimeout(() => {
      setElevatorPos(selectedLevel);
      setIsNavigating(false);
    }, 700);
    return () => clearTimeout(timeout);
  }, [selectedLevel]);

  const activeFloorData = CLUB_FLOORS.find((f) => f.level === selectedLevel);
  const targetFac = activeFloorData?.facilities.find((fac) => fac.id === targetFacilityId) ||
    activeFloorData?.facilities[0];

  return (
    <div className="rounded-2xl border border-bcc-line bg-[#07140f] text-white p-4 shadow-xl select-none animate-in fade-in zoom-in-95 my-2">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h4 className="font-serif font-bold text-sm text-[#e8b04a]">
            BCC Indoor Navigation Roadmap
          </h4>
        </div>
        <span className="text-[11px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded-full">
          Floor {selectedLevel === 0 ? 'G (Ground)' : `L${selectedLevel}`}
        </span>
      </div>

      {/* Cross-section Building Model */}
      <div className="relative grid grid-cols-12 gap-3 py-1">
        {/* Elevator Shaft (Left Column) */}
        <div className="col-span-3 flex flex-col justify-between items-center py-1 bg-black/40 rounded-xl border border-white/10 relative overflow-hidden">
          <div className="text-[10px] font-mono uppercase text-[#e8b04a] font-bold tracking-wider mb-1">
            Elevator
          </div>

          {/* Shaft guide lines */}
          <div className="absolute top-7 bottom-3 w-3 bg-white/5 rounded-full border-x border-white/10" />

          {/* Animated Elevator Cab */}
          <div
            className="absolute w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg border border-white/30 flex items-center justify-center text-xs transition-all duration-700 ease-out z-10"
            style={{
              // 4 floors total height distribution: 0 is bottom (approx 80%), 4 is top (approx 12%)
              top: `${(4 - elevatorPos) * 20 + 12}%`
            }}
          >
            🛗
          </div>

          {/* Floor markers */}
          {[4, 3, 2, 1, 0].map((lvl) => (
            <div
              key={lvl}
              className={`text-[10px] font-mono py-1 px-1.5 rounded transition-colors z-20 ${
                selectedLevel === lvl
                  ? 'text-emerald-300 font-bold'
                  : 'text-gray-500'
              }`}
            >
              {lvl === 0 ? 'G' : `L${lvl}`}
            </div>
          ))}
        </div>

        {/* Building Floors Stack (Right Column) */}
        <div className="col-span-9 space-y-1.5">
          {CLUB_FLOORS.map((floor) => {
            const isTarget = floor.level === selectedLevel;
            const hasHighlightedFacility = floor.facilities.some(
              (f) => f.id === targetFacilityId
            );

            return (
              <div
                key={floor.level}
                onClick={() => setSelectedLevel(floor.level)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isTarget
                    ? 'bg-gradient-to-r from-emerald-900/40 via-emerald-800/20 to-transparent border-emerald-400 shadow-md ring-1 ring-emerald-500/30'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                        isTarget
                          ? 'bg-emerald-500 text-black'
                          : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      {floor.short}
                    </span>
                    <b className="text-xs text-gray-100 font-serif">
                      {floor.name}
                    </b>
                  </div>
                  {hasHighlightedFacility && (
                    <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.2 rounded-full border border-red-500/40 font-semibold animate-pulse">
                      Destination
                    </span>
                  )}
                </div>

                {/* Facilities List in Floor */}
                <div className="flex flex-wrap gap-1 mt-1.5 pt-1 border-t border-white/5">
                  {floor.facilities.map((fac) => {
                    const isSpecificTarget = fac.id === targetFacilityId;

                    return (
                      <span
                        key={fac.id}
                        className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md transition-all ${
                          isSpecificTarget
                            ? 'bg-[#e8b04a] text-black font-bold ring-2 ring-yellow-400 shadow-md animate-bounce'
                            : isTarget
                            ? 'bg-white/10 text-gray-200'
                            : 'bg-white/5 text-gray-400'
                        }`}
                      >
                        <span>{fac.icon}</span>
                        <span>{fac.name.split('(')[0]}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Route Navigation Directions Box */}
      <div className="mt-3 p-3 bg-black/50 rounded-xl border border-white/10 text-xs space-y-1.5">
        <div className="flex items-center gap-1.5 text-[#e8b04a] font-bold font-serif">
          <span>🧭</span>
          <span>
            Route to {targetFac?.name || activeFloorData?.name}:
          </span>
        </div>
        <p className="text-gray-300 text-[11px] leading-relaxed">
          {selectedLevel === 0 ? (
            'Main entrance turnstiles পার হয়ে সোজা এগিয়ে যান। ডানপাশে Tea Garden Café এবং বামপাশে Reception পাবেন।'
          ) : (
            <>
              <b>Ground floor reception lobby</b> থেকে মেইন গ্লাস এলিভেটরে উঠুন ➔{' '}
              <b className="text-emerald-400">
                Level {selectedLevel === 0 ? 'G' : selectedLevel} ({activeFloorData?.name})
              </b>{' '}
              এ নামুন ➔ করিডোর ধরে এগিয়ে গেলেই সামনে{' '}
              <b className="text-[#e8b04a]">{targetFac?.name}</b> দেখতে পাবেন।
            </>
          )}
        </p>
      </div>
    </div>
  );
}

