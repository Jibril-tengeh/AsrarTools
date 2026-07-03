import React, { useState, useEffect } from 'react';
import * as SunCalc from 'suncalc';
import { Compass, Moon } from 'lucide-react';
import { cn } from '../../lib/utils';

export function DashboardHeaderWidget() {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [moonPhase, setMoonPhase] = useState<any>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {} // silent fail
      );
    }
  }, []);

  useEffect(() => {
    // If we have lat/lng or even without for moon phase (moon phase is global roughly)
    const now = new Date();
    const moon = SunCalc.getMoonIllumination(now);
    setMoonPhase(moon);
  }, [lat, lng]);

  if (!moonPhase) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full p-4 mb-2 bg-gradient-to-r from-obsidian-950 to-obsidian-900 border border-gold-800/30 rounded-xl shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gold-900/20 flex items-center justify-center border border-gold-500/30">
          <Moon className="w-5 h-5 text-gold-400" />
        </div>
        <div>
          <div className="text-xs text-gold-500/80 font-semibold uppercase tracking-wider">Lune Actuelle</div>
          <div className="text-sm font-medium text-white">
            Illumination: {(moonPhase.fraction * 100).toFixed(1)}%
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-900/20 flex items-center justify-center border border-blue-500/30">
          <Compass className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <div className="text-xs text-blue-400/80 font-semibold uppercase tracking-wider">Position</div>
          <div className="text-sm font-medium text-white">
            {lat !== null ? `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? 'N' : 'S'} ${Math.abs(lng!).toFixed(2)}°${lng! >= 0 ? 'E' : 'W'}` : 'Non localisé'}
          </div>
        </div>
      </div>
    </div>
  );
}
