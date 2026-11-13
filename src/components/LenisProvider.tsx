'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const DESKTOP_MIN_WIDTH = 990
const FIXED_HEADER_OFFSET = 96

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    let lenis: Lenis | null = null
    let refreshTimer: ReturnType<typeof setTimeout> | null = null

    const raf = (time: number) => {
      lenis?.raf(time * 1000)
    }

    const initLenis = () => {
      if (lenis || prefersReducedMotion()) return
      lenis = new Lenis({
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      lenisRef.current = lenis
      gsap.ticker.add(raf)
      lenis.on('scroll', ScrollTrigger.update)
    }

    const destroyLenis = () => {
      if (!lenis) return
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenis = null
      lenisRef.current = null
    }

    if (window.innerWidth > DESKTOP_MIN_WIDTH) {
      initLenis()
    }

    gsap.ticker.lagSmoothing(0)

    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh()
    }

    // One deferred refresh catches late image/font layout shifts without
    // stacking a long series of timers.
    refreshTimer = setTimeout(refreshScrollTrigger, 400)
    window.addEventListener('load', refreshScrollTrigger)

    const handleResize = () => {
      const isDesktop = window.innerWidth > DESKTOP_MIN_WIDTH
      if (isDesktop && !lenis) initLenis()
      if (!isDesktop && lenis) destroyLenis()
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      destroyLenis()
      if (refreshTimer) clearTimeout(refreshTimer)
      window.removeEventListener('load', refreshScrollTrigger)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash
      if (!hash) return

      let target: HTMLElement | null = null
      try {
        target = document.querySelector(hash)
      } catch {
        return
      }
      if (!target) return

      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(target, { offset: -FIXED_HEADER_OFFSET })
      } else {
        const top =
          target.getBoundingClientRect().top + window.scrollY - FIXED_HEADER_OFFSET
        window.scrollTo({
          top,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        })
      }
    }

    const timeout = setTimeout(scrollToHash, 100)
    window.addEventListener('hashchange', scrollToHash)
    window.addEventListener('load', scrollToHash)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('hashchange', scrollToHash)
      window.removeEventListener('load', scrollToHash)
    }
  }, [pathname])

  return <>{children}</>
}
