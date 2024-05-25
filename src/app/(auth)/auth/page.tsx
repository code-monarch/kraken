"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AUTH_PATHS } from "@/lib/routes";

const AuthPage = () => {
  const { push } = useRouter();
  useEffect(() => {
    push(`${AUTH_PATHS.login}`);
  }, [push]);

  return <div></div>;
};

export default AuthPage;
