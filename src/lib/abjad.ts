export const abjadKabirMap: Record<string, number> = {
  'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1, 'ء': 1,
  'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'ة': 5,
  'و': 6, 'ؤ': 6, 'ز': 7, 'ح': 8, 'ط': 9,
  'ي': 10, 'ئ': 10, 'ى': 10, 'ك': 20, 'ل': 30,
  'م': 40, 'ن': 50, 'س': 60, 'ع': 70, 'ف': 80,
  'ص': 90, 'ق': 100, 'ر': 200, 'ش': 300, 'ت': 400,
  'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900,
  'غ': 1000
};

export const abjadSaghirMap: Record<string, number> = {
  'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1, 'ء': 1,
  'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'ة': 5,
  'و': 6, 'ؤ': 6, 'ز': 7, 'ح': 8, 'ط': 9,
  'ي': 10, 'ئ': 10, 'ى': 10, 'ك': 8, 'ل': 6, // Reduced values for Saghir
  'م': 4, 'ن': 2, 'س': 12, 'ع': 10, 'ف': 8,
  'ص': 6, 'ق': 4, 'ر': 8, 'ش': 12, 'ت': 4,
  'ث': 8, 'خ': 12, 'ذ': 4, 'ض': 8, 'ظ': 12,
  'غ': 4
};

export const abjadMaghribiMap: Record<string, number> = {
  ...abjadKabirMap,
  'ص': 60, // Sadiq in Maghribi
  'ض': 90, // Dhad in Maghribi
  'س': 300, // Sin in Maghribi
  'ش': 1000, // Shin in Maghribi
  'ظ': 800, // Zha in Maghribi
  'غ': 900  // Ghayn in Maghribi
};

export type AbjadMethod = 'kabir' | 'saghir' | 'wasat' | 'maghribi' | 'mashriqi' | 'inverse' | 'consonants' | 'diacritics' | 'pronouns' | 'position' | 'palindrome' | 'muqattaat' | 'mother' | 'synonym';

export function calculateAbjad(text: string, method: AbjadMethod = 'kabir'): { total: number, breakdown: { char: string, value: number }[] } {
  let total = 0;
  const breakdown: { char: string, value: number }[] = [];
  
  let mapToUse = abjadKabirMap;
  if (method === 'saghir') mapToUse = abjadSaghirMap;
  if (method === 'maghribi') mapToUse = abjadMaghribiMap;

  // Additional logic for other methods...
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === ' ') continue;
    
    let val = mapToUse[char];
    if (val !== undefined) {
      if (method === 'position') {
        val = val * (i + 1); // Position weighting
      }
      total += val;
      breakdown.push({ char, value: val });
    } else {
      breakdown.push({ char, value: 0 });
    }
  }

  if (method === 'wasat') {
    // Wasat formula: Kabir reduced down
    const newBreakdown = breakdown.map(item => {
      let v = item.value;
      if (v > 12) v = v % 12 || 12; 
      return { char: item.char, value: v };
    });
    const newTotal = newBreakdown.reduce((acc, curr) => acc + curr.value, 0);
    return { total: newTotal, breakdown: newBreakdown };
  }

  return { total, breakdown };
}
