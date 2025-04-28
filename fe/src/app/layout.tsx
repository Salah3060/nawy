import { Navbar } from "@/components/ui/navbar";
import type { Metadata } from "next";
import "../styles/globals.css";
import { MessageProvider } from "@/context/MessageContext";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Nawy",
  description: "Nawy Real Estate.",
  icons: {
    icon: "/nawy.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <MessageProvider>
            <Navbar />
            <Toaster position="bottom-right" />
            {children}
          </MessageProvider>
        </UserProvider>
      </body>
    </html>
  );
}
