import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FieldSet } from "./fieldset";
import { Label } from "@/components/ui/label";

interface IProps {
  phone: string;
  setPhone: (val: string) => void;
}

const PhoneNumberInput = ({ phone, setPhone }: IProps) => {
  // const [phone, setPhone] = useState<string>("");
  console.log("phone number: ", phone);
  return (
    <FieldSet className="font-medium">
      <Label>Phone Number</Label>
      <PhoneInput
        country={"ng"}
        value={phone}
        onChange={(phone) => setPhone(phone)}
        inputStyle={{
          appearance: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap: "8px",
          height: "48px",
          minWidth: "307px",
          width: "100%",
          borderRadius: "6px",
          background: "hsla(0,0%,100%,1)",
          fontWeight: "500",
          // padding: '14.5px 12px 14.5px 34px',
          fontSize: "16px",
          borderWidth: "1px",
          borderColor: "hsla(213,27%,84%,1)",
          color: "hsla(216,26%,30%,1)",
        }}
      />
    </FieldSet>
  );
};

export default PhoneNumberInput;
