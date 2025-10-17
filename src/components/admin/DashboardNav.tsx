
'use client';
import { adminNavItems } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export function DashboardNav() {
    const pathname = usePathname();
    return (
        <aside className="hidden w-64 flex-col border-r bg-muted/40 p-4 md:flex">
             <nav className="flex flex-col gap-1">
                {adminNavItems.map(item => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === item.href ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
