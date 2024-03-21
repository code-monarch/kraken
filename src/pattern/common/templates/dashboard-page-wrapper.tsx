"use client";
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./sidebar";
import PageHeader from "../molecules/data-display/page-header";

// Wrapper for pages that are not authentication pages
const PageWrapper = ({ children }: { children: ReactNode }) => {

  return (
    <div
      className={cn(
        "bg-accent w-full h-full flex items-start transition-all duration-200 ease-in-out"
      )}
    >
      <Sidebar />
      <main className='bg-accent w-full flex flex-col space-y-[20px] ml-[--sidebar-width] mt-[--topbar-height] p-[32px] overflow-x-hidden'>
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;
