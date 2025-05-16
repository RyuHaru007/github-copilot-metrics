// src/pages/LanguagesPage.tsx
import React, { useState, useMemo } from 'react';
import ChartContainer from '@/components/common/ChartContainer';
import { type TimePeriod, GRAPH_TIME_PERIOD_OPTIONS } from '@/lib/mockData/timePeriods';
import {
  getLanguageDataForPeriod, type LanguageTableData,
  getTopLangsByAcceptedPromptsPie,
  getTopLangsByAcceptanceRateCountPie,
  getTopLangsByAcceptanceRateLinesPie,
} from '@/lib/mockData/languagesData';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d']; // Add more if needed

const CustomPieChart: React.FC<{ data: { name: string, value: number }[], dataKey: string, nameKey: string, unit?: string }> = ({ data, dataKey, nameKey, unit }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        // label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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

const LanguagesPage: React.FC = () => {
  const [chartsPeriod, setChartsPeriod] = useState<TimePeriod>('28d');
  const [tablePeriod, setTablePeriod] = useState<TimePeriod>('28d');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Paginated table

  const tableData = useMemo(() => getLanguageDataForPeriod(tablePeriod), [tablePeriod]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return tableData.slice(startIndex, startIndex + itemsPerPage);
  }, [tableData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);


  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8">Language Insights</h1>

      {/* Pie Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ChartContainer
          title="Top 5 by Accepted Prompts"
          selectedPeriod={chartsPeriod}
          onPeriodChange={setChartsPeriod}
          timePeriodOptions={GRAPH_TIME_PERIOD_OPTIONS}
        >
          <CustomPieChart data={getTopLangsByAcceptedPromptsPie(chartsPeriod)} dataKey="value" nameKey="name" />
        </ChartContainer>
        <ChartContainer
          title="Top 5 by Acceptance Rate (Count)"
          selectedPeriod={chartsPeriod}
          onPeriodChange={setChartsPeriod}
          timePeriodOptions={GRAPH_TIME_PERIOD_OPTIONS}
        >
          <CustomPieChart data={getTopLangsByAcceptanceRateCountPie(chartsPeriod)} dataKey="value" nameKey="name" unit="%" />
        </ChartContainer>
        <ChartContainer
          title="Top 5 by Acceptance Rate (Lines)"
          selectedPeriod={chartsPeriod}
          onPeriodChange={setChartsPeriod}
          timePeriodOptions={GRAPH_TIME_PERIOD_OPTIONS}
        >
          <CustomPieChart data={getTopLangsByAcceptanceRateLinesPie(chartsPeriod)} dataKey="value" nameKey="name" unit="%" />
        </ChartContainer>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
                <CardTitle>Language Performance Details</CardTitle>
                <CardDescription>Detailed statistics per language.</CardDescription>
            </div>
            <div className="mt-4 sm:mt-0 flex justify-center space-x-2">
                {GRAPH_TIME_PERIOD_OPTIONS.map(option => (
                    <Button
                    key={option.value}
                    variant={tablePeriod === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => {setTablePeriod(option.value); setCurrentPage(1);}} // Reset to page 1 on period change
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
                <TableHead>Language</TableHead>
                <TableHead className="text-right">Accepted Prompts</TableHead>
                <TableHead className="text-right">Suggested Prompts</TableHead>
                <TableHead className="text-right">Accepted Lines</TableHead>
                <TableHead className="text-right">Suggested Lines</TableHead>
                <TableHead className="text-right">Acceptance Rate (Lines %)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((lang: LanguageTableData) => (
                <TableRow key={lang.id}>
                  <TableCell className="font-medium">{lang.name}</TableCell>
                  <TableCell className="text-right">{lang.acceptedPrompts.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{lang.suggestedPrompts.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{lang.acceptedLines.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{lang.suggestedLines.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{lang.acceptanceRateLines.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination Controls */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
                Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguagesPage;