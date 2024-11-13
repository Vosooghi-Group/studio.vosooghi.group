import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
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
      <Head>
        {/* Add your ad script here */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function (t, e, n) {
                  t.yektanetAnalyticsObject = n, t[n] = t[n] || function () {
                      t[n].q.push(arguments)
                  }, t[n].q = t[n].q || [];
                  var a = new Date, r = a.getFullYear().toString() + "0" + a.getMonth() + "0" + a.getDate() + "0" + a.getHours(),
                      c = e.getElementsByTagName("script")[0], s = e.createElement("script");
                  s.id = "ua-script-0v2lE6Oq"; s.dataset.analyticsobject = n;
                  s.async = 1; s.type = "text/javascript";
                  s.src = "https://cdn.yektanet.com/rg_woebegone/scripts_v3/0v2lE6Oq/rg.complete.js?v=" + r, c.parentNode.insertBefore(s, c)
              }(window, document, "yektanet");
            `,
          }}
        />
      </Head>
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
