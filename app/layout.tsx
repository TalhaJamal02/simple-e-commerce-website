import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/CartContext";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const clekPubkey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export const metadata: Metadata = {
  title: "ShopEasy - Talha",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={clekPubkey}>
      <html lang="en">
        <body className={`${poppins.className}`}>
          <CartProvider>
            <Navbar />
            {children}
            <Toaster />
            <Footer />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
