'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PreloaderControl() {
  const pathname = usePathname();

  useEffect(() => {
    const preloader = document.querySelector('.preloader') as HTMLElement | null;
    if (!preloader) return;

    const isHomePage = pathname === '/';
    const alreadyShown = sessionStorage.getItem('preloader-shown');

    if (isHomePage && !alreadyShown) {
      preloader.classList.remove('hidden');
      document.body.classList.add('preloader-visible');

      const timer = setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('preloader-visible');
        sessionStorage.setItem('preloader-shown', 'true');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
