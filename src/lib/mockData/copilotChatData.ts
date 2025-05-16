// src/lib/mockData/copilotChatData.ts
import { type TimePeriod, adjustDataByTimePeriod } from './timePeriods';
import { getNameFormatter, getNumDataPoints } from './organizationData'; // Re-use helpers

// Graph 1 (was Graph 4 in description): Total Acceptances | Total Turns Count
export const getChatAcceptancesTurnsData = (period: TimePeriod) => {
  const numPoints = getNumDataPoints(period);
  const baseTurns = adjustDataByTimePeriod(70, period, false); // Base daily turns for '28d'
  const baseAcceptances = adjustDataByTimePeriod(20, period, false); // Base daily acceptances from chat
  const formatter = getNameFormatter(period);

  return Array.from({ length: numPoints }, (_, i) => {
    const turns = Math.round(baseTurns / numPoints * (i + 1) * (1 + (Math.random() - 0.4) * 0.2) * (numPoints/28));
    // Acceptances should be less than turns, let's say 20-40% of turns lead to an "acceptance"
    const acceptances = Math.round(turns * (adjustDataByTimePeriod(0.3, period, true, 1.01) / 100) * (1 + (Math.random() - 0.5) * 0.15));
    return {
      name: formatter(i, numPoints),
      'Total Turns': Math.max(0, turns),
      'Total Acceptances': Math.max(0, Math.min(turns, acceptances)), // Ensure acceptances <= turns
    };
  });
};

// Graph 2 (was Graph 5 in description): Total Active Copilot Chat users
export const getActiveChatUsersData = (period: TimePeriod) => {
  const numPoints = getNumDataPoints(period);
  // Active chat users might be a subset of total active users.
  const baseActiveChatUsers = adjustDataByTimePeriod(30, period, false, 1.15); // Base active chat users, grows slightly faster
  const formatter = getNameFormatter(period);

  return Array.from({ length: numPoints }, (_, i) => ({
    name: formatter(i, numPoints),
    'Active Chat Users': Math.min(1000, Math.round(baseActiveChatUsers * (1 + (Math.random() - 0.3) * 0.2))),
  }));
};