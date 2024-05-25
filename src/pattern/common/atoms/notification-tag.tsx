import React, { FC } from "react";

interface IProps {
  notifications: number;
}

const NotificationTag: FC<IProps> = ({ notifications }) => {
  return (
    <div className='bg-destructive w-[13px] h-[13px] flex justify-center items-center text-destructive-foreground text-[6px] text-white rounded-full'>
      {notifications}
    </div>
  );
};

export default NotificationTag;
