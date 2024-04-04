"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyDetailsTab from "../organisms/my-details-tab";
import AccountSettingsTab from "../organisms/account-settings-tab";

const tabs = [
  {
    tabName: "My Details",
    value: "details",
    content: <MyDetailsTab />,
  },
  {
    tabName: "Account Settings",
    value: "settings",
    content: <AccountSettingsTab />,
  },
];

const SettingsTemplate = () => {
  const [tabValue, setTabValue] = useState(tabs[0].value);

  return (
    <div className="bg-transparent w-full min-h-[760px] h-fit space-y-[32px] px-6 pb-6">
      {/* Tabs */}
      <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
        <TabsList className="w-full">
          {tabs.map((tab) => (
            <div key={tab.value} className="w-fit flex flex-col items-start">
              <TabsTrigger value={`${tab.value}`} className="">
                <span>{tab.tabName}</span>
              </TabsTrigger>
            </div>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="p-6 bg-card">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SettingsTemplate;
