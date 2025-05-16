// src/lib/mockData/timePeriods.ts
export type TimePeriod = '28d' | '6m' | '1y' | '5y' | 'all';
export type TimePeriodOption = { value: TimePeriod; label: string };

export const TIME_PERIOD_OPTIONS: TimePeriodOption[] = [
  { value: '28d', label: '28 Days' },
  { value: '6m', label: '6 Months' },
  { value: '1y', label: '1 Year' },
  { value: '5y', label: '5 Years' },
  { value: 'all', label: 'All Time' },
];

// For graphs (shorter labels)
export const GRAPH_TIME_PERIOD_OPTIONS: TimePeriodOption[] = [
  { value: '28d', label: '1M' }, // Assuming 28d is roughly 1M for graph buttons
  { value: '6m', label: '6M' },
  { value: '1y', label: '1Y' },
  { value: '5y', label: '5Y' },
  { value: 'all', label: 'All' },
];

// A helper to simulate data changes based on time period
// Base value is for '28d'
export const adjustDataByTimePeriod = (baseValue: number, period: TimePeriod, isPercentage: boolean = false, growthFactor: number = 1.05): number => {
  let multiplier = 1;
  switch (period) {
    case '6m': // ~6.5 times 28 days
      multiplier = isPercentage ? Math.pow(growthFactor, 1) : 6.5;
      break;
    case '1y': // ~13 times 28 days
      multiplier = isPercentage ? Math.pow(growthFactor, 2) : 13;
      break;
    case '5y': // ~65 times 28 days
      multiplier = isPercentage ? Math.pow(growthFactor, 3) : 65;
      break;
    case 'all': // ~130 times 28 days (assuming 10 years of data for "all time")
      multiplier = isPercentage ? Math.pow(growthFactor, 4) : 130;
      break;
    case '28d':
    default:
      multiplier = 1;
      break;
  }

  let value = baseValue * multiplier;

  if (isPercentage) {
    value = Math.min(Math.max(value, baseValue * 0.8), Math.min(99.9, baseValue * Math.pow(growthFactor, 4))); // Cap percentages and ensure gentle slope
    return parseFloat(value.toFixed(2));
  }
  return Math.round(value);
};
// src/lib/mockData/timePeriods.ts (add to existing)
export type ExtendedTimePeriod = TimePeriod | '7d';
export type ExtendedTimePeriodOption = { value: ExtendedTimePeriod; label: string };

export const SEAT_ANALYSIS_CARD_TIME_PERIOD_OPTIONS: ExtendedTimePeriodOption[] = [
  { value: '7d', label: '7 Days' },
  { value: '28d', label: '1 Month' }, // Assuming 28d = 1 Month for this context
  { value: '6m', label: '6 Months' },
  { value: '1y', label: '1 Year' },
  { value: '5y', label: '5 Years' },
  { value: 'all', label: 'All Time' },
];