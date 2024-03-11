import React, { FC, ReactNode } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import Hidden from "../data-display/hidden";
import LoaderLight from "../../atoms/icons/loader-light";

interface ILoadingButtonprops extends ButtonProps {
  loading: boolean;
}

const LoadingButton: FC<ILoadingButtonprops> = ({
  loading,
  children,
  ...props
}) => {
  return (
    <Button {...props} type='submit'>
      <Hidden visible={loading}>
        <LoaderLight className='animate-spin' />
      </Hidden>
      <Hidden visible={!loading}>{children}</Hidden>
    </Button>
  );
};

export default LoadingButton;
