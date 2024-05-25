"use client";
import React from "react";
import PageHeader from "@/pattern/common/molecules/data-display/page-header";
import ActivityLogsTableTemplate from "@/pattern/activity-logs/templates/activity-logs-table-template";

const ActivityLogsPage = () => {
  return (
    <>
      <PageHeader
        pageTitle='Activity Logs'
        pageDescription='Effortlessly track and manage administrative activities.'
      />
      <ActivityLogsTableTemplate />
    </>
  );
};

export default ActivityLogsPage;
