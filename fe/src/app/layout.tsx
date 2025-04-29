// React
import type { Metadata } from "next";

// Components
import { Navbar } from "@/components/ui/navbar";
import ClientValidator from "@/components/ClientValidator";

// Context
import { MessageProvider } from "@/context/MessageContext";
import { UserProvider } from "@/context/UserContext";

// Css
import "../styles/globals.css";

// Meta Data
export const metadata: Metadata = {
  title: "Nawy",
  description: "Nawy Real Estate.",
  icons: {
    icon: "/nawy.svg",
  },
};

// Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <MessageProvider>
            <ClientValidator>
              <Navbar />
              {children}
            </ClientValidator>
          </MessageProvider>
        </UserProvider>
      </body>
    </html>
  );
}
