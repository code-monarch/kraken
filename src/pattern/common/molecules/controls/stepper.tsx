"use client";
import { cn } from "@/lib/utils";
import React, { FC, Fragment } from "react";

interface IStepperProps {
  currentStep: number;
  numberOfSteps: number;
}

const Stepper: FC<IStepperProps> = ({ currentStep, numberOfSteps }) => {
  const isFinalStep = (index: number) => index === numberOfSteps - 1;

  return (
    <div className='w-full flex items-center justify-center pt-6'>
      {Array.from({ length: numberOfSteps }).map((_, index) => (
        <Fragment key={index}>
          {/* Step pointer */}
          <div
            className={cn(
              "w-4 h-4 rounded-full z-20",

              currentStep !== numberOfSteps &&
                index + 1 === currentStep + 1 &&
                "bg-white border-[2px] border-primary",

              currentStep === 1 && "bg-primary",
              index + 1 < currentStep + 1 && "bg-primary",

              index + 1 === currentStep + 1 &&
                "bg-white border-[2px] border-primary",

              index + 1 > currentStep + 1 && "bg-[hsla(213,27%,84%,1)]",
              currentStep === numberOfSteps && "bg-primary"
            )}
          ></div>
          {/* Stepper link */}
          {isFinalStep(index) ? null : (
            <div
              className={cn(
                "w-[166px] h-1",
                index === currentStep && "bg-[hsla(213,27%,84%,1)]",
                index < currentStep && "bg-primary",
                index > currentStep && "bg-[hsla(213,27%,84%,1)]"
              )}
            ></div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Stepper;
