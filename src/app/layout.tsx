import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./providers";
import React from "react";
import {ThemeProvider} from "@/app/ThemeProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "HanaLoop Dashboard",
    description: "Carbon Emissions Dashboard",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // 2. <html> 태그에 suppressHydrationWarning를 추가합니다.
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        {/* 3. ThemeProvider로 전체를 감싸줍니다. */}
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}