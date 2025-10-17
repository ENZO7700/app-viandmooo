
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallBanner = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (!isStandalone) {
          setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === 'accepted' || outcome === 'dismissed') {
        setIsVisible(false);
        setInstallPrompt(null);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
        className="fixed bottom-6 right-6 z-50 cursor-pointer group"
        onClick={handleInstallClick}
    >
      <div className="relative flex flex-col items-center">
        <div className="bg-primary/90 p-4 rounded-full shadow-lg animate-pulse">
            <Image 
                src="https://viandmo.com/wp-content/uploads/viandmo_logo_regular_white.svg" 
                alt="VI&MO Logo" 
                width={48}
                height={48}
                priority
                className="h-auto w-12"
                data-ai-hint="logo"
            />
        </div>
        <p className="mt-2 text-xs font-semibold text-foreground bg-background/50 px-2 py-1 rounded-md shadow-md transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            Inštalovať VI&MO
        </p>
      </div>
    </div>
  );
};

export default InstallBanner;
