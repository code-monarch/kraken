"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import userImg from "@/public/images/user-img-lg.png";
import { PilgrimDetailsPageHeader } from "../organisms/pilgrim-details-page-header";
import { UserTransactionsTabIcon } from "@/pattern/common/atoms/icons/user-transactions-tab-icon";
import { VerificationStatusTabIcon } from "@/pattern/common/atoms/icons/verification-status-tab-icon";
import { UserDetailsTabIcon } from "@/pattern/common/atoms/icons/user-details-tab-icon";
import VerificationStatusTabContent from "../organisms/verification-status-tab-content";
import UserDetailsTabContent from "../organisms/user-details-tab-content";
import UserTransactionsTabContent from "../organisms/user-transactions-tab-content";
import { useGetSingleUserQuery } from "@/redux/services/users/user.api-slice";
import PulsePlaceholder from "@/pattern/common/atoms/icons/pulse-placeholder-icon";
import { show } from "@ebay/nice-modal-react";
import { ErrorModal } from "@/pattern/common/organisms/error-modal";

interface IProps {
  id: string;
}
const PilgrimDetailsTemplate = ({ id }: IProps) => {
  console.log(id);
  const { data, isLoading, isSuccess, isError, error } = useGetSingleUserQuery({
    id: id,
  });

  console.log("isError: ", isError);
  console.log("Error: ", error);

  useEffect(() => {
    if (
      isError &&
      "error" in error &&
      error?.error === "TypeError: Failed to fetch"
    ) {
      show(ErrorModal, {
        message:
          "Something went wrong, please check your network and try again",
      });
    }
  }, [error, isError]);

  const tabs = [
    {
      tabName: "User Details",
      value: "details",
      icon: UserDetailsTabIcon,
      content: (
        <UserDetailsTabContent
          email={data?.data.email ?? "Email"}
          address={data?.data.address ?? "Address"}
          name={`${data?.data.firstname} ${data?.data.lastname}`}
        />
      ),
    },
    {
      tabName: "User Transactions",
      value: "transactions",
      icon: UserTransactionsTabIcon,
      content: <UserTransactionsTabContent />,
    },
    {
      tabName: "Verification Status",
      value: "verification-status",
      icon: VerificationStatusTabIcon,
      content: <VerificationStatusTabContent />,
    },
  ];
  const [tabValue, setTabValue] = useState(tabs[0].value);

  return (
    <div className="bg-card w-full min-h-[760px] h-fit space-y-[32px] p-6">
      {isLoading && (
        <div className="h-24 text-center">
          <PulsePlaceholder />
        </div>
      )}
      {!isLoading && isSuccess && (
        <div>
          <PilgrimDetailsPageHeader
            email={data?.data.email ?? "User Email"}
            firstName={data?.data.firstname ?? "Firstname"}
            lastName={data?.data.lastname ?? "Lastname"}
            phoneNumber={data?.data.phoneNumber ?? "PhoneNumber"}
            userImg={userImg}
            status={(data?.data.isVerified ? "active" : "inactive") ?? "Status"}
            userType={data?.data.userType! ?? "UserType"!}
            id={id}
          />
          {/* Tabs */}
          <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
            <TabsList className="w-full py-4 border-y">
              {tabs.map((tab) => (
                <div
                  key={tab.value}
                  className="w-fit flex flex-col items-start"
                >
                  <TabsTrigger
                    value={`${tab.value}`}
                    className="flex items-center gap-2"
                  >
                    <span>
                      <tab.icon focused={tabValue === tab.value} />
                    </span>
                    <span>{tab.tabName}</span>
                  </TabsTrigger>
                </div>
              ))}
            </TabsList>
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="px-6">
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default PilgrimDetailsTemplate;
