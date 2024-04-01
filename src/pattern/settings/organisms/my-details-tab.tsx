import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import PersonalInfo from "../molecules/personal-info";
import YourPhotoText from "../molecules/your-photo-text";
import SettingsImageInput from "@/pattern/common/molecules/inputs/settings-image-input";
import userImg from "@/public/images/user.svg";
import { Separator } from "@/components/ui/separator";
import SettingsNameInput from "@/pattern/common/molecules/inputs/settings-name-input";
import SettingsEmailInput from "@/pattern/common/molecules/inputs/settings-email-input";
import { Label } from "@/components/ui/label";

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
      <div className="my-4">
        <PersonalInfo />
      </div>
      <Separator />

      <FormProvider {...methods}>
        <form>
          <div className="flex items-start gap-20 my-4">
            <div className="shrink-0">
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

          <div className="flex justify-between my-4">
            <Label>Name</Label>
            <div className="flex gap-2">
              <SettingsNameInput name="firstname" label="First Name" />
              <SettingsNameInput name="lastname" label="Last Name" />
            </div>
          </div>
          <Separator />

          <div className="fle grid grid-cols-4 justify-between my-4">
            <Label>Email</Label>
            <div className="col-span-1">
              <SettingsEmailInput name="email" label="Email" />
            </div>
          </div>
          <Separator />
        </form>
      </FormProvider>
    </div>
  );
};

export default MyDetailsTab;
