import React, { FC } from "react";
import Divider from "../../atoms/icons/divider";

interface ISlideOutDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

const SlideOutDivider: FC<ISlideOutDividerProps> = ({ children }) => {
  return (
    <div className='w-full flex items-center justify-between'>
      <Divider width='70' />
      <div>{children}</div>
      <Divider width='70' />
    </div>
  );
};

export default SlideOutDivider;
