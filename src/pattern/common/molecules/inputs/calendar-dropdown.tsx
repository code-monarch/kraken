import React, { FC } from "react";
import CalendarDropdownIcon from "../../atoms/icons/calendar-dropdown-icon";
import { DropdownProps } from "react-day-picker";

interface ICalendarDropdownIcon extends DropdownProps {}

const CalendarDropdown: FC<ICalendarDropdownIcon> = ({
  caption,
  name,
  onChange,
  style,
  value,
  className,
  children,
}) => {
  return (
    <div className='relative bg-[hsla(204,33%,97%,1)] h-[38px] min-w-[78px] w-fit'>
      <select
        name={name}
        aria-label={"aria-label"}
        className='bg-inherit w-full h-full flex items-center justify-start font-raleway font-medium text-[1.125rem] px-3 appearance-none outline-primary cursor-pointer'
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
      <span className='absolute bottom-[7px] right-[12px]'>
        <CalendarDropdownIcon />
      </span>
    </div>
  );
};

export default CalendarDropdown;
