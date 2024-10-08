"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { DASHBOARD_PATHS } from "@/lib/routes";
import { IIconProps } from "@/pattern/types";
import { NAV_ICON_ACTIVE, NAV_ICON_INACTIVE } from "@/lib/constants";
import Hidden from "@/pattern/common/molecules/data-display/hidden";

export const ActivityLogsNavIcon = ({ ...props }: IIconProps) => {
  const [color, setColor] = useState<string>(`${NAV_ICON_INACTIVE}`);
  const [isActive, setIsActive] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith(`${DASHBOARD_PATHS.activityLogs}`)) {
      setIsActive(true);
      setColor(`${NAV_ICON_ACTIVE}`);
    }else{
      setIsActive(false);
       setColor(`${NAV_ICON_INACTIVE}`);
    }
  }, [pathname]);

  return (
    <>
      <Hidden visible={!isActive}>
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          {...props}
        >
          <path
            d='M12.4993 18.9582H7.49935C2.97435 18.9582 1.04102 17.0248 1.04102 12.4998V7.49984C1.04102 2.97484 2.97435 1.0415 7.49935 1.0415H12.4993C17.0243 1.0415 18.9577 2.97484 18.9577 7.49984V12.4998C18.9577 17.0248 17.0243 18.9582 12.4993 18.9582ZM7.49935 2.2915C3.65768 2.2915 2.29102 3.65817 2.29102 7.49984V12.4998C2.29102 16.3415 3.65768 17.7082 7.49935 17.7082H12.4993C16.341 17.7082 17.7077 16.3415 17.7077 12.4998V7.49984C17.7077 3.65817 16.341 2.2915 12.4993 2.2915H7.49935Z'
            fill={color}
          />
          <path
            d='M6.10875 12.7C5.97542 12.7 5.84209 12.6583 5.72542 12.5667C5.45042 12.3583 5.40042 11.9667 5.60875 11.6917L7.59209 9.11667C7.83375 8.80834 8.17542 8.60834 8.56709 8.55834C8.95042 8.50834 9.34209 8.61667 9.65042 8.85834L11.1754 10.0583C11.2338 10.1083 11.2921 10.1083 11.3338 10.1C11.3671 10.1 11.4254 10.0833 11.4754 10.0167L13.4004 7.53334C13.6088 7.25834 14.0088 7.20834 14.2754 7.42501C14.5504 7.63334 14.6004 8.02501 14.3838 8.30001L12.4588 10.7833C12.2171 11.0917 11.8754 11.2917 11.4838 11.3333C11.0921 11.3833 10.7088 11.275 10.4004 11.0333L8.87542 9.83334C8.81709 9.78334 8.75042 9.78334 8.71709 9.79167C8.68375 9.79167 8.62542 9.80834 8.57542 9.87501L6.59209 12.45C6.48375 12.6167 6.30042 12.7 6.10875 12.7Z'
            fill={color}
          />
        </svg>
      </Hidden>

      <Hidden visible={isActive}>
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          {...props}
        >
          <path
            d='M13.491 1.6665H6.50768C3.47435 1.6665 1.66602 3.47484 1.66602 6.50817V13.4832C1.66602 16.5248 3.47435 18.3332 6.50768 18.3332H13.4827C16.516 18.3332 18.3243 16.5248 18.3243 13.4915V6.50817C18.3327 3.47484 16.5243 1.6665 13.491 1.6665ZM14.3827 8.29984L12.4577 10.7832C12.216 11.0915 11.8743 11.2915 11.4827 11.3332C11.091 11.3832 10.7077 11.2748 10.3993 11.0332L8.87435 9.83317C8.81602 9.78317 8.74935 9.78317 8.71602 9.7915C8.68268 9.7915 8.62435 9.80817 8.57435 9.87484L6.59102 12.4498C6.46602 12.6082 6.28268 12.6915 6.09935 12.6915C5.96602 12.6915 5.83268 12.6498 5.71602 12.5582C5.44102 12.3498 5.39102 11.9582 5.59935 11.6832L7.58268 9.10817C7.82435 8.79984 8.16602 8.59984 8.55768 8.54984C8.94102 8.49984 9.33268 8.60817 9.64102 8.84984L11.166 10.0498C11.2243 10.0998 11.2827 10.0998 11.3243 10.0915C11.3577 10.0915 11.416 10.0748 11.466 10.0082L13.391 7.52484C13.5993 7.24984 13.9993 7.19984 14.266 7.4165C14.541 7.6415 14.591 8.03317 14.3827 8.29984Z'
            fill={color}
          />
        </svg>
      </Hidden>
    </>
  );
};




