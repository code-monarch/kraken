'use client'
import React from 'react'
import { AUTH_PATHS } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { useModal, create } from '@ebay/nice-modal-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const RequestUserLoginModal = create(() => {
  const { push, back } = useRouter()
  const { resolve, remove, visible } = useModal()

  const handleCloseModal = () => {
    resolve({ resolved: true })
    remove()
  }

  return (
    <AlertDialog open={visible} onOpenChange={handleCloseModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Go to Login</AlertDialogTitle>
          <AlertDialogDescription>
            You need to be logged in before you can proceed
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={back}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => push(`${AUTH_PATHS.login}`)}
          >
            Login
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
})

export default RequestUserLoginModal
