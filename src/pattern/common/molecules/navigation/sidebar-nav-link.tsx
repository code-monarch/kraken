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
  active: `bg-accent w-full h-[40px] flex items-center justify-start space-x-[8px] text-[1.125rem] text-[hsla(216,26%,30%,1)] font-raleway font-semibold !whitespace-pre text-secondaryText`,
};

const SidebarNavLink = ({
  href,
  exact,
  children,
  innerRef,
  className,
  ...props
}: INavLinkProps) => {
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
          "bg-transarent w-full h-[40px] flex items-center justify-start space-x-[8px] text-[1.125rem] text-[hsla(215,23%,40%,1)] text-center font-raleway font-medium !whitespace-pre px-4 py-[10px]",
          className
        )}
        ref={innerRef}
        {...props}
      >
        {children}
      </Link>
    </>
  );
};

export default SidebarNavLink;
