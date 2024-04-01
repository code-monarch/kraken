import React, { FC, useState } from "react";
import InputErrorMessage from "../feedback/input-error-message";
import { FieldSet } from "./fieldset";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ICustomInputProps } from "@/pattern/types";
import EmailInputIcon from "../../atoms/icons/email-input-icon";
import Image from "next/image";
import CameraIcon from "../../atoms/icons/camera-icon";
import userImg from "@/public/images/user.svg";

export interface IProps extends ICustomInputProps {
  selectedFile: any;
  setSelectedFile: any;
}

const SettingsImageInput: FC<IProps> = ({
  name,
  label,
  error,
  placeholder,
  ...props
}) => {
  const { control } = useFormContext();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isFilePicked, setIsFilePicked] = React.useState(false);
  const [validFile, setValidFile] = React.useState<boolean>();
  //   const [imageSrc, setImageSrc] = React.useState<any>(userImg);

  const fileTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    ".jpg",
    ".jpeg",
    ".png",
  ];

  const fileChangeHandler = (e: any) => {
    let files;
    if (e.target.files != null && e.target.files !== undefined) {
      files = e.target.files;
    } else {
      return;
    }
    const file = files[0];

    if (file && fileTypes.includes(file.type) && file.size <= 2097152) {
      setValidFile(true);

      const reader = new FileReader();

      reader.onload = function (event: any) {
        const base64String = event.target.result;
        // setImageSrc(base64String);
        props.setSelectedFile(base64String);
        setIsFilePicked(true);
        console.log("Base64 encoded image:", base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Controller
      name={name!}
      control={control}
      render={({ field: { value, name, onChange } }) => (
        <FieldSet>
          {/* <Label>{label}</Label> */}
          <div className="w-full space-y-[4px]">
            <div className="w-full hidden">
              <input
                type="file"
                name={name}
                id={name}
                accept=".jpg, .png, .jpeg"
                value={value}
                onChange={fileChangeHandler}
              />
            </div>
            <InputErrorMessage name={`${name}`} />
          </div>

          <div className="w-[fit] h-[fit] rounded-full relative flex flex-col items-center justify-center">
            <Image
              alt=""
              src={props.selectedFile}
              width={96}
              height={96}
              style={{ objectFit: "fill", borderRadius: "999px" }}
            />
            <label htmlFor={name} className="absolute bottom-0 right-0">
              <CameraIcon />
            </label>
          </div>
        </FieldSet>
      )}
    />
  );
};

export default SettingsImageInput;
