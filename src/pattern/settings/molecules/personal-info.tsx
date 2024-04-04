import { Button } from "@/components/ui/button";
import React from "react";

const PersonalInfo = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-lg text-[#202b3c] font-semibold">Personal Info</p>
        <p className="text-sm text-[#4f627d]">
          Update your photo and personal details here
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline">Cancel</Button>

        <Button>Save</Button>
      </div>
    </div>
  );
};

export default PersonalInfo;
