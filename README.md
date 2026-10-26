# EXEN Pompa Servis Yönetimi

EXEN Pompa'nın servis kabulü, arıza tespiti, teklif, bakım ve teslimat süreçlerini tek ekrandan izlemek için hazırlanmış Next.js MVP'sidir.

## Çalıştırma

```bash
npm ci
npm run dev
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde açılır.

## Kontroller

```bash
npm run lint
npm run build
```

`npm run build` statik siteyi `out/` dizinine çıkarır. GitHub Pages için `main` dalına gönderilen değişiklikler `.github/workflows/pages.yml` ile yayımlanır. Pages kaynağı depo ayarlarında **GitHub Actions** olmalıdır. Site adresi `https://karabagorhan.github.io/exen/` şeklindedir.

Çevrim dışı tek HTML dosyası üretmek için `npm run build:offline` çalıştırın. Çıktı `offline-dist/index.html` dosyasıdır; logo, PDF yazı tipi, CSS ve JavaScript içine gömülüdür. Kullanım notları `offline/KULLANIM.md` dosyasındadır.

## Mevcut kapsam

- Bakım/servis kontrol merkezi, servis işleri, pompalar, müşteriler, teklifler, formlar, belgeler, raporlar, bakım takvimi ve ayarlar ekranları
- Servis kaydı ekleme ve düzenleme; arıza, yapılan işlemler, test ve garanti alanları
- TRY, USD ve EUR para birimli teklif kalemleri, iskonto ve KDV hesaplama; dövizleri karıştırmadan ayrı dashboard toplamları
- Servis kayıtlarını bu tarayıcıda saklama
- Kabul formu, ön teklif ve servis raporunu kayıt verilerinden PDF olarak indirme
- Anlamsal durum ve kritiklik rozetleri, gelişmiş filtreler ve sürüklenebilir Kanban pano
- Ön kontrol/kabul formu, pompa bakım checklisti, servis süreci checklisti, ekspertiz, test ölçümleri ve işlem tarihçesi
- Bakımın on aşaması için ayrıntılı alt kontroller, ölçüm alanları ve üretici şartlarına dayalı kabul rehberi
- Tarayıcıda saklanan açık/koyu tema tercihi ve süreç koşullarına bağlı iş akışı kontrolleri
- JSON yedekleme, JSON içe aktarma ve Excel uyumlu CSV dışa aktarma
- Antetli yazdırma görünümü ve belge doğrulama QR kodu
- EXEN kurumsal kimliği ve örnek servis verileri

Bu sürüm tarayıcıdaki yerel depolamayı kullanır. Veriler başka cihazlarla paylaşılmaz. Çok kullanıcılı müşteri portalı, Supabase bağlantısı, rol bazlı erişim, QR doğrulaması ve imza akışı henüz eklenmemiştir. PDF raporları girilen alanları aktarır; doğrulanmamış teknik sonuç üretmez.
