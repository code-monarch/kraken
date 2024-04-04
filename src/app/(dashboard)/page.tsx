"use client";
import { USER_ROLE } from "@/lib/constants";
import Hidden from "@/pattern/common/molecules/data-display/hidden";
import PageHeader from "@/pattern/common/molecules/data-display/page-header";
import OverviewChartSection from "@/pattern/overview/templates/overview-chart-section";
import OverviewMetricGrid from "@/pattern/overview/templates/overview-metric-grid";
import OverviewRecentTransactionsTemplate from "@/pattern/overview/templates/overview-recent-transactions-template";
import SuperAdminOverviewMetricGrid from "@/pattern/super-admin/organisms/super-admin-overview-metric-grid";

export default function Home() {
  return (
    <>
      <PageHeader
        pageTitle='Overview'
        pageDescription={
          USER_ROLE === "Admin"
            ? "Track, manage and forecast your Pilgrims, Agents and Transactions."
            : "Track, manage and forecast your Pilgrims, Agents, Admins and Transactions."
        }
      />
      {/* Admin Metric Grid */}
      <Hidden visible={USER_ROLE === "Admin"}>
        <OverviewMetricGrid />
      </Hidden>

      {/* Super Admin Metric Grid */}
      <Hidden visible={USER_ROLE === "SuperAdmin"}>
        <SuperAdminOverviewMetricGrid />
      </Hidden>
      <OverviewChartSection />
      <OverviewRecentTransactionsTemplate />
    </>
  );
}
