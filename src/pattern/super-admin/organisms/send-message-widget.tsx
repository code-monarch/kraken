"use clientn";
import React, { FC, useEffect, useState } from "react";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingButton from "../../common/molecules/controls/loading-button";
import { Button } from "@/components/ui/button";
import { CommentInput } from "../../common/molecules/inputs/comment-input";
import FormInput from "../../common/molecules/inputs/form-input";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal } from "@ebay/nice-modal-react";

const SendMessageFormSchema = Yup.object().shape({
  title: Yup.string().required("Message Title is Required"),
});

interface ISendMessageWidgetProps {
  submitHandler: () => void;
  message: string;
  setMessage: (value: string) => void;
  setTitle: (value: string) => void;
}

const SendMessageWidget: FC<ISendMessageWidgetProps> = ({
  submitHandler,
  message,
  setMessage,
  setTitle,
}) => {
  // Controls value of comment
  // const [message, setMessage] = useState<string>("");

  const { resolve, remove, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    remove();
  };

  const defaultValues = {
    title: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(SendMessageFormSchema),
    reValidateMode: "onBlur",
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = methods;

  const goToNextStep = () => {
    submitHandler();
  };

  // Sync form value with parent state
  useEffect(() => {
    const subscription = watch((value) => {
      setTitle(value?.title!);
    });
    return () => subscription.unsubscribe();
  }, [watch, setTitle]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(goToNextStep)}
        className="w-full flex flex-col gap-5"
      >
        {/* Header */}
        <CardHeader>
          <CardTitle className="text-[1.125rem] font-semibold font-raleway">
            Send Message
          </CardTitle>
        </CardHeader>
        {/* Content */}
        <CardContent className="space-y-[16px] mb-[8px]">
          {/* Title */}
          <FormInput
            label="Title"
            name="title"
            placeholder="Message title"
            error={errors["title"]}
            className="min-w-full pl-2"
          />
          {/* Comment */}
          <CommentInput
            label="Message Content"
            placeholder="Type your message here"
            value={message}
            setValue={setMessage}
          />
        </CardContent>

        {/* Footer */}
        <CardFooter>
          {/* Controls */}
          <div className="w-full flex items-center justify-end">
            <div className="flex items-center justify-end gap-x-3">
              {/* Cancel Button */}
              <Button size="sm" variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>

              {/* Add User Button */}
              <LoadingButton
                size="sm"
                loading={false}
                disabled={!isDirty || !message}
                type="submit"
              >
                Next
              </LoadingButton>
            </div>
          </div>
        </CardFooter>
      </form>
    </FormProvider>
  );
};

export default SendMessageWidget;
