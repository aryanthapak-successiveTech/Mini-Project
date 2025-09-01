
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import ApolloClientProvider from "@/utils/ApolloClient";
import { BookContextProvider } from "@/context/BookContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QuickLib",
  description: "Library management tool",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
       <ApolloClientProvider>
         <BookContextProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >  
      <Navbar/>
        {children}
      </body>
      </BookContextProvider>
      </ApolloClientProvider>
      </AuthProvider>

    </html>
  );
}
