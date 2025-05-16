// src/components/common/DataCard.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { type TimePeriod, type TimePeriodOption } from "@/lib/mockData/timePeriods";
import TimePeriodSelector from "./TimePeriodSelector";

interface DataCardProps {
  title: string;
  descriptionPrefix: string;
  value: string | number;
  timePeriodOptions: TimePeriodOption[];
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
  valueClassName?: string;
  footerContent?: React.ReactNode;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  descriptionPrefix,
  value,
  timePeriodOptions,
  selectedPeriod,
  onPeriodChange,
  valueClassName = "text-4xl font-bold",
  footerContent
}) => {
  const selectedOption = timePeriodOptions.find(opt => opt.value === selectedPeriod);
  const description = `${descriptionPrefix} [${selectedOption?.label || 'selected period'}]`;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <TimePeriodSelector
            options={timePeriodOptions}
            selectedPeriod={selectedPeriod}
            onPeriodChange={onPeriodChange}
            triggerClassName="h-7 text-xs w-[120px]"
          />
        </div>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={valueClassName}>{value}</div>
      </CardContent>
      {footerContent && <CardFooter className="text-xs text-muted-foreground">{footerContent}</CardFooter>}
    </Card>
  );
};

export default DataCard;