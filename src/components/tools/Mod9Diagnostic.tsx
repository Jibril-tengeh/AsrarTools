import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, User, Users, RefreshCw } from 'lucide-react';

const abjadStandard: Record<string, number> = {
  'ا': 1, 'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'و': 6, 'ز': 7, 'ح': 8, 'ط': 9,
  'ي': 10, 'ك': 20, 'ل': 30, 'م': 40, 'ن': 50, 'س': 60, 'ع': 70, 'ف': 80, 'ص': 90,
  'ق': 100, 'ر': 200, 'ش': 300, 'ت': 400, 'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000,
  'أ': 1, 'إ': 1, 'آ': 1, 'ء': 1, 'ؤ': 6, 'ئ': 10, 'ى': 10, 'ة': 5
};

function calculateAbjad(text: string): number {
  let sum = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (abjadStandard[char]) {
      sum += abjadStandard[char];
    }
  }
  return sum;
}

const mod9Interpretations = [
  { mod: 1, title: "L'Unité et la Tête", desc: "Le blocage se situe au niveau de la tête, du mental ou de l'égo. Un besoin de lâcher-prise et de connexion spirituelle." },
  { mod: 2, title: "La Dualité et la Poitrine", desc: "Tensions émotionnelles ou relationnelles. Le cœur ou les poumons peuvent être affectés spirituellement." },
  { mod: 3, title: "Le Dynamisme et l'Estomac", desc: "Problème d'assimilation (idées ou nourriture). Anxiété liée au contrôle." },
  { mod: 4, title: "La Stabilité et les Reins", desc: "Peur enracinée ou manque de sécurité financière/matérielle." },
  { mod: 5, title: "Le Mouvement et le Sang", desc: "Circulation bloquée des énergies. Impatience ou colère refoulée." },
  { mod: 6, title: "L'Harmonie et le Bas-ventre", desc: "Déséquilibre dans les relations intimes ou créativité bloquée." },
  { mod: 7, title: "Le Secret et les Jambes", desc: "Hésitation à avancer dans la vie. Influences extérieures cachées ou 'Ayn (mauvais œil)." },
  { mod: 8, title: "La Justice et le Dos", desc: "Porte un fardeau trop lourd. Dettes karmiques ou fardeau familial." },
  { mod: 9, title: "La Complétude et l'Aura", desc: "Le cycle est complet mais l'énergie est dispersée. Fuite aurique, besoin de recentrage ou de roqya globale." }, // Note: Modulo 9 of X is 0, but traditionally we use 9 when remainder is 0.
];

export function Mod9Diagnostic() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [motherName, setMotherName] = useState('');

  const calculateDiagnostic = () => {
    if (!name || !motherName) return null;
    const nameVal = calculateAbjad(name);
    const motherVal = calculateAbjad(motherName);
    const total = nameVal + motherVal;
    
    let remainder = total % 9;
    if (remainder === 0) remainder = 9;

    return {
      nameVal,
      motherVal,
      total,
      remainder,
      interpretation: mod9Interpretations.find(i => i.mod === remainder)
    };
  };

  const result = calculateDiagnostic();

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Diagnostic Reste 9 (Ism al-Umm)</h2>
            <p className="text-sm text-gray-500">Calcule la nature d'un blocage par la méthode traditionnelle du modulo 9.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prénom (en Arabe)
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                dir="rtl"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 font-arabic text-lg"
                placeholder="Ex: محمد"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prénom de la Mère (en Arabe)
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                dir="rtl"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 font-arabic text-lg"
                placeholder="Ex: فاطمة"
              />
            </div>
          </div>
        </div>

        {result && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border border-amber-200/50 dark:border-amber-700/30">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">Résultat du Diagnostic</h3>
            
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Sujet</div>
                <div className="text-2xl font-bold text-amber-600">{result.nameVal}</div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Mère</div>
                <div className="text-2xl font-bold text-amber-600">{result.motherVal}</div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border-2 border-amber-200 dark:border-amber-800">
                <div className="text-sm font-bold text-amber-800 dark:text-amber-400">Reste (Mod 9)</div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{result.remainder}</div>
              </div>
            </div>

            {result.interpretation && (
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {result.interpretation.title}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {result.interpretation.desc}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
