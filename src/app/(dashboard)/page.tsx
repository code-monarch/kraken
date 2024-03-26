"use client";
import PageHeader from "@/pattern/common/molecules/data-display/page-header";
import OverviewChartSection from "@/pattern/overview/templates/overview-chart-section";
import OverviewMetricGrid from "@/pattern/overview/templates/overview-metric-grid";
import OverviewRecentTransactionsTemplate from "@/pattern/overview/templates/overview-recent-transactions-template";

export default function Home() {
  return (
    <>
      <PageHeader
        pageTitle='Overview'
        pageDescription='Track, manage and forecast your Pilgrims, Agents and Transactions.'
      />
      <OverviewMetricGrid />
      <OverviewChartSection />
      <OverviewRecentTransactionsTemplate />
    </>
  );
}
