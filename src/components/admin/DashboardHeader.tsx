
'use client';
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { adminNavItems } from "@/lib/data"
import { Menu, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "../ui/input"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { logout } from "./actions";
import Image from "next/image"

export function DashboardHeader() {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 z-50">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Image 
                        src="https://viandmo.com/wp-content/uploads/viandmo_logo_regular_white.svg" 
                        alt="VI&MO Logo" 
                        width={96}
                        height={25}
                        priority
                        className="h-10 w-auto"
                        data-ai-hint="logo"
                    />
                    <span className="sr-only">VI&MO</span>
                </Link>
                {adminNavItems.map(item => (
                     <Link
                        key={item.label}
                        href={item.href}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Image 
                                src="https://viandmo.com/wp-content/uploads/viandmo_logo_regular_white.svg" 
                                alt="VI&MO Logo" 
                                width={96}
                                height={25}
                                priority
                                className="h-10 w-auto"
                                data-ai-hint="logo"
                            />
                            <span className="sr-only">VI&MO</span>
                        </Link>
                        {adminNavItems.map(item => (
                             <Link
                                key={item.label}
                                href={item.href}
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Hľadať..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            aria-label="Hľadať v administrácii"
                        />
                    </div>
                </form>
                <ThemeSwitcher />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <Avatar>
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Môj účet</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/admin/settings">Nastavenia</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <form action={logout}>
                            <button type="submit" className="w-full text-left">
                                <DropdownMenuItem>
                                    Odhlásiť sa
                                </DropdownMenuItem>
                            </button>
                        </form>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

    