"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { DASHBOARD_PATHS } from "@/lib/routes";
import { IIconProps } from "@/pattern/types";
import { NAV_ICON_ACTIVE, NAV_ICON_INACTIVE } from "@/lib/constants";
import Hidden from "@/pattern/common/molecules/data-display/hidden";

export const UserManagementNavIcon = ({ ...props }: IIconProps) => {
  const [color, setColor] = useState<string>(`${NAV_ICON_INACTIVE}`);
  const [isActive, setIsActive] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith(`${DASHBOARD_PATHS.userManagement}`)) {
      setIsActive(true);
      setColor(`${NAV_ICON_ACTIVE}`);
    } else {
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
            d='M9.99998 10.6251C7.35831 10.6251 5.20831 8.47508 5.20831 5.83341C5.20831 3.19175 7.35831 1.04175 9.99998 1.04175C12.6416 1.04175 14.7916 3.19175 14.7916 5.83341C14.7916 8.47508 12.6416 10.6251 9.99998 10.6251ZM9.99998 2.29175C8.04998 2.29175 6.45831 3.88341 6.45831 5.83341C6.45831 7.78341 8.04998 9.37508 9.99998 9.37508C11.95 9.37508 13.5416 7.78341 13.5416 5.83341C13.5416 3.88341 11.95 2.29175 9.99998 2.29175Z'
            fill={color}
          />
          <path
            d='M17.1585 18.9583C16.8168 18.9583 16.5335 18.675 16.5335 18.3333C16.5335 15.4583 13.6001 13.125 10.0001 13.125C6.40013 13.125 3.4668 15.4583 3.4668 18.3333C3.4668 18.675 3.18346 18.9583 2.8418 18.9583C2.50013 18.9583 2.2168 18.675 2.2168 18.3333C2.2168 14.775 5.70846 11.875 10.0001 11.875C14.2918 11.875 17.7835 14.775 17.7835 18.3333C17.7835 18.675 17.5001 18.9583 17.1585 18.9583Z'
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
            d='M9.99992 10.0001C12.3011 10.0001 14.1666 8.1346 14.1666 5.83341C14.1666 3.53223 12.3011 1.66675 9.99992 1.66675C7.69873 1.66675 5.83325 3.53223 5.83325 5.83341C5.83325 8.1346 7.69873 10.0001 9.99992 10.0001Z'
            fill={color}
          />
          <path
            d='M10 12.0833C5.82505 12.0833 2.42505 14.8833 2.42505 18.3333C2.42505 18.5666 2.60838 18.7499 2.84172 18.7499H17.1584C17.3917 18.7499 17.575 18.5666 17.575 18.3333C17.575 14.8833 14.175 12.0833 10 12.0833Z'
            fill={color}
          />
        </svg>
      </Hidden>
    </>
  );
};
