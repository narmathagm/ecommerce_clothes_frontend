import { ReactNode } from "react";
import { useResponsive } from "../../hooks/useResponsive";

export function TabResponsive({ children }: { children: ReactNode }) {
    const { isTab, isDesktop } = useResponsive();
    if (!isTab && !isDesktop) return null;
    return <>{children}</>;
}

export function DesktopResponsive({ children }: { children: ReactNode }) {
    const { isDesktop } = useResponsive();
    if (!isDesktop) return null;
    return <>{children}</>;
}
