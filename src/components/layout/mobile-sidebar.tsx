"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import Sidebar from "@/components/layout/sidebar";

export default function MobileSidebar() {
    const { isOpen, onOpen, onClose } = useMobileSidebar();

    return (
        <>
            <Button
                onClick={onOpen}
                variant="ghost"
                size="icon"
                className="md:hidden"
            >
                <Menu />
                <span className="sr-only">Toggle Menu</span>
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="left" className="p-0 w-64">
                    <SheetHeader className="sr-only">
                        <SheetTitle>Navigation Menu</SheetTitle>
                        <SheetDescription>
                            Dashboard and company navigation links
                        </SheetDescription>
                    </SheetHeader>
                    <Sidebar />
                </SheetContent>
            </Sheet>
        </>
    );
}