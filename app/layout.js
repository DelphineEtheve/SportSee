import { Geist, Geist_Mono, Inter } from "next/font/google";
import ActivityPeriodProvider from "@/context/ActivityPeriodContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: "SPORTSEE",
  description: "Transformez vos stats en résultats",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.variable} `}>
      <body>
        <ActivityPeriodProvider>
          {children}
        </ActivityPeriodProvider>
      </body>
    </html>
  );
}
