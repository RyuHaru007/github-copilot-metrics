// src/pages/DashboardPage.tsx
import React, { useState } from 'react';
import DataCard from '@/components/common/DataCard';
import { dashboardCardsConfig, getDashboardCardValue, type DashboardCardData } from '@/lib/mockData/dashboardData';
import { type TimePeriod, TIME_PERIOD_OPTIONS } from '@/lib/mockData/timePeriods';

const DashboardPage: React.FC = () => {
  // Manage selected period for each card type or globally if preferred
  // Here, managing it per card for flexibility, though a global approach might be simpler if all cards always sync
  const [cardPeriods, setCardPeriods] = useState<Record<string, TimePeriod>>(
    dashboardCardsConfig.reduce((acc, card) => {
      acc[card.id] = '28d';
      return acc;
    }, {} as Record<string, TimePeriod>)
  );

  const handlePeriodChange = (cardId: string, period: TimePeriod) => {
    setCardPeriods(prev => ({ ...prev, [cardId]: period }));
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dashboardCardsConfig.map((card: DashboardCardData) => (
          <DataCard
            key={card.id}
            title={card.title}
            descriptionPrefix={card.descriptionPrefix}
            value={getDashboardCardValue(card, cardPeriods[card.id])}
            timePeriodOptions={TIME_PERIOD_OPTIONS}
            selectedPeriod={cardPeriods[card.id]}
            onPeriodChange={(period) => handlePeriodChange(card.id, period)}
            valueClassName="text-3xl md:text-4xl font-bold" // "biggest of all" styling
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;