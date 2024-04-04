"use client";
import React, { useState } from "react";
import {
  Card,
} from "@/components/ui/card";
import { create, useModal } from "@ebay/nice-modal-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Stepper from "../../common/molecules/controls/stepper";
import SendMessageWidget from "../organisms/send-message-widget";
import MessageSentSuccessWidget from "../organisms/message-sent-success-widget";
import Hidden from "@/pattern/common/molecules/data-display/hidden";
import AddMessageRecipientWidget from "../organisms/add-message-recipient-widget";

const NUMBER_OF_STEPS = 3;

const SendMessageModal = create(() => {
  // Handles current step of stepper
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () =>
    setCurrentStep((prev) => (prev === NUMBER_OF_STEPS - 1 ? prev : prev + 1));

  const goToPreviousStep = () =>
    setCurrentStep((prev) => (prev <= 0 ? prev : prev - 1));

  const { resolve, hide, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    hide();
  };

  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className='bg-transparent w-fit max-w-[600px] h-fit outline-none border-none shadow-none'>
        <Card className='min-w-[300px] w-[600px] min-h-[337px] h-fit gap-y-[32px] pt-6'>
          {/* Stepper */}
          <Stepper currentStep={currentStep} numberOfSteps={NUMBER_OF_STEPS} />

          {/* Step 1 */}
          <Hidden visible={currentStep === 0}>
            <SendMessageWidget onSubmit={goToNextStep} />
          </Hidden>

          {/* Step 2 */}
          <Hidden visible={currentStep === 1}>
            <AddMessageRecipientWidget
              goNext={goToNextStep}
              goBack={goToPreviousStep}
            />
          </Hidden>

          {/* Step 3 */}
          <Hidden visible={currentStep === 2}>
            <MessageSentSuccessWidget onCloseModal={() => handleCloseModal()} />
          </Hidden>
        </Card>
      </DialogContent>
    </Dialog>
  );
});

export default SendMessageModal;
