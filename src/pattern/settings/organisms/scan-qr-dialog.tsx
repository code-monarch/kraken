import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";
import ValidateTotpDialog from "./validate-totp.dialog";
import ScanSectionIndicator from "@/pattern/common/atoms/icons/scan-section-indicator";
import { create, show, useModal } from "@ebay/nice-modal-react";
import Image from "next/image";
import SheetCloseIcon from "@/pattern/common/atoms/icons/sheet-close-icon";

interface IProps {
  secret: string;
  qrCode: string;
}

const ScanQrDialog = create(({ secret, qrCode }: IProps) => {
  const { resolve, remove, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    remove();
  };

  const [value, setValue] = useState("1KLTG4RS7XCJK9FS");

  const onSubmit = () => {
    handleCloseModal();
    show(ValidateTotpDialog);
  };
  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="text-[#202b3c] text-center"
      >
        <DialogHeader className="space-y-4 relative">
          <ScanSectionIndicator />
          <DialogDescription className="text-[#202b36] text-base text-center">
            <p className="font-semibold">
              Scan the QR code in the authenticator app.
            </p>
            <p>You will need an Authenticator app to complete this process,</p>
          </DialogDescription>
          <span
            onClick={handleCloseModal}
            className="!m-0 cursor-pointer absolute right-0 top-0"
          >
            <SheetCloseIcon />
          </span>
        </DialogHeader>

        <div className="my-2 space-y-2">
          <div className="p-4 bg-white flex justify-center items-center">
            {/* <QRCode value={value} /> */}
            <Image alt="qr-code" src={qrCode} width={250} height={250} />
          </div>
          <div className="bg-[#f1f5f9] py-3 px-4 space-y-2">
            <p className="font-semibold text-lg">{secret}</p>
            <p className="text-sm">
              If you are unable to scan the QR code, please enter this code
              manually into your app
            </p>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              onClick={() => {
                onSubmit();
              }}
            >
              Continue
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default ScanQrDialog;
