import { ReactNode } from "react";
import { useResponsive } from "../../../hooks/useResponsive";

export function TabResponsive({ children }: { children: ReactNode }) {
    const { isTab, isDesktop } = useResponsive();
    if (!isTab && !isDesktop) return null; // Showing on tab & desktop
    return <>{children}</>;
}
