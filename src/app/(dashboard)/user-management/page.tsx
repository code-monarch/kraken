"use client";
import React from "react";
import PageHeader from "@/pattern/common/molecules/data-display/page-header";
import UserManagementMetricGrid from "@/pattern/user-management.tsx/organisms/user-management-metric-grid";
import UserManagementTableTemplate from "@/pattern/user-management.tsx/templates/user-management-table-template";

const UserManagementPage = () => {
  return (
    <>
      <PageHeader
        pageTitle='User Management'
        pageDescription='Manage and oversee user accounts with ease.'
      />
      <UserManagementMetricGrid />
      <UserManagementTableTemplate />
    </>
  );
};

export default UserManagementPage;
