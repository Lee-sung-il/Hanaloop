import MobileSidebar from "@/components/layout/mobile-sidebar";
import React from "react";
import Link from "next/link";
import Sidebar from "@/components/layout/sidebar";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <div className="hidden md:block">
                <Sidebar />
            </div>

            <main className="flex-1">
                <header className="md:hidden flex items-center p-4 border-b dark:border-slate-800">
                    <MobileSidebar />
                    <Link href="/" className="text-xl font-bold text-gray-800 dark:text-gray-200 ml-4">
                        HanaLoop
                    </Link>
                </header>
                <div className="p-4 sm:p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}