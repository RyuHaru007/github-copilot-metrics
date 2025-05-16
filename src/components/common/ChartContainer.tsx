// src/components/common/ChartContainer.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type TimePeriod, type TimePeriodOption } from '@/lib/mockData/timePeriods';

interface ChartContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  timePeriodOptions: TimePeriodOption[];
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
  className?: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  description,
  children,
  timePeriodOptions,
  selectedPeriod,
  onPeriodChange,
  className
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] md:h-[350px] w-full"> {/* Ensure charts have a defined height */}
          {children}
        </div>
        <div className="mt-4 flex justify-center space-x-2">
          {timePeriodOptions.map(option => (
            <Button
              key={option.value}
              variant={selectedPeriod === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onPeriodChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartContainer;