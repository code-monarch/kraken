"use client";
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "../organisms/sidebar";

// Wrapper for pages that are not authentication pages
const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={cn(
        "bg-accent w-full h-full flex items-start transition-all duration-200 ease-in-out"
      )}
    >
      <Sidebar />
      <main className='bg-accent w-full flex justify-center ml-[--sidebar-width] mt-[--topbar-height] p-[32px]'>
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;
