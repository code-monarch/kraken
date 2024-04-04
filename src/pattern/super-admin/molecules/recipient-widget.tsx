import React, { FC } from "react";
import { RecipientAvatar } from "./recipient-avatar";

interface IRecipientWidget {
  firstName: string;
  lastName: string;
}

const RecipientWidget: FC<IRecipientWidget> = ({ firstName, lastName }) => {
  return (
    <div className='h-fit flex items-center gap-3'>
      <RecipientAvatar />
      <p className='text-[#101828] text-sm font-medium'>
        {firstName}&nbsp;
        {lastName}
      </p>
    </div>
  );
};

export default RecipientWidget;
