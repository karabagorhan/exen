import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EXEN Pompa | Servis Yönetim Sistemi",
  description: "Pompa servis, teklif ve bakım operasyon yönetimi",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
