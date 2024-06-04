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
import { FreezeAccountHeaderIcon } from "@/pattern/common/atoms/icons/freeze-account-header-icon";
import LoadingButton from "@/pattern/common/molecules/controls/loading-button";
import { useFreezeUserMutation } from "@/redux/services/users/freeze-user.api-slice";
import { SuccessModal } from "@/pattern/common/organisms/success-modal";
import { useRouter, useSearchParams } from "next/navigation";
import { DASHBOARD_PATHS } from "@/lib/routes";
import { ErrorModal } from "@/pattern/common/organisms/error-modal";

interface IProps {
  userId: string;
  name: string;
  status: string;
}

export const FreezeAccountModal = create(({ userId, name, status }: IProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Returns a boolean if the current URL has a 'userId' search param
  const id = searchParams.has("userId");

  const { resolve, remove, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    remove();
  };

  const [freezeAccount, { isLoading, isSuccess, isError }] =
    useFreezeUserMutation();

  const handleFreezeAccount = () => {
    freezeAccount({
      id: userId,
    })
      .unwrap()
      .then((res) => {
        handleCloseModal();
        show(SuccessModal, { message: res.responseMessage ?? "Account frozen successfully" });
        // if (id) {
        //   router.push(`${DASHBOARD_PATHS.userManagement}`);
        // }
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
        <Card className="w-[400px] min-h-[328px] h-fit p-6">
          {/* Header */}
          <CardHeader className="w-full flex flex-col items-start gap-y-5">
            <FreezeAccountHeaderIcon />
            <CardTitle className="text-[1.125rem] text-foreground font-semibold">
              Freeze Account
            </CardTitle>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-[16px] mb-[8px]">
            {status === "Frozen" ? (
              <p className="text-sm text-[#4F627D]">
                Are you sure you want to unfreeze the account of the user
                <span className="text-secondary">
                  &lsquo;{name}&lsquo;
                </span>{" "}
                (User ID: <span className="text-secondary">{userId}</span>)?
                Unreezing the account will give the user access to perform
                transactions and access the UmrahCash services
              </p>
            ) : (
              <p className="text-sm text-[#4F627D]">
                Are you sure you want to freeze the account of the user
                <span className="text-secondary">
                  &lsquo;{name}&lsquo;
                </span>{" "}
                (User ID: <span className="text-secondary">{userId}</span>)?
                Freezing the account will temporarily disable the user&lsquo;s
                ability to perform transactions and access the UmrahCash
                services
              </p>
            )}
            {/* <p className="text-sm text-[#4F627D]">
              Are you sure you want to freeze the account of the user
              <span className="text-secondary">&lsquo;{name}&lsquo;</span> (User
              ID: <span className="text-secondary">{userId}</span>)? Freezing
              the account will temporarily disable the user&lsquo;s ability to
              perform transactions and access the UmrahCash services
            </p> */}
          </CardContent>

          {/* Footer */}
          <CardFooter className="w-full flex items-center justify-between gap-3">
            <Button size="sm" variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <LoadingButton
              size="sm"
              // variant="destructive"
              onClick={handleFreezeAccount}
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
