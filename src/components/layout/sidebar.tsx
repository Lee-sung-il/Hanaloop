"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { LayoutDashboard, Building } from "lucide-react";
import { useCompanies } from "@/hooks/useCompanies";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
    const pathname = usePathname();
    const { data: companies, isLoading } = useCompanies('all');
    const { onClose } = useMobileSidebar();

    const navItems = useMemo(() => {
        const staticItems = [{ href: "/", label: "Dashboard", icon: LayoutDashboard }];
        const companyItems = companies?.map(company => ({
            href: `/companies/${company.id}`,
            label: company.name,
            icon: Building,
        })) || [];
        return [...staticItems, ...companyItems];
    }, [companies]);

    return (
        <aside className="h-screen w-64 bg-gray-50 border-r z-10 flex flex-col sticky top-0 dark:bg-slate-900 dark:border-slate-800">
            <div className="p-4 border-b dark:border-slate-800">
                <Link href="/" className="text-xl font-bold text-gray-800 dark:text-gray-200" onClick={onClose}>
                    HanaLoop
                </Link>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {isLoading ? (
                    <div className="space-y-2">
                        <div className="h-9 w-full bg-gray-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
                    </div>
                ) : (
                    navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                                "flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-slate-800",
                                pathname === item.href ? "bg-gray-200 text-gray-900 dark:bg-slate-800 dark:text-gray-100" : ""
                            )}
                        >
                            <item.icon className="h-5 w-5 mr-3" />
                            {item.label}
                        </Link>
                    ))
                )}
            </nav>
            <div className="p-4 border-t dark:border-slate-800">
                <ThemeToggle />
            </div>
        </aside>
    );
}