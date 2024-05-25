"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import PageHeader from "@/pattern/common/molecules/data-display/page-header";
import SettingsTemplate from "@/pattern/settings/template/settings-template";

interface payload {
  userImg: any;
}

const SettingsPage = () => {
  
  return (
    <>
      <PageHeader
        pageTitle="Settings"
        pageDescription="Manage and oversee all users settings."
      />

      <SettingsTemplate />
    </>
  );
};

export default SettingsPage;
