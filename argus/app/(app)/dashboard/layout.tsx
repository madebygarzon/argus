"use client";
import * as React from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Topbar } from "@/components/layout/Topbar";

// Layout for all dashboard pages
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="min-h-screen md:grid md:grid-cols-[280px_1fr]">
      <AppSidebar open={open} onOpenChange={setOpen} />
      <div className="flex flex-col">
        <Topbar onMenuClick={() => setOpen(true)} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
