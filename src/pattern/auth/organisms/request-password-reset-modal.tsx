"use client";
import React from "react";
import { AUTH_PATHS } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useModal, create } from "@ebay/nice-modal-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const RequestPasswordResetModal = create(() => {
  const { push, back } = useRouter();
  const { resolve, hide, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    hide();
  };

  return (
    <AlertDialog open={visible} onOpenChange={handleCloseModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create a Reset Password Request</AlertDialogTitle>
          <AlertDialogDescription>
            You need to Request for Password reset before continuing
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={back}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => push(`${AUTH_PATHS.resetPassword}`)}
          >
            Request Password Reset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default RequestPasswordResetModal;
