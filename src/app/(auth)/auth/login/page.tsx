"use client";
import React, { useEffect } from "react";
import LoginTemplate from "@/pattern/auth/template/login-template";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  // const apiKey = localStorage.getItem("Api_Key");

  // useEffect(() => {
  //   if (apiKey) {
  //     router.push("/");
  //   }
  // }, [apiKey, router]);
  return (
    <>
      <LoginTemplate />
    </>
  );
};

export default LoginPage;
