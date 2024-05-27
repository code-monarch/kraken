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

interface IProps {
  message: string;
}

export const ErrorModal = create(({ message }: IProps) => {
  const { resolve, remove, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    remove();
  };

  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className="w-fit h-fit p-0 outline-none border-none shadow-none">
        <Card className="w-[400px] min-h-[308p] h-fit p-6">
          {/* Header */}
          <CardHeader className="w-full flex flex-col items-start gap-y-5">
            {/* <DeleteAccountHeaderIcon /> */}
            <CardTitle className="text-[1.125rem] text-destructive font-semibold">
             Error Message
            </CardTitle>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-[16px] mb-[8px]">
            <p className="text-base font-medium text-foreground">
              {message}
            </p>
          </CardContent>

          {/* Footer */}
          <CardFooter className="w-full flex items-center justify-between gap-3">
            <Button size="sm" variant="destructive" onClick={handleCloseModal}>
              Close
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
});
