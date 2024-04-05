"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { create, useModal } from "@ebay/nice-modal-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DateRange } from "react-day-picker";

export const DateRangeFilterModal = create(() => {
  const [date, setDate] = useState<DateRange | undefined>();

  const { resolve, remove, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    remove();
  };
  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className='bg-transparent w-fit h-fit outline-none border-none shadow-none'>
        <Calendar
          mode='range'
          captionLayout='dropdown-buttons'
          fromYear={2024}
          toYear={2027}
          selected={date}
          onSelect={(value)=>setDate(value)}
          fixedWeeks
          formatters={{
            formatWeekdayName: (day) =>
              day?.toLocaleDateString("en-US", { weekday: "short" }),
          }}
          className='rounded-md border'
        />
      </DialogContent>
    </Dialog>
  );
});
