import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "InfoGrowth",
  description: "IT Services & Staffing Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
