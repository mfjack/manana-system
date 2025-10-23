"use client";

import { useSidebar } from "@/components/ui/sidebar";

export function SidebarHotspot() {
  const { setOpen } = useSidebar();
  return (
    <div
      className="fixed top-0 left-0 z-50 h-full w-2 hover:cursor-pointer"
      onMouseEnter={() => setOpen(true)}
      style={{ background: "transparent" }}
      aria-hidden="true"
    />
  );
}
