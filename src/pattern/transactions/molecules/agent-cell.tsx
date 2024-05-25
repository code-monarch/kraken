import React from "react";
import Image from "next/image";
import userImg from "@/public/images/user-img.png";

interface IProps {
  name: string;
  image?: string;
}

const AgentCell = ({ name, image }: IProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-[40px] h-[40px] rounded-full">
        <Image alt="" src={userImg} width={40} height={40}/>
      </div>

      <div>
        <p className="text-sm whitespace-nowrap">{name}</p>
      </div>
    </div>
  );
};

export default AgentCell;
