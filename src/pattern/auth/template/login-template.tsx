"use client";
import React from "react";
import AuthCard from "../organisms/auth-card";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailInput from "@/pattern/common/molecules/inputs/email-input";
import PasswordInput from "@/pattern/common/molecules/inputs/password-input";
import { LinkButton } from "@/pattern/common/molecules/controls/link-button";
import LoadingButton from "@/pattern/common/molecules/controls/loading-button";
import { AUTH_PATHS } from "@/lib/routes";
import { useRouter } from "next/navigation";
import {
  ILoginPayload,
  useLoginMutation,
} from "@/redux/services/auth/login.api-slice";
import { useServiceAccountLoginMutation } from "@/redux/services/auth/service-account-login.api-slice";
import { storeLoginCredentials } from "@/lib/helper/storage-manager";
import { toast } from "sonner";

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Please enter your email address"),
  password: Yup.string().required("Password is required"),
});

const LoginTemplate = () => {
  // Service Account Login
  const [serviceAccountLogin, { isLoading: loadingServiceAccountLogin }] = useServiceAccountLoginMutation();

  // Admin Login API key
  const [login, { isLoading }] = useLoginMutation();

  const { push } = useRouter();

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm<Omit<ILoginPayload, 'serviceAccountApiKey'>>({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
    reValidateMode: "onChange",
    delayError: 2000,
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;

  const onSubmit: SubmitHandler<Omit<ILoginPayload, 'serviceAccountApiKey'>> = (data) => {
    console.log("DATA TO SUBMIT: ", data);

    serviceAccountLogin({
      clientId: `${process.env.NEXT_PUBLIC_CLIENT_ID}`,
      clientSecret: `${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
    }).unwrap().then((response) => {
      login({
        email: data.email,
        password: data.password,
        serviceAccountApiKey: response.data?.apiKey
      })
        .unwrap()
        .then((res) => {
          storeLoginCredentials({ apiKey: res.data.apiKey, adminId: res.data.id, serviceAccountApiKey: response.data?.apiKey }).then(() => {
            push("/");
          })
        })
        .catch((err) => {
          console.log(`${err.error || err?.data?.message || err}`);
          // display error message
          toast.error("Unexpected error", {
            description: `${err?.data?.responseMessage ?? "We encountered an error while trying to log you in"}`,
            duration: 8000,
            cancel: {
              label: 'Cancel',
              onClick: () => console.log('Cancel!'),
            },
          })
        })
    }).catch((err) => {
      // display error message
      toast.error("Unexpected error", {
        description: `${err?.data?.responseMessage ?? "We encountered an error while trying to log you in"}`,
        duration: 8000,
        cancel: {
          label: 'Cancel',
          onClick: () => console.log('Cancel!'),
        },
      })
    })
  };

  return (
    <>
      <AuthCard
        title="Admin Login"
        description="Please enter your admin credentials to access the UmrahCash Admin Dashboard."
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center gap-4"
          >
            <EmailInput
              label="Email address"
              name="email"
              error={errors["email"]}
            />
            <PasswordInput
              label="Password"
              name="password"
              error={errors["password"]}
            />

            {/* Controls */}
            <div className="w-full space-y-[28px]">
              <div className="w-full flex items-center justify-end">
                <LinkButton onClick={() => push(`${AUTH_PATHS.resetPassword}`)}>
                  Forgot Password
                </LinkButton>
              </div>
              <LoadingButton
                loading={isLoading || loadingServiceAccountLogin}
                disabled={!isDirty}
                type="submit"
              >
                Log into your account
              </LoadingButton>
            </div>
          </form>
        </FormProvider>
      </AuthCard>
    </>
  );
};

export default LoginTemplate;
