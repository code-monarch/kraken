"use client";
import PageHeader from "@/pattern/common/molecules/data-display/page-header";
import OverviewChartSection from "@/pattern/overview/templates/overview-chart-section";
import OverviewMetricsGrid from "@/pattern/overview/templates/overview-metrics-grid";

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
    <>
      <PageHeader
        pageTitle='Overview'
        pageDescription='Track, manage and forecast your Pilgrims, Agents and Transactions.'
      />
      <OverviewMetricsGrid />
      <OverviewChartSection />
    </>
  );
}
