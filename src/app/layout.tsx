import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Navbar from "@/modules/global/components/Navbar";
import SmoothScrolling from "@/shared/components/SmoothScrolling";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400","700"],
  display: "swap",
  variable: "--font-poppins",
});


export const metadata: Metadata = {
  title: "Inticampo",
  description: "Productos agropecuarios - Fertilizantes, Asesoría y Maquinaria Agrícola",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${poppins.variable} antialiased selection:bg-green-100 selection:text-green-900 flex flex-col`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SmoothScrolling>
            <Navbar />
            {children}
          </SmoothScrolling>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
