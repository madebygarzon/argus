"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface TopbarProps {
  onMenuClick: () => void;
}

// Simple top bar with optional user actions
export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4">
      <button
        className="rounded-md p-2 hover:bg-gray-100 md:hidden"
        onClick={onMenuClick}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>
      <div className="flex items-center gap-3">
        <Badge>Beta</Badge>
        <DropdownMenu
          trigger={<Avatar src="/avatar.png" alt="User avatar" className="cursor-pointer" />}
        >
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenu>
      </div>
    </header>
  );
}
