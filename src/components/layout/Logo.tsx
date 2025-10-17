
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("relative flex items-center", className)}>
      <Image 
        src="https://viandmo.com/wp-content/uploads/viandmo_logo_regular_white.svg" 
        alt="VI&MO Logo" 
        width={96}
        height={25}
        priority
        className="h-auto"
        data-ai-hint="logo"
      />
    </Link>
  );
}
