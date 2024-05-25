"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import userImg from "@/public/images/user-img-lg.png";
import { PilgrimDetailsPageHeader } from "../organisms/pilgrim-details-page-header";
import { UserTransactionsTabIcon } from "@/pattern/common/atoms/icons/user-transactions-tab-icon";
import { VerificationStatusTabIcon } from "@/pattern/common/atoms/icons/verification-status-tab-icon";
import { UserDetailsTabIcon } from "@/pattern/common/atoms/icons/user-details-tab-icon";
import VerificationStatusTabContent from "../organisms/verification-status-tab-content";
import UserDetailsTabContent from "../organisms/user-details-tab-content";
import UserTransactionsTabContent from "../organisms/user-transactions-tab-content";

const tabs = [
  {
    tabName: "User Details",
    value: "details",
    icon: UserDetailsTabIcon,
    content: <UserDetailsTabContent />,
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

const PilgrimDetailsTemplate = () => {
  const [tabValue, setTabValue] = useState(tabs[0].value);

  return (
    <div className='bg-card w-full min-h-[760px] h-fit space-y-[32px] p-6'>
      <PilgrimDetailsPageHeader
        email='aishaabdullahi@email.com'
        firstName='Aisha'
        lastName='Abdullahi'
        phoneNumber='+234 803 000 0000'
        userImg={userImg}
        status='active'
        userType='pilgrim'
      />
      {/* Tabs */}
      <Tabs value={tabValue} onValueChange={setTabValue} className='w-full'>
        <TabsList className='w-full py-4 border-y'>
          {tabs.map((tab) => (
            <div key={tab.value} className='w-fit flex flex-col items-start'>
              <TabsTrigger
                value={`${tab.value}`}
                className='flex items-center gap-2'
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
  );
};

export default PilgrimDetailsTemplate;
