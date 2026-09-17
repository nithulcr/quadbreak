'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DESKTOP_MIN_WIDTH = 990

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: Lenis | null = null

    const raf = (time: number) => {
      lenis?.raf(time * 1000)
    }

    const initLenis = () => {
      if (lenis) return
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

    // Lenis smooth scroll only on desktop (width > 990px); touch devices keep native scroll.
    if (window.innerWidth > DESKTOP_MIN_WIDTH) {
      initLenis()
    }

    // Disable lag smoothing for smoother scroll-linked animations
    gsap.ticker.lagSmoothing(0)

    // Comprehensive refresh strategy to ensure ScrollTrigger works on first load
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh()
    }

    // Store timeout IDs for cleanup
    const timeoutIds: (number | ReturnType<typeof setTimeout>)[] = []

    // Multiple refresh strategies to catch all timing scenarios
    const refreshStrategies = [
      // Refresh on window load (all assets loaded)
      () => window.addEventListener('load', refreshScrollTrigger),

      // Refresh after DOM is ready
      () => document.addEventListener('DOMContentLoaded', refreshScrollTrigger),

      // Multiple timeouts to catch late layout shifts from images/fonts
      () => timeoutIds.push(setTimeout(refreshScrollTrigger, 100)),
      () => timeoutIds.push(setTimeout(refreshScrollTrigger, 300)),
      () => timeoutIds.push(setTimeout(refreshScrollTrigger, 500)),
      () => timeoutIds.push(setTimeout(refreshScrollTrigger, 800)),
      () => timeoutIds.push(setTimeout(refreshScrollTrigger, 1200)),
      () => timeoutIds.push(setTimeout(refreshScrollTrigger, 2000)),
    ]

    // Execute all refresh strategies
    refreshStrategies.forEach(strategy => strategy())

    // Refresh ScrollTrigger and switch Lenis on/off when crossing the desktop breakpoint
    const handleResize = () => {
      const isDesktop = window.innerWidth > DESKTOP_MIN_WIDTH
      if (isDesktop && !lenis) initLenis()
      if (!isDesktop && lenis) destroyLenis()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    // Refresh on orientation change (mobile)
    window.addEventListener('orientationchange', () => {
      setTimeout(refreshScrollTrigger, 100)
    })

    return () => {
      destroyLenis()
      window.removeEventListener('load', refreshScrollTrigger)
      document.removeEventListener('DOMContentLoaded', refreshScrollTrigger)
      window.removeEventListener('resize', handleResize)

      // Clear all timeouts
      timeoutIds.forEach(id => clearTimeout(id))
    }
  }, [])

  return <>{children}</>
}