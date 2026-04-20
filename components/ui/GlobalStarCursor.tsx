'use client'

/**
 * GlobalStarCursor
 *
 * Renders the same 4-pointed star cursor site-wide on fine-pointer (mouse/trackpad)
 * devices. When the pointer enters a [data-hover-sparkle] zone, this cursor hides
 * and defers to HoverSparkle's own cursor + trail system. On inputs/textareas/selects
 * the native cursor is restored.
 *
 * PERF: Hot-path work is DOM mutation only with no React state or re-renders
 * after activation. Pointer movement is coalesced through requestAnimationFrame.
 *
 * Position: written directly to style.transform once per animation frame.
 * Visibility: only re-evaluated when e.target changes (skips closest() traversal
 *             for every pixel of movement within the same element).
 * Opacity:   only written to the DOM when the value actually changes.
 */

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export function GlobalStarCursor() {
  const [enabled, setEnabled] = useState(false)
  const cursorRef    = useRef<HTMLDivElement>(null)
  // Cached state for the visibility optimisation avoids DOM traversal and
  // style writes when neither the hovered element nor the hidden state changes.
  const lastTargetRef = useRef<EventTarget | null>(null)
  const isHiddenRef   = useRef(true) // start hidden until first mousemove
  const rafRef        = useRef<number | null>(null)
  const pointRef      = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)')
    const motionQuery  = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () => {
      setEnabled(pointerQuery.matches && !motionQuery.matches)
    }

    update()
    pointerQuery.addEventListener('change', update)
    motionQuery.addEventListener('change', update)

    return () => {
      pointerQuery.removeEventListener('change', update)
      motionQuery.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    // Suppress native cursor globally; restore on text inputs so the
    // beam cursor still appears there (the custom cursor also hides itself
    // on inputs; see onMove below).
    const style = document.createElement('style')
    style.dataset.globalStarCursor = '1'
    style.textContent = [
      '* { cursor: none !important; }',
      'input, textarea, select { cursor: auto !important; }',
    ].join(' ')
    document.head.appendChild(style)

    const flushCursor = () => {
      rafRef.current = null
      const el = cursorRef.current
      if (!el) return

      const { x, y } = pointRef.current
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }

    const onMove = (e: MouseEvent) => {
      const el = cursorRef.current
      if (!el) return

      // ── Position ──────────────────────────────────────────────────────────
      // Coalesce high-frequency mousemove events into one compositor-friendly
      // transform write per animation frame.
      pointRef.current.x = e.clientX
      pointRef.current.y = e.clientY
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(flushCursor)
      }

      // ── Visibility ────────────────────────────────────────────────────────
      // Only re-check when the hovered element changes. Moving within the same
      // element does not alter zone membership, so closest() is skipped entirely.
      if (e.target !== lastTargetRef.current) {
        lastTargetRef.current = e.target

        const target = e.target as Element | null
        const shouldHide =
          !!target?.closest('[data-hover-sparkle]') ||
          !!target?.closest('input, textarea, select, [contenteditable="true"]')

        // Only write style.opacity when the value actually changes, preventing
        // redundant style system work on every mousemove within a zone.
        if (shouldHide !== isHiddenRef.current) {
          isHiddenRef.current    = shouldHide
          el.style.opacity = shouldHide ? '0' : '1'
        }
      }
    }

    const onLeave = () => {
      const el = cursorRef.current
      if (!el) return
      if (!isHiddenRef.current) {
        isHiddenRef.current  = true
        el.style.opacity = '0'
      }
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      lastTargetRef.current = null
      isHiddenRef.current = true
      style.remove()
    }
  }, [enabled])

  if (!enabled) return null

  return createPortal(
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        pointerEvents: 'none',
        // Sit just below HoverSparkle's z-[9999]. They are never simultaneously
        // visible, but this ensures correct layering if timing ever overlaps.
        zIndex:        9998,
        // Start invisible; first mousemove reveals it at the correct position
        opacity:       0,
        // Only transition opacity. Position updates must be instant to track the cursor
        transition:    'opacity 0.1s ease',
        willChange:    'transform',
      }}
    >
      {/* Soft ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position:     'absolute',
          width:        44,
          height:       44,
          top:          '50%',
          left:         '50%',
          transform:    'translate(-50%, -50%)',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(244,213,141,0.15) 0%, transparent 70%)',
          pointerEvents:'none',
        }}
      />

      {/* 4-pointed star with identical path, fill, and size to HoverSparkle cursor */}
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
