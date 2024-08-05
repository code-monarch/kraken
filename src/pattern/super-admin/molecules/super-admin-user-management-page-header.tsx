'use client'
import React from 'react'
import PageHeader from '../../common/molecules/data-display/page-header'
import ButtonWithIcon from '../../common/molecules/controls/button-with-icon'
import AddUserBtnIcon from '../../common/atoms/icons/add-user-btn-icon'
import SendMessageBtnIcon from '../../common/atoms/icons/send-message-btn-icon'
import { show } from '@ebay/nice-modal-react'
import AddNewUserModal from '../templates/add-new-user-modal'
import SendMessageModal from '../templates/send-message-modal'
import CreateAdminModal from '../templates/create-admin-modal'

const SuperAdminUserManagementPageHeader = () => {
  const handleCreateAdmin = () => {
    show(CreateAdminModal)
  }
  const handleAddUser = () => {
    show(AddNewUserModal)
  }
  const handleSendMessage = () => {
    show(SendMessageModal)
  }
  return (
    <div className='w-full flex items-center justify-between'>
      <PageHeader
        pageTitle='User Management'
        pageDescription='Manage and oversee user accounts with ease.'
      />

      <div className='h-[48px] flex items-center gap-4'>
        {/* Create Admin Modal Trigger */}
        <ButtonWithIcon
          prefixIcon={<AddUserBtnIcon color='hsla(40,96%,53%,1)' />}
          size='sm'
          className='w-[158px] h-full bg-warning-100 text-base text-warning hover:bg-warning-100 rounded-[6px] shadow-sm'
          onClick={handleCreateAdmin}
        >
          Create admin
        </ButtonWithIcon>

        {/* Add User Modal Trigger */}
        <ButtonWithIcon
          prefixIcon={<AddUserBtnIcon />}
          size='sm'
          className='w-[158px] h-full bg-[hsla(151,100%,96%,1)] text-base text-primary hover:bg-[hsla(151,100%,96%,1)] rounded-[6px] shadow-sm'
          onClick={handleAddUser}
        >
          Add user
        </ButtonWithIcon>

        {/* Send Message Modal Trigger */}
        <ButtonWithIcon
          prefixIcon={<SendMessageBtnIcon />}
          variant='secondary'
          size='sm'
          className='w-[210px] h-full bg-[hsla(215,100%,94%,1)] text-base text-secondary hover:bg-[hsla(215,100%,94%,1)] rounded-[6px] shadow-sm'
          onClick={handleSendMessage}
        >
          Send message
        </ButtonWithIcon>
      </div>
    </div>
  )
}

export default SuperAdminUserManagementPageHeader
