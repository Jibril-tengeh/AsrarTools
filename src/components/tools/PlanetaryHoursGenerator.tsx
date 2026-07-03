import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Sunrise, Sunset, Moon, Sun } from 'lucide-react';
import * as SunCalc from 'suncalc';

const PLANETS = [
  { name: 'Saturn', icon: '🪐', color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-800' },
  { name: 'Jupiter', icon: '♃', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { name: 'Mars', icon: '♂', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
  { name: 'Sun', icon: '☀️', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  { name: 'Venus', icon: '♀', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { name: 'Mercury', icon: '☿', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { name: 'Moon', icon: '🌙', color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-800' },
];

export function PlanetaryHoursGenerator() {
  const { t } = useTranslation();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [lat, setLat] = useState('48.8566');
  const [lng, setLng] = useState('2.3522');

  const calculateHours = () => {
    const d = new Date(date);
    const times = SunCalc.getTimes(d, parseFloat(lat), parseFloat(lng));
    
    // Day hours (sunrise to sunset)
    const dayLengthMs = times.sunset.getTime() - times.sunrise.getTime();
    const dayHourLength = dayLengthMs / 12;
    
    // Night hours (sunset to next sunrise)
    const nextDay = new Date(d);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextTimes = SunCalc.getTimes(nextDay, parseFloat(lat), parseFloat(lng));
    const nightLengthMs = nextTimes.sunrise.getTime() - times.sunset.getTime();
    const nightHourLength = nightLengthMs / 12;

    // Chaldean sequence: Saturn, Jupiter, Mars, Sun, Venus, Mercury, Moon
    // Day ruler calculation: 
    // Sunday=Sun(3), Monday=Moon(6), Tuesday=Mars(2), Wednesday=Mercury(5), Thursday=Jupiter(1), Friday=Venus(4), Saturday=Saturn(0)
    const dayOfWeek = d.getDay();
    const rulerMap = [3, 6, 2, 5, 1, 4, 0]; // 0=Sun, 1=Mon... wait, standard mapping:
    // Sunday (0) -> Sun (index 3)
    // Monday (1) -> Moon (index 6)
    // Tuesday (2) -> Mars (index 2)
    // Wednesday (3) -> Mercury (index 5)
    // Thursday (4) -> Jupiter (index 1)
    // Friday (5) -> Venus (index 4)
    // Saturday (6) -> Saturn (index 0)

    let currentPlanetIndex = rulerMap[dayOfWeek];
    
    const dayHours = [];
    for (let i = 0; i < 12; i++) {
      const start = new Date(times.sunrise.getTime() + (i * dayHourLength));
      const end = new Date(start.getTime() + dayHourLength);
      dayHours.push({
        index: i + 1,
        planet: PLANETS[currentPlanetIndex],
        start: start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        end: end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      currentPlanetIndex = (currentPlanetIndex + 1) % 7;
    }

    const nightHours = [];
    for (let i = 0; i < 12; i++) {
      const start = new Date(times.sunset.getTime() + (i * nightHourLength));
      const end = new Date(start.getTime() + nightHourLength);
      nightHours.push({
        index: i + 1,
        planet: PLANETS[currentPlanetIndex],
        start: start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        end: end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      currentPlanetIndex = (currentPlanetIndex + 1) % 7;
    }

    return { dayHours, nightHours };
  };

  const { dayHours, nightHours } = calculateHours();

  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
           <label className="text-sm font-semibold">{t('Date')}</label>
           <input type="date" value={date} onChange={e => setDate(e.target.value)} className="p-3 border rounded-xl dark:bg-gray-900 dark:border-gray-800" />
        </div>
        <div className="flex flex-col gap-2">
           <label className="text-sm font-semibold">{t('Latitude')}</label>
           <input type="number" step="any" value={lat} onChange={e => setLat(e.target.value)} className="p-3 border rounded-xl dark:bg-gray-900 dark:border-gray-800" />
        </div>
        <div className="flex flex-col gap-2">
           <label className="text-sm font-semibold">{t('Longitude')}</label>
           <input type="number" step="any" value={lng} onChange={e => setLng(e.target.value)} className="p-3 border rounded-xl dark:bg-gray-900 dark:border-gray-800" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {/* Day Hours */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-amber-600 font-bold border-b pb-2">
            <Sun className="w-5 h-5" />
            <h3>{t('DayHours')}</h3>
          </div>
          <div className="flex flex-col gap-2">
            {dayHours.map(h => (
              <div key={h.index} className={`flex items-center justify-between p-3 rounded-lg ${h.planet.bg} border border-transparent`}>
                 <div className="flex items-center gap-3">
                   <span className="text-xs font-bold w-4 text-gray-500">{h.index}</span>
                   <span className="text-xl">{h.planet.icon}</span>
                   <span className={`font-semibold ${h.planet.color}`}>{t(`Planet${h.planet.name}`)}</span>
                 </div>
                 <div className="text-sm font-mono text-gray-600 dark:text-gray-400">
                   {h.start} - {h.end}
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Night Hours */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold border-b pb-2 dark:border-gray-800">
            <Moon className="w-5 h-5" />
            <h3>{t('NightHours')}</h3>
          </div>
          <div className="flex flex-col gap-2">
            {nightHours.map(h => (
              <div key={h.index} className={`flex items-center justify-between p-3 rounded-lg ${h.planet.bg} border border-transparent`}>
                 <div className="flex items-center gap-3">
                   <span className="text-xs font-bold w-4 text-gray-500">{h.index}</span>
                   <span className="text-xl">{h.planet.icon}</span>
                   <span className={`font-semibold ${h.planet.color}`}>{t(`Planet${h.planet.name}`)}</span>
                 </div>
                 <div className="text-sm font-mono text-gray-600 dark:text-gray-400">
                   {h.start} - {h.end}
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
