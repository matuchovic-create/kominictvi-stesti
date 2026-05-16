import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kominictví Štěstí — Prémiový komínový servis Praha",
  description:
    "Certifikovaný komínový servis Praha a okolí. Kontroly, čištění, revize, vložkování. 15+ let zkušeností, 24/7 pohotovost. Volejte +420 773 000 000.",
  keywords:
    "kominictví Praha, čištění komínů, revize komínů, vložkování komínů, kominický servis",
  openGraph: {
    title: "Kominictví Štěstí — Prémiový komínový servis Praha",
    description:
      "Certifikovaný komínový servis Praha a okolí. 15+ let zkušeností, 24/7 pohotovost.",
    url: "https://www.kominictvi-stesti.cz",
    siteName: "Kominictví Štěstí",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
