import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import Script from "next/script";
import ClientOnly from "@/components/ClientOnly";

// Import client-side only components
const VisualEditsMessenger = dynamic(
  () => import("../visual-edits/VisualEditsMessenger")
);

const ErrorReporter = dynamic(
  () => import("@/components/ErrorReporter")
);

export const metadata: Metadata = {
  title: "Endora Creative Hub",
  description: "A creative agency for digital solutions",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientOnly>
          <ErrorReporter />
        </ClientOnly>
        {/* Load script client-side only to prevent hydration errors */}
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="lazyOnload"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <ClientOnly>
          <VisualEditsMessenger />
        </ClientOnly>
      </body>
    </html>
  );
}
