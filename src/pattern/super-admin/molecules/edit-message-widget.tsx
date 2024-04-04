import React, { FC } from "react";
import { EditMessageButton } from "../atoms/edit-message-button";

interface IEditMessageWidgetProps {
  title: string;
  message: string;
}

const EditMessageWidget: FC<IEditMessageWidgetProps> = ({ title, message }) => {
  return (
    <div className='w-full min-h-[180px] h-fit bg-[#F8FAFC] border border-[#F1F5F9] flex flex-col items-center gap-2 p-3 rounded-[12px]'>
      <div className='w-full bg-inherit min-h-[28px] h-fit flex items-center justify-between'>
        {/* Title */}
        <span className='text-[#384860] text-[1.125rem] font-semibold'>
          {title}
        </span>

        {/* Edit Button */}
        <EditMessageButton />
      </div>

      {/* Message */}
      <div className='w-full h-[112px] bg-inherit text-foreground text-[1.125rem] font-base'>
        {message}
      </div>
    </div>
  );
};

export default EditMessageWidget;
