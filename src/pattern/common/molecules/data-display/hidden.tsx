"use client";
import React, { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  visible: boolean; // Change this to visible or visibility
}

/**
 * @description
 * Component that either shows or hide children
 */
const Hidden: FC<IProps> = ({ children, visible }) => {
  return <>{visible ? children : null}</>;
};

export default Hidden;
