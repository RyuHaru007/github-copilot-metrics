// src/lib/mockData/index.ts
import { dashboardCardsConfig, getDashboardCardValue } from './dashboardData';
import {
  getAcceptanceRateCountData, getTotalSuggestionsAcceptancesData, getAcceptanceRateLinesData,
  getTotalLinesData, getActiveUsersData
} from './organizationData';
import {
  getLanguageDataForPeriod, getTopLangsByAcceptedPromptsPie,
  getTopLangsByAcceptanceRateCountPie, getTopLangsByAcceptanceRateLinesPie, ALL_LANGUAGES
} from './languagesData';
import {
  getEditorDataForPeriod, getEditorsByAcceptedPromptsPie,
  getEditorsByAcceptanceRateCountPie, getEditorsByAcceptanceRateLinesPie, EDITORS
} from './editorsData';
import { getChatAcceptancesTurnsData, getActiveChatUsersData } from './copilotChatData';
import { seatAnalysisCardsConfig, getSeatCardValue, mockSeatTableData } from './seatAnalysisData';
import { type TimePeriod, type ExtendedTimePeriod } from './timePeriods';


// Example: Generate data for a default period (e.g., '28d')
const defaultPeriod: TimePeriod = '28d';
const defaultExtendedPeriod: ExtendedTimePeriod = '28d';

export const allMockData = {
  dashboard: {
    description: "Dashboard card data (values shown for '28 days' period)",
    data: dashboardCardsConfig.map(card => ({
      ...card,
      currentValue: getDashboardCardValue(card, defaultPeriod)
    }))
  },
  organization: {
    description: "Organization page graph data (generated for '28 days' period)",
    acceptanceRateCount: getAcceptanceRateCountData(defaultPeriod),
    totalSuggestionsAcceptances: getTotalSuggestionsAcceptancesData(defaultPeriod),
    acceptanceRateLines: getAcceptanceRateLinesData(defaultPeriod),
    totalLinesData: getTotalLinesData(defaultPeriod),
    activeUsers: getActiveUsersData(defaultPeriod),
  },
  languages: {
    description: "Languages page data (generated for '28 days' period)",
    tableData: getLanguageDataForPeriod(defaultPeriod),
    pieAcceptedPrompts: getTopLangsByAcceptedPromptsPie(defaultPeriod),
    pieAcceptanceRateCount: getTopLangsByAcceptanceRateCountPie(defaultPeriod),
    pieAcceptanceRateLines: getTopLangsByAcceptanceRateLinesPie(defaultPeriod),
    allLanguages: ALL_LANGUAGES
  },
  editors: {
    description: "Editors page data (generated for '28 days' period)",
    tableData: getEditorDataForPeriod(defaultPeriod),
    pieAcceptedPrompts: getEditorsByAcceptedPromptsPie(defaultPeriod),
    pieAcceptanceRateCount: getEditorsByAcceptanceRateCountPie(defaultPeriod),
    pieAcceptanceRateLines: getEditorsByAcceptanceRateLinesPie(defaultPeriod),
    allEditors: EDITORS
  },
  copilotChat: {
    description: "Copilot Chat page graph data (generated for '28 days' period)",
    acceptancesTurns: getChatAcceptancesTurnsData(defaultPeriod),
    activeChatUsers: getActiveChatUsersData(defaultPeriod),
  },
  seatAnalysis: {
    description: "Seat Analysis page data (card values for default/ '7 days' for activity card, table is static list)",
    cards: seatAnalysisCardsConfig.map(card => ({
        ...card,
        currentValue: getSeatCardValue(card, card.id === 'noActivity' ? '7d' : defaultExtendedPeriod)
    })),
    tableData: mockSeatTableData,
  }
};