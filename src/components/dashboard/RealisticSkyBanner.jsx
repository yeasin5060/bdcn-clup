import React, { useState, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useApp } from '../../context/AppContext';
import { ROLE_NAMES } from '../../data/constants';

// ============================================================================
// 24-HOUR PHOTOREALISTIC ATMOSPHERIC KEYFRAMES (RAYLEIGH & MIE SCATTERING)
// Smoothly interpolated via GSAP across the entire 1440-minute day/night cycle
// ============================================================================
const SKY_KEYFRAMES = [
  // 00:00 (12:00 AM) - Deep Midnight / Cosmic Void
  {
    t: 0.0,
    zenith: '#01040a',
    midSky: '#050f1d',
    lowerSky: '#0a1a2e',
    horizon: '#0e243b',
    mountainBack: '#07131b',
    mountainFront: '#03090e',
    waterTop: '#091c2b',
    waterBot: '#02070c',
    sunCore: '#ffffff',
    sunCorona: '#ffe599',
    sunRadius: 20,
    starsOpacity: 1.0,
    cloudTint: '#162334',
    cloudOpacity: 0.25
  },
  // 04:45 AM - Late Night / Pre-Dawn Stillness
  {
    t: 0.198,
    zenith: '#01040a',
    midSky: '#050f1d',
    lowerSky: '#0a1a2e',
    horizon: '#0e243b',
    mountainBack: '#07131b',
    mountainFront: '#03090e',
    waterTop: '#091c2b',
    waterBot: '#02070c',
    sunCore: '#ffffff',
    sunCorona: '#ffe599',
    sunRadius: 20,
    starsOpacity: 1.0,
    cloudTint: '#162334',
    cloudOpacity: 0.25
  },
  // 05:30 AM - Astronomical Dawn (First purple & violet ambient light)
  {
    t: 0.229,
    zenith: '#0a0d24',
    midSky: '#18193f',
    lowerSky: '#361e47',
    horizon: '#5c274f',
    mountainBack: '#1d1326',
    mountainFront: '#120a1a',
    waterTop: '#1d1930',
    waterBot: '#070611',
    sunCore: '#fff4e6',
    sunCorona: '#ffa84d',
    sunRadius: 24,
    starsOpacity: 0.7,
    cloudTint: '#4a2d48',
    cloudOpacity: 0.35
  },
  // 06:15 AM - Nautical & Civil Dawn / Sunrise (Radiant rose-gold & peach)
  {
    t: 0.26,
    zenith: '#18254c',
    midSky: '#3c3e70',
    lowerSky: '#8e4f69',
    horizon: '#f8c278',
    mountainBack: '#523851',
    mountainFront: '#332034',
    waterTop: '#5e3444',
    waterBot: '#1d101a',
    sunCore: '#fff7eb',
    sunCorona: '#ff992b',
    sunRadius: 25,
    starsOpacity: 0.05,
    cloudTint: '#fcd2b2',
    cloudOpacity: 0.55
  },
  // 07:25 AM - Early Morning Golden Radiance
  {
    t: 0.309,
    zenith: '#0f4882',
    midSky: '#2272b7',
    lowerSky: '#69b0e3',
    horizon: '#fbe2ba',
    mountainBack: '#4d756d',
    mountainFront: '#2a5047',
    waterTop: '#2b6582',
    waterBot: '#0e2f42',
    sunCore: '#ffffff',
    sunCorona: '#ffbe3b',
    sunRadius: 22,
    starsOpacity: 0.0,
    cloudTint: '#ffffff',
    cloudOpacity: 0.65
  },
  // 12:00 PM - High Noon / Zenith (Crystalline Rayleigh Azure & Pure Solar Core)
  {
    t: 0.5,
    zenith: '#08417a',
    midSky: '#176cb0',
    lowerSky: '#4aa0de',
    horizon: '#e2f2fc',
    mountainBack: '#517f75',
    mountainFront: '#264e45',
    waterTop: '#2e708f',
    waterBot: '#103347',
    sunCore: '#ffffff',
    sunCorona: '#fff2ab',
    sunRadius: 20,
    starsOpacity: 0.0,
    cloudTint: '#ffffff',
    cloudOpacity: 0.72
  },
  // 04:15 PM - Late Afternoon Warmth
  {
    t: 0.677,
    zenith: '#0d4880',
    midSky: '#2076b6',
    lowerSky: '#63aae0',
    horizon: '#f6ebd6',
    mountainBack: '#557c71',
    mountainFront: '#2d5147',
    waterTop: '#316885',
    waterBot: '#113244',
    sunCore: '#ffffff',
    sunCorona: '#ffd15c',
    sunRadius: 21,
    starsOpacity: 0.0,
    cloudTint: '#fff6e5',
    cloudOpacity: 0.68
  },
  // 05:15 PM - Golden Hour (Warm amber & glowing orange horizon)
  {
    t: 0.718,
    zenith: '#192a59',
    midSky: '#4a3a6e',
    lowerSky: '#9c4959',
    horizon: '#fba031',
    mountainBack: '#4c293c',
    mountainFront: '#2b1523',
    waterTop: '#78383c',
    waterBot: '#291016',
    sunCore: '#fff2db',
    sunCorona: '#ff8400',
    sunRadius: 23,
    starsOpacity: 0.0,
    cloudTint: '#fcd3ad',
    cloudOpacity: 0.62
  },
  // 06:00 PM - Fiery Sunset (Vermillion, crimson, magenta & blazing coral)
  {
    t: 0.75,
    zenith: '#1b0c39',
    midSky: '#5a1548',
    lowerSky: '#b3263b',
    horizon: '#ff771a',
    mountainBack: '#3b1026',
    mountainFront: '#1f0714',
    waterTop: '#922a27',
    waterBot: '#2b0a12',
    sunCore: '#ffeed6',
    sunCorona: '#ff3700',
    sunRadius: 25,
    starsOpacity: 0.05,
    cloudTint: '#fca283',
    cloudOpacity: 0.58
  },
  // 06:55 PM - Civil & Nautical Dusk (Deep purple twilight & blue hour)
  {
    t: 0.795,
    zenith: '#0c0f2a',
    midSky: '#201540',
    lowerSky: '#471c45',
    horizon: '#73243f',
    mountainBack: '#1d0e21',
    mountainFront: '#0f0612',
    waterTop: '#2b1728',
    waterBot: '#0c060f',
    sunCore: '#ffe0b2',
    sunCorona: '#ff5500',
    sunRadius: 24,
    starsOpacity: 0.5,
    cloudTint: '#4a2542',
    cloudOpacity: 0.4
  },
  // 08:15 PM - Nightfall & Stars Awakening
  {
    t: 0.85,
    zenith: '#020511',
    midSky: '#061125',
    lowerSky: '#0b1c33',
    horizon: '#112944',
    mountainBack: '#08141d',
    mountainFront: '#040b11',
    waterTop: '#0b1f2e',
    waterBot: '#03080e',
    sunCore: '#ffffff',
    sunCorona: '#ffe599',
    sunRadius: 20,
    starsOpacity: 0.95,
    cloudTint: '#19263a',
    cloudOpacity: 0.28
  },
  // 12:00 AM (Wrap-around back to Midnight seamlessly)
  {
    t: 1.0,
    zenith: '#01040a',
    midSky: '#050f1d',
    lowerSky: '#0a1a2e',
    horizon: '#0e243b',
    mountainBack: '#07131b',
    mountainFront: '#03090e',
    waterTop: '#091c2b',
    waterBot: '#02070c',
    sunCore: '#ffffff',
    sunCorona: '#ffe599',
    sunRadius: 20,
    starsOpacity: 1.0,
    cloudTint: '#162334',
    cloudOpacity: 0.25
  }
];

// Helper: Calculate smoothly interpolated sky properties at any time progress (0..1)
function getSkyAt(progress) {
  const p = Math.max(0, Math.min(1, progress));
  for (let i = 0; i < SKY_KEYFRAMES.length - 1; i++) {
    const k1 = SKY_KEYFRAMES[i];
    const k2 = SKY_KEYFRAMES[i + 1];
    if (p >= k1.t && p <= k2.t) {
      const segP = (p - k1.t) / (k2.t - k1.t);
      const res = {};
      for (const key of Object.keys(k1)) {
        if (key === 't') continue;
        if (typeof k1[key] === 'number') {
          res[key] = k1[key] + (k2[key] - k1[key]) * segP;
        } else {
          res[key] = gsap.utils.interpolate(k1[key], k2[key], segP);
        }
      }
      return res;
    }
  }
  return SKY_KEYFRAMES[0];
}

export default function RealisticSkyBanner() {
  const { role } = useApp();

  // Mode: 'loop' (GSAP 24-Hour Continuous Auto Loop) or 'realtime' (Live clock sync)
  const [mode, setMode] = useState('loop');
  const [minuteOfDay, setMinuteOfDay] = useState(15 * 60 + 10);
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const loopProxyRef = useRef({ minute: 15 * 60 + 10 });
  const sunCoronaRef = useRef(null);
  const sunRaysRef = useRef(null);
  const meteorRef = useRef(null);

  // 1. GSAP 24-Hour Continuous Auto Loop
  useEffect(() => {
    let loopTween = null;
    if (mode === 'loop') {
      loopProxyRef.current.minute = minuteOfDay % 1440;
      loopTween = gsap.to(loopProxyRef.current, {
        minute: '+=1440',
        duration: 48, // 48 seconds for a complete, silky smooth 24-hour cinematic cycle
        repeat: -1,
        ease: 'none',
        onUpdate: () => {
          setMinuteOfDay(loopProxyRef.current.minute % 1440);
        }
      });
    }
    return () => {
      if (loopTween) loopTween.kill();
    };
  }, [mode]);

  // 2. Real-time Live clock sync
  useEffect(() => {
    if (mode === 'realtime') {
      const updateLive = () => {
        const d = new Date();
        setCurrentDate(d);
        setMinuteOfDay(d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60);
      };
      updateLive();
      const timer = setInterval(updateLive, 1000);
      return () => clearInterval(timer);
    }
  }, [mode]);

  // 3. GSAP Organic Solar Coronal Breathing & Streamer Rotation
  useEffect(() => {
    let coronaTween = null;
    let raysTween = null;

    if (sunCoronaRef.current) {
      coronaTween = gsap.to(sunCoronaRef.current, {
        scale: 1.07,
        opacity: 0.95,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'center center'
      });
    }

    if (sunRaysRef.current) {
      raysTween = gsap.to(sunRaysRef.current, {
        rotation: 360,
        duration: 90,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center'
      });
    }

    return () => {
      if (coronaTween) coronaTween.kill();
      if (raysTween) raysTween.kill();
    };
  }, []);

  // 4. GSAP Periodic Night Shooting Star (Meteor)
  useEffect(() => {
    let meteorTimer = null;
    const triggerMeteor = () => {
      if (meteorRef.current) {
        gsap.fromTo(
          meteorRef.current,
          { x: 380, y: -10, opacity: 0 },
          {
            x: 220,
            y: 65,
            opacity: 0.95,
            duration: 0.7,
            ease: 'power2.in',
            onComplete: () => {
              gsap.to(meteorRef.current, { opacity: 0, duration: 0.3 });
            }
          }
        );
      }
      meteorTimer = setTimeout(triggerMeteor, 12000 + Math.random() * 8000);
    };

    meteorTimer = setTimeout(triggerMeteor, 5000);
    return () => clearTimeout(meteorTimer);
  }, []);

  // Calculate full dynamic physical sky values for the current minute
  const progressOfDay = (minuteOfDay % 1440) / 1440;
  const sky = useMemo(() => getSkyAt(progressOfDay), [progressOfDay]);

  // Formatted digital time string
  const formattedTime = useMemo(() => {
    const totalSecs = Math.floor(minuteOfDay * 60);
    const hrs = Math.floor(totalSecs / 3600) % 24;
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }, [minuteOfDay]);

  // Celestial Arc Coordinates (Realistic East -> West Parabolic Orbit)
  // Day runs from 05:45 (345 min) to 18:25 (1105 min) = 760 mins
  // Night runs from 18:25 (1105 min) to 05:45 (345 min) = 680 mins
  const isDay = minuteOfDay >= 345 && minuteOfDay < 1105;
  const isSunset = minuteOfDay >= 1000 && minuteOfDay < 1115; // 16:40 to 18:35
  const isDawn = minuteOfDay >= 335 && minuteOfDay < 450; // 05:35 to 07:30
  const isNight = !isDay;

  const celestial = useMemo(() => {
    if (isDay) {
      const p = Math.max(0, Math.min(1, (minuteOfDay - 345) / 760));
      // X travels from 75 (East) to 825 (West)
      const x = 75 + p * 750;
      // Parabolic altitude: highest at noon (p=0.5, y=26), horizon at sunrise/sunset (y=118)
      const y = 26 + 92 * 4 * Math.pow(p - 0.5, 2);
      const altitude = Math.max(0, Math.round(78 * (1 - 4 * Math.pow(p - 0.5, 2))));

      return { x, y, altitude, isSun: true, progress: p };
    } else {
      let minsSinceMoonrise = 0;
      if (minuteOfDay >= 1105) {
        minsSinceMoonrise = minuteOfDay - 1105;
      } else {
        minsSinceMoonrise = 1440 - 1105 + minuteOfDay;
      }
      const p = Math.max(0, Math.min(1, minsSinceMoonrise / 680));
      const x = 75 + p * 750;
      const y = 28 + 86 * 4 * Math.pow(p - 0.5, 2);
      const altitude = Math.max(0, Math.round(72 * (1 - 4 * Math.pow(p - 0.5, 2))));

      return { x, y, altitude, isSun: false, progress: p };
    }
  }, [minuteOfDay, isDay]);

  // Stars coordinates for night sky
  const stars = useMemo(
    () => [
      [35, 18, 1.2, 0.9, 2.2],
      [75, 42, 0.9, 0.7, 3.1],
      [115, 14, 1.5, 0.95, 2.8],
      [160, 48, 1.0, 0.8, 1.9],
      [210, 24, 1.4, 0.85, 3.5],
      [265, 52, 0.8, 0.6, 2.4],
      [320, 16, 1.6, 0.95, 2.1],
      [380, 38, 1.1, 0.75, 3.8],
      [430, 22, 1.3, 0.88, 2.6],
      [490, 45, 0.9, 0.65, 1.8],
      [540, 15, 1.7, 0.92, 3.2],
      [595, 50, 1.0, 0.7, 2.7],
      [640, 26, 1.2, 0.8, 3.4],
      [695, 40, 1.5, 0.9, 2.0],
      [745, 18, 1.1, 0.75, 3.6],
      [800, 46, 0.8, 0.6, 2.3],
      [855, 25, 1.4, 0.9, 1.7],
      [885, 55, 1.0, 0.8, 3.0],
      [140, 68, 1.1, 0.7, 2.5],
      [290, 72, 1.3, 0.85, 3.3],
      [460, 65, 0.9, 0.65, 2.9],
      [610, 70, 1.2, 0.75, 2.1],
      [770, 62, 1.4, 0.85, 3.7]
    ],
    []
  );

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-bcc-line select-none transition-all duration-700 group">
      {/* Dynamic Photorealistic Sky Canvas SVG */}
      <svg
        viewBox="0 0 900 170"
        preserveAspectRatio="xMidYMid slice"
        aria-label="Real-Time 24-Hour Sky Banner"
        className="w-full h-40 sm:h-48 md:h-52 object-cover block"
      >
        <defs>
          {/* ================= 1. DYNAMIC ATMOSPHERIC SKY GRADIENT ================= */}
          {/* Interpolated smoothly in real-time via GSAP Rayleigh & Mie physics */}
          <linearGradient id="dynamic-sky-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={sky.zenith} />
            <stop offset="35%" stopColor={sky.midSky} />
            <stop offset="70%" stopColor={sky.lowerSky} />
            <stop offset="100%" stopColor={sky.horizon} />
          </linearGradient>

          {/* ================= 2. ATMOSPHERIC MIE SCATTERING DOME ================= */}
          {/* Follows the Sun and bathes the local sky in soft golden/azure light */}
          <radialGradient id="sun-mie-dome" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={sky.sunCorona} stopOpacity="0.55" />
            <stop offset="40%" stopColor={sky.sunCorona} stopOpacity="0.22" />
            <stop offset="75%" stopColor={sky.sunCorona} stopOpacity="0.06" />
            <stop offset="100%" stopColor={sky.sunCorona} stopOpacity="0" />
          </radialGradient>

          {/* ================= 3. PHOTOREALISTIC SOLAR ANATOMY ================= */}
          {/* Solar Ambient Coronal Bloom */}
          <radialGradient id="sun-corona-outer" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="30%" stopColor={sky.sunCorona} stopOpacity="0.8" />
            <stop offset="65%" stopColor={sky.sunCorona} stopOpacity="0.25" />
            <stop offset="100%" stopColor={sky.sunCorona} stopOpacity="0" />
          </radialGradient>

          {/* Solar Chromosphere / Fusion Disc */}
          <radialGradient id="sun-photosphere" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="45%" stopColor={sky.sunCore} stopOpacity="0.98" />
            <stop offset="80%" stopColor={sky.sunCorona} stopOpacity="0.9" />
            <stop offset="100%" stopColor={sky.sunCorona} stopOpacity="0" />
          </radialGradient>

          {/* ================= 4. PHOTOREALISTIC 3D LUNAR SPHERE ================= */}
          <radialGradient id="moon-sphere-shading" cx="42%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#f3f7fa" />
            <stop offset="68%" stopColor="#d6e1ea" />
            <stop offset="88%" stopColor="#9fb1c1" />
            <stop offset="100%" stopColor="#6a7d8d" />
          </radialGradient>

          <radialGradient id="moon-lunar-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ebf6ff" stopOpacity="0.75" />
            <stop offset="32%" stopColor="#b5dbff" stopOpacity="0.32" />
            <stop offset="65%" stopColor="#66a8ff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0055ff" stopOpacity="0" />
          </radialGradient>

          {/* ================= 5. DYNAMIC RIVER WATER GRADIENT ================= */}
          <linearGradient id="dynamic-water-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={sky.waterTop} />
            <stop offset="100%" stopColor={sky.waterBot} />
          </linearGradient>

          {/* Natural Water Celestial Reflections */}
          <radialGradient id="water-sun-reflection" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="35%" stopColor={sky.sunCorona} stopOpacity="0.6" />
            <stop offset="70%" stopColor={sky.sunCorona} stopOpacity="0.2" />
            <stop offset="100%" stopColor={sky.sunCorona} stopOpacity="0" />
          </radialGradient>

          <radialGradient id="water-moon-reflection" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#cae6fc" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#80b8e6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#4080b0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. DYNAMIC REAL-TIME ATMOSPHERIC SKY CANVAS */}
        <rect width="900" height="170" fill="url(#dynamic-sky-gradient)" />

        {/* 2. ATMOSPHERIC SOLAR MIE SCATTERING AURA (Centered on the Sun) */}
        {isDay && (
          <circle
            cx={celestial.x}
            cy={celestial.y}
            r={isSunset ? 260 : 200}
            fill="url(#sun-mie-dome)"
            opacity={isSunset ? 0.85 : 0.65}
          />
        )}

        {/* 3. NIGHT SKY: STARS & SHOOTING METEOR */}
        {sky.starsOpacity > 0.04 && (
          <g opacity={sky.starsOpacity}>
            {/* Deep Cosmic Nebula Dust */}
            <ellipse cx="260" cy="38" rx="140" ry="28" fill="#3b5982" opacity="0.16" />
            <ellipse cx="640" cy="34" rx="160" ry="32" fill="#5e427d" opacity="0.14" />
            <ellipse cx="450" cy="22" rx="110" ry="20" fill="#316e78" opacity="0.12" />

            {/* Twinkling Star Field */}
            {stars.map(([cx, cy, r, baseOp, dur], idx) => (
              <circle
                key={idx}
                cx={cx}
                cy={cy}
                r={r}
                fill="#ffffff"
                opacity={baseOp}
                className="animate-pulse"
                style={{ animationDuration: `${dur}s` }}
              />
            ))}

            {/* GSAP Shooting Star / Meteor Streak */}
            <g ref={meteorRef} opacity="0">
              <line
                x1="0"
                y1="0"
                x2="-38"
                y2="-18"
                stroke="#ffffff"
                strokeWidth="2.0"
                strokeLinecap="round"
              />
              <line
                x1="0"
                y1="0"
                x2="-60"
                y2="-28"
                stroke="#70c4ff"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.6"
              />
            </g>
          </g>
        )}

        {/* 4. VOLUMETRIC DRIFTING CLOUDS (Dynamically Light-Tinted) */}
        <g
          className="cloud-drift-anim"
          opacity={sky.cloudOpacity}
          style={{ transition: 'opacity 0.5s ease' }}
        >
          <ellipse cx="140" cy="52" rx="90" ry="22" fill={sky.cloudTint} />
          <ellipse cx="195" cy="42" rx="65" ry="26" fill={sky.cloudTint} />
          <ellipse cx="95" cy="56" rx="55" ry="18" fill={sky.cloudTint} />

          <ellipse cx="460" cy="62" rx="120" ry="24" fill={sky.cloudTint} />
          <ellipse cx="525" cy="50" rx="75" ry="28" fill={sky.cloudTint} />
          <ellipse cx="410" cy="66" rx="70" ry="19" fill={sky.cloudTint} />

          <ellipse cx="780" cy="48" rx="85" ry="20" fill={sky.cloudTint} />
          <ellipse cx="835" cy="40" rx="50" ry="22" fill={sky.cloudTint} />
        </g>

        {/* 5. CELESTIAL BODY: PURE PHOTOREALISTIC SUN OR 3D MOON */}
        <g transform={`translate(${celestial.x}, ${celestial.y})`}>
          {celestial.isSun ? (
            /* ================= ULTRA-PHOTOREALISTIC SUN (CONCENTRIC & PURE) ================= */
            <g>
              {/* Layer 1: Ambient Solar Coronal Flare (GSAP Breathing) */}
              <circle
                ref={sunCoronaRef}
                cx="0"
                cy="0"
                r={sky.sunRadius * 2.8}
                fill="url(#sun-corona-outer)"
              />

              {/* Layer 2: Ultra-Soft Coronal Streamers (GSAP Slow Subtle Rotation) */}
              <g ref={sunRaysRef} opacity={isSunset ? 0.16 : 0.22}>
                <polygon
                  points="0,-48 3,-18 48,0 3,18 0,48 -3,18 -48,0 -3,-18"
                  fill={sky.sunCorona}
                />
                <polygon
                  points="-34,-34 0,-14 34,-34 14,0 34,34 0,14 -34,34 -14,0"
                  fill={sky.sunCorona}
                />
              </g>

              {/* Layer 3: Radiant Inner Chromosphere */}
              <circle
                cx="0"
                cy="0"
                r={sky.sunRadius * 1.6}
                fill="url(#sun-corona-outer)"
                opacity="0.88"
              />

              {/* Layer 4: Brilliant Solar Photosphere Disc */}
              <circle
                cx="0"
                cy="0"
                r={sky.sunRadius}
                fill="url(#sun-photosphere)"
              />

              {/* Layer 5: Blinding White-Hot Nuclear Core */}
              <circle
                cx="0"
                cy="0"
                r={sky.sunRadius * 0.72}
                fill={sky.sunCore}
                opacity={isSunset ? 0.94 : 0.99}
              />
            </g>
          ) : (
            /* ================= PHOTOREALISTIC 3D MOON ================= */
            <g>
              {/* Lunar Halo Glow */}
              <circle cx="0" cy="0" r="75" fill="url(#moon-lunar-halo)" />
              <circle cx="0" cy="0" r="45" fill="url(#moon-lunar-halo)" opacity="0.8" />

              {/* Moon Spherical Body */}
              <circle
                cx="0"
                cy="0"
                r="26"
                fill="url(#moon-sphere-shading)"
                filter="drop-shadow(0 0 14px rgba(210, 235, 255, 0.75))"
              />

              {/* Basalt Plains (Lunar Maria: Tranquillitatis, Serenitatis) */}
              <ellipse cx="-5" cy="-6" rx="8" ry="6" fill="#889cb0" opacity="0.48" />
              <ellipse cx="7" cy="-3" rx="7.5" ry="5.5" fill="#7d91a3" opacity="0.45" />
              <ellipse cx="-8" cy="7" rx="8.5" ry="6.5" fill="#8499ab" opacity="0.44" />
              <ellipse cx="5" cy="9" rx="6.5" ry="5" fill="#7a8d9f" opacity="0.4" />

              {/* Subtle Impact Craters */}
              <circle cx="-13" cy="-10" r="2.4" fill="#6d8091" opacity="0.55" />
              <circle cx="11" cy="-12" r="1.9" fill="#6d8091" opacity="0.5" />
              <circle cx="-2" cy="14" r="2.6" fill="#6d8091" opacity="0.52" />
              <circle cx="13" cy="6" r="1.8" fill="#6d8091" opacity="0.45" />

              {/* Earthshine & Terminator Crescent Shadow */}
              <path
                d="M 0 -26 A 26 26 0 0 1 0 26 A 22 26 0 0 0 0 -26 Z"
                fill="#06121d"
                opacity="0.25"
              />
            </g>
          )}
        </g>

        {/* 6. DISTANT RIVERBANK MOUNTAIN SILHOUETTES */}
        <path
          d="M0 120 Q150 95 300 118 T600 108 T900 116 V170 H0 Z"
          fill={sky.mountainBack}
          opacity="0.65"
        />

        <path
          d="M0 126 Q120 112 240 124 T480 118 T720 125 T900 121 V170 H0 Z"
          fill={sky.mountainFront}
          opacity="0.9"
        />

        {/* 7. CALM RIVER WATER SURFACE (Dynamically Reflecting the Sky) */}
        <rect y="126" width="900" height="44" fill="url(#dynamic-water-gradient)" />

        {/* 8. WATER SURFACE SPECULAR REFLECTION (Directly beneath Celestial Body) */}
        {celestial.isSun ? (
          <ellipse
            cx={celestial.x}
            cy="144"
            rx={isSunset ? 56 : 42}
            ry="9"
            fill="url(#water-sun-reflection)"
            opacity={isSunset ? 0.75 : 0.6}
          />
        ) : (
          <ellipse
            cx={celestial.x}
            cy="144"
            rx="38"
            ry="7"
            fill="url(#water-moon-reflection)"
            opacity="0.55"
          />
        )}

        {/* 9. TRADITIONAL BCC WOODEN RIVER BOATS & WARM LANTERNS */}
        <g transform="translate(210, 129)">
          <path
            d="M-30 0C-24 9 24 9 30 0C35 -4 38 -9 40 -16C28 -7 -24 -7 -40 -18C-38 -9 -35 -4 -30 0Z"
            fill={isNight ? '#030806' : isSunset ? '#260e10' : '#2c1a10'}
          />
          <path
            d="M-16 -7L-16 -44C6 -34 11 -20 16 -9Z"
            fill={isNight ? '#3a4a44' : isSunset ? '#a65437' : '#f1e3c4'}
          />
          <circle cx="16" cy="-9" r="3.5" fill="#ffb424" />
          <circle
            cx="16"
            cy="-9"
            r={isNight ? 9 : 6}
            fill="#ff7700"
            opacity={isNight ? 0.75 : 0.4}
            className={isNight ? 'animate-pulse' : ''}
          />
        </g>

        <g transform="translate(680, 131)">
          <path
            d="M-24 0L22 0C27 -3 29 -8 31 -14L-29 -12C-27 -7 -25 -3 -24 0Z"
            fill={isNight ? '#050c09' : isSunset ? '#361517' : '#571712'}
          />
          <path
            d="M-7 -12V-46C5 -48 10 -44 12 -42V-12Z"
            fill={isNight ? '#2d3b36' : isSunset ? '#7d2e26' : '#a8261c'}
          />
          <circle cx="12" cy="-12" r="3" fill="#ffcc33" />
        </g>
      </svg>

      {/* Atmospheric Text & Celestial Information Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 text-white bg-gradient-to-r from-black/80 via-black/45 to-transparent pointer-events-none">
        <div className="flex items-center gap-3 font-serif text-xl sm:text-2xl font-bold tracking-wide drop-shadow-md">
          <span className="text-[#e8b04a]">স্বাগতম</span>
          <span className="opacity-40">·</span>
          <span className="text-red-400">欢迎</span>
          <span className="opacity-40">·</span>
          <span className="text-white">Welcome</span>
        </div>
        <p className="text-xs sm:text-sm text-gray-200 mt-0.5 max-w-xl font-sans drop-shadow-sm">
          {ROLE_NAMES[role]} view. Everything the club does in real time: members, rooms, dining,
          sports and operations.
        </p>

        {/* Real-Time Celestial Clock & Status Badge */}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-black/50 backdrop-blur-md border border-white/20 text-gray-100 shadow-sm">
            {celestial.isSun ? (
              <>
                <span className="text-amber-400">☀️</span>
                <span>
                  {isDawn
                    ? 'Morning Dawn'
                    : isSunset
                    ? 'Golden Hour Sunset'
                    : 'Sun Altitude'}{' '}
                  · {celestial.altitude}°
                </span>
              </>
            ) : (
              <>
                <span className="text-cyan-300">🌙</span>
                <span>Moonlit Night · Moon Altitude {celestial.altitude}°</span>
              </>
            )}
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-black/40 backdrop-blur-md border border-white/15 text-amber-200 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>🕒 {formattedTime}</span>
            {mode === 'loop' && (
              <span className="text-[10px] text-cyan-300 font-sans uppercase tracking-wider font-bold">
                [24H AUTO LOOP]
              </span>
            )}
            {mode === 'realtime' && (
              <span className="text-[10px] text-emerald-300 font-sans uppercase tracking-wider font-bold">
                [LIVE]
              </span>
            )}
          </span>

          <span className="text-[11px] text-white/70 font-mono hidden sm:inline">
            BCC Riverfront Celestial View
          </span>
        </div>
      </div>

      {/* Top Right Controls: ONLY [⚡ 24h Loop] & [🕒 Live] (as requested!) */}
      <div className="absolute top-3 right-3 flex items-center z-20">
        <div className="flex items-center bg-black/65 backdrop-blur-md border border-white/20 rounded-xl p-1 shadow-lg gap-1">
          <button
            type="button"
            onClick={() => setMode('loop')}
            title="Switch to 24-Hour Continuous Auto Loop"
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              mode === 'loop'
                ? 'bg-cyan-500 text-white shadow-md font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>⚡</span>
            <span>24h Loop</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('realtime')}
            title="Switch to Real-Time Live Clock Sync"
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              mode === 'realtime'
                ? 'bg-emerald-500 text-white shadow-md font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>🕒</span>
            <span>Live</span>
          </button>
        </div>
      </div>
    </div>
  );
}
