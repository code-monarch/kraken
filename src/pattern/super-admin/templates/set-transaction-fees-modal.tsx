import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { create, useModal } from "@ebay/nice-modal-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import PercentInput from "../../common/molecules/inputs/percent-input";
import { Button } from "@/components/ui/button";
import LoadingButton from "../../common/molecules/controls/loading-button";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SetTransactionFeesFormSchema = Yup.object().shape({
  depositFees: Yup.string().required("Deposit fees is Required"),
  withdrawalFees: Yup.string().required("Withdrawal fees is Required"),
  exchangeFees: Yup.string().required("Exchange fees is Required"),
});

const SetTransactionFeesModal = create(() => {
  const { resolve, remove, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    remove();
  };

  const defaultValues = {
    depositFees: "0.00",
    withdrawalFees: "0.00",
    exchangeFees: "0.00",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(SetTransactionFeesFormSchema),
    reValidateMode: "onChange",
    delayError: 2000,
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;

  console.log("FORM ERRORR: ", errors);

  const onSubmit = () => {
    handleCloseModal();
  };
  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className='bg-transparent w-fit max-w-[600px] h-fit outline-none border-none shadow-none'>
        <Card className='min-w-[300px] w-[400px] min-h-[337px] h-fit pb-6'>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-full flex flex-col gap-5'
            >
              <CardHeader>
                <CardTitle className='text-[1.125rem] font-semibold font-raleway'>
                  Set Transaction Fees
                </CardTitle>
              </CardHeader>

              {/* Content */}
              <CardContent className='space-y-[16px] mb-[8px]'>
                {/* Deposit Fees */}
                <PercentInput
                  label='Deposit Fees'
                  name='depositFees'
                  placeholder='10'
                  error={errors["depositFees"]}
                />

                {/* Withdrawal Fees */}
                <PercentInput
                  label='Withdrawal Fees'
                  name='withdrawalFees'
                  placeholder='10'
                  error={errors["withdrawalFees"]}
                />

                {/* Exchange Fees */}
                <PercentInput
                  label='Exchange Fees'
                  name='exchangeFees'
                  placeholder='10'
                  error={errors["exchangeFees"]}
                />
              </CardContent>

              {/* Footer */}
              <CardFooter>
                {/* Controls */}
                <div className='w-full flex items-center justify-end'>
                  <div className='flex items-center justify-end gap-x-3'>
                    {/* Cancel Button */}
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </Button>

                    {/* Add User Button */}
                    <LoadingButton
                      size='sm'
                      loading={false}
                      disabled={!isDirty}
                      type='submit'
                    >
                      Update Fees
                    </LoadingButton>
                  </div>
                </div>
              </CardFooter>
            </form>
          </FormProvider>
        </Card>
      </DialogContent>
    </Dialog>
  );
});

export default SetTransactionFeesModal;
