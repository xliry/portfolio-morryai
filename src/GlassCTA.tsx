import { useRef, type ReactNode } from 'react'
import { useInView } from 'motion/react'
import { useStudioReducedMotion } from './motion-preference'
import './glass-cta.css'

type GlassCTAProps = {
  href: string
  children: ReactNode
  icon: ReactNode
  className?: string
  onClick?: () => void
}

export default function GlassCTA({ href, children, icon, className = '', onClick }: GlassCTAProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const visible = useInView(ref, { amount: 0.2 })
  const reduced = useStudioReducedMotion()

  return <a ref={ref} href={href} className={`glass-cta ${className}`} onClick={onClick} data-active={visible && !reduced}>
    <span className="glass-cta-glow" aria-hidden="true" />
    <span className="glass-cta-label">{children}</span>
    <span className="glass-cta-icon" aria-hidden="true">{icon}</span>
  </a>
}
