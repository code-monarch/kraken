"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface INavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  exact?: boolean; // Determines whether link is exactly same route e.g: "dashboard" and not "dashboard/checkout"
  children: React.ReactNode;
  className?: string;
  innerRef?: any;
}

const style = {
  active: `!w-[84px] flex items-center justify-center space-x-[8px] text-sm font-raleway font-medium !whitespace-pre text-secondaryText`,
};

function CustomNavLink({
  href,
  exact,
  children,
  innerRef,
  className,
  ...props
}: INavLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    className += ` ${style.active}`;
  }

  return (
    <>
      <Link
        href={href}
        className={cn(
          "min-w-[84px] m-fit flex items-center justify-center space-x-[8px] px-3 py-[6px]",
          "text-base text-center font-raleway font-normal !whitespace-pre",
          className
        )}
        ref={innerRef}
        {...props}
      >
        {children}
      </Link>
    </>
  );
}

export default CustomNavLink;
