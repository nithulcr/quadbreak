'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PreloaderControl() {
  const pathname = usePathname();

  useEffect(() => {
    const preloader = document.querySelector('.preloader') as HTMLElement | null;
    const isHomePage = pathname === '/';
    const alreadyShown = sessionStorage.getItem('preloader-shown');

    if (!preloader) return;

    if (isHomePage && !alreadyShown) {
      // Prevent scrolling while preloader is visible
      document.body.classList.add('preloader-visible');

      // Force delay of 2 seconds minimum
      const timer = setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('preloader-visible');
        sessionStorage.setItem('preloader-shown', 'true');
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // Hide immediately for other pages or repeat visits
      preloader.classList.add('hidden');
      document.body.classList.remove('preloader-visible');
    }
  }, [pathname]);

  return null;
}
