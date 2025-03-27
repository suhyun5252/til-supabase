"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

// 사용자 정의 인터페이스
interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  indicateColor?: string;
}

function Progress({
  className,
  value,
  indicateColor,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={`h-full w-full flex-1 transition-all ${indicateColor && indicateColor}`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
