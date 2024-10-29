"use client";

import { useEffect, useState } from "react";

import { CardModal } from "../modals/card-modal";

export const ModalProvider = () => {
  //removing hydration errors
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <CardModal />;
};
