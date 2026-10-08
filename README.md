# morryAI Portfolio

morryAI için hareketli, responsive demo portfolyo. React, TypeScript, Vite ve Motion ile hazırlanır; üretimde statik dosyaları Nginx sunar.

## Tasarım sözleşmesi

- morryAI kaynak projesindeki Mat Grafit + Electric Cyan teması: `#141414` zemin, `#1E1E1E` yüzey, `#00E5FF` vurgu, `#F4F4F6` metin. Tema tokenları `src/tokens.css` içindedir; cam, aura ve pointer ışıkları bu tokenları paylaşır.
- Geniş tipografi, editoryal proje sunumu ve kontrollü animasyonlar.
- Kaydırmayla kartların yükselerek açılması, kart görsellerinde sınırlı parallax, bölüm başlıklarında satır satır reveal, stüdyo/süreç bloklarında sıralı giriş ve kaydırmaya bağlı süreç çizgisi.
- Ana görselde ve proje kartlarında imlece tepki veren derinlik; Portal / Otherworld / Forma dünyaları arasında geçiş yapılan geniş sinematik sahne ve genişletilmiş odak görünümü. Mobilde dünyalar dokunarak seçilir.
- Stüdyo ve iletişim alanlarında yavaşça dolaşan aura ışıkları. Görüş alanından çıkınca animasyon duraklar; azaltılmış harekette aura sabit kalır. Katmanlar CSS ile çizilir, ek medya indirilmez.
- Ana sayfa ve header CTA'larında cam efekti, hareketli ışık yansıması ve hover/klavye odağı tepkisi. Ekran dışında yansımalar duraklar, azaltılmış harekette sabit cam görünümü korunur.
- Hero'da imlece tepki veren yüzen cam kartlar: görsel keşif, Motion seçkisi ve yaratıcı sürece çalışan kısa yollar. Mobilde CTA altında grid'e geçer; ekran dışında salınım duraklar, azaltılmış harekette kartlar sabit kalır.
- Entegrasyon vitrininde animasyonlu provider ağı, Görsel / Video alan seçimi ve seçilen node'un ayrıntıları bulunur. Ağ animasyonu ekran dışında ve azaltılmış harekette duraklar.
- Masaüstü ve mobilde kullanılabilir gezinme; klavye odağı ve azaltılmış hareket tercihi desteği.
- Hareket varsayılan olarak cihazın tercihini izler. Header'daki oynat/duraklat düğmesiyle ziyaretçi animasyonları açıkça açabilir veya kapatabilir; seçim sadece bu tarayıcıda saklanır.
- Konsept işler “stüdyo konsepti” olarak etiketlenir. Müşteri adı, sonuç ve metrikler gerçek proje kanıtı gibi sunulmaz.
- Metinler, proje verileri ve iletişim bilgileri için düzenleme noktası: `src/data.ts`.
- Görseller ve fontlar depodan sunulur; sayfanın açılması üçüncü taraf medya servislerine bağlı değildir.

## Yerel geliştirme

Node.js 22 ile:

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm run preview
```

## Coolify

Git kaynağı olarak `https://github.com/xliry/portfolio-morryai.git` bağla ve şu ayarları kullan:

| Ayar | Değer |
| --- | --- |
| Branch | `main` |
| Build Pack / Build Strategy | `Dockerfile` |
| Base Directory | `/` |
| Dockerfile Location | `/Dockerfile` |
| Ports Exposes | `8080` |
| Domain | Kendi portfolio domainin |

Dockerfile bağımlılıkları kurar, uygulamayı derler ve Nginx ile `8080` portunda sunar. Ortam değişkeni, veritabanı veya kalıcı disk gerekmez. Domaini ekleyip **Deploy** seç; yayın sonrası ana sayfayı ve `/healthz` adresini kontrol et.

Sosyal paylaşım ve canonical adresi varsayılan olarak `https://portfolio.morryai.com` kullanır; Coolify'da ek değişken gerekmez. Başka bir domaine taşınırsa isteğe bağlı **build-time** değişkeni / Docker build arg `SITE_URL=https://yeni-domainin` ile değiştirilebilir. Bu değer yeniden derlemede HTML'e yazılır; normal runtime değişkeni olarak eklemek yeterli olmaz. Yerelde `.env.example` dosyasını `.env` olarak kopyalayıp alanı doldurabilirsin.

OpenGraph ve X paylaşım etiketleri JavaScript çalıştırılmadan okunabilen üretim HTML'inde bulunur. Özel `public/images/social-cover.jpg` kapağı 1200×630 boyutundadır; başlık, açıklama, site adı, mutlak görsel URL'si, MIME türü, boyutlar ve alternatif metin içerir. SVG tasarım kaynağı `docs/social-card.svg` içinde tutulur. Paylaşım uygulamaları eski önizlemeleri önbellekte tutabilir; yeni paylaşımın görünmesi platformun yeniden taramasına bağlıdır.

İmajın sağlık kontrolü `http://127.0.0.1:8080/healthz` kullanır. Coolify, Dockerfile içindeki `HEALTHCHECK` talimatını algılar; panelde ayrıca sağlık kontrolü tanımlamak gerekmez. Ayrıntılar: [resmi Dockerfile rehberi](https://coolify.io/docs/applications/builds/dockerfile), [sağlık kontrolleri](https://coolify.io/docs/applications/configuration/health-checks).

Docker ile yerel üretim önizlemesi:

```sh
docker build -t morryai-portfolio .
docker run --rm -p 8080:8080 morryai-portfolio
```

Bu depo dağıtım dosyalarını sağlar; canlı domain ve Coolify yayını ayrıca doğrulanmalıdır.

## İçerik ve görseller

İletişim adresi `support@morryai.com`, platform bağlantısı `https://morryai.com`; ikisi de `src/data.ts` üzerinden değiştirilebilir. Proje isimleri portfolyo sunumu için verilmiş konsept isimleridir.

Entegrasyon vitrini, morryAI kaynak projesinin `lib/generation-service.ts` ve `lib/providers` adaptörlerinde doğrulanan Google Gemini, WaveSpeed, AnyFast, fal.ai ve Higgsfield desteğini gösterir. Bu statik portfolyo provider API'lerine bağlanmaz ve provider sağlık kontrolü yapmaz; ağ görselleştirmesi canlı bağlantı durumunu bildirmez.

Bu bölümün kart metinleri, yaratıcı alan eşlemeleri ve renkleri `src/integrations-data.ts` üzerinden düzenlenir.

Ürün, portre, editorial ve dünya görselleri ile iki sessiz tanıtım videosu sahibinin morryAI projesindeki mevcut `public/mobile-presets` ve `public/home-showcase` materyallerinden alınmıştır. Bunlar gerçek müşteri referansı olarak sunulmaz. Ana portal görseli bu site için ImageGen ile özgün üretilmiştir: `public/images/hero-monolith.webp`. Tam prompt ve üretim bilgisi: [art direction](docs/art-direction.md).

## Doğrulama

- `npm run build`: TypeScript kontrolü ve üretim derlemesi.
- İsteğe bağlı `SITE_URL` ile mutlak paylaşım görseli, canonical ve `og:url` üretimi bellekte derlenerek doğrulandı.
- Tarayıcıda kategori filtreleri (6 / 4 / 2), proje penceresi, Escape ile kapatma, yerel video oynatma, mobil menü ve e-posta kopyalama kontrol edildi.
- Masaüstü, 390 px ve 320 px mobil görünüm kontrol edildi; yatay taşma bulunmadı.
- Scroll reveal ve parallax tarayıcıda gözlemlendi; hareket düğmesinin açık/kapalı geçişleri doğrulandı. Cihazın reduced-motion tercihi açıkken açık opt-in ile motion önizlemesi test edildi.
- Görsel keşifte üç dünya seçimi, genişletilmiş görünüm, Escape ve kapatma düğmesi, body scroll kilidinin kaldırılması ve odağın açma düğmesine dönüşü doğrulandı. 320 px görünümde genişletilmiş sahne viewport'a sığıyor.
- Entegrasyon vitrininde Görsel (3) / Video (4) / Tümü (5) alan seçimi, sağlayıcı ayrıntıları, seçili bağlantı vurgusu ve akan ışıklar doğrulandı. 320 px mobil ve 768 px tablet yatay taşma göstermedi; azaltılmış hareket ve ekran dışı duraklama kontrol edildi.
- Yerelde Docker daemon çalışmadığı için container build burada çalıştırılmadı. Coolify Dockerfile yayını `8080` portunda healthy duruma geçti; `https://portfolio.morryai.com` ve `/healthz` HTTP 200 ile doğrulandı.
