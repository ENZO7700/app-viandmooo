
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Image 
        src="https://viandmo.com/wp-content/uploads/viandmo_logo_regular_white.svg" 
        alt="VI&MO Logo" 
        width={96}
        height={25}
        priority
        className="h-10 w-auto filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]"
        data-ai-hint="logo"
      />
    </div>
  );
}
