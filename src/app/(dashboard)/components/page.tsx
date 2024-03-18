"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import LoadingButton from "@/pattern/common/molecules/controls/loading-button";
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
import TransactionsSlideOutMenu from "@/pattern/common/templates/slide-out-menu/transactions-slide-out-menu";
import { show } from "@ebay/nice-modal-react";
import UserDetailCard from "@/pattern/common/molecules/data-display/user-detail-card";
import DashboardMetricCard from "@/pattern/common/organisms/dashboard-metric-card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

  const showTransactionSheet = () => {
    show(TransactionsSlideOutMenu);
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='bg-white min-w-[200px] w-fit h-[100px] flex items-center justify-center px-2'>
        <ToggleGroup type='single'>
          <ToggleGroupItem value='bold' aria-label='Toggle bold'>
            kdjk
          </ToggleGroupItem>
          <ToggleGroupItem value='italic' aria-label='Toggle italic'>
            sajajsh
          </ToggleGroupItem>
          <ToggleGroupItem
            value='strikethrough'
            aria-label='Toggle strikethrough'
          >
            sakjshj
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className='bg-black w-full h-[100px] flex items-center justify-center'>
        <DashboardMetricCard
          metricLabel='Total Users'
          metricPercentage='50'
          metricValue='10,000'
        />
      </div>
      <Button variant='outline' onClick={showTransactionSheet}>
        Open Transaction Slide out Menu
      </Button>
      <Button autoFocus>Primary</Button>
      <Button autoFocus variant='secondary'>
        Secondary
      </Button>
      <Button autoFocus variant='outlinePrimary'>
        outline primary
      </Button>
      <Button autoFocus variant='outlineSecondary' disabled>
        outline primaryhghghgh
      </Button>
      <Button autoFocus variant='outlineSecondary' size='sm'>
        small outline Button
      </Button>
      <Button autoFocus variant='outlineSecondary' size='md'>
        medium outline Button
      </Button>
      <LoadingButton loading={true} disabled={true}>
        Loading Buttonnnn
      </LoadingButton>
      <Calendar
        mode='range'
        captionLayout='dropdown-buttons'
        fromYear={2024}
        toYear={2027}
        selected={date}
        onSelect={setDate}
        fixedWeeks
        formatters={{
          formatWeekdayName: (day) =>
            day?.toLocaleDateString("en-US", { weekday: "short" }),
        }}
        className='rounded-md border'
      />

      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form></form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline'>Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>

      <Input placeholder='loremjkjkj' />
      <Input variant='error' placeholder='loremjkjkj' />
      <Input variant='error' placeholder='loremjkjkj' disabled />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col items-center gap-[30px]'
        >
          <EmailInput label='Email' name='Email' />
        </form>
      </FormProvider>

      <div className='bg-white w-[500px] h-[200px] px-2'>
        <UserDetailCard
          ImageFallback='JA'
          name='Josh to funny'
          number='+2349036075477'
        />
      </div>

      <div className='bg-white w-[500px] h-[200px] space-y-[50px]'>
        <Badge variant='failed'>Badge</Badge>
      </div>
    </main>
  );
}
