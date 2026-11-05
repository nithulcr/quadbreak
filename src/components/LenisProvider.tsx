'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const DESKTOP_MIN_WIDTH = 990

export default function LenisProvider({ children }: { children: React.ReactNode }) {
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
      gsap.ticker.add(raf)
      lenis.on('scroll', ScrollTrigger.update)
    }

    const destroyLenis = () => {
      if (!lenis) return
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenis = null
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

  return <>{children}</>
}
