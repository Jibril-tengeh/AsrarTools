import React, { useState, useEffect } from 'react';
import * as SunCalc from 'suncalc';
import { Compass, Moon, Sun, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';

export function PlanetaryHours() {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [times, setTimes] = useState<any>(null);
  const [moonPhase, setMoonPhase] = useState<any>(null);

  const getLocation = () => {
    setLoading(true);
    setError('');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setLoading(false);
        },
        (err) => {
          setError('Géolocalisation refusée ou impossible.');
          setLoading(false);
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par votre navigateur.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lat !== null && lng !== null) {
      const now = new Date();
      const sunTimes = SunCalc.getTimes(now, lat, lng);
      setTimes(sunTimes);
      
      const moon = SunCalc.getMoonIllumination(now);
      setMoonPhase(moon);
    }
  }, [lat, lng]);

  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-obsidian-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-gold-500" />
          Heures Planétaires & Lune
        </h2>
        <button 
          onClick={getLocation}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gold-500 text-obsidian-950 rounded-lg font-medium hover:bg-gold-400 transition-colors disabled:opacity-50"
        >
          <MapPin className="w-4 h-4" />
          {loading ? 'Recherche...' : 'Localiser'}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {lat === null && !loading && !error && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Veuillez autoriser la géolocalisation pour calculer les éphémérides locales.
        </div>
      )}

      {times && moonPhase && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-xl">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-4">
              <Sun className="w-5 h-5" />
              <h3 className="font-semibold">Soleil (Aujourd'hui)</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Lever:</span>
                <span className="font-mono">{times.sunrise.toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Zénith:</span>
                <span className="font-mono">{times.solarNoon.toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Coucher:</span>
                <span className="font-mono">{times.sunset.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col p-4 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800/30 rounded-xl">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 mb-4">
              <Moon className="w-5 h-5" />
              <h3 className="font-semibold">Lune (Phase)</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Illumination:</span>
                <span className="font-mono">{(moonPhase.fraction * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Phase:</span>
                <span className="font-mono">{(moonPhase.phase).toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              * Phase 0 = Nouvelle lune, 0.5 = Pleine lune
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
