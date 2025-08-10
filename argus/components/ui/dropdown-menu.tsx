"use client";
import * as React from "react";

// Very small dropdown menu implementation for demo purposes
export function DropdownMenu({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-40 rounded-md border bg-white p-1 shadow-md">
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="block w-full rounded-sm px-2 py-1 text-left text-sm hover:bg-gray-100"
    >
      {children}
    </button>
  );
}
