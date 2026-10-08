import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const configuredUrl = loadEnv(mode, '.', 'SITE_').SITE_URL
  const site = configuredUrl ? new URL(configuredUrl) : null
  if (site && !['https:', 'http:'].includes(site.protocol)) throw new Error('SITE_URL bir http veya https adresi olmalı.')
  return {
    plugins: [react(), {
      name: 'portfolio-site-metadata',
      transformIndexHtml(html) {
        if (!site) return html
        return {
          html: html.replace('content="/images/hero-monolith.webp"', `content="${site.origin}/images/hero-monolith.webp"`),
          tags: [
            { tag: 'link', attrs: { rel: 'canonical', href: `${site.origin}/` }, injectTo: 'head' },
            { tag: 'meta', attrs: { property: 'og:url', content: `${site.origin}/` }, injectTo: 'head' },
          ],
        }
      },
    }],
  }
})
