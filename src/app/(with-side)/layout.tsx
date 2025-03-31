import SideNavigation from "@/components/common/navigation/SideNavigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SideNavigation />
      <div>{children}</div>
    </>
  );
}
