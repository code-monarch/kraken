import React from "react";
import EditMessageBtnIcon from "@/pattern/common/atoms/icons/edit-message-btn-icon";
import { LinkButton } from "@/pattern/common/molecules/controls/link-button";

export const EditMessageButton = () => {
  return (
    <div className='flex items-center gap-2'>
      <EditMessageBtnIcon />
      <LinkButton className='min-w-fit w-fit text-base font-semibold'>Edit</LinkButton>
    </div>
  );
};
