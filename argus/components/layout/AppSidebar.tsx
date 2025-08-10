"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardNav } from "@/lib/nav";
import { Sidebar } from "@/components/ui/sidebar";
import { X } from "lucide-react";
import * as React from "react";

interface AppSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Application sidebar that maps navigation items from the config
export function AppSidebar({ open, onOpenChange }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar
      className={`fixed inset-y-0 left-0 z-50 transform border-r bg-white p-4 shadow-md transition-transform duration-200 md:static md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <button
        onClick={() => onOpenChange(false)}
        aria-label="Close sidebar"
        className="absolute right-2 top-2 rounded-md p-1 text-gray-500 hover:bg-gray-100 md:hidden"
      >
        <X className="h-4 w-4" />
      </button>
      <nav className="mt-8 space-y-1">
        {dashboardNav.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-gray-100 ${active ? "bg-gray-100 font-medium" : "text-gray-700"}`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </Sidebar>
  );
}
