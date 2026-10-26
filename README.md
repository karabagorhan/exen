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

## Mevcut kapsam

- Genel bakış, servis işleri, pompalar, müşteriler, teklifler, belgeler, raporlar, bakım takvimi ve ayarlar ekranları
- Servis kaydı ekleme ve düzenleme; arıza, yapılan işlemler, test ve garanti alanları
- Teklif kalemleri, iskonto ve KDV hesaplama
- Servis kayıtlarını bu tarayıcıda saklama
- Kabul formu, ön teklif ve servis raporunu kayıt verilerinden PDF olarak indirme
- EXEN kurumsal kimliği ve örnek servis verileri

Bu sürüm tarayıcıdaki yerel depolamayı kullanır. Veriler başka cihazlarla paylaşılmaz. Çok kullanıcılı müşteri portalı, Supabase bağlantısı, rol bazlı erişim, QR doğrulaması ve imza akışı henüz eklenmemiştir. PDF raporları girilen alanları aktarır; doğrulanmamış teknik sonuç üretmez.
