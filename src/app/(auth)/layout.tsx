import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ummrah-cash Admin Auth",
  description: "Admin Authentication",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-[var(--auth-background)] w-screen h-fit min-h-screen flex justify-center items-start py-[88px] overflow-x-hidden'>
      {children}
    </div>
  );
};

export default AuthLayout;
