'use client'

/**
 * GlobalStarCursor
 *
 * Renders the same 4-pointed star cursor site-wide on fine-pointer (mouse/trackpad)
 * devices. When the pointer enters a [data-hover-sparkle] zone, this cursor hides
 * and defers to HoverSparkle's own cursor + trail system. On inputs/textareas/selects
 * the native cursor is restored.
 *
 * Cursor position is updated via direct DOM style mutation — no React state, no
 * re-renders, no jank. The native cursor is suppressed by an injected <style> tag
 * that is removed on unmount.
 */

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export function GlobalStarCursor() {
  const [mounted, setMounted] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Only activate on fine-pointer (mouse / trackpad) devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (!isFinePointer || prefersReducedMotion) return

    // Suppress native cursor globally; restore on text inputs so the
    // beam cursor still appears there (the custom cursor also hides itself
    // on inputs — see onMove below).
    const style = document.createElement('style')
    style.dataset.globalStarCursor = '1'
    style.textContent = [
      '* { cursor: none !important; }',
      'input, textarea, select { cursor: auto !important; }',
    ].join(' ')
    document.head.appendChild(style)

    const onMove = (e: MouseEvent) => {
      const el = cursorRef.current
      if (!el) return

      // Always track position so there's no stale-position flash when re-appearing
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`

      const target = e.target as Element | null
      const inSparkle = !!target?.closest('[data-hover-sparkle]')
      const inInput = !!target?.closest('input, textarea, select')

      el.style.opacity = inSparkle || inInput ? '0' : '1'
    }

    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0'
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      style.remove()
    }
  }, [])

  if (!mounted) return null

  return createPortal(
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        // Sit just below HoverSparkle's z-[9999] — they are never simultaneously
        // visible, but this ensures correct layering if timing ever overlaps.
        zIndex: 9998,
        // Start invisible; first mousemove reveals it at the correct position
        opacity: 0,
        // Only transition opacity — position updates must be instant to track the cursor
        transition: 'opacity 0.1s ease',
        willChange: 'transform',
      }}
    >
      {/* Soft ambient glow — slightly more restrained than the HoverSparkle halo
          since this cursor appears over non-interactive content */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 44,
          height: 44,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(244,213,141,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* 4-pointed star — identical path, fill, and size to HoverSparkle cursor */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ display: 'block' }}
      >
        <path
          d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
          fill="#F4D58D"
          opacity="0.92"
        />
      </svg>
    </div>,
    document.body,
  )
}
