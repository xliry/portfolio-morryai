import { useEffect, useRef, useState, type PointerEvent, type RefObject } from 'react'
import { motion, useInView, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { useStudioReducedMotion } from './motion-preference'
import './immersive.css'

const worlds = [
  { name: 'Portal', number: '01', image: '/images/hero-monolith.webp', subtitle: 'Olasılıklara açılan bir kapı.', caption: 'YENİ BİR GERÇEKLİK', position: '63% 53%', alt: 'Volkanik kumulların üzerinde yeşil ışıkla aydınlatılmış dev metal portal' },
  { name: 'Otherworld', number: '02', image: '/images/surreal-landscape.webp', subtitle: 'Tanıdık olanın biraz ötesinde.', caption: 'HAYALİN COĞRAFYASI', position: '50% 55%', alt: 'Bulutlar üzerinde yüzen ve şelalelerle çevrili hayali ada' },
  { name: 'Forma', number: '03', image: '/images/editorial-poster.webp', subtitle: 'Biçim, kendi hikâyesini anlatır.', caption: 'BİÇİMİN YENİ DİLİ', position: '50% 52%', alt: 'Forma için hazırlanmış deneysel, heykelsi editoryal görsel' },
] as const

function FrameIcon({ close = false }: { close?: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={close ? 'M6 6l12 12M18 6 6 18' : 'M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

type StageProps = {
  selected: number
  onSelect: (index: number) => void
  expanded?: boolean
  onExpand?: () => void
  onClose?: () => void
  controlRef?: RefObject<HTMLButtonElement | null>
}

function ImmersiveStage({ selected, onSelect, expanded = false, onExpand, onClose, controlRef }: StageProps) {
  const reduced = useStudioReducedMotion()
  const world = worlds[selected]
  const positionX = useMotionValue(0)
  const positionY = useMotionValue(0)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const cursorX = useMotionValue(50)
  const cursorY = useMotionValue(50)
  const spring = { stiffness: 100, damping: 26, mass: 0.7 }
  const x = useSpring(positionX, spring)
  const y = useSpring(positionY, spring)
  const rotateX = useSpring(tiltX, spring)
  const rotateY = useSpring(tiltY, spring)
  const lightX = useSpring(cursorX, spring)
  const lightY = useSpring(cursorY, spring)
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${lightX}% ${lightY}%, rgba(208, 247, 149, .14), transparent 68%)`

  function resetPosition() {
    positionX.set(0); positionY.set(0); tiltX.set(0); tiltY.set(0); cursorX.set(50); cursorY.set(50)
  }

  function moveScene(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const horizontal = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5))
    const vertical = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5))
    positionX.set(horizontal * -22)
    positionY.set(vertical * -16)
    tiltX.set(vertical * -3.5)
    tiltY.set(horizontal * 3.5)
    cursorX.set((horizontal + 0.5) * 100)
    cursorY.set((vertical + 0.5) * 100)
  }

  return <div className={`immersive-stage${expanded ? ' immersive-stage-expanded' : ''}`} data-reduced={reduced} onPointerMove={moveScene} onPointerLeave={resetPosition}>
    <motion.div className="immersive-plane" style={{ x: reduced ? 0 : x, y: reduced ? 0 : y, rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }}>
      {worlds.map((scene, index) => <motion.img key={scene.name} src={scene.image} alt={selected === index ? scene.alt : ''} aria-hidden={selected !== index} className={`immersive-image immersive-image-${scene.name.toLowerCase()}`} style={{ objectPosition: scene.position }} initial={false} animate={{ opacity: selected === index ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }} loading="lazy" decoding="async" />)}
    </motion.div>
    <div className="immersive-shade" aria-hidden="true" />
    <motion.div className="immersive-light" style={{ background: reduced ? 'none' : spotlight }} aria-hidden="true" />
    <div className="immersive-grid" aria-hidden="true" />
    <span className="immersive-corner immersive-corner-tl" aria-hidden="true" />
    <span className="immersive-corner immersive-corner-tr" aria-hidden="true" />
    <span className="immersive-corner immersive-corner-bl" aria-hidden="true" />
    <span className="immersive-corner immersive-corner-br" aria-hidden="true" />
    <div className="immersive-topline">
      <span className="immersive-coordinate"><span className="tiny-dot" /> MORRYAI / IMAGINATION LAB</span>
      <button ref={controlRef} className="immersive-expand" type="button" onClick={expanded ? onClose : onExpand} aria-label={expanded ? 'Genişletilmiş deneyimi kapat' : 'Görsel deneyimi genişlet'} aria-haspopup={expanded ? undefined : 'dialog'} autoFocus={expanded}><span>{expanded ? 'Kapat' : 'Genişlet'}</span><FrameIcon close={expanded} /></button>
    </div>
    <div className="immersive-display">
      <motion.div key={world.name} className="immersive-world-copy" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}>
        <span className="immersive-world-kicker">{world.caption}</span>
        <h3>{world.name}</h3>
        <p>{world.subtitle}</p>
      </motion.div>
      <span className="immersive-orbit" aria-hidden="true"><span /><span /></span>
    </div>
    <div className="immersive-bottomline">
      <span className="immersive-instruction">{reduced ? 'BİR DÜNYA SEÇ. HAYAL ET.' : <><span className="immersive-pointer-hint">İMLECİNLE KEŞFET. </span>BİR DÜNYA SEÇ.</>}</span>
      <div className="immersive-selectors" role="group" aria-label={expanded ? 'Genişletilmiş deneyimde görsel dünya seçimi' : 'Görsel dünya seçimi'}>
        {worlds.map((scene, index) => <button key={scene.name} className={`immersive-world-button${selected === index ? ' is-selected' : ''}`} type="button" aria-pressed={selected === index} onClick={() => onSelect(index)} aria-label={`${scene.name} dünyasını keşfet`}><img src={scene.image} alt="" loading="lazy" width="56" height="42" /><span className="immersive-button-copy"><span>{scene.name}</span><span>SAHNE / {scene.number}</span></span><span className="immersive-selected-dot" aria-hidden="true" /></button>)}
      </div>
      <span className="immersive-index" aria-hidden="true">{world.number} <span>/ 03</span></span>
    </div>
    <span className="sr-only" role="status">Seçili dünya: {world.name}. {world.subtitle}</span>
  </div>
}

export default function Immersive() {
  const reduced = useStudioReducedMotion()
  const [selected, setSelected] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const expandRef = useRef<HTMLButtonElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const introVisible = useInView(introRef, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!expanded || !dialogRef.current) return
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!dialog.open) dialog.showModal()
    return () => {
      if (dialog.open) dialog.close()
      document.body.style.overflow = previousOverflow
      expandRef.current?.focus({ preventScroll: true })
    }
  }, [expanded])

  return <section id="explore" className="immersive-section section-shell" aria-labelledby="explore-heading">
    <motion.div ref={introRef} className="immersive-intro" initial={reduced ? false : { opacity: 0, y: 28 }} animate={introVisible || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }} transition={{ duration: reduced ? 0 : 0.7 }}>
      <div><span className="eyebrow section-kicker"><span className="tiny-dot" /> 03 / GÖRSEL KEŞİF</span><h2 id="explore-heading">Bir fikrin içine gir.</h2></div>
      <p>Bakış açını değiştir.<br />Bir sonraki dünyanın nasıl hissettirdiğini keşfet.</p>
    </motion.div>
    <ImmersiveStage selected={selected} onSelect={setSelected} onExpand={() => setExpanded(true)} controlRef={expandRef} />
    <div className="immersive-footnote"><span>ÜÇ DÜNYA. SINIRSIZ OLASILIK.</span><span>İNSAN HAYAL EDER. TEKNOLOJİ GÖRÜNÜR KILAR.</span></div>
    <dialog ref={dialogRef} className="immersive-dialog" aria-label="Genişletilmiş görsel deneyim" onCancel={event => { event.preventDefault(); setExpanded(false) }} onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) setExpanded(false) }}>
      {expanded && <ImmersiveStage selected={selected} onSelect={setSelected} expanded onClose={() => setExpanded(false)} />}
    </dialog>
  </section>
}
