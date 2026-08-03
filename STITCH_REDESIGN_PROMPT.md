# Alyssa Auto Logistik — Google Stitch Redesign Brief

Cara pakai: tempel **PROMPT 0** dulu untuk mengunci style DNA. Lalu generate per-halaman
pakai PROMPT 1–6, dan selalu awali tiap prompt dengan satu baris:
`Use the established design system: bone paper, ink black, signal oxide accent, editorial grotesk, hairline rules, no shadows.`

Pakai mode **Experimental** di Stitch untuk halaman hero (lebih patuh ke art direction).
Generate **satu layar per prompt** — jangan gabung.

---

## PROMPT 0 — Style DNA (jalankan pertama)

```
Design a premium editorial design system for an Indonesian vehicle shipping company
(cars and motorcycles transported across islands). The brand is precise, industrial,
and quietly expensive — think Monocle magazine, Porsche Digital, Aesop, and Teenage
Engineering. It should read like a printed transport journal, not a SaaS landing page.

PALETTE — strictly four values, no gradients:
- Paper: #EFEDE7 (warm bone, the dominant surface)
- Ink: #14130F (near-black, for type and rules)
- Oxide: #C4441B (burnt signal orange — accent only, under 5% of any screen)
- Steel: #6B6A63 (muted warm grey for secondary text)
Dark sections use Ink as background with Paper as type. No blue anywhere.

TYPOGRAPHY — typography carries the whole design:
- Display: a tight, high-contrast grotesk at very large sizes (clamp 56–140px),
  letter-spacing -0.03em, line-height 0.95. Headlines are 2–5 words, set left,
  allowed to break across lines at deliberate points.
- Body: same grotesk at 16–18px, line-height 1.6, max 62 characters per line.
- Micro: 11px uppercase, letter-spacing 0.16em, used for section labels, indices,
  and captions. This micro-type is a signature element — use it often.
- Numerals: tabular figures. Prices, distances, durations, and indices (01 — 04)
  are set as data, not decoration.

LAYOUT:
- 12-column grid with wide outer margins (min 64px desktop, 20px mobile).
- Asymmetric compositions. Never center a hero. Text blocks sit on columns 1–5 or
  7–12, rarely full width.
- Vertical rhythm built on an 8px baseline. Section padding 160px desktop.
- Separation comes from 1px hairline rules in Ink at 12% opacity — NOT from cards,
  NOT from shadows, NOT from background color changes.

SURFACES:
- Border radius: 0px on every element except full-round pills on small tags.
- Zero drop shadows. Zero glassmorphism. Zero frosted blur.
- Buttons: primary is a solid Ink rectangle with Paper text, 0px radius,
  56px tall, micro-type label. Secondary is text with a 1px underline offset 6px.

IMAGERY:
- Cinematic automotive photography, desaturated, high contrast, cool shadows and
  warm highlights. Subjects: car carriers on highways at dusk, RoRo ferries at port,
  vehicles being strapped down, dock workers, empty asphalt.
- Photos are full-bleed or grid-aligned rectangles. Never rounded. Never in a card.
- Every photo carries a micro-type caption beneath it, left-aligned.

ICONOGRAPHY:
- 1px stroke line icons, geometric, 24px, no fill. Used sparingly and never inside
  a colored circle or rounded square.

FORBIDDEN — do not produce any of the following:
glassmorphism, frosted cards, mesh or blob gradients, purple-to-blue gradients,
drop shadows, rounded card grids, centered hero with two pill buttons and floating
stat cards, emoji, 3D-rendered generic isometric illustrations, "trusted by" blurred
logo strips, gradient text, neon glow, generic stock photos of people in suits
shaking hands, badge clusters, star-rating rows.
```

---

## PROMPT 1 — Beranda (Homepage)

```
Design the homepage for a premium Indonesian vehicle shipping company.
Language: Bahasa Indonesia.

SECTION 1 — HERO (full viewport height):
Split composition. LEFT (columns 1–5): a micro-type eyebrow "EKSPEDISI KENDARAAN
— SE-INDONESIA", then a huge display headline set in three deliberate lines:
"Kendaraan Anda, / sampai utuh. / Setiap kali." Beneath it a 2-line body paragraph
in Steel, then a single Ink rectangle button "Cek tarif" plus a text link
"Lihat layanan".
RIGHT (columns 6–12): reserve this entire area as an EMPTY canvas region with a
Paper background — leave it blank in the design. It will receive a real-time 3D
scene. Do not fill it with an illustration or photo. Only place three small
micro-type data labels floating along its left edge, vertically spaced:
"34 PROVINSI", "DOOR-TO-DOOR", "ASURANSI PENUH".
Navigation sits at the top: wordmark left, six text links right, all micro-type,
separated from the hero by a single hairline rule. No pill background, no blur.

SECTION 2 — LAYANAN:
A four-row list, not a card grid. Each row is a full-width horizontal band separated
by hairline rules, 140px tall. Left: index "01" in Oxide micro-type. Then the service
name in 40px display type. Middle: one line of description in Steel. Right: a small
1px arrow icon that shifts right on hover. Services: Kirim Mobil, Kirim Motor,
Towing, Antar Pulau.

SECTION 3 — CARA KERJA:
Four steps in a horizontal 4-column layout on a full-bleed Ink background with Paper
type. Each column: a large tabular numeral "01" through "04" at 72px in Oxide,
a hairline rule, a short title, and two lines of body copy. Wide gutters.

SECTION 4 — JANGKAUAN / RUTE:
Full-bleed section. Left column: heading "Terhubung dari Sabang sampai Merauke" and
a short paragraph. Right two-thirds: reserve as an EMPTY canvas region for a 3D
archipelago map — leave blank, Paper background, no illustration.
Below it, a bordered data table (hairline rules only, no fill) listing five routes:
columns are ROUTE, METODE, ESTIMASI, MULAI DARI. Prices in tabular numerals.
The table should feel like a printed timetable.

SECTION 5 — TESTIMONI:
Three quotes in a 3-column layout with no cards. Each: a large Oxide quotation mark,
the quote in 22px display type, a hairline rule, then name and role in micro-type.

SECTION 6 — FAQ:
A single-column accordion at 60% width, left-aligned on columns 1–7. Questions in
24px type, hairline rule between each, a thin plus/minus indicator on the right.
No background fill, no rounded container.

SECTION 7 — CTA + FOOTER:
Full-bleed Ink background. An enormous display headline "Siap kirim kendaraan Anda?"
spanning nearly the full width. One Paper-colored rectangle button. Beneath, the
footer: four columns of micro-type links, the wordmark, and a copyright line,
all separated by hairline rules in Paper at 20% opacity.
```

---

## PROMPT 2 — Cek Tarif (kalkulator, multi-step)

```
Design a multi-step tariff estimate form for a premium vehicle shipping company.
Bahasa Indonesia. Same design system: Paper background, Ink type, Oxide accent,
0px radius, hairline rules, no cards, no shadows.

Layout is a two-column split held at full viewport height.
LEFT (columns 1–4), sticky: a micro-type step indicator listing all four steps
vertically — "01 RUTE", "02 KENDARAAN", "03 LAYANAN", "04 KONTAK" — with the active
step in Ink and the rest in Steel, each on its own hairline-ruled row. Below it,
a live running summary of what the user has selected so far, in micro-type.

RIGHT (columns 6–12): the active step only. One question per screen, asked as a
large 48px display headline, e.g. "Dari mana ke mana?". Inputs are borderless:
a single 1px bottom rule in Ink, 56px tall, 24px type, no background fill, no radius.
The label sits above in micro-type. Selection options (vehicle type, shipping method)
are rendered as a horizontal row of rectangular choice blocks with a 1px Ink border
that fills solid Ink with Paper text when selected — no checkmarks, no icons inside.

Navigation between steps: a text "Kembali" link on the left and a solid Ink
rectangle "Lanjut" on the right, sitting on a hairline rule at the bottom.
A thin 2px Oxide progress bar runs along the very top edge of the viewport.

Final step shows the estimate as a very large tabular numeral price range
(e.g. "Rp 2.400.000 — 3.100.000") with the breakdown listed beneath in a
hairline-ruled table, and a single primary action to continue via WhatsApp.
```

---

## PROMPT 3 — Detail Layanan (template halaman layanan)

```
Design a service detail page for a premium vehicle shipping company. Bahasa Indonesia.
Same design system.

HEADER: A full-bleed cinematic photograph of a car carrier truck, desaturated and
high contrast, 70vh tall. Overlaid on the lower-left: a micro-type breadcrumb
"LAYANAN / KIRIM MOBIL" and a large Paper-colored display headline. A micro-type
photo caption sits in the bottom-right corner.

INTRO: A two-column block. Left column holds only a micro-type label "TENTANG
LAYANAN". Right column (columns 5–11) holds a single 28px paragraph in Ink.
Generous whitespace. This asymmetric label-and-body pattern repeats for every
section below — it is the page's structural signature.

PROSES: Five steps as a vertical list. Each row: a large Oxide tabular numeral on
the left, a hairline rule, the step title in 32px type, and a short description
in Steel. Rows separated by hairline rules only.

DUA KOLOM DATA: Side by side, "Faktor Durasi" and "Faktor Harga", each a simple
hairline-ruled list with no bullets and no icons — just micro-type labels stacked
with dividers.

DOKUMEN & KEAMANAN: A full-bleed Ink band with Paper type, a single centered-left
paragraph at 24px, max 60 characters per line.

RUTE TERKAIT: A horizontal hairline-ruled table of related routes, same timetable
treatment as the homepage.

FAQ: Accordion, same treatment as homepage.

CTA: Ink band with a large headline and one Paper rectangle button.
```

---

## PROMPT 4 — Tracking

```
Design a shipment tracking page for a premium vehicle shipping company.
Bahasa Indonesia. Same design system.

EMPTY STATE: A near-empty screen, which is the point. Centered on columns 4–9:
a micro-type label "LACAK KIRIMAN", a 64px display headline "Nomor resi Anda?",
and a single borderless input with a 1px bottom rule, 32px tabular-numeral type,
placeholder "AAL-000000". A solid Ink rectangle button "Lacak" sits directly
beneath, left-aligned to the input. Nothing else on the screen. Very generous
vertical whitespace above and below.

RESULT STATE: Two-column split.
LEFT (columns 1–5): shipment metadata as a hairline-ruled definition list —
NOMOR RESI, KENDARAAN, ASAL, TUJUAN, METODE, ESTIMASI TIBA. Labels in micro-type
Steel, values in 20px Ink tabular numerals. No card, no background fill.
RIGHT (columns 7–12): a vertical timeline. A single 1px vertical Ink rule runs
down the column. Each event is a row with a small 8px solid square on the rule
(Oxide for the current event, Ink for completed, hollow 1px outline for pending),
a tabular timestamp in micro-type, the location name in 20px type, and a short
status line in Steel. No connecting curves, no icons, no colored pills.
The current status is announced above the timeline as a 40px display headline,
e.g. "Dalam perjalanan — Surabaya".
```

---

## PROMPT 5 — Rute (index + detail)

```
Design a routes index page for a premium vehicle shipping company. Bahasa Indonesia.
Same design system.

HEADER: No photo. Just a large display headline on columns 1–6, a short paragraph,
and a hairline rule. Beneath the rule, a horizontal row of micro-type filter links
(SEMUA, JAWA, SUMATERA, KALIMANTAN, SULAWESI, BALI & NUSA) — active one underlined
in Oxide, no pill backgrounds, no dropdowns.

MAIN: The entire route list rendered as one continuous printed timetable. A single
table with hairline rules between rows only — no vertical borders, no zebra striping,
no cards. Columns: ROUTE (origin → destination in 24px type, the arrow as a real
character), JARAK, METODE (small text tags), ESTIMASI, MULAI DARI (tabular numerals,
right-aligned). Rows are 88px tall. On hover the entire row inverts to solid Ink
with Paper text.

Between every six rows, insert a full-bleed cinematic photograph spanning the grid
with a micro-type caption — breaking the table rhythm the way an editorial spread
would.

FOOTER CTA: Ink band, large headline, one rectangle button.
```

---

## PROMPT 6 — Kontak

```
Design a contact page for a premium vehicle shipping company. Bahasa Indonesia.
Same design system.

Two-column asymmetric split with a hairline rule running vertically between them.
LEFT (columns 1–5): contact channels as a hairline-ruled list. Each row has a
micro-type label (WHATSAPP, EMAIL, KANTOR, JAM OPERASIONAL) above a 24px Ink value.
Beneath, an office address block and a muted, desaturated map rendered as a flat
rectangle with no rounded corners and no default map UI chrome.
RIGHT (columns 7–12): the message form. Fields are borderless with a single 1px
bottom rule, 56px tall, micro-type labels above. Fields: Nama, WhatsApp, Email,
Jenis Kendaraan, Pesan (a 4-row textarea with the same bottom-rule treatment).
The submit control is a full-width solid Ink rectangle, 64px tall, micro-type label
"KIRIM PESAN". No placeholder text inside fields — labels do that work.

A large display headline sits above both columns, spanning columns 1–8:
"Ceritakan kendaraan dan tujuan Anda."
```

---

## Lampiran — Spesifikasi 3D (bukan untuk Stitch, ini untuk implementasi kode)

Stitch tidak bisa menghasilkan 3D. Dua zona canvas yang di-reserve di PROMPT 1
diisi dengan scene berikut, dibangun di React Three Fiber (sudah terpasang di proyek:
`@react-three/fiber`, `@react-three/drei`, `three`).

**Scene A — Hero (kanan, columns 6–12)**
- Subjek: satu bodi mobil sedan low-poly, material clearcoat matte, dilihat dari
  sudut rendah tiga-perempat. Bukan globe, bukan partikel, bukan wireframe biru.
- Lighting: studio HDRI + satu area light hangat dari kanan atas, shadow lembut
  dan panjang ke arah kamera.
- Warna: bodi berwarna Ink, environment Paper, satu garis rim-light Oxide.
- Interaksi: kamera orbit ±8° mengikuti posisi kursor (di-damp, lerp 0.05).
  Scroll menurunkan kamera dan memutar objek 20°.
- Idle: rotasi konstan sangat lambat, 0.08 rad/detik. Tidak ada bounce, tidak ada
  float sinusoidal — gerakan harus terasa berat dan mahal.

**Scene B — Peta jangkauan**
- Kepulauan Indonesia sebagai extruded landmass tipis (setebal 4 unit) berwarna
  Ink di atas Paper, tanpa tekstur, tanpa laut.
- Rute sebagai arc bezier tipis berwarna Oxide yang menggambar dirinya sendiri saat
  section masuk viewport, dengan satu titik bergerak di sepanjang arc.
- Kamera ortografis, sudut miring 35°, tanpa kontrol user — murni scroll-driven.

**Aturan performa** (wajib, ini yang bikin situs mahal terasa mahal):
- `dpr={[1, 1.5]}`, `frameloop="demand"` untuk Scene B.
- Lazy-load kedua scene via `next/dynamic` dengan `ssr: false`.
- Hormati `prefers-reduced-motion`: fallback ke render statis.
- Di bawah 768px, ganti kedua scene dengan gambar still — jangan jalankan WebGL
  di mobile.
- Anggaran: total payload 3D di bawah 600KB terkompresi. Model pakai Draco/meshopt.
```
