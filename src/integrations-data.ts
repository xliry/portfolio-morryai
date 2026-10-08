export const creativeFields = ['Tümü', 'Görsel', 'Video'] as const
export type CreativeField = (typeof creativeFields)[number]

export const integrations = [
  {
    id: 'gemini', name: 'Google Gemini', monogram: 'G', color: '#9cbfff', position: 'left-top',
    fields: ['Görsel'], caption: 'Görsel üretimi & düzenleme',
    description: 'Fikri görsele dönüştür. Bir kareyi yeniden yorumla, ayrıntıları düzenle ve yeni bir görsel dil keşfet.',
    tags: ['Görsel üretimi', 'Görsel düzenleme'], path: 'M270 195 C385 195 380 300 500 300',
  },
  {
    id: 'wavespeed', name: 'WaveSpeed', monogram: 'W', color: '#abdcae', position: 'right-top',
    fields: ['Görsel', 'Video'], caption: 'Görsel & video modelleri',
    description: 'Sabit bir kareden hareketli bir dünyaya. Görsel ve video modellerini yaratıcı bir anlatının farklı aşamalarında bir araya getir.',
    tags: ['Görsel üretimi', 'Video üretimi'], path: 'M730 195 C615 195 620 300 500 300',
  },
  {
    id: 'anyfast', name: 'AnyFast', monogram: 'A', color: '#edb987', position: 'top',
    fields: ['Görsel', 'Video'], caption: 'Çoklu model üretim akışları',
    description: 'Tek bir yaratıcı fikir, farklı model yaklaşımları. Görsel üretimi, düzenleme ve video akışları arasında yeni olasılıklar araştır.',
    tags: ['Çoklu model', 'Görsel & video'], path: 'M500 120 L500 300',
  },
  {
    id: 'fal', name: 'fal.ai', monogram: 'f', color: '#d4b6f9', position: 'left-bottom',
    fields: ['Video'], caption: 'Referansla video üretimi',
    description: 'Bir görsel, bir sahne, bir referans. Metin ve medya referanslarından yola çıkarak hareketli görsel hikâyeler kur.',
    tags: ['Metinden video', 'Medya referansları'], path: 'M270 433 C395 433 370 300 500 300',
  },
  {
    id: 'higgsfield', name: 'Higgsfield', monogram: 'H', color: '#f0da94', position: 'right-bottom',
    fields: ['Video'], caption: 'Hareket & nesne dönüşümü',
    description: 'Hareketi bir sahneden diğerine taşı. Nesne değişimi ve hareket aktarımıyla bir videonun yeni yorumlarını keşfet.',
    tags: ['Hareket aktarımı', 'Nesne değişimi'], path: 'M730 433 C605 433 630 300 500 300',
  },
] as const

export type Integration = (typeof integrations)[number]
