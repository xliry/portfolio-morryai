import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const configuredUrl = loadEnv(mode, '.', 'SITE_').SITE_URL || 'https://portfolio.morryai.com'
  const site = new URL(configuredUrl)
  if (!['https:', 'http:'].includes(site.protocol)) throw new Error('SITE_URL bir http veya https adresi olmalı.')
  return {
    plugins: [react(), {
      name: 'portfolio-site-metadata',
      transformIndexHtml(html) {
        return {
          html: html.replaceAll('content="/images/social-cover.jpg"', `content="${site.origin}/images/social-cover.jpg"`),
          tags: [
            { tag: 'link', attrs: { rel: 'canonical', href: `${site.origin}/` }, injectTo: 'head' },
            { tag: 'meta', attrs: { property: 'og:url', content: `${site.origin}/` }, injectTo: 'head' },
          ],
        }
      },
    }],
  }
})
