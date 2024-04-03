"use client";
import React from "react";
import UserManagementActionBanner from "../common/molecules/feedback/user-management-action-banner";
import SendMessageIcon from "../common/atoms/icons/send-message-icon";
import CreateNewUserIcon from "../common/atoms/icons/create-new-user-icon";
import SendMessageModal from "./send-message-modal";
import { show } from "@ebay/nice-modal-react";
import AddNewUserModal from "./add-new-user-modal";

const SuperAdminUserManagementActionGrid = () => {
  return (
    <div className='w-full grid grid-cols-2 gap-5'>
      {/* Create New User */}
      <div
        className='cursor-pointer h-fit'
        onClick={() => show(AddNewUserModal)}
      >
        <UserManagementActionBanner
          title='Create new user'
          description='Add new users or import from CSV'
          icon={<CreateNewUserIcon />}
          variant='secondary'
        />
      </div>

      {/* Send Message */}
      <div
        className='cursor-pointer h-fit'
        onClick={() => show(SendMessageModal)}
      >
        <UserManagementActionBanner
          title='Send Message'
          description='Send message to individual or multiple users.'
          icon={<SendMessageIcon />}
        />
      </div>
    </div>
  );
};

export default SuperAdminUserManagementActionGrid;
