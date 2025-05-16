// src/lib/mockData/organizationData.ts
import { type TimePeriod, adjustDataByTimePeriod } from './timePeriods';

// Helper to generate time series data
const generateTimeSeries = (base: number, periods: number, trend: 'up' | 'down' | 'stable' = 'up', isPercentage = false, dailyNoise = 0.1) => {
  let currentValue = base;
  const series: { name: string; value: number }[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - periods);

  for (let i = 0; i < periods; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const monthDay = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;

    let noise = (Math.random() - 0.5) * base * dailyNoise;
    if (isPercentage) noise = (Math.random() - 0.5) * 5; // Smaller noise for percentages

    currentValue += noise;

    if (trend === 'up') {
      currentValue *= (1 + (Math.random() * 0.01)); // Slight daily upward trend for counts
    } else if (trend === 'down') {
      currentValue *= (1 - (Math.random() * 0.005));
    }

    if (isPercentage) {
      currentValue = Math.max(0, Math.min(100, currentValue));
    } else {
      currentValue = Math.max(0, currentValue);
    }
    series.push({ name: monthDay, value: parseFloat(currentValue.toFixed(isPercentage ? 2 : 0)) });
  }
  return series;
};

const generateDualLineTimeSeries = (base1: number, base2: number, periods: number, ensureGap: boolean = true) => {
    const series1 = generateTimeSeries(base1, periods, 'up', false, 0.05);
    const series2 = generateTimeSeries(base2, periods, 'up', false, 0.05);

    return series1.map((s1, index) => {
        const s2Val = series2[index].value;
        return {
            name: s1.name,
            value1: ensureGap ? Math.max(s1.value, s2Val + (base1 - base2) * 0.1) : s1.value, // Ensure value1 > value2 if needed
            value2: s2Val,
        };
    });
}

// Define periods based on TimePeriod
export const getNumDataPoints = (period: TimePeriod): number => {
  switch (period) {
    case '28d': return 28;
    case '6m': return 30 * 6;
    case '1y': return 52; // weekly data for longer periods for simplicity
    case '5y': return 60; // monthly
    case 'all': return 120; // monthly for 10 years
    default: return 28;
  }
};
export const getNameFormatter = (period: TimePeriod): ((dateIndex: number, totalPoints: number) => string) => {
    const baseDate = new Date();
    return (dateIndex: number, totalPoints: number): string => {
        const d = new Date(baseDate);
        if (period === '28d' || period === '6m') {
             d.setDate(baseDate.getDate() - (totalPoints - dateIndex -1));
             return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
        } else if (period === '1y') {
            d.setDate(baseDate.getDate() - (totalPoints - dateIndex -1) * 7); // Weekly
            return `W${Math.ceil(d.getDate()/7)} ${d.toLocaleString('default', { month: 'short' })}`;
        } else { // 5y, all (monthly)
            d.setMonth(baseDate.getMonth() - (totalPoints - dateIndex -1));
            return `${d.toLocaleString('default', { month: 'short' })} '${String(d.getFullYear()).slice(-2)}`;
        }
    };
};


// Graph 1: Acceptance rate by count %
export const getAcceptanceRateCountData = (period: TimePeriod) => {
  const numPoints = getNumDataPoints(period);
  const baseRate = adjustDataByTimePeriod(30, period, true, 1.02); // Base acceptance rate for the period
  const formatter = getNameFormatter(period);
  return Array.from({ length: numPoints }, (_, i) => ({
    name: formatter(i, numPoints),
    'Acceptance Rate %': parseFloat((baseRate + (Math.random() - 0.5) * 5).toFixed(2)), // Simulate fluctuations
  })).map(d => ({ ...d, 'Acceptance Rate %': Math.max(10, Math.min(70, d['Acceptance Rate %']))})); // Cap rate
};

// Graph 2: Total Suggestion Count | Total Acceptances count
export const getTotalSuggestionsAcceptancesData = (period: TimePeriod) => {
  const numPoints = getNumDataPoints(period);
  const baseSuggestions = adjustDataByTimePeriod(700, period, false); // ~20k/28d
  const baseAcceptances = adjustDataByTimePeriod(200, period, false); // ~6k/28d
  const formatter = getNameFormatter(period);

  return Array.from({ length: numPoints }, (_, i) => {
    const suggestions = Math.round(baseSuggestions / numPoints * (i + 1) * (1 + (Math.random() - 0.4) * 0.2) * (numPoints/28)); // Scaled per point
    const acceptances = Math.round(suggestions * (adjustDataByTimePeriod(0.3, period, true) / 100) * (1 + (Math.random() - 0.5) * 0.15) );
    return {
      name: formatter(i, numPoints),
      'Total Suggestions': Math.max(0, suggestions),
      'Total Acceptances': Math.max(0, Math.min(suggestions, acceptances)),
    };
  });
};

// Graph 3: Acceptance rate by lines (%)
export const getAcceptanceRateLinesData = (period: TimePeriod) => {
  const numPoints = getNumDataPoints(period);
  const baseRate = adjustDataByTimePeriod(15, period, true, 1.03);
  const formatter = getNameFormatter(period);
  return Array.from({ length: numPoints }, (_, i) => ({
    name: formatter(i, numPoints),
    'Acceptance Rate (Lines) %': parseFloat((baseRate + (Math.random() - 0.5) * 4).toFixed(2)),
  })).map(d => ({ ...d, 'Acceptance Rate (Lines) %': Math.max(5, Math.min(60, d['Acceptance Rate (Lines) %']))}));
};

// Graph 4: Total Suggestion Lines | Total Acceptances Lines
export const getTotalLinesData = (period: TimePeriod) => {
  const numPoints = getNumDataPoints(period);
  const baseSuggestionLines = adjustDataByTimePeriod(2000, period, false); // ~60k/28d
  const baseAcceptedLines = adjustDataByTimePeriod(350, period, false); // ~10k/28d
  const formatter = getNameFormatter(period);

  return Array.from({ length: numPoints }, (_, i) => {
    const suggestionLines = Math.round(baseSuggestionLines / numPoints * (i + 1) * (1 + (Math.random() - 0.4) * 0.25) * (numPoints/28));
    const acceptedLines = Math.round(suggestionLines * (adjustDataByTimePeriod(0.17, period, true) / 100) * (1 + (Math.random() - 0.5) * 0.2));
    return {
      name: formatter(i, numPoints),
      'Total Suggested Lines': Math.max(0, suggestionLines),
      'Total Accepted Lines': Math.max(0, Math.min(suggestionLines, acceptedLines)),
    };
  });
};

// Graph 5: Total Active users (Bar chart)
export const getActiveUsersData = (period: TimePeriod) => {
  const numPoints = getNumDataPoints(period);
  // Max users is 1000 as per requirement, but let's base it on a smaller number for "active"
  const baseActiveUsers = adjustDataByTimePeriod(50, period, false, 1.1); // Base active users, slowly grows
  const formatter = getNameFormatter(period);
  return Array.from({ length: numPoints }, (_, i) => ({
    name: formatter(i, numPoints),
    'Active Users': Math.min(1000, Math.round(baseActiveUsers * (1 + (Math.random() - 0.3) * 0.15))),
  }));
};