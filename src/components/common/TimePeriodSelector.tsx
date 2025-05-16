// src/components/common/TimePeriodSelector.tsx
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { type TimePeriod, type TimePeriodOption } from "@/lib/mockData/timePeriods";
  
  interface TimePeriodSelectorProps {
    options: TimePeriodOption[];
    selectedPeriod: TimePeriod;
    onPeriodChange: (period: TimePeriod) => void;
    triggerClassName?: string;
  }
  
  const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({
    options,
    selectedPeriod,
    onPeriodChange,
    triggerClassName
  }) => {
    return (
      <Select value={selectedPeriod} onValueChange={(value) => onPeriodChange(value as TimePeriod)}>
        <SelectTrigger className={triggerClassName || "w-[180px] h-8 text-xs"}>
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };
  
  export default TimePeriodSelector;