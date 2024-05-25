"use client";
import { ReactElement } from "react";
import NavLink from "../molecules/navigation/sidebar-nav-link";
import { DASHBOARD_PATHS } from "@/lib/routes";
import { OverviewNavIcon } from "../atoms/icons/sidebar-nav/overview-nav-icon";
import { UserManagementNavIcon } from "../atoms/icons/sidebar-nav/user-management-nav-icon";
import { TransactionsNavIcon } from "../atoms/icons/sidebar-nav/transactions-nav-icon";
import { SettingsNavIcon } from "../atoms/icons/sidebar-nav/settings-nav-icon";
import { ActivityLogsNavIcon } from "../atoms/icons/sidebar-nav/activity-logs-icon";

const navigation: {
  name: string;
  href: string;
  icon: ReactElement;
}[] = [
  {
    name: "Overview",
    href: `${DASHBOARD_PATHS.index}`,
    icon: <OverviewNavIcon />,
  },
  {
    name: "User Management",
    href: `${DASHBOARD_PATHS.userManagement}`,
    icon: <UserManagementNavIcon />,
  },
  {
    name: "Transactions",
    href: `${DASHBOARD_PATHS.transactions}`,
    icon: <TransactionsNavIcon />,
  },
  {
    name: "Settings",
    href: `${DASHBOARD_PATHS.settings}`,
    icon: <SettingsNavIcon />,
  },
  {
    name: "Activity Logs",
    href: `${DASHBOARD_PATHS.activityLogs}`,
    icon: <ActivityLogsNavIcon />,
  },
];

const Sidebar = () => {
  return (
    <div className='fixed left-0 top-0 bottom-0 bg-background min-h-screen h-fit w-[--sidebar-width] border-t-[1.5px] border-t-border px-4 py-[32px] mt-[--topbar-height] z-30'>
      <div className='w-full flex flex-col gap-y-2 items-center custom_scollbar'>
        {navigation.map((nav, idx) => (
          <NavLink
            href={nav.href}
            exact={nav.href === "/" ? true : false}
            key={idx}
          >
            <span>{nav.icon}</span>
            <span>{nav.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
