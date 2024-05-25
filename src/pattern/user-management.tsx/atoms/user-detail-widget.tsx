import React, { FC } from "react";

interface IProps {
  label: string;
  value: string;
}

const UserDetailWidget: FC<IProps> = ({ label, value }) => {
  return (
    <div className='min-w-[373.5px] w-full h-[63px] bg-[#F8F8FA] flex flex-col gap-y-2 px-4 pt-2 pb-3 rounded-[8px]'>
      <p className='text-foreground text-base font-medium'>{value}</p>
      <p className='text-xs text-[#64748B]'>{label}</p>
    </div>
  );
};

export default UserDetailWidget;
