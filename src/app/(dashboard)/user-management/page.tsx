"use client";
import React from "react";
import SuperAdminUserManagementPageHeader from "@/pattern/super-admin/molecules/super-admin-user-management-page-header";
import PageHeader from "@/pattern/common/molecules/data-display/page-header";
import { USER_ROLE } from "@/lib/constants";
import Hidden from "@/pattern/common/molecules/data-display/hidden";
import SuperAdminUserManagementActionGrid from "@/pattern/super-admin/templates/super-admin-user-management-action-grid";
import { useGetAdminQuery } from "@/redux/services/admin/admin.api-slice";
import UserManagementMetricGrid from "@/pattern/user-management/organisms/user-management-metric-grid";
import UserManagementTableTemplate from "@/pattern/user-management/templates/user-management-table-template";

const UserManagementPage = () => {
  // Get Admin Details by ID
  const { data, isLoading } = useGetAdminQuery({
    id: ""
  });

  return (
    <>
      {/* Admin Page Header */}
      <Hidden visible={USER_ROLE === "Admin"}>
        <PageHeader
          pageTitle="User Management"
          pageDescription="Manage and oversee user accounts with ease."
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
