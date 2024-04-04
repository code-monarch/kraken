"use client";
import { cn } from "@/lib/utils";
import React, { FC, Fragment } from "react";

interface IStepperProps {
  currentStep: number;
  numberOfSteps: number;
}

const Stepper: FC<IStepperProps> = ({ currentStep, numberOfSteps }) => {
  const activeColor = (index: number) =>
    currentStep >= index ? "bg-primary" : "bg-[hsla(213,27%,84%,1)]";
  const isFinalStep = (index: number) => index === numberOfSteps - 1;

  return (
    <div className='w-full flex items-center justify-center pt-6'>
      {Array.from({ length: numberOfSteps }).map((_, index) => (
        <Fragment key={index}>
          <div
            className={cn(
              "w-4 h-4 rounded-full z-20",
              index === currentStep && "bg-white border-[2px] border-primary",
              index < currentStep && "bg-primary",
              index > currentStep && "bg-[hsla(213,27%,84%,1)]"
            )}
          ></div>
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
