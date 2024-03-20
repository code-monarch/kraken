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
import EnableQRDialog from "./enable-qr-dialog";
import ScanSectionIndicator from "@/pattern/common/atoms/icons/scan-section-indicator";

const QRAuthDialog = () => {
  const [open, setOpen] = useState<boolean>();
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const [value, setValue] = useState("1KLTG4RS7XCJK9FS");

  const onSubmit = () => {};
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="bg-[#2277f0] py-3 px-6 rounded-[6px] text-base font-semibold text-white">
          Enable
        </DialogTrigger>
        <DialogContent className="text-[#202b3c] text-center">
          <DialogHeader className="space-y-4">
            <ScanSectionIndicator />
            <DialogDescription className="text-[#202b36] text-base text-center">
              <p className="font-semibold">
                Scan the QR code in the authenticator app.
              </p>
              <p>
                You will need an Authenticator app to complete this process,
              </p>
            </DialogDescription>
          </DialogHeader>

          <div className="my-2 space-y-2">
            <div className="p-4 bg-white flex justify-center items-center">
              <QRCode value={value} />
            </div>
            <div className="bg-[#f1f5f9] py-3 px-4 space-y-2">
              <p className="font-semibold text-lg">{value}</p>
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
                  setOpen(false);
                  setConfirmOpen(true);
                }}
              >
                Continue
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="hidden">
        <EnableQRDialog open={confirmOpen} setOpen={setConfirmOpen} />
      </div>
    </div>
  );
};

export default QRAuthDialog;
