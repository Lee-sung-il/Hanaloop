"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building } from "lucide-react";
import { ThemeToggle } from "../theme-toggle"; // 1. ThemeToggle 컴포넌트 import

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", label: "Dashboard", icon: LayoutDashboard },
        { href: "/company/c1", label: "Acme Corp", icon: Building },
        { href: "/company/c2", label: "Globex", icon: Building },
    ];

    return (
        <aside className="h-screen w-64 bg-gray-50 border-r z-10 hidden md:flex flex-col sticky top-0 dark:bg-slate-900 dark:border-slate-800">
            <div className="p-4 border-b dark:border-slate-800">
                <Link href="/" className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    HanaLoop
                </Link>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-slate-800",
                            pathname === item.href ? "bg-gray-200 text-gray-900 dark:bg-slate-800 dark:text-gray-100" : ""
                        )}
                    >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.label}
                    </Link>
                ))}
            </nav>
            {/* 2. 사이드바 하단에 ThemeToggle 버튼 추가 */}
            <div className="p-4 border-t dark:border-slate-800">
                <ThemeToggle />
            </div>
        </aside>
    );
}