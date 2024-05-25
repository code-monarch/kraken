"use client";
import React from "react";
import SuperAdminUserManagementPageHeader from "@/pattern/super-admin/molecules/super-admin-user-management-page-header";
import PageHeader from "@/pattern/common/molecules/data-display/page-header";
import { USER_ROLE } from "@/lib/constants";
import Hidden from "@/pattern/common/molecules/data-display/hidden";
import SuperAdminUserManagementActionGrid from "@/pattern/super-admin/templates/super-admin-user-management-action-grid";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UserManagementMetricGrid from "@/pattern/user-management/organisms/user-management-metric-grid";
import UserManagementTableTemplate from "@/pattern/user-management/templates/user-management-table-template";

const UserManagementPage = () => {
  const adminRole = useSelector(
    (state: RootState) => state.userDetails.adminRole
  );

  return (
    <>
      {/* Admin Page Header */}
      <Hidden visible={adminRole === "ADMIN"}>
        <PageHeader
          pageTitle="User Management"
          pageDescription="Manage and oversee user accounts with ease."
        />
      </Hidden>

      {/* Super Admin Page Header */}
      <Hidden visible={adminRole === "SUPER_ADMIN"}>
        <SuperAdminUserManagementPageHeader />
      </Hidden>

      <UserManagementMetricGrid />

      {/* Super Admin Page Action Banners */}
      <Hidden visible={adminRole === "SUPER_ADMIN"}>
        <SuperAdminUserManagementActionGrid />
      </Hidden>
      <UserManagementTableTemplate />
    </>
  );
};

export default UserManagementPage;
