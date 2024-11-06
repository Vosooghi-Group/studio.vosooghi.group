import SanityNavigation from "@/components/SanityNavigation";
import './global.css'
export const metadata = {
  title: "VA-sanity",
  description: "sanity admin ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col w-full">
          <SanityNavigation />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
