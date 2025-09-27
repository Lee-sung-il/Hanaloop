// src/app/(dashboard)/layout.tsx
import Sidebar from "@/components/layout/sidebar";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid md:grid-cols-[256px_1fr] min-h-screen">
            <Sidebar />
            <main className="bg-gray-100 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
}