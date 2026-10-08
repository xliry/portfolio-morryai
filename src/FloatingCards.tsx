import { useRef, type ReactNode } from 'react'
import { motion, useInView, useTransform, type MotionValue } from 'motion/react'
import { useStudioReducedMotion } from './motion-preference'
import './floating-cards.css'

function CardArrow() {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 15 15 5M5 5h10v10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function FloatingCard({ className, children, href, onClick, label, rotateX, rotateY }: {
  className: string
  children: ReactNode
  href?: string
  onClick?: () => void
  label: string
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { amount: 0.15 })
  const reduced = useStudioReducedMotion()
  const x = useTransform(rotateY, value => value * 2)
  const y = useTransform(rotateX, value => value * -1.5)
  const content = <>{children}<span className="floating-card-arrow"><CardArrow /></span></>

  return <motion.div ref={ref} className={`floating-card-slot ${className}`} style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }} data-active={visible && !reduced}>
    <div className="floating-card-float">
      {href ? <a className="floating-card" href={href} aria-label={label}>{content}</a> : <button className="floating-card" onClick={onClick} aria-label={label}>{content}</button>}
    </div>
  </motion.div>
}

export default function FloatingCards({ rotateX, rotateY, onReel }: {
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  onReel: () => void
}) {
  const depth = { rotateX, rotateY }

  return <aside className="floating-cards" aria-label="Stüdyodan kısa yollar">
    <FloatingCard className="floating-visual" label="Görsel dünya — Işık. Doku. His. Görsel dünyaları keşfet." href="#explore" {...depth}>
      <div className="floating-visual-preview" aria-hidden="true"><img src="/images/editorial-poster.webp" alt="" width="900" height="1125" /><span>FORMA / 01</span></div>
      <span className="floating-card-kicker">GÖRSEL DÜNYA</span>
      <span className="floating-card-title">Işık. Doku. His.</span>
    </FloatingCard>
    <FloatingCard className="floating-motion" label="Motion seçkisi — Fikirler hareketlenir. Seçkiyi izle." onClick={onReel} {...depth}>
      <div className="floating-wave" aria-hidden="true">{Array.from({ length: 13 }, (_, index) => <span key={index} />)}<span className="floating-play"><svg viewBox="0 0 16 16" fill="currentColor"><path d="m5 3 8 5-8 5V3Z" /></svg></span></div>
      <span className="floating-card-kicker">MOTION SEÇKİSİ</span>
      <span className="floating-card-title">Fikirler hareketlenir.</span>
    </FloatingCard>
    <FloatingCard className="floating-process" label="Fikirden forma — Birlikte şekillenir. Yaratıcı sürecimizi keşfet." href="#approach" {...depth}>
      <span className="floating-card-kicker">FİKİRDEN FORMA</span>
      <span className="floating-card-title">Birlikte şekillenir.</span>
      <div className="floating-process-flow" aria-hidden="true"><span>Fikir</span><i>→</i><span>Dünya</span><i>→</i><span>İz</span></div>
    </FloatingCard>
  </aside>
}
