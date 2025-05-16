// src/lib/mockData/seatAnalysisData.ts
import { type ExtendedTimePeriod, adjustDataByTimePeriod, type TimePeriod } from './timePeriods';
import { faker } from '@faker-js/faker'; // You might need to install: bun add @faker-js/faker

export interface SeatAnalysisCardData {
  id: string;
  title: string;
  description: string;
  baseValue: number; // Value for the default period or a reference point
  isStatic?: boolean; // For cards that don't change with time period selector
  valueSuffix?: string;
}

export interface SeatTableEntry {
  id: string;
  sNo: number;
  login: string;
  githubId: string;
  assigningTeam: string;
  assignedTime: string; // ISO string or formatted date
  lastActivityAt: string; // ISO string or formatted date
  lastActivityEditor: string;
}

// Card Data
export const seatAnalysisCardsConfig: SeatAnalysisCardData[] = [
  { id: 'totalAssigned', title: 'Total Assigned', description: 'Currently assigned seats', baseValue: 2, isStatic: true },
  { id: 'assignedNeverUsed', title: 'Assigned but never used', description: 'No show seats', baseValue: 0, isStatic: true },
  { id: 'noActivity', title: 'No Activity in the last', description: 'No use in the last', baseValue: 2 }, // BaseValue is for '7d'
];

export const getSeatCardValue = (card: SeatAnalysisCardData, period: ExtendedTimePeriod): string => {
  if (card.isStatic) return String(card.baseValue);

  // For 'No Activity' card, baseValue is for 7d.
  // This logic is a bit contrived for mock data. Real data would be filtered.
  // Let's assume 'no activity' count might decrease slightly for longer periods if people eventually use it.
  // Or it could increase if more fall into inactivity over longer periods. Let's make it slightly increase.
  let value = card.baseValue;
  if (card.id === 'noActivity') {
    switch (period) {
        case '7d': value = card.baseValue; break;
        case '28d': value = card.baseValue * 1.1; break; // More could become inactive in a month
        case '6m': value = card.baseValue * 1.3; break;
        case '1y': value = card.baseValue * 1.5; break;
        case '5y': value = card.baseValue * 1.8; break;
        case 'all': value = card.baseValue * 2; break;
        default: value = card.baseValue;
    }
  }
  return String(Math.round(value));
};


// Table Data
const generateMockSeatTableData = (count: number): SeatTableEntry[] => {
  const data: SeatTableEntry[] = [];
  const teams = ['Alpha Team', 'Bravo Team', 'Core Devs', 'Frontend Guild'];
  const editors = ['VSCode', 'JetBrains IDEs'];

  for (let i = 0; i < count; i++) {
    const assignedDate = faker.date.past({ years: 2 });
    const lastActivityDate = faker.date.between({ from: assignedDate, to: new Date() });
    // Some users might have no activity after assignment
    const hasActivity = Math.random() > 0.1; // 10% chance of no activity

    data.push({
      id: faker.string.uuid(),
      sNo: i + 1,
      login: faker.internet.userName().toLowerCase(),
      githubId: faker.internet.userName(),
      assigningTeam: faker.helpers.arrayElement(teams),
      assignedTime: assignedDate.toLocaleDateString(),
      lastActivityAt: hasActivity ? lastActivityDate.toLocaleDateString() : 'Never',
      lastActivityEditor: hasActivity ? faker.helpers.arrayElement(editors) : 'N/A',
    });
  }
  // Ensure the example data matches card 1,2,3 for "total assigned" and "never used"
  // Let's ensure the first two entries match the card values (Total: 2, Never Used: 0, No activity last 7 days: 2)
  if (count >=2) {
    // User 1: Active recently
    data[0].login = "active_user_1";
    data[0].lastActivityAt = faker.date.recent({days: 3}).toLocaleDateString();

    // User 2: Active recently
    data[1].login = "active_user_2";
    data[1].lastActivityAt = faker.date.recent({days: 5}).toLocaleDateString();

    // If we need to show "assigned but never used = 0", then these two must have activity.
    // If "No Activity in the last 7 days = 2", it implies these two were active > 7 days ago or never.
    // The prompt data: Total:2, Never Used: 0, No Activity last 7d: 2
    // This means 2 users exist, neither are "never used", and both have no activity in last 7 days.
    // So, their last activity must be > 7 days ago.
    const moreThan7DaysAgo1 = new Date();
    moreThan7DaysAgo1.setDate(moreThan7DaysAgo1.getDate() - (Math.floor(Math.random() * 20) + 8)); // 8-28 days ago
    data[0].lastActivityAt = moreThan7DaysAgo1.toLocaleDateString();

    const moreThan7DaysAgo2 = new Date();
    moreThan7DaysAgo2.setDate(moreThan7DaysAgo2.getDate() - (Math.floor(Math.random() * 20) + 8)); // 8-28 days ago
    data[1].lastActivityAt = moreThan7DaysAgo2.toLocaleDateString();
  }


  return data;
};

export const mockSeatTableData: SeatTableEntry[] = generateMockSeatTableData(12); // At least 10 entries