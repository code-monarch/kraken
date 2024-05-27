"use client";
import React from "react";
import PageHeader from "@/pattern/common/molecules/data-display/page-header";
import SettingsTemplate from "@/pattern/settings/template/settings-template";

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
