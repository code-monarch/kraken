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
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setAdminId } from "@/redux/slices/user-slice";
import { LOGIN_API_KEY } from "@/lib/constants";
import LocalStore from "@/lib/helper/storage-manager";
import { toast } from "sonner";

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Please enter your email address"),
  password: Yup.string().required("Password is required"),
});

const LoginTemplate = () => {
  const [login, { isLoading, isError }] = useLoginMutation();
  const adminId = (state: RootState) => state.userDetails.adminId;

  const dispatch = useDispatch();
  const router = useRouter();

  const { push } = useRouter();
  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm<ILoginPayload>({
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

  const onSubmit: SubmitHandler<ILoginPayload> = (data) => {
    console.log("DATA TO SUBMIT: ", data);

    login({
      email: data.email,
      password: data.password,
    })
      .unwrap()
      .then((res) => {
        const apiKey = res.data.apiKey;
        const adminId = res.data.id;
        LocalStore.setItem({ key: LOGIN_API_KEY, value: apiKey })
        if (adminId) {
          dispatch(setAdminId(adminId));
        }
        if (apiKey) {
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(`${err.error || err?.data?.message || err}`);
        // Show error message
        toast.error("Unexpected error", {
          description: `${err?.data?.responseMessage ?? "We encountered an error while trying to log you in"}`,
          duration: 5000,
          cancel: {
            label: 'Cancel',
            onClick: () => console.log('Cancel!'),
          },
        })
      });
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
                loading={isLoading}
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
