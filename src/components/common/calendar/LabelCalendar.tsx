"use client";
// shadcn
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// css
import styles from "@/components/common/calendar/LabelCalendar.module.scss";
import { useState } from "react";

interface LabelCalendarProps {
  label: string;
  required?: boolean;
}

function LabelCalendar({ label, required }: LabelCalendarProps) {
  const [date, setDate] = useState<Date>();
  return (
    <div className={styles.container}>
      <span className={styles.container_label}>{label}</span>
      {/* 캘린더 추가 */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[200px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        {!required && (
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}

export default LabelCalendar;
