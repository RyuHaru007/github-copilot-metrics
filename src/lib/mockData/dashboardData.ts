// src/lib/mockData/dashboardData.ts
import { type TimePeriod, adjustDataByTimePeriod } from './timePeriods';

export interface DashboardCardData {
  id: string;
  title: string;
  descriptionPrefix: string;
  baseValue: number; // Value for '28d'
  isPercentage: boolean;
  unit?: string;
}

const initialDashboardData: DashboardCardData[] = [
  { id: 'acceptanceRateCount', title: 'Acceptance rate (by count)', descriptionPrefix: 'Over the last', baseValue: 31.36, isPercentage: true, unit: '%' },
  { id: 'totalSuggestions', title: 'Total count of Suggestions (Prompts)', descriptionPrefix: 'Over the last', baseValue: 21255, isPercentage: false },
  { id: 'acceptanceRateLines', title: 'Acceptance rate (by lines)', descriptionPrefix: 'Over the last', baseValue: 17.70, isPercentage: true, unit: '%' },
  { id: 'totalLinesSuggested', title: 'Total lines of code suggested', descriptionPrefix: 'Over the last', baseValue: 60598, isPercentage: false },
  { id: 'numLanguages', title: 'Number of Languages', descriptionPrefix: 'Over the last', baseValue: 15, isPercentage: false }, // This might not scale linearly with time, more complex logic needed for true realism
  { id: 'numEditors', title: 'Number of Editors', descriptionPrefix: 'Over the last', baseValue: 2, isPercentage: false }, // Also less likely to scale linearly
  { id: 'cumulativeTurns', title: 'Cumulative Number of Turns', descriptionPrefix: 'Over the last', baseValue: 2035, isPercentage: false },
  { id: 'cumulativeAcceptances', title: 'Cumulative Number of Acceptances', descriptionPrefix: 'Over the last', baseValue: 670, isPercentage: false },
];

export const getDashboardCardValue = (card: DashboardCardData, period: TimePeriod): string | number => {
  // Special handling for #languages and #editors - less linear growth
  if (card.id === 'numLanguages' || card.id === 'numEditors') {
    let val = card.baseValue;
    if (period === '6m') val *= 1.1;
    else if (period === '1y') val *= 1.2;
    else if (period === '5y') val *= 1.5;
    else if (period === 'all') val *= 1.8;
    val = Math.round(val);
    return card.isPercentage ? `${val.toFixed(2)}${card.unit || ''}` : Math.round(val);
  }

  const adjustedValue = adjustDataByTimePeriod(card.baseValue, period, card.isPercentage);
  return card.isPercentage ? `${adjustedValue.toFixed(2)}${card.unit || ''}` : adjustedValue;
};


export const dashboardCardsConfig = initialDashboardData;