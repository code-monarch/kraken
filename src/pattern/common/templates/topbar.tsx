"use client";
import React from "react";
import BrandLogoIcon from "../atoms/icons/brand-logo-icon";
import { cn } from "@/lib/utils";
import NotificationWidget from "../molecules/data-display/notification-widget";
import TopbarProfileTag from "../molecules/data-display/top-bar-profile-tag";

const Topbar = () => {
  return (
    <div
      className={cn(
        "bg-white fixed w-screen h-[--topbar-height] flex justify-between pt-[20px] pb-[12px] pl-4 pr-[32px] transition-all duration-200 ease-in-out z-[30]"
      )}
    >
      <BrandLogoIcon height='32' width='154.24' />

      <div className='w-[calc(100%-var(--sidebar-width))] flex items-center justify-between'>
        hjhj
        {/* Wallet/Currency Summary, Notification and more options */}
        <div className='flex items-center gap-x-4'>
          <NotificationWidget />
          <TopbarProfileTag />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
