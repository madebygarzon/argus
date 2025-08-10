import * as React from "react";
import { cn } from "@/lib/utils";

// Basic sidebar container component
export function Sidebar({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("h-full w-64 bg-gray-50", className)} {...props} />
  );
}
