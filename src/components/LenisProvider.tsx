'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Connect Lenis to GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Disable lag smoothing for smoother scroll-linked animations
    gsap.ticker.lagSmoothing(0)

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update)

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

    // Refresh on window resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    // Refresh on orientation change (mobile)
    window.addEventListener('orientationchange', () => {
      setTimeout(refreshScrollTrigger, 100)
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
      window.removeEventListener('load', refreshScrollTrigger)
      document.removeEventListener('DOMContentLoaded', refreshScrollTrigger)
      window.removeEventListener('resize', handleResize)
      
      // Clear all timeouts
      timeoutIds.forEach(id => clearTimeout(id))
    }
  }, [])

  return <>{children}</>
}