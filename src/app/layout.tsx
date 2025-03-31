import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import SideNavigation from "@/components/common/navigation/SideNavigation";
// shadcn/ui
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Todo",
  description: "Todo Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${roboto.variable}  antialiased`}>
        {/* <SideNavigation /> */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
