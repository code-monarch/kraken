"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { create, useModal } from "@ebay/nice-modal-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DateRange } from "react-day-picker";
import { formatDateRange } from "@/lib/helper/format-date-range";

export const DateRangeFilterModal = create(() => {
  const [date, setDate] = useState<DateRange | undefined>(); // Holds value of selected date range
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // console.log("date: ", date);

  // Save state of the selected date ranges whenever the useer changes their selection
  useEffect(() => {
    setStartDate(date?.from ? formatDateRange(date?.from) : "");
    setEndDate(date?.to ? formatDateRange(date?.to) : "")
  }, [date])

  const { resolve, remove, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true, date, startDate, endDate });
    remove();
  };
  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className="bg-transparent w-fit h-fit outline-none border-none shadow-none">
        <Calendar
          mode="range"
          captionLayout="dropdown-buttons"
          fromYear={2024}
          toYear={2027}
          selected={date}
          onSelect={(value) => setDate(value)}
          fixedWeeks
          formatters={{
            formatWeekdayName: (day) =>
              day?.toLocaleDateString("en-US", { weekday: "short" }),
          }}
          className="rounded-md border"
        />
      </DialogContent>
    </Dialog>
  );
});
