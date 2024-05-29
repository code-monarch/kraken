"use client";
import React from "react";
import { create, show, useModal } from "@ebay/nice-modal-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteAccountHeaderIcon } from "@/pattern/common/atoms/icons/delete-account-header-icon";
import { useDeleteUserMutation } from "@/redux/services/users/delete-user.api-slice";
import { SuccessModal } from "./delete-account-success-modal";
import LoadingButton from "@/pattern/common/molecules/controls/loading-button";
import { ErrorModal } from "@/pattern/common/organisms/error-modal";
import { useRouter, useSearchParams } from "next/navigation";
import { DASHBOARD_PATHS } from "@/lib/routes";

interface IProps {
  userId: string;
  name: string;
}

export const DeleteAccountModal = create(({ userId, name }: IProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Returns a boolean if the current URL has a 'userId' search param
  const id = searchParams.has('userId')

  const [deleteAccount, { isLoading, isSuccess, isError }] =
    useDeleteUserMutation();
  const { resolve, remove, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    remove();
  };

  const handleDeleteAccount = () => {
    deleteAccount({
      id: userId,
    })
      .unwrap()
      .then((res) => {
        handleCloseModal();
        show(SuccessModal);
        if(id) {
          router.push(`${DASHBOARD_PATHS.userManagement}`)
        }
        window.location.reload()
      })
      .catch((err) => {
        handleCloseModal();
        show(ErrorModal, { message: "Something went wrong, please try again" });
        console.log(err?.data?.responseMessage);
      });
  };

  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className="w-fit h-fit p-0 outline-none border-none shadow-none">
        <Card className="w-[400px] min-h-[308px] h-fit p-6">
          {/* Header */}
          <CardHeader className="w-full flex flex-col items-start gap-y-5">
            <DeleteAccountHeaderIcon />
            <CardTitle className="text-[1.125rem] text-foreground font-semibold">
              Delete Account
            </CardTitle>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-[16px] mb-[8px]">
            <p className="text-sm text-[#4F627D]">
              Are you sure you want to delete the account of the user
              <span className="text-secondary">&lsquo;{name}&lsquo;</span> (User
              ID: <span className="text-secondary">{userId}</span>)? This action
              cannot be undone, and all associated data will be removed from the
              system.
            </p>
          </CardContent>

          {/* Footer */}
          <CardFooter className="w-full flex items-center justify-between gap-3">
            <Button size="sm" variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <LoadingButton
              size="sm"
              variant="destructive"
              onClick={handleDeleteAccount}
              loading={isLoading}
            >
              Confirm
            </LoadingButton>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
});
