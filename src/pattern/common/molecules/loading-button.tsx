import React, { FC, ReactNode } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import Hidden from "../atoms/hidden";
import LoaderLight from "../atoms/icons/loader-light";

interface ILoadingButtonprops extends ButtonProps {
  loading: boolean;
}

const LoadingButton: FC<ILoadingButtonprops> = ({ loading, children, ...props }) => {
  return (
    <Button {...props}>
      <Hidden visible={loading}>
        <LoaderLight className='animate-spin' />
      </Hidden>
      {children}
    </Button>
  );
};

export default LoadingButton;
