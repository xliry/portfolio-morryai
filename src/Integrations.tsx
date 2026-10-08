import { useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { creativeFields, integrations, type CreativeField, type Integration } from './integrations-data'
import { studio } from './data'
import { useStudioReducedMotion } from './motion-preference'
import './integrations.css'

function matchesField(integration: Integration, field: CreativeField) {
  return field === 'Tümü' || integration.fields.some(item => item === field)
}

function ProviderIcon({ integration }: { integration: Integration }) {
  return <span className={`integration-icon integration-icon-${integration.id}`} aria-hidden="true">
    {integration.id === 'gemini' ? <svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 2C18.3 10.5 21.5 13.7 30 16c-8.5 2.3-11.7 5.5-14 14C13.7 21.5 10.5 18.3 2 16 10.5 13.7 13.7 10.5 16 2Z" /></svg>
      : integration.id === 'wavespeed' ? <svg viewBox="0 0 32 32" fill="none"><path d="M3 12c4-11 7 19 12 5S24 8 29 14M3 21c4-11 7 19 12 5s9-18 14-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      : integration.id === 'higgsfield' ? <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.6" /><ellipse cx="16" cy="16" rx="4" ry="13" transform="rotate(45 16 16)" stroke="currentColor" strokeWidth="1.6" /></svg>
      : integration.monogram}
  </span>
}

export default function Integrations() {
  const reduced = useStudioReducedMotion()
  const introRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const introSeen = useInView(introRef, { once: true, amount: 0.2 })
  const stageSeen = useInView(stageRef, { once: true, amount: 0.15 })
  const stageVisible = useInView(stageRef, { amount: 0.1 })
  const [focused, setFocused] = useState(false)
  const [field, setField] = useState<CreativeField>('Tümü')
  const [selectedId, setSelectedId] = useState<Integration['id']>('gemini')
  const selected = integrations.find(item => item.id === selectedId) ?? integrations[0]
  const shown = stageSeen || focused || reduced

  function chooseField(next: CreativeField) {
    setField(next)
    if (!matchesField(selected, next)) setSelectedId(integrations.find(item => matchesField(item, next))!.id)
  }

  return <section id="integrations" className="integrations-section section-shell" aria-labelledby="integrations-heading">
    <motion.div ref={introRef} className="integrations-intro" initial={reduced ? false : { opacity: 0, y: 28 }} animate={introSeen || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }} transition={{ duration: reduced ? 0 : 0.7 }}>
      <span className="eyebrow section-kicker"><span className="tiny-dot" /> 04 / ÜRETİM EKOSİSTEMİ</span>
      <h2 id="integrations-heading">Farklı teknolojiler.<br /><span>Tek yaratıcı akış.</span></h2>
      <p>Fikrine alan açan araçlar, aynı dünyada buluşuyor.<br />morryAI platformunun görsel ve video üretim ekosistemi.</p>
    </motion.div>
    <div className="integration-fields" role="group" aria-label="Yaratıcı alanı seç">
      {creativeFields.map(item => <button key={item} aria-pressed={field === item} onClick={() => chooseField(item)}>{item}<span>{item === 'Tümü' ? '05' : item === 'Görsel' ? '03' : '04'}</span></button>)}
    </div>
    <div ref={stageRef} className="integrations-stage" data-active={stageVisible && !reduced} onFocusCapture={() => setFocused(true)}>
      <div className="integration-grid" aria-hidden="true" />
      <div className="integration-halo" aria-hidden="true" />
      <div className="integration-stage-label" aria-hidden="true"><span>CREATIVE STACK / MORRYAI</span><span>IDEAS IN MOTION.</span></div>
      <svg className="integration-connections" viewBox="0 0 1000 560" preserveAspectRatio="none" fill="none" aria-hidden="true">
        {integrations.map((item, index) => <g key={item.id} className={`integration-route${selected.id === item.id ? ' is-selected' : ''}${matchesField(item, field) ? '' : ' is-muted'}`} style={{ '--node-color': item.color, '--beam-delay': `${index * -0.9}s` } as CSSProperties}>
          <motion.path className="integration-route-track" d={item.path} vectorEffect="non-scaling-stroke" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: shown ? 1 : 0 }} transition={{ duration: reduced ? 0 : 1.25, delay: reduced ? 0 : index * 0.1 }} />
          <path className="integration-route-beam" d={item.path} pathLength="100" strokeDasharray="5 95" vectorEffect="non-scaling-stroke" />
        </g>)}
      </svg>
      <motion.div className="integration-hub" initial={reduced ? false : { opacity: 0, scale: 0.85 }} animate={shown ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }} transition={{ duration: reduced ? 0 : 0.8 }}>
        <div className="integration-hub-orbit" aria-hidden="true" />
        <div className="integration-hub-core"><img src="/brand-mark.svg" alt="" width="44" height="44" /><span>morry<span>ai</span></span><span className="integration-hub-caption">IMAGINATION, CONNECTED.</span></div>
      </motion.div>
      <div className="integration-providers" role="group" aria-label="Entegrasyon seçimi">
        {integrations.map((item, index) => <motion.div key={item.id} className={`integration-node integration-node-${item.position}`} style={{ '--node-color': item.color } as CSSProperties} initial={reduced ? false : { opacity: 0, y: 22 }} animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} transition={{ duration: reduced || focused ? 0 : 0.65, delay: reduced || focused ? 0 : 0.2 + index * 0.09 }}>
          <div className="integration-node-float"><button className="integration-provider" aria-pressed={selected.id === item.id} aria-controls="integration-detail" disabled={!matchesField(item, field)} onClick={() => setSelectedId(item.id)}>
            <ProviderIcon integration={item} />
            <span className="integration-provider-copy"><span className="integration-provider-name">{item.name}</span><span className="integration-provider-caption">{item.caption}</span></span>
            <span className="integration-provider-arrow" aria-hidden="true">↗</span>
          </button></div>
        </motion.div>)}
      </div>
      <div className="integration-stage-footnote" aria-hidden="true"><span>İNSANIN HAYAL GÜCÜ.</span><span>TEKNOLOJİNİN OLASILIKLARI.</span></div>
    </div>
    <div id="integration-detail" className="integration-detail">
      <div className="integration-detail-live" aria-live="polite" aria-atomic="true"><AnimatePresence mode="wait" initial={false}><motion.div key={selected.id} className="integration-detail-copy" initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: reduced ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.18 }}>
        <span className="integration-detail-name">{selected.name}<span>{selected.tags.join(' / ')}</span></span><p>{selected.description}</p>
      </motion.div></AnimatePresence></div>
      <a href={studio.platformUrl} target="_blank" rel="noreferrer" className="integration-platform-link">morryAI platformunu keşfet <span aria-hidden="true">↗</span></a>
    </div>
  </section>
}
