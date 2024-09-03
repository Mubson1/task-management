"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Sidebar } from "./sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";

export const MobileSidebar = () => {
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);

  const { isOpen, onClose, onOpen } = useMobileSidebar();

  //even if we use use client, the first iteration can be server side rendered. This may cause existence of two different values in states, called as hydration error
  //so, what we are doing is smartly using a ismounted state which combined with useEffect forces for client side render only. PS: useEffect runs only in client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //on click of accordion item, close the sidebar by default
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) return null;

  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden mr-2"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};
