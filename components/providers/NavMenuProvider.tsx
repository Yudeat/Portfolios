"use client";

import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { DockMenu } from "@/components/navigation/DockMenu";
import { SplitScreenNav } from "@/components/navigation/SplitScreenNav";

type NavMenuContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const NavMenuContext = createContext<NavMenuContextValue | null>(null);

export function useNavMenu() {
  const ctx = useContext(NavMenuContext);
  if (!ctx) {
    throw new Error("useNavMenu must be used within NavMenuProvider");
  }
  return ctx;
}

export function NavMenuProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
      toggle,
    }),
    [close, isOpen, open, toggle],
  );

  return (
    <NavMenuContext.Provider value={value}>
      {children}
      <DockMenu />
      <SplitScreenNav isOpen={isOpen} onClose={close} onOpen={open} />
    </NavMenuContext.Provider>
  );
}
