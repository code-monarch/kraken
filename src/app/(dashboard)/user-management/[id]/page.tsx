"use client";
import React from "react";
import { useParams } from 'next/navigation'
import GoBackWidget from "@/pattern/common/molecules/data-display/go-back-widget";
import PilgrimDetailsTemplate from "@/pattern/user-management/templates/pilgrim-details-template";

const UserDetailsPage = () => {
  const params = useParams<{ id: string }>()

  return (
    <>
      <GoBackWidget page="User details" />
      <PilgrimDetailsTemplate id={params.id} />
    </>
  );
};

export default UserDetailsPage;
