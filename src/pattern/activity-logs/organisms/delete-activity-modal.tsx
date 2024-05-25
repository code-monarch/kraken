"use client";
import React from "react";
import { create, useModal } from "@ebay/nice-modal-react";
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
import { useDeleteSingleActivityMutation } from "@/redux/services/activity-logs/activity.api-slice";
import { SuccessModal } from "./success-modal";
import { show } from "@ebay/nice-modal-react";
import { ErrorModal } from "./error-modal";

interface IProps {
  id: string;
  userID: string;
}

export const DeleteActivityModal = create(({ id, userID }: IProps) => {
  const [deleteActivity, { isSuccess, isError, isLoading }] =
    useDeleteSingleActivityMutation();
  const { resolve, remove, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    remove();
  };

  const handleDeleteActivity = () => {
    deleteActivity({
      id: id,
    })
      .unwrap()
      .then((res) => {
        console.log("deleted successfuly");
        handleCloseModal();
        show(SuccessModal);
      })
      .catch((err) => {
        handleCloseModal();
        show(ErrorModal)
        console.log(`${err.error || err?.data?.message || err}`);
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
              Delete Activity
            </CardTitle>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-[16px] mb-[8px]">
            <p className="text-sm text-[#4F627D]">
              Are you sure you want to delete the activity of the id{" "}
              <span className="text-secondary">&lsquo;{id}&lsquo;</span> (User
              ID: <span className="text-secondary">{userID}</span>)? This action
              cannot be undone, and all associated data will be removed from the
              system.
            </p>
          </CardContent>

          {/* Footer */}
          <CardFooter className="w-full flex items-center justify-between gap-3">
            <Button size="sm" variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleDeleteActivity}
            >
              Confirm
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
});
