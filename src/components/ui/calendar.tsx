"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import CalendarLeftChevrolet from "@/pattern/common/icons/calendar-left-chevrolet";
import CalendarRightChevrolet from "@/pattern/common/icons/calendar-right-chevrolet";
import CalendarDropdown from "@/pattern/common/inputs/calendar-dropdown";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("", className)}
      classNames={{
        root: "font-raleway bg-[hsla(0,0%,100%,1)] min-w-[400px] w-fit min-h-[342px] p-4 !rounded-[16px] shadow-calendarShadow",
        months:
          "w-full flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "w-full space-y-4",
        caption: "w-full flex justify-between items-start",
        caption_label: "text-sm font-medium hidden",
        caption_dropdowns: "flex items-center gap-[4px]",
        dropdown: "flex items-center",
        dropdown_year: "flex items-center",
        nav: "space-x-[16px] flex items-center mr-[12px]",
        nav_button: cn("h-7 w-7 bg-transparent p-0 hover:opacity-100"),
        // nav_button_previous: "absolute left-1",
        // nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "w-full flex justify-between",
        head_cell:
          "rounded-md w-[50px] font-medium text-[hsla(216,30%,18%,1)] text-[0.8rem]",
        row: "w-full flex justify-between mt-2 focus-within:outline-primary",
        tbody: "w-full",
        head: "w-full",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:outline-primary focus-within:outline-primary focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-[8px]",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-[8px] [&:has(>.day-range-start)]:rounded-l-[8px] first:[&:has([aria-selected])]:rounded-l-[8px] last:[&:has([aria-selected])]:rounded-r-[8px]"
            : "[&:has([aria-selected])]:rounded-[8px]"
        ),
        day: cn(
          "h-[50px] w-[50px] p-0 text-[hsla(215,16%,47%,1)] font-normal rounded-[8px] aria-selected:opacity-100 focus-within:outline-primary"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-white hover:text-white focus-within:outline-primary focus:bg-primary focus:text-white focus:font-bold rounded-[8px]",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-primary text-primary bg-accent font-normal rounded-[8px] aria-selected:opacity-100 focus-within:outline-primary",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <CalendarLeftChevrolet />,
        IconRight: ({ ...props }) => <CalendarRightChevrolet />,
        Dropdown: ({ ...props }) => (
          <CalendarDropdown
            className={props.className}
            onChange={props.onChange}
            value={props.value}
            name={props.name}
          >
            <>{props.children}</>
          </CalendarDropdown>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
