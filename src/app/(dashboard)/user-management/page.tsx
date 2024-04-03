"use client";
import React from "react";
import UserManagementMetricGrid from "@/pattern/user-management.tsx/organisms/user-management-metric-grid";
import UserManagementTableTemplate from "@/pattern/user-management.tsx/templates/user-management-table-template";
import SuperAdminUserManagementPageHeader from "@/pattern/super-admin/super-admin-user-management-page-header";
import PageHeader from "@/pattern/common/molecules/data-display/page-header";
import { USER_ROLE } from "@/lib/constants";
import Hidden from "@/pattern/common/molecules/data-display/hidden";
import SuperAdminUserManagementActionGrid from "@/pattern/super-admin/super-admin-user-management-action-grid";

const UserManagementPage = () => {
  return (
    <>
      {/* Admin Page Header */}
      <Hidden visible={USER_ROLE === "Admin"}>
        <PageHeader
          pageTitle='User Management'
          pageDescription='Manage and oversee user accounts with ease.'
        />
      </Hidden>

      {/* Super Admin Page Header */}
      <Hidden visible={USER_ROLE === "SuperAdmin"}>
        <SuperAdminUserManagementPageHeader />
      </Hidden>

      <UserManagementMetricGrid />
      
      {/* Super Admin Page Action Banners */}
      <Hidden visible={USER_ROLE === "SuperAdmin"}>
        <SuperAdminUserManagementActionGrid />
      </Hidden>
      <UserManagementTableTemplate />
    </>
  );
};

export default UserManagementPage;
