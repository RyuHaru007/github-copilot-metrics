// src/pages/OrganizationPage.tsx
import React, { useState } from 'react';
import ChartContainer from '@/components/common/ChartContainer';
import { type TimePeriod, GRAPH_TIME_PERIOD_OPTIONS } from '@/lib/mockData/timePeriods';
import {
  getAcceptanceRateCountData,
  getTotalSuggestionsAcceptancesData,
  getAcceptanceRateLinesData,
  getTotalLinesData,
  getActiveUsersData,
} from '@/lib/mockData/organizationData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OrganizationPage: React.FC = () => {
  const [period1, setPeriod1] = useState<TimePeriod>('28d');
  const [period2, setPeriod2] = useState<TimePeriod>('28d');
  const [period3, setPeriod3] = useState<TimePeriod>('28d');
  const [period4, setPeriod4] = useState<TimePeriod>('28d');
  const [period5, setPeriod5] = useState<TimePeriod>('28d');

  const chartStroke = "hsl(var(--primary))"; // Use Tailwind/shadcn primary color

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8">Organization Insights</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 1 */}
        <ChartContainer
          title="Acceptance Rate by Count %"
          selectedPeriod={period1}
          onPeriodChange={setPeriod1}
          timePeriodOptions={GRAPH_TIME_PERIOD_OPTIONS}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getAcceptanceRateCountData(period1)} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} unit="%" domain={[0, 'dataMax + 10']}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Acceptance Rate %" stroke={chartStroke} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Graph 2 */}
        <ChartContainer
          title="Total Suggestions vs. Acceptances (Count)"
          selectedPeriod={period2}
          onPeriodChange={setPeriod2}
          timePeriodOptions={GRAPH_TIME_PERIOD_OPTIONS}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getTotalSuggestionsAcceptancesData(period2)} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[0, 3000]}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Total Suggestions" stroke={chartStroke} strokeWidth={2} />
              <Line type="monotone" dataKey="Total Acceptances" stroke="hsl(var(--secondary-foreground))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Graph 3 */}
        <ChartContainer
          title="Acceptance Rate by Lines %"
          selectedPeriod={period3}
          onPeriodChange={setPeriod3}
          timePeriodOptions={GRAPH_TIME_PERIOD_OPTIONS}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getAcceptanceRateLinesData(period3)} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} unit="%" domain={[0, 'dataMax + 10']}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Acceptance Rate (Lines) %" stroke={chartStroke} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Graph 4 */}
        <ChartContainer
          title="Total Suggested vs. Accepted Lines"
          selectedPeriod={period4}
          onPeriodChange={setPeriod4}
          timePeriodOptions={GRAPH_TIME_PERIOD_OPTIONS}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getTotalLinesData(period4)} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[0, 8000]}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Total Suggested Lines" stroke={chartStroke} strokeWidth={2} />
              <Line type="monotone" dataKey="Total Accepted Lines" stroke="hsl(var(--secondary-foreground))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Graph 5 */}
        <ChartContainer
          title="Total Active Users"
          selectedPeriod={period5}
          onPeriodChange={setPeriod5}
          timePeriodOptions={GRAPH_TIME_PERIOD_OPTIONS}
          className="lg:col-span-2" // Make this chart span full width on large screens if desired, or keep consistent
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getActiveUsersData(period5)} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[0, 1000]}/>
              <Tooltip />
              <Legend />
              <Bar dataKey="Active Users" fill={chartStroke} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default OrganizationPage;