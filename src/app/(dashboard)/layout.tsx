"use client"
import React from "react";
import { cn } from "@/lib/utils";
import PageWrapper from "@/pattern/common/templates/dashboard-page-wrapper";
import Topbar from "@/pattern/common/organisms/topbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "bg-accent w-screen min-h-screen flex flex-col items-center"
      )}
    >
      <Topbar />
      <PageWrapper>{children}</PageWrapper>
    </div>
  );
};

export default Layout;
