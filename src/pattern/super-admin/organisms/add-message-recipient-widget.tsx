"use client";
import React, { FC, useEffect, useState } from "react";
import EditMessageWidget from "../molecules/edit-message-widget";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/pattern/common/molecules/controls/loading-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LinkButton } from "@/pattern/common/molecules/controls/link-button";
import { Checkbox } from "@/components/ui/checkbox";
import RecipientWidget from "../molecules/recipient-widget";
import { Separator } from "@/components/ui/separator";
import { useGetUsersMetricsQuery } from "@/redux/services/users/user-metrics.api-alice";
import PulsePlaceholder from "@/pattern/common/atoms/icons/pulse-placeholder-icon";
import { PaginationState } from "@tanstack/react-table";
import ArrowLeftIcon from "@/pattern/common/atoms/icons/arrow-left-icon";
import ArrowRightIcon from "@/pattern/common/atoms/icons/arrow-right-icon";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import * as Yup from "yup";
import NameCell from "@/pattern/user-management/molecules/name-cell";
import { useSendMessageMutation } from "@/redux/services/users/send-message.api-slice";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";

const FormSchema = Yup.object().shape({
  items: Yup.array()
    .of(Yup.string())
    .min(1, "You have to select at least one item."),
});

interface IAddMessageRecipientWidgetProps {
  submitHandler: () => void;
  back: () => void;
  message: string;
  title: string;
}

const AddMessageRecipientWidget: FC<IAddMessageRecipientWidgetProps> = ({
  submitHandler,
  back,
  message,
  title,
}) => {
  // const { control } = useFormContext();

  const defaultValues = {
    items: [] as string[],
  };

  const methods = useForm<any>({
    resolver: yupResolver(FormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
    control,
    setValue,
  } = methods;

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, isSuccess, isError, isFetching } =
    useGetUsersMetricsQuery({
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    });

  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (data && selectAll) {
      const allEmails = data.data.results.map((user: any) => user.email);
      setValue("items", allEmails);
    } else {
      setValue("items", []);
    }
  }, [selectAll, data, setValue]);

  const [sendMessage, { isLoading: isMessageLoading }] =
    useSendMessageMutation();

  const onSubmit: SubmitHandler<any> = (data) => {
    sendMessage({
      email: data.items,
      message: message,
      title: title,
    })
      .unwrap()
      .then((res) => {
        submitHandler();
      })
      .catch((err) => {
        toast.error("Unexpected error", {
          description: `${err?.data?.responseMessage ?? "Something went wrong"}`,
          duration: 8000,
          cancel: {
            label: "Close",
            onClick: () => console.log("Close!"),
          },
        });
      });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-[32px]">
            <EditMessageWidget message={message} title={title} />
            <div className="w-full h-full flex flex-col gap-5">
              <div className="w-full flex items-center justify-between">
                {/* Title */}
                <span className="text-[#384860] text-[1.125rem] font-semibold">
                  Select Recipient(s)
                </span>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={() => setSelectAll(!selectAll)}
                    aria-label="Select all"
                  />
                  {/* Select All Button */}
                  <LinkButton
                    className="min-w-fit w-fit text-base font-semibold"
                    onClick={() => setSelectAll(!selectAll)}
                    disabled
                  >
                    Select all
                  </LinkButton>
                </div>
              </div>

              <ScrollArea className="w-full h-[320px] rounded-sm">
                {(isLoading || isFetching) && (
                  <div className="h-24 text-center">
                    <PulsePlaceholder />
                  </div>
                )}

                {isError && <div>Something went wrong</div>}

                <div>
                  {isSuccess &&
                    !isLoading &&
                    !isFetching &&
                    data?.data.results.map((user, idx) => (
                      <Controller
                        key={idx}
                        name="items"
                        control={control}
                        render={({ field: { value, name, onChange } }) => (
                          <div key={idx} className="w-full h-fit">
                            <div className="flex items-center gap-3 py-3 px-4">
                              <Checkbox
                                name="items"
                                aria-label="Select all"
                                checked={value?.includes(user.email)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? onChange([...value, user.email])
                                    : onChange(
                                        value?.filter(
                                          (value: any) => value !== user.email,
                                        ),
                                      );
                                }}
                              />
                              {/* <RecipientWidget
                              firstName={user.firstname}
                              lastName={user.lastname}
                            /> */}
                              <NameCell
                                name={user.firstname + " " + user.lastname}
                                phoneNumber={user.email}
                                image={""}
                              />
                            </div>
                            <Separator />
                          </div>
                        )}
                      />
                    ))}
                </div>
                {isSuccess && !isFetching && !isLoading && (
                  <div className="mt-2 flex">
                    <Button
                      className=" min-w-fit min-h-fit h-full w-fit text-sm text-[#1d2939] py-2.5 px-4 rounded-l-[8px] rounded-r-none "
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (pagination.pageIndex > 0) {
                          pagination.pageIndex--;
                        }
                      }}
                      disabled={pagination.pageIndex === 0}
                    >
                      <ArrowLeftIcon />
                      Previous
                    </Button>

                    <Button
                      className="py-2.5 px-4 rounded-r-[8px] rounded-l-none min-w-fit min-h-fit h-full w-fit text-sm text-[#1d2939]"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (
                          pagination.pageIndex <
                          data?.data.pagination.totalPages - 1
                        ) {
                          pagination.pageIndex++;
                        }
                      }}
                      disabled={
                        pagination.pageIndex ===
                        data?.data.pagination.totalPages - 1
                      }
                    >
                      Next
                      <ArrowRightIcon />
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter>
            {/* Controls */}
            <div className="w-full flex items-center justify-end">
              <div className="flex items-center justify-end gap-x-3">
                {/* Cancel Button */}
                <Button size="sm" variant="outline" onClick={() => back()}>
                  Back
                </Button>

                {/* Add User Button */}
                <LoadingButton
                  size="sm"
                  disabled={!isDirty}
                  loading={isMessageLoading}
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Next
                </LoadingButton>
              </div>
            </div>
          </CardFooter>
        </form>
      </FormProvider>
    </>
  );
};

export default AddMessageRecipientWidget;
