'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const PRELOADER_DURATION = 500;

export default function PreloaderControl() {
  const pathname = usePathname();

  useEffect(() => {
    const preloader = document.querySelector('.preloader') as HTMLElement | null;
    if (!preloader) return;

    const isHomePage = pathname === '/';
    const alreadyShown = sessionStorage.getItem('preloader-shown');
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!isHomePage || alreadyShown || reducedMotion) {
      preloader.classList.add('hidden');
      document.body.classList.remove('preloader-visible');
      return;
    }

    preloader.classList.remove('hidden');
    document.body.classList.add('preloader-visible');

    const timer = setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.classList.remove('preloader-visible');
      sessionStorage.setItem('preloader-shown', 'true');
    }, PRELOADER_DURATION);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
