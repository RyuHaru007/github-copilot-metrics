// src/lib/mockData/languagesData.ts
import { type TimePeriod, adjustDataByTimePeriod } from './timePeriods';

export const TOP_LANGUAGES = ['Java', 'Go', 'Rust', 'XML', 'JavaScript'];
const OTHER_LANGUAGES = ['Python', 'TypeScript', 'C#', 'C++', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Scala', 'HTML'];
export const ALL_LANGUAGES = [...TOP_LANGUAGES, ...OTHER_LANGUAGES];

export interface LanguagePieChartData {
  name: string;
  value: number;
}

export interface LanguageTableData {
  id: string;
  name: string;
  acceptedPrompts: number;
  suggestedPrompts: number;
  acceptedLines: number;
  suggestedLines: number;
  acceptanceRateLines: number; // Percentage
}

const generateBaseData = (langName: string): Omit<LanguageTableData, 'id' | 'name' | 'acceptanceRateLines'> => {
  // Base values for '28d'
  let baseSuggestedPrompts, baseSuggestedLines;
  // Assign higher values to top languages
  if (TOP_LANGUAGES.includes(langName)) {
    baseSuggestedPrompts = Math.random() * 2000 + 1000; // 1000-3000
    baseSuggestedLines = baseSuggestedPrompts * (Math.random() * 5 + 20); // 20-25 lines per prompt
  } else {
    baseSuggestedPrompts = Math.random() * 500 + 100;   // 100-600
    baseSuggestedLines = baseSuggestedPrompts * (Math.random() * 5 + 15); // 15-20 lines per prompt
  }
  const baseAcceptedPrompts = baseSuggestedPrompts * (Math.random() * 0.2 + 0.2); // 20-40% acceptance rate by prompt
  const baseAcceptedLines = baseSuggestedLines * (Math.random() * 0.15 + 0.1); // 10-25% acceptance rate by lines
  return {
    suggestedPrompts: Math.round(baseSuggestedPrompts),
    acceptedPrompts: Math.round(baseAcceptedPrompts),
    suggestedLines: Math.round(baseSuggestedLines),
    acceptedLines: Math.round(baseAcceptedLines),
  };
};

const baseLanguageStats = ALL_LANGUAGES.reduce((acc, lang) => {
  acc[lang] = generateBaseData(lang);
  return acc;
}, {} as Record<string, Omit<LanguageTableData, 'id' | 'name' | 'acceptanceRateLines'>>);


export const getLanguageDataForPeriod = (period: TimePeriod): LanguageTableData[] => {
  return ALL_LANGUAGES.map(lang => {
    const base = baseLanguageStats[lang];
    const acceptedPrompts = adjustDataByTimePeriod(base.acceptedPrompts, period, false);
    const suggestedPrompts = adjustDataByTimePeriod(base.suggestedPrompts, period, false);
    const acceptedLines = adjustDataByTimePeriod(base.acceptedLines, period, false);
    const suggestedLines = adjustDataByTimePeriod(base.suggestedLines, period, false);

    // Ensure suggestions are always >= acceptances
    const finalSuggestedPrompts = Math.max(suggestedPrompts, acceptedPrompts);
    const finalSuggestedLines = Math.max(suggestedLines, acceptedLines);

    const acceptanceRateLines = finalSuggestedLines > 0 ? (acceptedLines / finalSuggestedLines) * 100 : 0;

    return {
      id: lang.toLowerCase().replace(/[^a-z0-9]/g, ''),
      name: lang,
      acceptedPrompts,
      suggestedPrompts: finalSuggestedPrompts,
      acceptedLines,
      suggestedLines: finalSuggestedLines,
      acceptanceRateLines: parseFloat(acceptanceRateLines.toFixed(2)),
    };
  });
};


// Pie Chart 1: Top 5 Languages by accepted Suggestions (prompts)
export const getTopLangsByAcceptedPromptsPie = (period: TimePeriod): LanguagePieChartData[] => {
  const langData = getLanguageDataForPeriod(period);
  return TOP_LANGUAGES.map(langName => {
    const data = langData.find(l => l.name === langName);
    return { name: langName, value: data?.acceptedPrompts || 0 };
  });
};

// Pie Chart 2: Acceptance Rate (by Count) for the top 5 languages
export const getTopLangsByAcceptanceRateCountPie = (period: TimePeriod): LanguagePieChartData[] => {
  const langData = getLanguageDataForPeriod(period);
  return TOP_LANGUAGES.map(langName => {
    const data = langData.find(l => l.name === langName);
    const rate = data && data.suggestedPrompts > 0 ? (data.acceptedPrompts / data.suggestedPrompts) * 100 : 0;
    return { name: langName, value: parseFloat(rate.toFixed(2)) };
  });
};

// Pie Chart 3: Acceptance Rate (by code lines) for the top 5 languages
export const getTopLangsByAcceptanceRateLinesPie = (period: TimePeriod): LanguagePieChartData[] => {
  const langData = getLanguageDataForPeriod(period);
  return TOP_LANGUAGES.map(langName => {
    const data = langData.find(l => l.name === langName);
    return { name: langName, value: data?.acceptanceRateLines || 0 };
  });
};