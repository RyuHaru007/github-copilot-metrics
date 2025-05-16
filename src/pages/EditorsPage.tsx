// src/pages/EditorsPage.tsx
import React, { useState, useMemo } from 'react';
import ChartContainer from '@/components/common/ChartContainer';
import { type TimePeriod, GRAPH_TIME_PERIOD_OPTIONS } from '@/lib/mockData/timePeriods';
import {
  getEditorDataForPeriod, type EditorTableData,
  getEditorsByAcceptedPromptsPie,
  getEditorsByAcceptanceRateCountPie,
  getEditorsByAcceptanceRateLinesPie,
} from '@/lib/mockData/editorsData'; // Changed import
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = ['#0088FE', '#00C49F']; // Only 2 colors needed for 2 editors

// Re-usable CustomPieChart (same as in LanguagesPage, can be moved to a common component)
const CustomPieChart: React.FC<{ data: { name: string, value: number }[], dataKey: string, nameKey: string, unit?: string }> = ({ data, dataKey, nameKey, unit }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey={dataKey}
        nameKey={nameKey}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => `${value}${unit || ''}`} />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);


const EditorsPage: React.FC = () => {
  const [chartsPeriod, setChartsPeriod] = useState<TimePeriod>('28d');
  const [tablePeriod, setTablePeriod] = useState<TimePeriod>('28d');
  // No pagination needed for 2 rows

  const tableData = useMemo(() => getEditorDataForPeriod(tablePeriod), [tablePeriod]);

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8">Editor Insights</h1>

      {/* Pie Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ChartContainer
          title="Editors by Accepted Prompts"
          selectedPeriod={chartsPeriod}
          onPeriodChange={setChartsPeriod}
          timePeriodOptions={GRAPH_TIME_PERIOD_OPTIONS}
        >
          <CustomPieChart data={getEditorsByAcceptedPromptsPie(chartsPeriod)} dataKey="value" nameKey="name" />
        </ChartContainer>
        <ChartContainer
          title="Editors by Acceptance Rate (Count)"
          selectedPeriod={chartsPeriod}
          onPeriodChange={setChartsPeriod}
          timePeriodOptions={GRAPH_TIME_PERIOD_OPTIONS}
        >
          <CustomPieChart data={getEditorsByAcceptanceRateCountPie(chartsPeriod)} dataKey="value" nameKey="name" unit="%" />
        </ChartContainer>
        <ChartContainer
          title="Editors by Acceptance Rate (Lines)"
          selectedPeriod={chartsPeriod}
          onPeriodChange={setChartsPeriod}
          timePeriodOptions={GRAPH_TIME_PERIOD_OPTIONS}
        >
          <CustomPieChart data={getEditorsByAcceptanceRateLinesPie(chartsPeriod)} dataKey="value" nameKey="name" unit="%" />
        </ChartContainer>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
                <CardTitle>Editor Performance Details</CardTitle>
                <CardDescription>Detailed statistics per editor.</CardDescription>
            </div>
            <div className="mt-4 sm:mt-0 flex justify-center space-x-2">
                {GRAPH_TIME_PERIOD_OPTIONS.map(option => (
                    <Button
                    key={option.value}
                    variant={tablePeriod === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTablePeriod(option.value)}
                    >
                    {option.label}
                    </Button>
                ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Editor Name</TableHead> {/* Changed column name */}
                <TableHead className="text-right">Accepted Prompts</TableHead>
                <TableHead className="text-right">Suggested Prompts</TableHead>
                <TableHead className="text-right">Accepted Lines</TableHead>
                <TableHead className="text-right">Suggested Lines</TableHead>
                <TableHead className="text-right">Acceptance Rate (Lines %)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((editor: EditorTableData) => ( // Changed type
                <TableRow key={editor.id}>
                  <TableCell className="font-medium">{editor.name}</TableCell>
                  <TableCell className="text-right">{editor.acceptedPrompts.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{editor.suggestedPrompts.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{editor.acceptedLines.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{editor.suggestedLines.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{editor.acceptanceRateLines.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* No Pagination needed for 2 items */}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditorsPage;