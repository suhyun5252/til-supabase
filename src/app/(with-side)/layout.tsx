import SideNavigation from "@/components/common/navigation/SideNavigation";
import { ReactNode } from "react";
// Supabase Server Client
import { createServerSideClient } from "@/lib/supabase/server";

export default async function Layout({ children }: { children: ReactNode }) {
  // Client 컴포넌트에서 zustand 액션을 통해서 업데이트해도 됨
  // Server 컴포넌트에서 zustand 액션을 통해서 업데이트해도 됨
  const supabase = await createServerSideClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("session ", user);

  return (
    <>
      <SideNavigation user={user} />
      <div>{children}</div>
    </>
  );
}
