import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "[bldrs] — ecosystem for the next wave of builders",
  description: "Ecosystem for the next wave of builders. Join the waitlist.",
  icons: {
    icon: "/logo-icon.png",
  },
  openGraph: {
    title: "[bldrs] — ecosystem for the next wave of builders",
    description: "Ecosystem for the next wave of builders. Join the waitlist.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
