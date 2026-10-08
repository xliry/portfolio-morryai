export const studio = {
  name: 'morryAI',
  email: 'support@morryai.com',
  platformUrl: 'https://morryai.com',
  headline: ['Hayal et.', 'İz bırak.'],
  introduction: 'Fikirleri görsel dünyalara, markaları akılda kalan deneyimlere dönüştürüyoruz. Yaratıcılık, teknoloji ve biraz cesaret.',
  reel: '/videos/generation-showcase.mp4',
  reelPoster: '/images/generation-showcase.webp',
}

export const filters = ['Tümü', 'Görsel', 'Motion'] as const
export type Filter = (typeof filters)[number]

export type Project = {
  id: string
  title: string
  subtitle: string
  category: Exclude<Filter, 'Tümü'>
  discipline: string
  image: string
  alt: string
  year: string
  color: string
  description: string
  approach: string
  deliverables: string[]
  video?: string
  wordmark?: string
}

export const projects: Project[] = [
  {
    id: 'amber', title: 'AMBER', subtitle: 'Lüksün sessiz hâli.', category: 'Görsel',
    discipline: 'Ürün & sanat yönetimi', image: '/images/studio-product.webp',
    alt: 'Sıcak ışık altında taş kaide üzerinde amber renkli parfüm şişesi', year: '2026', color: '#cfa770',
    description: 'Bir ürünün karakterini ışık, doku ve kompozisyonla anlatan bir stüdyo konsepti. Sıcak amber tonları ve ham taşın yalınlığı aynı karede buluşuyor.',
    approach: 'Ürünü merkezde tutan sade bir görsel dil; dokunsal yüzeyler, kontrollü yansımalar ve sinematik bir ışık kurgusu.',
    deliverables: ['Yaratıcı konsept', 'Ürün görselleştirme', 'Sanat yönetimi'], wordmark: 'AMBER',
  },
  {
    id: 'human', title: 'HUMAN', subtitle: 'Bir bakış, bin hikâye.', category: 'Görsel',
    discipline: 'Sinematik portre', image: '/images/cinematic-portrait.webp',
    alt: 'Sıcak sinematik ışıkla aydınlatılmış editoryal kadın portresi', year: '2026', color: '#dca98a',
    description: 'İfadenin ön plana çıktığı sinematik bir portre araştırması. Doğal dokular, derin gölgeler ve yakın kadraj ile insani bir görsel hikâye.',
    approach: 'Dikkati gözlerde toplayan kadraj ve sıcak ışık; fazla öğeye ihtiyaç duymadan güçlü bir atmosfer kurmak.',
    deliverables: ['Portre konsepti', 'Görsel geliştirme', 'Renk & atmosfer'], wordmark: 'HUMAN',
  },
  {
    id: 'beyond', title: 'BEYOND', subtitle: 'Fikirler harekete geçtiğinde.', category: 'Motion',
    discipline: 'AI üretim seçkisi', image: '/images/generation-showcase.webp',
    alt: 'morryAI görsel üretim tanıtımından bir kare', year: '2026', color: '#c9ed9a',
    description: 'morryAI platformunun görsel üretim dünyasından hareketli bir seçki. Farklı görsel yaklaşımların aynı yaratıcı akış içinde nasıl buluştuğunu gösteren tanıtım filmi.',
    approach: 'Farklı sahneleri ritim ve geçişlerle bir araya getirerek görsel çeşitliliği tek bir kısa anlatıya taşımak.',
    deliverables: ['Üretim seçkisi', 'Tanıtım filmi', 'Görsel anlatı'], video: '/videos/generation-showcase.mp4',
  },
  {
    id: 'forma', title: 'FORMA', subtitle: 'Yeni bir perspektif.', category: 'Görsel',
    discipline: 'Editorial & görsel dünya', image: '/images/editorial-poster.webp',
    alt: 'Turkuaz gökyüzü ve turuncu güneş önünde siyah heykelsi mimari form', year: '2026', color: '#54d3ce',
    description: 'Mimari formların, cesur renklerin ve grafik kompozisyonun kesiştiği bir editorial konsept. Tanıdık bir mekâna beklenmedik bir bakış.',
    approach: 'Keskin geometriler ile organik ışığı bir araya getirmek; tek karede ayırt edilebilir bir görsel dünya oluşturmak.',
    deliverables: ['Editorial konsept', 'Görsel kimlik araştırması', 'Key visual'], wordmark: 'FORMA',
  },
  {
    id: 'otherworld', title: 'OTHERWORLD', subtitle: 'Gerçeğin bir adım ötesi.', category: 'Görsel',
    discipline: 'Dünya tasarımı', image: '/images/surreal-landscape.webp',
    alt: 'Bulutlar üzerinde yüzen ve şelalelerle çevrili hayali ada', year: '2026', color: '#b4d5be',
    description: 'Fiziksel sınırların yerini hayal gücüne bıraktığı bir dünya tasarımı. Yüzen bir ada ve sonsuz bulut katmanları üzerinden mekân, ölçek ve atmosfer araştırması.',
    approach: 'Doğanın tanıdık parçalarını beklenmedik bir kompozisyonda yeniden kurmak; hayali bir sahneyi inandırıcı ışıkla bütünlemek.',
    deliverables: ['Dünya tasarımı', 'Konsept görsel', 'Atmosfer araştırması'], wordmark: 'OTHERWORLD',
  },
  {
    id: 'reframe', title: 'REFRAME', subtitle: 'Aynı fikir. Başka bir dünya.', category: 'Motion',
    discipline: 'AI dönüşüm seçkisi', image: '/images/edit-showcase.webp',
    alt: 'morryAI görsel düzenleme tanıtımından bir kare', year: '2026', color: '#d4c2ef',
    description: 'morryAI görsel düzenleme olanaklarından bir tanıtım seçkisi. Bir referansın yeni yorumlara dönüşmesini hareketli bir anlatıyla keşfediyoruz.',
    approach: 'Görsel dönüşümleri sade bir kurgu içinde göstermek; referans ile yeni yorum arasındaki yaratıcı alanı görünür kılmak.',
    deliverables: ['Düzenleme seçkisi', 'Tanıtım filmi', 'Görsel dönüşüm'], video: '/videos/edit-showcase.mp4',
  },
]

export const services = [
  { number: '01', title: 'Görsel dünyalar', text: 'Ürün görsellerinden editorial konseptlere; markanın kendine ait bir dünyası olsun.', tags: ['Art direction', 'AI imaging', 'Brand visuals'] },
  { number: '02', title: 'Hareketli hikâyeler', text: 'Bir kareden fazlası. Fikrin ritmini bulan filmler ve hareketli görsel anlatılar.', tags: ['AI video', 'Motion design', 'Creative film'] },
  { number: '03', title: 'Yaratıcı deneyimler', text: 'Teknolojiyi yaratıcı sürecin doğal bir parçasına dönüştüren yeni yaklaşımlar.', tags: ['Creative technology', 'Visual exploration', 'AI workflows'] },
]

export const process = [
  { title: 'Fikri bul.', text: 'Önce seni, markanı ve anlatmak istediğin hikâyeyi dinliyoruz. Doğru soru, iyi işin başlangıcı.' },
  { title: 'Dünyayı kur.', text: 'Referansları, renkleri ve görsel dili keşfediyoruz. Hayalin şekil aldığı yer tam burası.' },
  { title: 'İz bırak.', text: 'Seçilen yönü incelikle işliyoruz. Her kare, her geçiş ve her detay aynı hikâyeyi anlatıyor.' },
]
