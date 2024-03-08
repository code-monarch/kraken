"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import LoadingButton from "@/pattern/common/molecules/loading-button";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
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
        mode='single'
        captionLayout='dropdown-buttons'
        fromYear={2024}
        toYear={2027}
        selected={date}
        onSelect={setDate}
        fixedWeeks
        formatters={{formatWeekdayName: (day) => day?.toLocaleDateString('en-US', { weekday: 'short' }),}}
        className='rounded-md border'
      />
    </main>
  );
}
