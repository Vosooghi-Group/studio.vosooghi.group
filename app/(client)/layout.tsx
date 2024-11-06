import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme/theme-provier";
import AppNavbar from "@/components/navigation/AppNavbar";
// import { ConstructionBanner } from "@/components/ConstructionBanner";
import { SessionProvider } from "next-auth/react";
import { Footer } from "@/components/navigation/Footer";


export const metadata: Metadata = {
  metadataBase: new URL("https://studio.vosooghi.group/"),
  title: "استودیو وثوقی | Vosooghi Studio",
  description: "استودیو مارکتینگ و برندینگ وثوقی | vosooghi",
  openGraph: {
    title: "استودیو مارکتینگ و برندینگ وثوقی | vosooghi",
    description: "استودیو مارکتینگ و برندینگ وثوقی | vosooghi",
    type: "website",
    url: "https://studio.vosooghi.group/",
    siteName: "VosooghiAgency",
    images: [
      {
        url: "https://studio.vosooghi.group/images/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vosooghi Digital Marketing Agency",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`antialiased`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="bg-[#121413]">
              <AppNavbar />
              {children}
              <Footer />
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
