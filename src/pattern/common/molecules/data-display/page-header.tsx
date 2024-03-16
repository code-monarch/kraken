"use client";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { DASHBOARD_PATHS, pageMeta } from "@/lib/routes";

const PageHeader = () => {
  const [pageTitle, setPageTitle] = useState<string>("");
  const [pageDescription, setPageDescription] = useState<string>("");
  const [exact, setExact] = useState<boolean>(false);

  const pathname = usePathname();

   const pagePaths = useMemo(() => [
    `${DASHBOARD_PATHS.index}`,
    `${DASHBOARD_PATHS.userManagement}`,
    `${DASHBOARD_PATHS.settings}`,
    `${DASHBOARD_PATHS.transactions}`,
    `${DASHBOARD_PATHS.activityLogs}`,
  ], []);

  useEffect(() => {
    if (pathname === "/") {
      setExact(true);
    }
  }, [pathname]);
  console.log("PATH NAME: ", pathname);

  const isActive = useCallback(() => {
    if (exact) {
      return true;
    } else if (pagePaths.map((path) => pathname.startsWith(path))) {
      return true;
    } else {
      return false;
    }
  }, [exact, pagePaths, pathname]);
  console.log("IS ACTIVE: ", isActive());

  // Set Topbar title depending on what route the user is currently on
  useEffect(() => {
    switch (pathname) {
      case `${DASHBOARD_PATHS.index}`:
        if (isActive()) {
          setPageTitle(`${pageMeta.overview.title}`);
          setPageDescription(`${pageMeta.overview.description}`);
        }
        break;
      case `${DASHBOARD_PATHS.userManagement}`:
        if (isActive()) {
          setPageTitle(`${pageMeta.userManagement.title}`);
          setPageDescription(`${pageMeta.userManagement.description}`);
        }
      case `${DASHBOARD_PATHS.transactions}`:
        if (isActive()) {
          setPageTitle(`${pageMeta.transactions.title}`);
          setPageDescription(`${pageMeta.transactions.description}`);
        }
        break;
      case `${DASHBOARD_PATHS.settings}`:
        if (isActive()) {
          setPageTitle(`${pageMeta.settings.title}`);
          setPageDescription(`${pageMeta.settings.description}`);
        }
      case `${DASHBOARD_PATHS.activityLogs}`:
        if (isActive()) {
          setPageTitle(`${pageMeta.activityLogs.title}`);
          setPageDescription(`${pageMeta.activityLogs.description}`);
        }
        break;
      default:
        setPageTitle(`${pageMeta.overview.title}`);
        setPageDescription(`${pageMeta.overview.description}`);
    }
  }, [isActive, pathname]);
  return (
    <div className='w-full h-[66px] flex flex-col items-start'>
      <h2 className='text-black text-[1.75rem] font-raleway font-semibold'>
        {pageTitle}
      </h2>
      <p className='text-base text-muted-foreground font-raleway font-normal'>
        {pageDescription}
      </p>
    </div>
  );
};

export default PageHeader;
