import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import PersonalInfo from "../molecules/personal-info";
import YourPhotoText from "../molecules/your-photo-text";
import SettingsImageInput from "@/pattern/common/molecules/inputs/settings-image-input";
import userImg from "@/public/images/user.svg";
import { Separator } from "@/components/ui/separator";
import SettingsNameInput from "@/pattern/common/molecules/inputs/settings-name-input";
import { Label } from "@/components/ui/label";
import EmailInput from "@/pattern/common/molecules/inputs/email-input";
import FormInput from "@/pattern/common/molecules/inputs/form-input";
import { Button } from "@/components/ui/button";

interface payload {
  userImg: any;
  firstname: string;
  lastname: string;
  email: string;
}

const MyDetailsTab = () => {
  const [completeOpen, setCompleteOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState(userImg);

  const defaultValues = {
    userImg: "",
    firstname: "Aisha",
    lastname: "Abdullahi",
    email: "aishaabdullahi@gmail.com",
  };

  const methods = useForm<payload>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;

  const onSubmit: SubmitHandler<payload> = (data) => {
    console.log("DATA TO SUBMIT: ");
  };

  return (
    <div>
      <div className="flex items-center justify-between my-4 ">
        <PersonalInfo />
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="w-fit">
            Cancel
          </Button>

          <Button type="submit" size="sm" className="w-fit">
            Save
          </Button>
        </div>
      </div>
      <Separator />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-start gap-[32px] my-4">
            <div className="w-[280px]">
              <YourPhotoText />
            </div>
            <SettingsImageInput
              name="userImg"
              label="Photo"
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          </div>
          <Separator />

          <div className="flex items-center gap-[32px] my-4">
            <Label className="font-bold w-[280px]">Name</Label>
            <div className="flex gap-5 w-[512px]">
              <FormInput name="firstname" className="min-w-[246px] w-[246px]" />
              <FormInput name="lastname" className="min-w-[246px] w-[246px]" />
            </div>
          </div>
          <Separator />

          <div className="flex items-center gap-[32px] my-4">
            <Label className="font-bold w-[280px]">Email</Label>
            <div className="col-span-1 w-[512px]">
              <EmailInput
                name="email"
                className="bg-[#f5fffa] text-primary border-0"
              />
            </div>
          </div>
          <Separator />
        </form>
      </FormProvider>
    </div>
  );
};

export default MyDetailsTab;
