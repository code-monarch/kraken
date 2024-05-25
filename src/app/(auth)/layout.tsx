import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ummrah-cash Admin Auth",
  description: "Admin Authentication",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='bg-[var(--auth-background)] w-screen h-screen min-h-screen flex justify-center items-start py-[88px]'>
      {children}
    </section>
  );
};

export default AuthLayout;
