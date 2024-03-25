"use client";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TransactionsTable from "@/pattern/transactions/organisms/transactions-table";
import UsersTable from "@/pattern/user-management.tsx/organisms/users-table";
import ActivityLogsTable from "@/pattern/activity-logs/organisms/activity-logs-table";
import PhoneAuthDialog from "@/pattern/settings/organisms/phone-auth-dialog";
import QRAuthDialog from "@/pattern/settings/organisms/qr-auth-dialog";

export default function Home() {
  const WishlistFormSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Please enter an email address"),
  });

  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(WishlistFormSchema),
  });

  return (
    <main className=" w-full flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Button autoFocus>Primary</Button>
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
      </FormProvider> */}

      {/* <Badge variant="failed">Failed</Badge>
      <Badge variant="active">Active</Badge>
      <Badge variant="inactive">Inactive</Badge>
      <Badge variant="flagged">Flagged</Badge>
      <Image alt="" src={userImg} width={40} height={40} /> */}

      <PhoneAuthDialog />
      <QRAuthDialog />

      <div className="bg-white w-full p-6">
        <div>
          Transactions Table:
          <TransactionsTable />
        </div>

        <div>
          Users Table:
          <UsersTable />
        </div>

        <div>
          Activity Logs Table:
          <ActivityLogsTable />
        </div>
      </div>
    </main>
  );
}
