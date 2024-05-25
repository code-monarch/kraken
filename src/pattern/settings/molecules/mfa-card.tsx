import { Badge } from "@/components/ui/badge";
import MfaLinkedTick from "@/pattern/common/atoms/icons/mfa-linked-tick";
import MfaNotLinkedTick from "@/pattern/common/atoms/icons/mfa-not-linked-tick";
import React, { ReactHTMLElement } from "react";

interface IProps {
  icon: any;
  title: string;
  description: string;
  linked: boolean; // Determines whether MFA has been linked
  recommended: boolean;
  action: any;
}

const MfaCard = ({
  icon,
  title,
  description,
  linked,
  recommended,
  action,
}: IProps) => {
  return (
    <div className="flex items-center justify-between gap-6 p-4 my- bg-[#f8fafc]">
      <div className="flex items-start gap-4">
        <div className="w-10 mt-2">{icon}</div>

        <div className="w-[487px] space-y-2">
          <div className="text-base text-[#1b1e21] font-semibold">
            {title}{" "}
            <span>
              {recommended && <Badge variant="active">Recommended</Badge>}
            </span>
          </div>
          <p className="text-sm text-[#4f627d]">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-[64px] w-[287px]">
        <div>
          {linked ? (
            <Badge
              variant="active"
              className="flex items-center gap-1 text-base font-semibold"
            >
              <MfaLinkedTick /> Linked
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="flex items-center gap-1 text-base font-semibold"
            >
              <MfaNotLinkedTick /> Not linked
            </Badge>
          )}
        </div>

        <div>{action}</div>
      </div>
    </div>
  );
};

export default MfaCard;
