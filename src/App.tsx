import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { AnimatePresence, MotionConfig, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { filters, process, projects, services, studio, type Filter, type Project } from './data'
import { MotionPreference, useStudioReducedMotion } from './motion-preference'
import { useDepth } from './depth'
import Immersive from './Immersive'

function Arrow({ diagonal = false, className = '' }: { diagonal?: boolean; className?: string }) {
  return <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function Play() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 2.5v11L13 8 4 2.5Z" /></svg>
}

function Star({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M32 0v64M0 32h64M9.4 9.4l45.2 45.2M9.4 54.6 54.6 9.4" stroke="currentColor" strokeWidth="4" /></svg>
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useStudioReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { once: true, amount: 0.18 })
  const [focused, setFocused] = useState(false)
  return <motion.div ref={ref} className={className} initial={reduced ? false : { opacity: 0, y: 42 }} animate={visible || reduced || focused ? { opacity: 1, y: 0 } : { opacity: 0, y: 42 }} onFocusCapture={() => setFocused(true)} transition={{ duration: reduced || focused ? 0 : 0.85, delay: reduced || focused ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

function ScrollHeading({ id, lines, mutedLine }: { id: string; lines: ReactNode[]; mutedLine?: number }) {
  const reduced = useStudioReducedMotion()
  const ref = useRef<HTMLHeadingElement>(null)
  const visible = useInView(ref, { once: true, amount: 0.35 })
  return <motion.h2 ref={ref} id={id} className="scroll-heading" initial={reduced ? false : 'hidden'} animate={visible || reduced ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : 0.13 } } }}>
    {lines.map((line, index) => <span className="heading-line" key={index}><motion.span className={mutedLine === index ? 'muted' : ''} variants={{ hidden: { y: '110%', rotate: 3, opacity: 0, transition: { duration: 0 } }, visible: { y: 0, rotate: 0, opacity: 1, transition: { duration: reduced ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] } } }}>{line}</motion.span></span>)}
  </motion.h2>
}

function Brand({ footer = false }: { footer?: boolean }) {
  return <a href="#top" className={`brand ${footer ? 'brand-footer' : ''}`} aria-label="morryAI Studio — ana sayfa"><img src="/brand-mark.svg" alt="" width="34" height="34" /><span>morry<span className="brand-ai">ai</span></span>{!footer && <span className="brand-studio">CREATIVE<br />STUDIO</span>}</a>
}

type ModalContent = { type: 'reel' } | { type: 'project'; project: Project }

function PortfolioDialog({ content, onClose }: { content: ModalContent | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog || !content) return
    const before = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => { dialog.close(); document.body.style.overflow = before }
  }, [content])

  if (!content) return null
  const project = content.type === 'project' ? content.project : null
  return <dialog ref={ref} className="portfolio-dialog" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }} aria-labelledby="dialog-title">
    <div className="dialog-inner">
      <div className="dialog-heading"><span className="eyebrow">{project ? 'STÜDYO SEÇKİSİ / ' + project.year : 'MORRYAI / SHOWREEL'}</span><button className="icon-button close-button" onClick={onClose} aria-label="Pencereyi kapat" autoFocus><span /><span /></button></div>
      <h2 id="dialog-title">{project ? project.title : 'Görmenin yeni yolları.'}</h2>
      {project && <p className="dialog-subtitle">{project.subtitle}</p>}
      {(!project || project.video) ? <video key={project?.id ?? 'reel'} className="dialog-video" src={project?.video ?? studio.reel} poster={project?.image ?? studio.reelPoster} controls playsInline autoPlay muted preload="metadata" /> : <img className="dialog-image" src={project.image} alt={project.alt} />}
      {project ? <div className="dialog-copy"><div><span className="eyebrow">HİKÂYE</span><p>{project.description}</p><span className="eyebrow">YAKLAŞIM</span><p>{project.approach}</p></div><div><span className="eyebrow">YARATICI ALANLAR</span><ul>{project.deliverables.map(item => <li key={item}>{item}</li>)}</ul><p className="concept-note">{project.video ? 'morryAI platform tanıtım seçkisi.' : 'morryAI stüdyo konsepti. Görsel yaklaşım araştırması.'}</p></div></div> : <p className="reel-caption">morryAI platformunun görsel üretim dünyasından kısa bir seçki. <a href={studio.platformUrl} target="_blank" rel="noreferrer">Platformu keşfet <Arrow diagonal /></a></p>}
      <a className="dialog-cta" href={`mailto:${studio.email}?subject=${encodeURIComponent(project ? `${project.title} tarzında bir proje hakkında` : 'morryAI Studio proje görüşmesi')}`}>Senin fikrini de hayata geçirelim <Arrow diagonal /></a>
    </div>
  </dialog>
}

function Hero({ onReel }: { onReel: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useStudioReducedMotion()
  const depth = useDepth(2.4)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 115])
  return <section ref={ref} className="hero" aria-labelledby="hero-heading" onPointerMove={depth.onPointerMove} onPointerLeave={depth.onPointerLeave}>
    <motion.div className="hero-art" style={{ rotateX: reduced ? 0 : depth.rotateX, rotateY: reduced ? 0 : depth.rotateY, transformPerspective: 1600 }}><motion.img style={{ y }} src="/images/hero-monolith.webp" alt="Volkanik kumullar içinde ince yeşil ışıkla aydınlatılmış heykelsi metal portal" width="1586" height="992" fetchPriority="high" /><div className="hero-art-shade" /><motion.div className="hero-depth-light" style={{ background: reduced ? 'none' : depth.light }} /><span className="art-coordinate">EXPLORING NEW REALITIES / 001</span><div className="art-label"><span className="tiny-dot" /> HUMAN IMAGINATION.<br /><span>ARTIFICIAL POSSIBILITIES.</span></div><div className="art-corner corner-top" /><div className="art-corner corner-bottom" /></motion.div>
    <div className="hero-content">
      <motion.div className="hero-eyebrow eyebrow" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}><span className="tiny-dot" /> YARATICILIĞIN YENİ FREKANSI</motion.div>
      <h1 id="hero-heading">{studio.headline.map((line, index) => <span className="line-mask" key={line}><motion.span className={index === 1 ? 'headline-accent' : ''} initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.12 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span></span>)}</h1>
      <motion.p className="hero-description" initial={reduced ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>{studio.introduction}</motion.p>
      <motion.div className="hero-actions" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.7 }}><a href="#works" className="button button-lime">Çalışmaları keşfet <Arrow diagonal /></a><button className="reel-button" onClick={onReel}><span className="play-circle"><Play /></span><span>Showreel izle<span className="reel-hint">Görsel üretim seçkisi</span></span></button></motion.div>
    </div>
    <div className="hero-bottom"><span>BAĞIMSIZ BİR AI CREATIVE STUDIO</span><a href="#works">KEŞFETMEYE DEVAM ET <span className="scroll-arrow">↓</span></a><span className="hero-bottom-right">FİKİRDEN ETKİYE. <Star /></span></div>
  </section>
}

function ProjectCard({ project, index, order, onOpen }: { project: Project; index: number; order: number; onOpen: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useStudioReducedMotion()
  const depth = useDepth(3.5)
  const visible = useInView(ref, { once: true, amount: 0.14, margin: '0px 0px -30px 0px' })
  const [focused, setFocused] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  return <motion.article ref={ref} className={`project-card project-${project.id}`} initial={reduced ? false : 'hidden'} animate={visible || focused || reduced ? 'visible' : 'hidden'} variants={{ hidden: { opacity: 0, y: 72, scale: 0.965 }, visible: { opacity: 1, y: 0, scale: 1 } }} exit={{ opacity: 0, scale: 0.98, transition: { duration: reduced ? 0 : 0.2 } }} transition={{ duration: focused || reduced ? 0 : 0.85, delay: focused || reduced ? 0 : (order % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }} onFocusCapture={() => setFocused(true)}>
    <motion.button className="project-image-button" onClick={onOpen} aria-label={`${project.title} projesini incele`} style={{ ...({ '--project-color': project.color } as CSSProperties), rotateX: reduced ? 0 : depth.rotateX, rotateY: reduced ? 0 : depth.rotateY, transformPerspective: 1100 }} onPointerMove={depth.onPointerMove} onPointerLeave={depth.onPointerLeave}>
      <motion.div className="project-image-parallax" style={{ y: reduced ? 0 : imageY }}><img src={project.image} alt={project.alt} width="900" height="1125" loading="lazy" decoding="async" /></motion.div>
      <div className="project-image-shade" />
      <motion.div className="card-depth-light" style={{ background: reduced ? 'none' : depth.light }} />
      <span className="project-badge">{project.video ? <><Play /> MOTION SEÇKİSİ</> : 'STÜDYO KONSEPTİ'}</span>
      <span className="project-number">0{index + 1} / {project.year}</span>
      {project.wordmark && <span className="project-wordmark">{project.wordmark}</span>}
      {project.video && <span className="project-video-play"><Play /></span>}
      <span className="project-open"><span>İNCELE</span><Arrow diagonal /></span>
    </motion.button>
    <div className="project-meta"><div><h3><button onClick={onOpen}>{project.title} <span>— {project.subtitle}</span></button></h3><p>{project.discipline}</p></div><span className="meta-arrow"><Arrow diagonal /></span></div>
  </motion.article>
}

function Works({ onProject }: { onProject: (project: Project) => void }) {
  const [filter, setFilter] = useState<Filter>('Tümü')
  const selected = projects.filter(project => filter === 'Tümü' || project.category === filter)
  return <section id="works" className="works section-shell" aria-labelledby="works-heading">
    <div className="section-intro"><div><Reveal><span className="eyebrow section-kicker"><span className="tiny-dot" /> 01 / SEÇİLİ ÇALIŞMALAR</span></Reveal><ScrollHeading id="works-heading" lines={['Fikirler konuşsun.', 'İşler anlatsın.']} mutedLine={1} /></div><Reveal delay={0.15}><p>Her iş, yeni bir dünya.<br />Görsel araştırmalarımızdan ve<br className="desktop-break" /> hareketli hikâyelerimizden bir seçki.</p></Reveal></div>
    <Reveal className="work-toolbar"><div className="filters" aria-label="Çalışma kategorileri">{filters.map(item => <button key={item} className={filter === item ? 'active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}<span>{item === 'Tümü' ? projects.length : projects.filter(project => project.category === item).length}</span></button>)}</div><span className="selection-note">STÜDYO SEÇKİSİ / 2026</span></Reveal>
    <div className="sr-only" aria-live="polite">{selected.length} çalışma gösteriliyor.</div>
    <div className="project-grid"><AnimatePresence>{selected.map((project, order) => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} order={order} onOpen={() => onProject(project)} />)}</AnimatePresence></div>
    <div className="works-footnote"><span>MERAKTAN DOĞAN, HAYAL GÜCÜYLE BÜYÜYEN İŞLER.</span><a href={studio.platformUrl} target="_blank" rel="noreferrer">morryAI dünyasını keşfet <Arrow diagonal /></a></div>
  </section>
}

function Studio() {
  return <section id="studio" className="studio-section section-shell" aria-labelledby="studio-heading">
    <Reveal className="studio-top"><span className="eyebrow section-kicker"><span className="tiny-dot" /> 02 / STÜDYO</span><span className="studio-top-note">HUMAN-LED. AI-POWERED.</span></Reveal>
    <div className="studio-statement"><ScrollHeading id="studio-heading" lines={['İyi fikirlerin', <>sınırı yok.<span className="statement-spark"><Star /></span></>]} /><Reveal delay={0.15} className="studio-description"><p>Biz hayal gücünü teknolojiyle buluşturan yaratıcı bir stüdyoyuz.</p><p>Yapay zekâ bizim için bir araç. Asıl mesele; doğru fikri bulmak, kendine ait bir dünya kurmak ve hissedilen işler üretmek.</p><a href={`mailto:${studio.email}`} className="text-link">Birlikte neler yapabiliriz? <Arrow diagonal /></a></Reveal></div>
    <div className="services">{services.map((service, index) => <Reveal key={service.number} delay={index * 0.1} className="service-card"><span className="service-number">/{service.number}</span><div className="service-title"><h3>{service.title}</h3><Arrow diagonal /></div><p>{service.text}</p><div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></Reveal>)}</div>
  </section>
}

function Process() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useStudioReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 50%'] })
  const flow = useSpring(scrollYProgress, { stiffness: 90, damping: 28 })
  return <section ref={ref} id="approach" className="process-section section-shell" aria-labelledby="process-heading">
    <div className="section-intro"><div><Reveal><span className="eyebrow section-kicker"><span className="tiny-dot" /> 04 / YAKLAŞIM</span></Reveal><ScrollHeading id="process-heading" lines={['Karmaşık teknoloji.', 'Yalın bir süreç.']} mutedLine={1} /></div><Reveal delay={0.15}><p>Bir fikirle başlıyoruz.<br />Birlikte, daha ötesine gidiyoruz.</p></Reveal></div>
    <div className="process-flow" aria-hidden="true"><motion.span style={{ scaleX: reduced ? 1 : flow }} /></div>
    <div className="process-grid">{process.map((step, index) => <Reveal key={step.title} delay={index * 0.12} className="process-step"><div className="process-step-top"><span>0{index + 1}</span>{index < process.length - 1 ? <Arrow /> : <Star />}</div><h3>{step.title}</h3><p>{step.text}</p></Reveal>)}</div>
  </section>
}

function Footer() {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(studio.email)
      setCopied(true); setCopyError(false)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2500)
    } catch { setCopyError(true) }
  }
  return <footer id="contact" className="footer section-shell">
    <Reveal className="contact-top"><span className="eyebrow section-kicker"><span className="tiny-dot" /> SIRADAKİ HİKÂYE SENİN OLSUN.</span><span className="contact-note">BÜYÜK FİKİRLERE HER ZAMAN YER VAR.</span></Reveal>
    <a className="contact-heading" href={`mailto:${studio.email}?subject=${encodeURIComponent('morryAI Studio — yeni bir fikir')}`}><ScrollHeading id="contact-heading" lines={['Aklında bir', <span className="contact-line-accent">fikir mi var?</span>]} /><Reveal delay={0.25}><span className="contact-arrow"><Arrow diagonal /></span></Reveal></a>
    <div className="contact-row"><a href={`mailto:${studio.email}`} className="contact-email">{studio.email}</a><button className="copy-button" onClick={copyEmail} aria-label="E-posta adresini kopyala">{copied ? 'Kopyalandı ✓' : 'Adresi kopyala'}{!copied && <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M15 8V4H4v11h4" stroke="currentColor" strokeWidth="1.5" /></svg>}</button><span role="status" className="copy-status">{copyError ? 'Adresi seçerek kopyalayabilirsin.' : copied ? 'E-posta adresi kopyalandı.' : ''}</span></div>
    <div className="footer-bottom"><Brand footer /><span>© {new Date().getFullYear()} MORRYAI STUDIO</span><a href={studio.platformUrl} target="_blank" rel="noreferrer">morryAI platformu <Arrow diagonal /></a><a href="#top" className="back-top">Başa dön ↑</a></div>
    <div className="footer-wordmark" aria-hidden="true">morryai</div>
  </footer>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState<ModalContent | null>(null)
  const { scrollYProgress } = useScroll()
  const systemReduced = useReducedMotion()
  const [motionPreference, setMotionPreference] = useState<'system' | 'full' | 'reduced'>(() => {
    try {
      const saved = localStorage.getItem('morry-studio-motion')
      return saved === 'full' || saved === 'reduced' ? saved : 'system'
    } catch { return 'system' }
  })
  const reduced = motionPreference === 'reduced' || (motionPreference === 'system' && !!systemReduced)
  function toggleMotion() {
    const next = reduced ? 'full' : 'reduced'
    setMotionPreference(next)
    try { localStorage.setItem('morry-studio-motion', next) } catch { /* The preference works for this session without storage. */ }
  }
  const navRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!menuOpen) return
    function dismiss(event: KeyboardEvent) { if (event.key === 'Escape') setMenuOpen(false) }
    function outside(event: PointerEvent) { if (navRef.current && !navRef.current.contains(event.target as Node)) setMenuOpen(false) }
    document.addEventListener('keydown', dismiss); document.addEventListener('pointerdown', outside)
    return () => { document.removeEventListener('keydown', dismiss); document.removeEventListener('pointerdown', outside) }
  }, [menuOpen])
  return <MotionPreference.Provider value={reduced}><MotionConfig reducedMotion={reduced ? 'always' : 'never'}><div id="top" className="site" data-motion={reduced ? 'reduced' : 'full'}>
    <a className="skip-link" href="#main">İçeriğe geç</a>
    <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
    <header className="header"><Brand /><div className="header-navigation" ref={navRef}><button className={`mobile-menu-button ${menuOpen ? 'is-open' : ''}`} aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button><nav id="main-nav" className={menuOpen ? 'nav open' : 'nav'} aria-label="Ana menü"><a href="#works" onClick={() => setMenuOpen(false)}>Çalışmalar<span>01</span></a><a href="#studio" onClick={() => setMenuOpen(false)}>Stüdyo<span>02</span></a><a href="#explore" onClick={() => setMenuOpen(false)}>Keşif<span>03</span></a><a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>Birlikte üretelim <Arrow diagonal /></a></nav><button className="motion-toggle" aria-pressed={!reduced} aria-label={reduced ? 'Animasyonları aç' : 'Animasyonları kapat'} title={reduced ? 'Animasyonları aç' : 'Animasyonları kapat'} onClick={toggleMotion}>{reduced ? <Play /> : <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M2 1h2.5v10H2zm5.5 0H10v10H7.5z" /></svg>}</button></div></header>
    <main id="main"><Hero onReel={() => setModal({ type: 'reel' })} /><div className="marquee" aria-hidden="true"><div className={reduced ? 'marquee-track reduced' : 'marquee-track'}>{[0, 1, 2, 3].map(item => <span className="marquee-group" key={item}>IMAGINATION FIRST <Star /> TECHNOLOGY NEXT <Star /> IMPACT ALWAYS <Star /></span>)}</div></div><Works onProject={project => setModal({ type: 'project', project })} /><Studio /><Immersive /><Process /></main>
    <Footer /><PortfolioDialog content={modal} onClose={() => setModal(null)} />
  </div></MotionConfig></MotionPreference.Provider>
}
