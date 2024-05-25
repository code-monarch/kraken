"use client";
import React from "react";
import GoBackWidget from "@/pattern/common/molecules/data-display/go-back-widget";
import PilgrimDetailsTemplate from "@/pattern/user-management/templates/pilgrim-details-template";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <GoBackWidget page="User details" />
      <PilgrimDetailsTemplate id={params.id} />
    </>
  );
};

export default Page;
