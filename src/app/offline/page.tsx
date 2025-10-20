
import { WifiOff } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <WifiOff className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-8 text-4xl font-bold">Ste offline</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Zdá sa, že nemáte pripojenie na internet. Skontrolujte svoje pripojenie a skúste to znova.
        </p>
        <Link href="/" className="mt-8 inline-block rounded-md bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105">
            Načítať znova
        </Link>
      </div>
    </div>
  );
}
