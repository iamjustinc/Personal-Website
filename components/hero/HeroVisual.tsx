'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { EASING } from '@/lib/motion'
import { WatermarkStar } from '@/components/ui/WatermarkStar'
import { StarMark } from '@/components/ui/StarMark'
import { siteConfig } from '@/data/site'

export function HeroVisual() {
  const shouldReduce = useReducedMotion()
  const panels = siteConfig.heroFloatingPanels ?? []

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, delay: 0.45, ease: EASING }}
      className="relative flex flex-col items-center"
    >
      <div className="relative flex items-center justify-center" style={{ width: 380, height: 420 }}>
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: 440,
            height: 440,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(15,122,122,0.20) 0%, rgba(15,122,122,0.06) 40%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <WatermarkStar size={340} color="#0F7A7A" direction={1} duration={90} opacity={0.07} />
        </div>

        <div
          aria-hidden
          className="absolute pointer-events-none halo-spin"
          style={{
            width: 340,
            height: 340,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <svg width="340" height="340" viewBox="0 0 340 340" fill="none">
            <circle
              cx="170"
              cy="170"
              r="166"
              stroke="rgba(15,122,122,0.20)"
              strokeWidth="1"
              strokeDasharray="4 12"
            />
          </svg>
        </div>

        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: 304,
            height: 304,
            borderRadius: '50%',
            border: '1px solid rgba(196,151,74,0.16)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {siteConfig.portraitSrc && (
          <div
            className="portrait-float relative"
            style={{ width: 272, height: 272, zIndex: 10 }}
          >
            <div
              className="portrait-glow"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Image
                src={siteConfig.portraitSrc}
                alt="Justin Chang"
                fill
                sizes="272px"
                className="object-cover object-top"
                priority
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(160deg, rgba(15,122,122,0.08) 0%, transparent 60%, rgba(10,22,40,0.15) 100%)',
                  borderRadius: '50%',
                }}
              />
            </div>
          </div>
        )}

        {/* Main gold satellite with faint glowing trail */}
        <motion.div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: 328,
            height: 328,
            top: '50%',
            left: '50%',
            marginLeft: -164,
            marginTop: -164,
            zIndex: 20,
          }}
          animate={shouldReduce ? {} : { rotate: 360 }}
          transition={
            shouldReduce
              ? {}
              : {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }
          }
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 18,
              height: 18,
              marginLeft: -9,
              marginTop: -9,
              transform: 'rotate(132deg) translateY(-164px)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 44,
                height: 10,
                transform: 'translate(-88%, -50%)',
                borderRadius: 999,
                background:
                  'linear-gradient(90deg, rgba(196,151,74,0.0) 0%, rgba(196,151,74,0.10) 28%, rgba(196,151,74,0.22) 55%, rgba(196,151,74,0.0) 100%)',
                filter: 'blur(4px)',
                opacity: 0.7,
              }}
            />

            <motion.div
              animate={shouldReduce ? {} : { scale: [1, 1.08, 1], y: [0, -1.5, 0] }}
              transition={
                shouldReduce
                  ? {}
                  : {
                      duration: 2.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              style={{
                position: 'relative',
                width: 18,
                height: 18,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 32% 30%, #FFF5D9 0%, #E2BC69 34%, #C4974A 68%, #8E6320 100%)',
                boxShadow:
                  '0 0 10px rgba(196,151,74,0.55), 0 0 22px rgba(196,151,74,0.22), inset -2px -2px 4px rgba(0,0,0,0.18), inset 1px 1px 2px rgba(255,255,255,0.4)',
              }}
            />
          </div>
        </motion.div>

        {/* Small teal satellite */}
        <motion.div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: 296,
            height: 296,
            top: '50%',
            left: '50%',
            marginLeft: -148,
            marginTop: -148,
            zIndex: 19,
          }}
          animate={shouldReduce ? {} : { rotate: -360 }}
          transition={
            shouldReduce
              ? {}
              : {
                  duration: 28,
                  repeat: Infinity,
                  ease: 'linear',
                }
          }
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 10,
              height: 10,
              marginLeft: -5,
              marginTop: -5,
              transform: 'rotate(36deg) translateY(-148px)',
            }}
          >
            <motion.div
              animate={shouldReduce ? {} : { scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
              transition={
                shouldReduce
                  ? {}
                  : {
                      duration: 3.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 35% 35%, #D9FCFF 0%, #71D5E4 40%, #4A9FAE 75%, #1C5B68 100%)',
                boxShadow:
                  '0 0 8px rgba(74,159,174,0.55), 0 0 18px rgba(74,159,174,0.18), inset -1px -1px 2px rgba(0,0,0,0.18), inset 1px 1px 2px rgba(255,255,255,0.35)',
              }}
            />
          </div>
        </motion.div>

        {/* Tiny aqua sparkle */}
        <motion.div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: 350,
            height: 350,
            top: '50%',
            left: '50%',
            marginLeft: -175,
            marginTop: -175,
            zIndex: 18,
          }}
          animate={shouldReduce ? {} : { rotate: 360 }}
          transition={
            shouldReduce
              ? {}
              : {
                  duration: 34,
                  repeat: Infinity,
                  ease: 'linear',
                }
          }
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 6,
              height: 6,
              marginLeft: -3,
              marginTop: -3,
              transform: 'rotate(248deg) translateY(-175px)',
            }}
          >
            <motion.div
              animate={shouldReduce ? {} : { scale: [1, 1.35, 1], opacity: [0.35, 0.9, 0.35] }}
              transition={
                shouldReduce
                  ? {}
                  : {
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#7EE7F2',
                boxShadow: '0 0 10px rgba(126,231,242,0.45), 0 0 20px rgba(126,231,242,0.18)',
              }}
            />
          </div>
        </motion.div>

        {/* Tiny gold sparkle */}
        <motion.div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: 312,
            height: 312,
            top: '50%',
            left: '50%',
            marginLeft: -156,
            marginTop: -156,
            zIndex: 18,
          }}
          animate={shouldReduce ? {} : { rotate: -360 }}
          transition={
            shouldReduce
              ? {}
              : {
                  duration: 24,
                  repeat: Infinity,
                  ease: 'linear',
                }
          }
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 5,
              height: 5,
              marginLeft: -2.5,
              marginTop: -2.5,
              transform: 'rotate(310deg) translateY(-156px)',
            }}
          >
            <motion.div
              animate={shouldReduce ? {} : { scale: [1, 1.4, 1], opacity: [0.3, 0.85, 0.3] }}
              transition={
                shouldReduce
                  ? {}
                  : {
                      duration: 2.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.6,
                    }
              }
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#E6C06C',
                boxShadow: '0 0 8px rgba(196,151,74,0.45), 0 0 16px rgba(196,151,74,0.16)',
              }}
            />
          </div>
        </motion.div>

        {/* Orbital star marks */}
        <motion.div
          aria-hidden
          animate={shouldReduce ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: 28, right: 24, zIndex: 20 }}
        >
          <StarMark size="sm" color="#4A9FAE" className="opacity-70" />
        </motion.div>

        <motion.div
          aria-hidden
          animate={shouldReduce ? {} : { y: [0, 4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          style={{ position: 'absolute', left: 10, top: '48%', zIndex: 20 }}
        >
          <StarMark size="xs" color="#C4974A" className="opacity-55" />
        </motion.div>

        <motion.div
          aria-hidden
          animate={shouldReduce ? {} : { y: [0, -3, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          style={{ position: 'absolute', bottom: 34, left: 30, zIndex: 20 }}
        >
          <StarMark size="xs" color="#4A9FAE" className="opacity-40" />
        </motion.div>

        <div
          aria-hidden
          style={{ position: 'absolute', top: 36, left: 36, zIndex: 20 }}
        >
          <StarMark size="xs" color="#4A9FAE" className="opacity-25" />
        </div>
      </div>

      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: EASING }}
        className="flex items-center gap-2 mt-1"
      >
        {panels.slice(0, 3).map((panel) => (
          <div
            key={panel.slug}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{
              background: 'rgba(13,30,53,0.75)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${panel.accentColor}30`,
            }}
          >
            <div
              className="w-[6px] h-[6px] rounded-full shrink-0"
              style={{ background: panel.accentColor, boxShadow: `0 0 5px ${panel.accentColor}80` }}
            />
            <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
              {panel.projectName}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={shouldReduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1, ease: EASING }}
        className="mt-3 flex items-center gap-1.5"
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: '#4A9FAE', boxShadow: '0 0 6px rgba(74,159,174,0.8)' }}
        />
        <span className="font-mono text-[15px] uppercase tracking-wider text-text-muted">
          Open to opportunities!
        </span>
      </motion.div>
    </motion.div>
  )
}
