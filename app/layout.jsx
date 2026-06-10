import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { APP_NAME, APP_TAGLINE } from "@/lib/brand";
import { TripProvider } from "@/lib/trip-context";
import TopBar from "@/components/nav/TopBar";
import BottomNav from "@/components/nav/BottomNav";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata = {
  title: APP_NAME,
  description: APP_TAGLINE,
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F3EFE9",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <TripProvider>
          <div className="app-shell">
            <TopBar />
            <main className="app-main">{children}</main>
            <BottomNav />
          </div>
        </TripProvider>
      </body>
    </html>
  );
}
