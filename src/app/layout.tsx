import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const vazir = localFont({
  src: "../fonts/Vazirmatn-Variable.woff2",
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Benso Coffee | فروشگاه قهوه کپسولی، دستگاه قهوه‌ساز و اکسسوری",
    template: "%s | Benso Coffee",
  },
  description:
    "خرید آنلاین کپسول قهوه، دستگاه قهوه‌ساز کپسولی و اکسسوری قهوه از Benso Coffee مشهد با ضمانت اصالت کالا، ارسال سریع و پشتیبانی تخصصی.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
