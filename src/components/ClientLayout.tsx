"use client";

import { useEffect } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lastScrollTop = 0;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScroll =
        window.scrollY || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop) {
        document.body.classList.add("scroll-down");
      } else if (currentScroll === 0) {
        document.body.classList.remove("scroll-down");
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrollDirection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <>{children}</>;
}
