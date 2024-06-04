import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import PhoneSectionIndicator from "@/pattern/common/atoms/icons/phone-section-indicator";
import PhoneNumberInput from "@/pattern/common/molecules/inputs/phone-input";
import GreyInfoIcon from "@/pattern/common/atoms/icons/grey-info-icon";
import ConfirmSms2FaDialog from "./confirm-sms-2fa-dialog";
import { create, show, useModal } from "@ebay/nice-modal-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToggleSms2FaMutation } from "@/redux/services/two-factor/sms2Fa.api-slice";
import LoadingButton from "@/pattern/common/molecules/controls/loading-button";
import { TWO_FA_PREFERENCE } from "@/lib/constants";
import LocalStore from "@/lib/helper/storage-manager";
import { ErrorModal } from "@/pattern/common/organisms/error-modal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SheetCloseIcon from "@/pattern/common/atoms/icons/sheet-close-icon";

const RequestOtpFormSchema = Yup.object().shape({
  // phone: Yup.string().required("Phone number is Required"),
});

const ToggleSms2FaDialog = create(() => {
  const sms2Fa = useSelector((state: RootState) => state.userDetails?.sms2fa);
  const adminPhoneNumber = useSelector(
    (state: RootState) => state.userDetails?.phoneNumber
  );

  const { resolve, remove, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    remove();
  };

  const defaultValues = {
    phone: adminPhoneNumber!,
  };

  const methods = useForm({
    mode: "onChange",
    // resolver: yupResolver(RequestOtpFormSchema),
    reValidateMode: "onChange",
    delayError: 2000,
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;

  const [genrateCode, { isLoading, isSuccess, isError }] =
    useToggleSms2FaMutation();

  const handleGenerateCode = () => {
    genrateCode()
      .unwrap()
      .then((res) => {
        console.log(res);
        handleCloseModal();
        show(ConfirmSms2FaDialog);
      })
      .catch((err) => {
        handleCloseModal();
        show(ErrorModal, { message: "Something went wrong, please try again" });
        console.log(`${err.error || err?.data?.message || err}`);
      });
  };
  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <FormProvider {...methods}>
        <DialogContent>
          <DialogHeader className="space-y-4 relative">
            <PhoneSectionIndicator />
            <DialogDescription className="text-[#202b36] text-base text-center space-y-2">
              {!sms2Fa ? (
                <div className="space-y-2">
                  <p className="font-semibold">
                    A one-time passcode will be sent to your mobile phone number
                    shown below.
                  </p>
                  <p>
                    We will send an authenticator code whenever we detect a
                    sign-in attempt from an unrecognized location.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="font-semibold">
                    You are trying to disable SMS 2FA on this account.
                  </p>
                  <p>
                    A one-time passcode will be sent to your mobile phone number
                    shown below.
                  </p>
                </div>
              )}
              <p>
                Click <strong>Next</strong> to get code.
              </p>
            </DialogDescription>
            <span
              onClick={handleCloseModal}
              className="!m-0 cursor-pointer absolute right-0 top-0"
            >
              <SheetCloseIcon />
            </span>
          </DialogHeader>

          {/* <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5"
          >
            <div className="my-2 space-y-2">

              <PhoneNumberInput
                label="Phone Number"
                name="phone"
                error={errors["phone"]}
              />

              <div className="flex items-center gap-1 text-[#4F627D]">
                <div>
                  <GreyInfoIcon />
                </div>
                <p className="text-sm">
                  We will only use this phone number for the purpose of 2-Factor
                  authentication. Message and data rates may apply.
                </p>
              </div>
            </div>
          </form> */}

          <PhoneNumberInput
            label="Phone Number"
            name="phone"
            defaultValue={adminPhoneNumber!}
            value={adminPhoneNumber!}
            readOnly
            disabled={true}
          />

          <LoadingButton
            loading={isLoading}
            type="button"
            variant="default"
            onClick={handleGenerateCode}
          >
            Next
          </LoadingButton>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
});

export default ToggleSms2FaDialog;
