"use client"
import React from "react";
import { cn } from "@/lib/utils";
import PageWrapper from "@/pattern/common/templates/dashboard-page-wrapper";
// import Topbar from "@/pattern/common/templates/topbar";
import dynamic from 'next/dynamic'

const Topbar = dynamic(() => import('@/pattern/common/templates/topbar'), {
  ssr: false,
})

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "bg-accent w-full min-h-screen h-full flex flex-col items-center"
      )}
    >
      <Topbar />
      <PageWrapper>{children}</PageWrapper>
    </div>
  );
};

export default Layout;
