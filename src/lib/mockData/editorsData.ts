// src/lib/mockData/editorsData.ts
import { type TimePeriod, adjustDataByTimePeriod } from './timePeriods';

export const EDITORS = ['JetBrains IDEs', 'VSCode']; // Only 2 editors

export interface EditorPieChartData {
  name: string;
  value: number;
}

export interface EditorTableData {
  id: string;
  name: string;
  acceptedPrompts: number;
  suggestedPrompts: number;
  acceptedLines: number;
  suggestedLines: number;
  acceptanceRateLines: number; // Percentage
}

// Base values for '28d'
// Let's assume VSCode has slightly higher usage/numbers in this mock scenario
const baseEditorStats: Record<string, Omit<EditorTableData, 'id' | 'name' | 'acceptanceRateLines'>> = {
  'VSCode': {
    suggestedPrompts: 15000,
    acceptedPrompts: 5000,
    suggestedLines: 400000,
    acceptedLines: 70000,
  },
  'JetBrains IDEs': {
    suggestedPrompts: 10000,
    acceptedPrompts: 3000,
    suggestedLines: 250000,
    acceptedLines: 40000,
  },
};

export const getEditorDataForPeriod = (period: TimePeriod): EditorTableData[] => {
  return EDITORS.map(editorName => {
    const base = baseEditorStats[editorName];
    const acceptedPrompts = adjustDataByTimePeriod(base.acceptedPrompts, period, false);
    const suggestedPrompts = adjustDataByTimePeriod(base.suggestedPrompts, period, false);
    const acceptedLines = adjustDataByTimePeriod(base.acceptedLines, period, false);
    const suggestedLines = adjustDataByTimePeriod(base.suggestedLines, period, false);

    const finalSuggestedPrompts = Math.max(suggestedPrompts, acceptedPrompts);
    const finalSuggestedLines = Math.max(suggestedLines, acceptedLines);
    const acceptanceRateLines = finalSuggestedLines > 0 ? (acceptedLines / finalSuggestedLines) * 100 : 0;

    return {
      id: editorName.toLowerCase().replace(/[^a-z0-9]/g, ''),
      name: editorName,
      acceptedPrompts,
      suggestedPrompts: finalSuggestedPrompts,
      acceptedLines,
      suggestedLines: finalSuggestedLines,
      acceptanceRateLines: parseFloat(acceptanceRateLines.toFixed(2)),
    };
  });
};

// Pie Chart 1: Editors by accepted Suggestions (prompts)
export const getEditorsByAcceptedPromptsPie = (period: TimePeriod): EditorPieChartData[] => {
  const editorData = getEditorDataForPeriod(period);
  return editorData.map(editor => ({ name: editor.name, value: editor.acceptedPrompts }));
};

// Pie Chart 2: Acceptance Rate (by Count) for Editors
export const getEditorsByAcceptanceRateCountPie = (period: TimePeriod): EditorPieChartData[] => {
  const editorData = getEditorDataForPeriod(period);
  return editorData.map(editor => {
    const rate = editor.suggestedPrompts > 0 ? (editor.acceptedPrompts / editor.suggestedPrompts) * 100 : 0;
    return { name: editor.name, value: parseFloat(rate.toFixed(2)) };
  });
};

// Pie Chart 3: Acceptance Rate (by code lines) for Editors
export const getEditorsByAcceptanceRateLinesPie = (period: TimePeriod): EditorPieChartData[] => {
  const editorData = getEditorDataForPeriod(period);
  return editorData.map(editor => ({ name: editor.name, value: editor.acceptanceRateLines }));
};