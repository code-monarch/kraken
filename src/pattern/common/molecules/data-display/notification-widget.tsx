import React from "react";
import NotificationIcon from "../../atoms/icons/notification-icon";
import NotificationTag from "../../atoms/notification-tag";

const NotificationWidget = () => {
  return (
    <button className='relative w-[32px] '>
      <span>
        <NotificationIcon />
      </span>

      <span className='absolute top-[-5px] right-[5px]'>
        <NotificationTag notifications={0} />
      </span>
    </button>
  );
};

export default NotificationWidget;
