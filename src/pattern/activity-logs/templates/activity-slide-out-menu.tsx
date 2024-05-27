"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { create, useModal } from "@ebay/nice-modal-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SlideOutActivityDetailsWidget } from "../organisms/slide-out-activity-details-widget";

interface IProps {
  type: string;
  status: string;
  ip: string;
  device: string;
  date: string;
}

const ActivitySlideOutMenu = create(
  ({ type, status, ip, device, date }: IProps) => {
    const { resolve, remove, visible } = useModal();
    const [scrollHeight, setScrollHeight] = useState(window.innerHeight - 30);

    useEffect(() => {
      const handleResize =() => {
        setScrollHeight(window.innerHeight - 30);
      }

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleCloseModal = () => {
      resolve({ resolved: true });
      remove();
    };
    return (
      <Sheet modal open={visible} onOpenChange={handleCloseModal}>
        <SheetContent>
          <div className="relative h-full">
            <ScrollArea
              className="w-full rounded-sm"
              style={{ height: `${scrollHeight}px` }}
            >
              <SheetHeader className="absolute top-0 right-0 left-0 z-10">
                <SheetTitle>Activity details</SheetTitle>
              </SheetHeader>
              <div className="w-full mt-[72px] px-[24px] pt-[24px] font-raleway space-y-[16px]">
                <div className="px-4 space-y-[16px]">
                  {/* Transaction Details */}
                  <SlideOutActivityDetailsWidget
                    type={type}
                    status={status}
                    IP={ip}
                    device={device}
                    date={date}
                  />
                </div>
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    );
  }
);

export default ActivitySlideOutMenu;
