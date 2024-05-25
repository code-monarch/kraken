"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { DASHBOARD_PATHS } from "@/lib/routes";
import { IIconProps } from "@/pattern/types";
import { NAV_ICON_ACTIVE, NAV_ICON_INACTIVE } from "@/lib/constants";
import Hidden from "@/pattern/common/molecules/data-display/hidden";

export const SettingsNavIcon = ({ ...props }: IIconProps) => {
  const [color, setColor] = useState<string>(`${NAV_ICON_INACTIVE}`);
  const [isActive, setIsActive] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith(`${DASHBOARD_PATHS.settings}`)) {
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
            d='M10 13.125C8.275 13.125 6.875 11.725 6.875 10C6.875 8.275 8.275 6.875 10 6.875C11.725 6.875 13.125 8.275 13.125 10C13.125 11.725 11.725 13.125 10 13.125ZM10 8.125C8.96667 8.125 8.125 8.96667 8.125 10C8.125 11.0333 8.96667 11.875 10 11.875C11.0333 11.875 11.875 11.0333 11.875 10C11.875 8.96667 11.0333 8.125 10 8.125Z'
            fill={color}
          />
          <path
            d='M12.6753 18.4917C12.5003 18.4917 12.3253 18.4667 12.1503 18.4251C11.6337 18.2834 11.2003 17.9584 10.9253 17.5001L10.8253 17.3334C10.3337 16.4834 9.65866 16.4834 9.16699 17.3334L9.07533 17.4917C8.80033 17.9584 8.36699 18.2917 7.85033 18.4251C7.32533 18.5667 6.78366 18.4917 6.32533 18.2167L4.89199 17.3917C4.38366 17.1001 4.01699 16.6251 3.85866 16.0501C3.70866 15.4751 3.78366 14.8834 4.07533 14.3751C4.31699 13.9501 4.38366 13.5667 4.24199 13.3251C4.10033 13.0834 3.74199 12.9417 3.25033 12.9417C2.03366 12.9417 1.04199 11.9501 1.04199 10.7334V9.26674C1.04199 8.05008 2.03366 7.05841 3.25033 7.05841C3.74199 7.05841 4.10033 6.91674 4.24199 6.67508C4.38366 6.43341 4.32533 6.05008 4.07533 5.62508C3.78366 5.11674 3.70866 4.51674 3.85866 3.95008C4.00866 3.37508 4.37533 2.90008 4.89199 2.60841L6.33366 1.78341C7.27533 1.22508 8.51699 1.55008 9.08366 2.50841L9.18366 2.67508C9.67533 3.52508 10.3503 3.52508 10.842 2.67508L10.9337 2.51674C11.5003 1.55008 12.742 1.22508 13.692 1.79174L15.1253 2.61674C15.6337 2.90841 16.0003 3.38341 16.1587 3.95841C16.3087 4.53341 16.2337 5.12508 15.942 5.63341C15.7003 6.05841 15.6337 6.44174 15.7753 6.68341C15.917 6.92508 16.2753 7.06674 16.767 7.06674C17.9837 7.06674 18.9753 8.05841 18.9753 9.27508V10.7417C18.9753 11.9584 17.9837 12.9501 16.767 12.9501C16.2753 12.9501 15.917 13.0917 15.7753 13.3334C15.6337 13.5751 15.692 13.9584 15.942 14.3834C16.2337 14.8917 16.317 15.4917 16.1587 16.0584C16.0087 16.6334 15.642 17.1084 15.1253 17.4001L13.6837 18.2251C13.367 18.4001 13.0253 18.4917 12.6753 18.4917ZM10.0003 15.4084C10.742 15.4084 11.4337 15.8751 11.9087 16.7001L12.0003 16.8584C12.1003 17.0334 12.267 17.1584 12.467 17.2084C12.667 17.2584 12.867 17.2334 13.0337 17.1334L14.4753 16.3001C14.692 16.1751 14.8587 15.9667 14.9253 15.7167C14.992 15.4667 14.9587 15.2084 14.8337 14.9917C14.3587 14.1751 14.3003 13.3334 14.667 12.6917C15.0337 12.0501 15.792 11.6834 16.742 11.6834C17.2753 11.6834 17.7003 11.2584 17.7003 10.7251V9.25841C17.7003 8.73341 17.2753 8.30008 16.742 8.30008C15.792 8.30008 15.0337 7.93341 14.667 7.29174C14.3003 6.65008 14.3587 5.80841 14.8337 4.99174C14.9587 4.77508 14.992 4.51674 14.9253 4.26674C14.8587 4.01674 14.7003 3.81674 14.4837 3.68341L13.042 2.85841C12.6837 2.64174 12.2087 2.76674 11.992 3.13341L11.9003 3.29174C11.4253 4.11674 10.7337 4.58341 9.99199 4.58341C9.25033 4.58341 8.55866 4.11674 8.08366 3.29174L7.99199 3.12508C7.78366 2.77508 7.31699 2.65008 6.95866 2.85841L5.51699 3.69174C5.30033 3.81674 5.13366 4.02508 5.06699 4.27508C5.00033 4.52508 5.03366 4.78341 5.15866 5.00008C5.63366 5.81674 5.69199 6.65841 5.32533 7.30008C4.95866 7.94174 4.20033 8.30841 3.25033 8.30841C2.71699 8.30841 2.29199 8.73341 2.29199 9.26674V10.7334C2.29199 11.2584 2.71699 11.6917 3.25033 11.6917C4.20033 11.6917 4.95866 12.0584 5.32533 12.7001C5.69199 13.3417 5.63366 14.1834 5.15866 15.0001C5.03366 15.2167 5.00033 15.4751 5.06699 15.7251C5.13366 15.9751 5.29199 16.1751 5.50866 16.3084L6.95033 17.1334C7.12533 17.2417 7.33366 17.2667 7.52533 17.2167C7.72533 17.1667 7.89199 17.0334 8.00033 16.8584L8.09199 16.7001C8.56699 15.8834 9.25866 15.4084 10.0003 15.4084Z'
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
            d='M16.7493 7.68336C15.241 7.68336 14.6244 6.6167 15.3744 5.30836C15.8077 4.55003 15.5493 3.58336 14.791 3.15003L13.3493 2.32503C12.691 1.93336 11.841 2.1667 11.4493 2.82503L11.3577 2.98336C10.6077 4.2917 9.37435 4.2917 8.61602 2.98336L8.52435 2.82503C8.14935 2.1667 7.29935 1.93336 6.64102 2.32503L5.19935 3.15003C4.44102 3.58336 4.18268 4.55836 4.61602 5.3167C5.37435 6.6167 4.75768 7.68336 3.24935 7.68336C2.38268 7.68336 1.66602 8.3917 1.66602 9.2667V10.7334C1.66602 11.6 2.37435 12.3167 3.24935 12.3167C4.75768 12.3167 5.37435 13.3834 4.61602 14.6917C4.18268 15.45 4.44102 16.4167 5.19935 16.85L6.64102 17.675C7.29935 18.0667 8.14935 17.8334 8.54102 17.175L8.63268 17.0167C9.38268 15.7084 10.616 15.7084 11.3743 17.0167L11.466 17.175C11.8577 17.8334 12.7077 18.0667 13.366 17.675L14.8077 16.85C15.566 16.4167 15.8243 15.4417 15.391 14.6917C14.6327 13.3834 15.2494 12.3167 16.7577 12.3167C17.6244 12.3167 18.341 11.6084 18.341 10.7334V9.2667C18.3327 8.40003 17.6243 7.68336 16.7493 7.68336ZM9.99935 12.7084C8.50768 12.7084 7.29102 11.4917 7.29102 10C7.29102 8.50836 8.50768 7.2917 9.99935 7.2917C11.491 7.2917 12.7077 8.50836 12.7077 10C12.7077 11.4917 11.491 12.7084 9.99935 12.7084Z'
            fill={color}
          />
        </svg>
      </Hidden>
    </>
  );
};

