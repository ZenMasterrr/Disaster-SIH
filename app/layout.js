import localFont from "next/font/local";
import "./globals.css";
import Navbar1 from './components/Navbar1';
import { ClerkProvider } from '@clerk/nextjs';



// Fonts configuration
const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

// Metadata is only needed in TypeScript, so you can remove it here
// If needed, manually set document title via React (optional)

// RootLayout component
export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            <Navbar1 />
            {children}
            </body>
            </html>
        </ClerkProvider>
    );
}

