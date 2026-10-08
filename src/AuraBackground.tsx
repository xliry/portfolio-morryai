import { useRef } from 'react'
import { useInView } from 'motion/react'
import { useStudioReducedMotion } from './motion-preference'
import './aura.css'

export default function AuraBackground({ variant }: { variant: 'studio' | 'contact' }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { amount: 0.01 })
  const reduced = useStudioReducedMotion()

  return <div ref={ref} className={`aura aura-${variant}`} data-active={visible && !reduced} data-still={reduced} aria-hidden="true">
    <span className="aura-light aura-light-one" />
    <span className="aura-light aura-light-two" />
    <span className="aura-light aura-light-three" />
  </div>
}
