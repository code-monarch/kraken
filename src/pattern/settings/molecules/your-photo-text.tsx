import React from "react";
import GreyInfoIcon from "@/pattern/common/atoms/icons/grey-info-icon";

const YourPhotoText = () => {
  return (
    <div className="w-[280px]">
      <p className="flex items-center gap-2 text-sm text-[#384860] font-bold">
        Your photo
        <span>
          <GreyInfoIcon />
        </span>
      </p>
      <p className="text-sm text-[#384860]">
        This will be displayed on your profile
      </p>
    </div>
  );
};

export default YourPhotoText;
