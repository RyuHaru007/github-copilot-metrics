// src/pages/CopilotChatPage.tsx
import React, { useState } from 'react';
import ChartContainer from '@/components/common/ChartContainer';
import { type TimePeriod, GRAPH_TIME_PERIOD_OPTIONS } from '@/lib/mockData/timePeriods';
import {
  getChatAcceptancesTurnsData,
  getActiveChatUsersData,
} from '@/lib/mockData/copilotChatData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CopilotChatPage: React.FC = () => {
  const [period1, setPeriod1] = useState<TimePeriod>('28d');
  const [period2, setPeriod2] = useState<TimePeriod>('28d');
  const chartStroke = "hsl(var(--primary))";

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8">Copilot Chat Insights</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 1: Total Acceptances | Total Turns Count */}
        <ChartContainer
          title="Chat: Total Acceptances vs. Turns"
          selectedPeriod={period1}
          onPeriodChange={setPeriod1}
          timePeriodOptions={GRAPH_TIME_PERIOD_OPTIONS}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getChatAcceptancesTurnsData(period1)} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[0, 300]} /> {/* Y Axis, 0 - 300 */}
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Total Turns" stroke={chartStroke} strokeWidth={2} />
              <Line type="monotone" dataKey="Total Acceptances" stroke="hsl(var(--secondary-foreground))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Graph 2: Total Active Copilot Chat users */}
        <ChartContainer
          title="Active Copilot Chat Users"
          selectedPeriod={period2}
          onPeriodChange={setPeriod2}
          timePeriodOptions={GRAPH_TIME_PERIOD_OPTIONS}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getActiveChatUsersData(period2)} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[0, 1000]} /> {/* Y axis, user, Up to 1000 */}
              <Tooltip />
              <Legend />
              <Bar dataKey="Active Chat Users" fill={chartStroke} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default CopilotChatPage;