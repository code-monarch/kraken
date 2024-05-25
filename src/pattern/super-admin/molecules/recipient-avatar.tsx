import React, { FC } from "react";
import Image from "next/image";
import userImg from "@/public/images/user-img.png";
import AvatarEllipse from "../atoms/avatar-ellipse";

interface IRecipientAvatarProps {
  img?: string;
}

export const RecipientAvatar: FC<IRecipientAvatarProps> = ({ img }) => {
  return (
    <div className='relative w-[40px] h-[40px] rounded-full'>
      <Image
        alt='profile picture'
        src={img ?? userImg}
        width={40}
        height={40}
      />
      <span className='absolute bottom-0 right-0'>
        <AvatarEllipse />
      </span>
    </div>
  );
};
