import type { PointerEvent } from 'react'
import { useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { useStudioReducedMotion } from './motion-preference'

export function useDepth(strength = 4) {
  const reduced = useStudioReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const lightX = useMotionValue(50)
  const lightY = useMotionValue(50)
  const rotateX = useSpring(x, { stiffness: 170, damping: 28 })
  const rotateY = useSpring(y, { stiffness: 170, damping: 28 })
  const light = useMotionTemplate`radial-gradient(380px circle at ${lightX}% ${lightY}%, rgb(var(--accent-rgb) / .17), transparent 70%)`

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const pointerX = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width))
    const pointerY = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height))
    x.set((0.5 - pointerY) * strength * 2)
    y.set((pointerX - 0.5) * strength * 2)
    lightX.set(pointerX * 100)
    lightY.set(pointerY * 100)
  }

  function onPointerLeave() {
    x.set(0); y.set(0)
    lightX.set(50); lightY.set(50)
  }

  return { reduced, rotateX, rotateY, light, onPointerMove, onPointerLeave }
}
