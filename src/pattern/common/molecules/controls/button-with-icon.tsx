import React, { FC, ReactElement } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import Hidden from "../data-display/hidden";

interface IButtonWithIconprops extends ButtonProps {
  prefixIcon?: ReactElement;
  suffixIcon?: ReactElement;
}

const ButtonWithIcon: FC<IButtonWithIconprops> = ({
  prefixIcon,
  suffixIcon,
  children,
  ...props
}) => {
  return (
    <Button {...props}>
      <Hidden visible={prefixIcon ? true : false}>
        <span>{prefixIcon}</span>
      </Hidden>
      {prefixIcon ? <span>{prefixIcon}</span> : null}
      {children}
      <Hidden visible={suffixIcon ? true : false}>
        <span>{suffixIcon}</span>
      </Hidden>
    </Button>
  );
};

export default ButtonWithIcon;
