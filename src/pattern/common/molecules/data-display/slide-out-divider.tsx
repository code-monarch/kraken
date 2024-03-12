import React, { FC } from "react";
import Divider from "../../atoms/icons/divider";

interface ISlideOutDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

const SlideOutDivider: FC<ISlideOutDividerProps> = ({ children }) => {
  return (
    <div className='w-full flex items-center justify-between'>
      <Divider />
      <div>{children}</div>
      <Divider />
    </div>
  );
};

export default SlideOutDivider;
