"use client";
import React from "react";
import DateInput from "@/pattern/common/molecules/inputs/date-input";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { show } from "@ebay/nice-modal-react";
import CalendarModal from "@/pattern/common/organisms/calendar-modal";
import LoadingButton from "@/pattern/common/molecules/controls/loading-button";

const ChartDateFilterchema = Yup.object().shape({
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().required("End date is required"),
});

const OverviewChartDateFilterPopOver = () => {
  const defaultValues = {
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(ChartDateFilterchema),
    reValidateMode: "onChange",
    delayError: 2000,
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;

  const onSubmit = () => {
    console.log("DATA TO SUBMIT: ");
  };

  const showCalendarModal = () => {
    show(CalendarModal);
  };
  return (
    <div className='w-[375px] h-[381px] bg-popover text-popover-foreground outline-none pb-10 p-6 rounded-t-[12px] '>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full h-full space-y-[20px] text-popover-foreground'
        >
          <div className='w-full h-[66px] flex flex-col items-start gap-y-2'>
            <h2 className='text-black text-18 font-raleway font-semibold'>
              Filter
            </h2>
            <p className='text-sm text-muted-foreground font-raleway font-normal'>
              Choose a timeframe for your transactions.
            </p>
          </div>

          <DateInput
            name='startDate'
            label='Start Date'
            onClick={showCalendarModal}
          />
          <DateInput
            name='endDate'
            label='End Date'
            onClick={showCalendarModal}
          />
          <LoadingButton>
            Confirm
          </LoadingButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default OverviewChartDateFilterPopOver;
