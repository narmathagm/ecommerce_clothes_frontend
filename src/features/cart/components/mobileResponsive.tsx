import { ReactNode } from "react";
import { useResponsive } from "../../../hooks/useResponsive";

export function MobileResponsive({ children }: { children: ReactNode }) {
    const { isMobile } = useResponsive();
    if (!isMobile) return null;
    return <>{children}</>;
}
