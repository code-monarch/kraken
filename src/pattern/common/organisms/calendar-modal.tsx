"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { create, useModal } from "@ebay/nice-modal-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const CalendarModal = create(() => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { resolve, hide, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    hide();
  };
  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className='bg-transparent w-fit h-fit outline-none border-none shadow-none'>
        <Calendar
          mode='single'
          captionLayout='dropdown-buttons'
          fromYear={2024}
          toYear={2027}
          selected={date}
          onSelect={setDate}
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

export default CalendarModal;
