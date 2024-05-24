"use client";
import { USER_ROLE } from "@/lib/constants";
import LocalStore from "@/lib/helper/session-manager";
import Hidden from "@/pattern/common/molecules/data-display/hidden";
import PageHeader from "@/pattern/common/molecules/data-display/page-header";
import OverviewChartSection from "@/pattern/overview/templates/overview-chart-section";
import OverviewMetricGrid from "@/pattern/overview/templates/overview-metric-grid";
import OverviewRecentTransactionsTemplate from "@/pattern/overview/templates/overview-recent-transactions-template";
import SuperAdminOverviewMetricGrid from "@/pattern/super-admin/organisms/super-admin-overview-metric-grid";
import { useGetAdminQuery } from "@/redux/services/admin/admin.api-slice";
import { setAdminRole } from "@/redux/slices/user-slice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const adminId = LocalStore.getItem({ key: "ADMIN_ID" });
  const { data, isLoading } = useGetAdminQuery({
    id: adminId ? adminId : "",
  });

  const adminRole = useSelector(
    (state: RootState) => state.userDetails.adminRole
  );

  useEffect(() => {
    dispatch(setAdminRole(data?.data.userType));
  }, [dispatch, data]);

  return (
    <>
      <PageHeader
        pageTitle="Overview"
        pageDescription={
          adminRole === "ADMIN"
            ? "Track, manage and forecast your Pilgrims, Agents and Transactions."
            : "Track, manage and forecast your Pilgrims, Agents, Admins and Transactions."
        }
      />
      {/* Admin Metric Grid */}
      <Hidden visible={adminRole === "ADMIN"}>
        <OverviewMetricGrid />
      </Hidden>

      {/* Super Admin Metric Grid */}
      <Hidden visible={adminRole === "SUPER_ADMIN"}>
        <SuperAdminOverviewMetricGrid />
      </Hidden>
      <OverviewChartSection />
      <OverviewRecentTransactionsTemplate />
    </>
  );
}
