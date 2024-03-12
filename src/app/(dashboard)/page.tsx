"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import LoadingButton from "@/pattern/common/molecules/feedback/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import EmailInput from "@/pattern/common/molecules/inputs/email-input";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const WishlistFormSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Please enter an email address"),
  });

  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(WishlistFormSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = () => {
    console.log("DATA TO SUBMIT: ");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button autoFocus>Primary</Button>
      <Button autoFocus variant="secondary">
        Secondary
      </Button>
      <Button autoFocus variant="outlinePrimary">
        outline primary
      </Button>
      <Button autoFocus variant="outlineSecondary" disabled>
        outline primaryhghghgh
      </Button>
      <Button autoFocus variant="outlineSecondary" size="sm">
        small outline Button
      </Button>
      <Button autoFocus variant="outlineSecondary" size="md">
        medium outline Button
      </Button>
      <LoadingButton loading={true} disabled={true}>
        Loading Buttonnnn
      </LoadingButton>
      <Calendar
        mode="range"
        captionLayout="dropdown-buttons"
        fromYear={2024}
        toYear={2027}
        selected={date}
        onSelect={setDate}
        fixedWeeks
        formatters={{
          formatWeekdayName: (day) =>
            day?.toLocaleDateString("en-US", { weekday: "short" }),
        }}
        className="rounded-md border"
      />

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form></form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>

      <Input placeholder="loremjkjkj" />
      <Input variant="error" placeholder="loremjkjkj" />
      <Input variant="error" placeholder="loremjkjkj" disabled />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-[30px]"
        >
          <EmailInput label="Email" name="Email" />
        </form>
      </FormProvider>

      <div className="bg-white w-[500px] h-[500px]">
        <Badge variant="failed">Badge</Badge>
      </div>
    </main>
  );
}
