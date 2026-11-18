// Zhou et al. (2022) — Türkçe sunum v2: uzun, görsel ağırlıklı, konuşma metinli
// academic-pptx-skill + pptx skill + turkish-humanizer (deligoez) terim defteri:
//   drone→dron · spatial→uzamsal · spatial-temporal→uzamsal-zamansal · penalty→ceza (terimi)
//   clearance→güvenlik payı · hover→havada asılı kalmak · anchor→sabit konum istasyonu
//   drift→konum kayması · occlusion→görüşün kapanması · goal-chasing→hedef kovalama
const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");
if (!process.env.PPTX_SKILL) {
  console.error("PPTX_SKILL tanımlı değil: Anthropic pptx skill klasörünü gösterin (scripts/apply_theme.js orada).");
  process.exit(1);
}
const { applyTheme } = require(path.join(process.env.PPTX_SKILL, "scripts", "apply_theme.js"));

const OUT = path.join(__dirname, "..", "Zhou2022_Suru_Sunumu.pptx");
const IMG = path.join(__dirname, "gorseller");
const SIZES = JSON.parse(fs.readFileSync(path.join(IMG, "sizes.json"), "utf8"));

const THEME = {
  name: "Akademik Lacivert",
  headFontFace: "Arial", bodyFontFace: "Arial",
  colors: {
    dk1: "2D2D2D", lt1: "FFFFFF", dk2: "1F4E79", lt2: "EBF3FA",
    accent1: "2E75B6", accent2: "C55A11", accent3: "777777", accent4: "CCCCCC",
    accent5: "FFF2CC", accent6: "A0BBDD", hlink: "2E75B6", folHlink: "1F4E79",
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.theme = { headFontFace: "Arial", bodyFontFace: "Arial" };
pres.title = "Ormanda kendi başına uçan avuç içi dron sürüsü (Zhou vd., 2022)";
pres.author = "Samed Bilgin";
pres.subject = "Makale sunumu";
const C = pres.SchemeColor;
const M = 0.5;
const SIZE = { title: 24, body: 20, sub: 18, label: 16, small: 14, cite: 12 };

// ---------- Layout'lar ----------
pres.defineSlideMaster({
  title: "KAPAK",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.7, w: 4.75, h: 2.5, fontSize: 30, bold: true, color: C.background1, align: "left", valign: "bottom", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "kaynak", type: "body", x: 0.5, y: 3.4, w: 4.75, h: 0.85, fontSize: 13, color: C.accent6, align: "left", valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "sunucu", type: "body", x: 0.5, y: 4.4, w: 4.75, h: 0.75, fontSize: 16, color: C.background1, align: "left", valign: "top", margin: 0 }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "ICERIK",
  background: { color: C.background1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: M, y: 0.42, w: 9.0, h: 0.9, fontSize: SIZE.title, bold: true, color: C.text2, align: "left", valign: "top", margin: 0 }, text: "" } },
  ],
  slideNumber: { x: 9.0, y: 5.2, w: 0.5, h: 0.3, fontSize: 11, color: C.accent3, align: "right" },
});
pres.defineSlideMaster({
  title: "BOLUM",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "bolumno", type: "body", x: 0.7, y: 1.5, w: 8.6, h: 0.45, fontSize: 16, color: C.accent6, align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.7, y: 2.0, w: 8.6, h: 1.2, fontSize: 36, bold: true, color: C.background1, align: "left", valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "teaser", type: "body", x: 0.7, y: 3.35, w: 8.6, h: 1.0, fontSize: 18, color: C.accent6, align: "left", valign: "top", margin: 0 }, text: "" } },
  ],
  slideNumber: { x: 9.0, y: 5.2, w: 0.5, h: 0.3, fontSize: 11, color: C.accent6, align: "right" },
});
pres.defineSlideMaster({
  title: "SONUC",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: M, y: 0.35, w: 9.0, h: 0.5, fontSize: 20, bold: false, color: C.accent6, align: "left", valign: "top", margin: 0 }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "EK",
  background: { color: C.background1 },
  objects: [
    { placeholder: { options: { name: "eketiket", type: "body", x: M, y: 0.1, w: 9.0, h: 0.3, fontSize: 12, italic: true, color: C.accent3, align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: M, y: 0.42, w: 9.0, h: 0.9, fontSize: 22, bold: true, color: C.text2, align: "left", valign: "top", margin: 0 }, text: "" } },
  ],
  slideNumber: { x: 9.0, y: 5.2, w: 0.5, h: 0.3, fontSize: 11, color: C.accent3, align: "right" },
});

// ---------- Yardımcılar ----------
let sectionName = "";
let curTitle = "";
const SCRIPT = [];
function section(t) { sectionName = t; pres.addSection({ title: t }); }
function newSlide(master) { return pres.addSlide({ masterName: master, sectionTitle: sectionName }); }
function title(s, t) { curTitle = t; s.addText(t, { placeholder: "title" }); }
function text(s, content, opts) {
  s.addText(content, Object.assign({ isTextBox: true, margin: 0, color: C.text1, valign: "top" }, opts));
}
function crumb(s, active) {
  const secs = ["Problem", "İlham", "Yöntem", "Dağıtık yapı", "Deneyler", "Tartışma"];
  const runs = [];
  secs.forEach((x, i) => {
    runs.push({ text: x, options: { bold: x === active, color: x === active ? C.accent1 : C.accent3 } });
    if (i < secs.length - 1) runs.push({ text: "   ·   ", options: { color: C.accent4 } });
  });
  text(s, runs, { x: M, y: 0.1, w: 7, h: 0.26, fontSize: 11, objectName: "Bölüm gezgini" });
}
function cite(s, str, color) {
  text(s, str, { x: M, y: 5.2, w: 8.3, h: 0.3, fontSize: SIZE.cite, color: color || C.accent3, objectName: "Atıf" });
}
function rect(s, x, y, w, h, o = {}) {
  s.addShape(o.rounded === false ? pres.shapes.RECTANGLE : pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: o.rounded === false ? undefined : 0.08,
    fill: o.fill ? { color: o.fill, transparency: o.transp || 0 } : { type: "none" },
    line: o.line ? { color: o.line, width: o.lineW || 1.25, dashType: o.dash } : { type: "none" },
    objectName: o.name,
  });
}
function seg(s, x1, y1, x2, y2, o = {}) {
  s.addShape(pres.shapes.LINE, {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    flipH: x2 < x1, flipV: y2 < y1,
    line: { color: o.color || C.accent3, width: o.width || 1.5, dashType: o.dash || "solid",
      endArrowType: o.arrow ? "triangle" : undefined, beginArrowType: o.beginArrow ? "triangle" : undefined },
  });
}
function poly(s, pts, o = {}) {
  for (let i = 0; i < pts.length - 1; i++)
    seg(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], Object.assign({}, o, { arrow: o.arrow && i === pts.length - 2 }));
}
function bullets(items) {
  const runs = [];
  items.forEach((it, i) => {
    const last = i === items.length - 1;
    if (Array.isArray(it)) {
      runs.push({ text: it[0], options: { bold: true, bullet: true } });
      runs.push({ text: it[1], options: { breakLine: !last } });
    } else runs.push({ text: it, options: { bullet: true, breakLine: !last } });
  });
  return runs;
}
// Görseli kutuya oranını koruyarak sığdır; align: "left" | "center" | "top"
function img(s, key, bx, by, bw, bh, o = {}) {
  const [pw, ph] = SIZES[key];
  const r = pw / ph;
  let w = bw, h = bw / r;
  if (h > bh) { h = bh; w = bh * r; }
  const x = o.align === "left" ? bx : bx + (bw - w) / 2;
  const y = o.valign === "top" ? by : by + (bh - h) / 2;
  s.addImage({ path: path.join(IMG, key + ".jpg"), x, y, w, h, altText: o.alt || key, objectName: "Görsel " + key });
  return { x, y, w, h };
}
function stat(s, x, y, w, h, big, small, o = {}) {
  rect(s, x, y, w, h, { fill: o.fill || C.background2, name: "Sayı " + big });
  text(s, [
    { text: big, options: { bold: true, fontSize: o.bigSize || 30, color: o.bigColor || C.text2, breakLine: true } },
    { text: small, options: { fontSize: o.smallSize || SIZE.small, color: o.smallColor || C.text1 } },
  ], { x: x + 0.18, y: y + 0.12, w: w - 0.36, h: h - 0.24, paraSpaceAfter: 4, valign: o.valign || "top" });
}
// Konuşma metni: sunucu notu + Claude Docs belgesi için ortak kaynak
function note(s, sure, metin, opts = {}) {
  SCRIPT.push({ n: SCRIPT.length + 1, baslik: opts.baslik || curTitle, sure, atlanabilir: !!opts.atla, metin });
  s.addNotes(`[≈ ${sure} sn${opts.atla ? " · zaman kısaysa atlanabilir" : ""}]\n\n${metin}`);
}

// =====================================================================
section("Giriş");
// 1. Kapak
{
  const s = newSlide("KAPAK");
  s.addImage({ path: path.join(IMG, "cover169.jpg"), x: 0, y: 0, w: 10, h: 5.625, altText: "Bambu ormanında uçan dron sürüsü (Zhou vd., 2022, Movie 1)", objectName: "Kapak fotoğrafı" });
  rect(s, 0, 0, 5.75, 5.625, { fill: C.text2, transp: 12, rounded: false, name: "Kapak örtüsü" });
  curTitle = "Ormanda kendi başına uçan avuç içi dron sürüsü";
  s.addText(curTitle, { placeholder: "title" });
  s.addText([
    { text: "Makale sunumu: ", options: { bold: true } },
    { text: "Zhou, X. vd. (2022). Swarm of micro flying robots in the wild. " },
    { text: "Science Robotics, 7", options: { italic: true } }, { text: ", eabm5954." },
  ], { placeholder: "kaynak", bullet: false });
  s.addText([
    { text: "Samed Bilgin  ·  251281053", options: { bold: true, breakLine: true } },
    { text: "Kasım 2026", options: { color: C.accent6 } },
  ], { placeholder: "sunucu", bullet: false });
  text(s, "Fotoğraf: Zhou vd. (2022), Movie 1", { x: 6.0, y: 5.25, w: 3.8, h: 0.25, fontSize: 10, color: C.background1, align: "right" });
  note(s, 30, "Herkese merhaba. Bugün size bir bambu ormanında, insan yardımı almadan uçan bir dron sürüsünü anlatacağım. Arkadaki fotoğraf gerçek: Zhejiang Üniversitesi'nden bir ekip on tane avuç içi büyüklüğünde dronu sık bir ormana salıyor. Dronların ne GPS'i var ne de önceden çıkarılmış bir haritası. Makale 2022'de Science Robotics'te yayımlandı. Sonuna kadar dinlerseniz bu dronların birbirine çarpmadan 30 santimetreden dar boşluklardan nasıl geçtiğini birlikte göreceğiz.");
}

// =====================================================================
section("Problem");
// 2. Bilim kurgu kancası
{
  const s = newSlide("ICERIK"); crumb(s, "Problem");
  title(s, "Bilim kurgunun dron sürüleri artık gerçek bir ormanda uçuyor");
  const films = [
    ["Prometheus (2012)", "Mini sondalar bilinmeyen gemiyi keşfeder"],
    ["Ender'in Oyunu (2013)", "Sürü, gemiye kalkan olur"],
    ["Star Wars III (2005)", "Gökdelenler arasında yoğun hava trafiği"],
    ["Blade Runner 2049 (2017)", "Kalabalık ama düzenli uçan araçlar"],
  ];
  films.forEach((f, i) => {
    const x = M + (i % 2) * 2.2, y = 1.5 + Math.floor(i / 2) * 1.75;
    rect(s, x, y, 2.05, 1.6, { fill: C.background2, name: "Film " + f[0] });
    text(s, [
      { text: f[0], options: { bold: true, fontSize: 15, color: C.text2, breakLine: true } },
      { text: f[1], options: { fontSize: SIZE.small } },
    ], { x: x + 0.14, y: y + 0.14, w: 1.77, h: 1.32, paraSpaceAfter: 4 });
  });
  const b = img(s, "movie2", 5.0, 1.5, 4.5, 2.9, { alt: "Ağaçlar arasında uçan dronlar" });
  text(s, [{ text: "Gerçek: ", options: { bold: true, color: C.accent2 } }, { text: "bu makaledeki sürü, ağaçların arasında" }],
    { x: 5.0, y: b.y + b.h + 0.1, w: 4.5, h: 0.4, fontSize: SIZE.small });
  cite(s, "Film örnekleri makalenin girişinden; fotoğraf: Zhou vd. (2022), Movie 2");
  note(s, 50, "Makale çok hoş bir yerden açılıyor: bilim kurgu filmlerinden. Prometheus'ta astronotlar bilinmeyen bir uzay gemisini keşfetmek için küçük uçan sondalar salıyor. Ender'in Oyunu'nda dron sürüsü gemiye kalkan oluyor. Star Wars ve Blade Runner 2049'da gökdelenlerin arasında kalabalık ama son derece düzenli bir hava trafiği var. Yazarlar diyor ki bu filmler pek çok araştırmacıya ilham verdi ve biz o geleceğe bir adım attık. Sağdaki fotoğraf filmden değil, makaleden: gerçek dronlar, gerçek ağaçlar.");
}

// 3. Çarpıcı sayılar
{
  const s = newSlide("ICERIK"); crumb(s, "Problem");
  title(s, "Dronlar ucuzladı ve yaygınlaştı: popüler bir modelin parçaları yaklaşık 135 dolar");
  const st = [
    ["≈ 135 $", "DJI Mavic Air 2'nin parça maliyeti (Nikkei, 2021)"],
    ["10 km", "Aynı modelin iletişim menzili; engelden kaçınma ve takip de var"],
    ["500 milyar $", "2028 için öngörülen dron pazarı değeri (Grand View Research, 2021)"],
  ];
  st.forEach((t, i) => stat(s, M + i * 3.07, 1.6, 2.86, 2.4, t[0], t[1], { bigSize: 28, smallSize: SIZE.label, bigColor: i === 0 ? C.accent2 : C.text2 }));
  text(s, "Tek dron ucuz ve yetenekli; şimdiki soru, çok sayıda dronun birlikte ne yapabileceği", { x: M, y: 4.3, w: 9.0, h: 0.6, fontSize: SIZE.sub, color: C.text1 });
  cite(s, "Zhou vd. (2022), Giriş; Nikkei (2021); Grand View Research (2021)");
  note(s, 40, "Neden şimdi bu konuyu konuşuyoruz? Çünkü dronlar inanılmaz ucuzladı. Nikkei'nin yaptığı bir söküm analizine göre, en çok satan modellerden biri olan DJI Mavic Air 2'nin parçalarının toplam maliyeti yaklaşık 135 dolar. Bu dronun 10 kilometre iletişim menzili, engelden kaçınma ve takip özelliği de var. Pazarın 2028'de 500 milyar dolara ulaşacağı öngörülüyor. Yani tek bir dron artık ucuz ve akıllı. Asıl merak edilen, çok sayıda dronun birlikte neler yapabileceği.", { atla: true });
}

// 4. Uygulamalar
{
  const s = newSlide("ICERIK"); crumb(s, "Problem");
  title(s, "Dron sürüleri pek çok alanda işe yarar, ama sık ve bilinmeyen ortamlara henüz giremiyor");
  const cards = [
    ["Afet yardımı", "Arama, yönlendirme, malzeme ulaştırma"],
    ["Biyolojik gözlem", "İnsan teması olmadan dar alan incelemesi"],
    ["Yoğun hava trafiği", "Binalar arasında güvenli taşıma"],
    ["Ortak taşıma", "Tek dronun kaldıramadığı yükler"],
  ];
  cards.forEach((c, i) => {
    const x = M + (i % 2) * 2.85, y = 1.5 + Math.floor(i / 2) * 1.75;
    rect(s, x, y, 2.65, 1.55, { fill: C.background2, name: "Uygulama " + c[0] });
    text(s, [
      { text: c[0], options: { bold: true, fontSize: SIZE.sub, color: C.text2, breakLine: true } },
      { text: c[1], options: { fontSize: SIZE.label } },
    ], { x: x + 0.15, y: y + 0.15, w: 2.35, h: 1.25, paraSpaceAfter: 4 });
  });
  rect(s, 6.35, 1.5, 3.15, 3.3, { line: C.text2, lineW: 1.5, name: "Ortak engel" });
  text(s, "Ortak engel", { x: 6.55, y: 1.65, w: 2.8, h: 0.4, fontSize: SIZE.body, bold: true, color: C.text2 });
  text(s, bullets(["Önceden bilinmeyen ortam", "30 cm'ye inen dar geçitler", "Komşu dronlarla çarpışma riski"]),
    { x: 6.55, y: 2.15, w: 2.8, h: 2.5, fontSize: SIZE.sub, paraSpaceAfter: 10 });
  cite(s, "Zhou vd. (2022), Giriş");
  note(s, 45, "Peki sürüler ne işe yarar? Makale dört örnek veriyor. Deprem ya da sel sonrasında mahsur kalan insanları aramak, onlara yol göstermek ve malzeme taşımak. Biyologların bir ekosisteme dokunmadan dar alanları incelemesi. Binaların arasında yoğun bir hava trafiği; makale burada Mars'a inen keşif araçlarını bile örnek veriyor. Son olarak tek bir dronun kaldıramayacağı bir yükü birkaç dronun birlikte taşıması. Bunların hepsinde ortak bir engel var, sağda görüyorsunuz: ortam önceden bilinmiyor, geçitler çok dar ve her dron komşularına da çarpmamak zorunda.");
}

// 5. Tek dron vs sürü
{
  const s = newSlide("ICERIK"); crumb(s, "Problem");
  title(s, "Tek bir dronun ormanda uçması büyük ölçüde çözüldü; zor olan sürünün birlikte uçması");
  const col = (x, head, color, items, n) => {
    rect(s, x, 1.5, 4.35, 3.4, n === 1 ? { fill: C.background2, name: head } : { line: C.accent2, lineW: 1.5, name: head });
    for (let i = 0; i < n; i++) {
      const cx = x + 0.35 + (n === 1 ? 0 : (i % 4) * 0.32), cy = 1.72 + (n === 1 ? 0 : Math.floor(i / 4) * 0.3);
      s.addShape(pres.shapes.OVAL, { x: cx, y: cy, w: 0.22, h: 0.22, fill: { color: color }, line: { type: "none" }, objectName: "Dron simgesi" });
    }
    text(s, head, { x: x + (n === 1 ? 0.75 : 1.75), y: 1.66, w: 2.5, h: 0.4, fontSize: SIZE.sub, bold: true, color });
    text(s, bullets(items), { x: x + 0.3, y: 2.45, w: 3.85, h: 2.35, fontSize: SIZE.label, paraSpaceAfter: 6 });
  };
  col(M, "Tek dron: olgun", C.text2, ["Çevik uçuş kontrolü", "Kamera + IMU ile konum (VIO)", "Olasılıksal haritalama", "Engelden kaçınma"], 1);
  col(5.15, "Sürü: açık sorun", C.accent2, ["Komşulardan da kaçınma", "Aynı dar geçide birlikte girme", "Merkezsiz koordinasyon", "Hepsini küçük gövdeye sığdırma"], 8);
  cite(s, "Zhou vd. (2022), Giriş");
  note(s, 40, "Burada önemli bir ayrım var. Tek bir dronun kendi başına uçması artık büyük ölçüde çözülmüş bir problem: çevik kontrol, kamera ve ivme sensörüyle konum bulma, harita çıkarma, engelden kaçma, hepsi olgun. Ama aynı şeyi sürüyle yapmak çok daha zor. Her dron hem ağaçlardan hem de komşularından kaçmak zorunda. Bazen on dronun aynı dar boşluktan geçmesi gerekiyor. Ortada bir yönetici bilgisayar yok ve bütün bunlar avuç içi kadar bir gövdeye sığmalı. Makale tam olarak bu sağdaki kutuyu çözmeye çalışıyor.");
}

// 6. TEEM
{
  const s = newSlide("ICERIK"); crumb(s, "Problem");
  title(s, "Dört temel gereksinim (TEEM) birbiriyle çelişiyor: birini iyileştirmek ötekini zorluyor");
  const B = [["T", "Yörünge optimalliği", 0.5, 1.55], ["E", "Genişletilebilirlik", 3.3, 1.55], ["E", "Düşük hesaplama maliyeti", 0.5, 3.8], ["M", "Minyatür boyut", 3.3, 3.8]];
  seg(s, 2.7, 2.05, 3.3, 2.05, { arrow: true, beginArrow: true });
  seg(s, 2.7, 4.3, 3.3, 4.3, { arrow: true, beginArrow: true });
  seg(s, 1.6, 2.55, 1.6, 3.8, { arrow: true, beginArrow: true });
  seg(s, 4.4, 2.55, 4.4, 3.8, { arrow: true, beginArrow: true });
  B.forEach((b) => {
    rect(s, b[2], b[3], 2.2, 1.0, { fill: C.text2, name: "TEEM " + b[1] });
    text(s, [
      { text: b[0], options: { bold: true, fontSize: 24, color: C.background1, breakLine: true } },
      { text: b[1], options: { fontSize: SIZE.small, color: C.background1, bold: true } },
    ], { x: b[2] + 0.18, y: b[3], w: 1.9, h: 1.0, valign: "middle" });
  });
  text(s, "gerilim", { x: 2.0, y: 2.95, w: 1.0, h: 0.3, fontSize: SIZE.small, italic: true, color: C.accent3, align: "center" });
  text(s, "Neden çelişiyor?", { x: 6.0, y: 1.55, w: 3.5, h: 0.4, fontSize: SIZE.body, bold: true, color: C.accent1 });
  text(s, bullets(["Daha iyi yörünge → daha çok deneme → daha uzun hesap", "Genel formül → probleme özel hızlandırma kaybolur", "Küçük gövde → küçük bilgisayar ve batarya"]),
    { x: 6.0, y: 2.1, w: 3.5, h: 2.8, fontSize: SIZE.sub, paraSpaceAfter: 12 });
  cite(s, "Zhou vd. (2022), Giriş. TEEM: trajectory optimality, extensibility, economical computing, miniature size");
  note(s, 50, "Yazarlar bu gereksinimleri dört harfle topluyor: TEEM. T, yörüngenin olabildiğince iyi olması: kısa, düzgün, hızlı. E, sistemin farklı görevlere uyarlanabilmesi. İkinci E, hesaplamanın ucuz olması, çünkü küçük bir bilgisayarda çalışacak. M de minyatür boyut. Sorun şu ki bu dördü birbirini çekiştiriyor. Daha iyi yörünge istiyorsanız daha çok deneme yapmanız gerekir, bu da hesap süresini uzatır. Sistemi her göreve uyacak kadar genel yazarsanız, belirli bir göreve özel hızlandırmalardan vazgeçersiniz. Gövde küçüldükçe de bilgisayar ve batarya küçülür. Makalenin iddiası bu dördünü aynı anda sağlamak.");
}

// 7. Önceki çalışmalar tablosu
{
  const s = newSlide("ICERIK"); crumb(s, "Problem");
  title(s, "Önceki sürüler önceden programlı, reaktif ya da merkezi; hiçbiri TEEM'i birlikte sağlamıyor");
  const hdr = (t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 } } });
  const rows = [
    [hdr("Yaklaşım"), hdr("Örnek"), hdr("Sınırlılık")],
    ["Işık gösterisi sürüleri", "Intel, CollMot", "Önceden programlı rota; engel algısı yok"],
    ["Reaktif sürü (potansiyel alan)", "Vásárhelyi vd., 2018", "Tutarsız hareket; komşu mesafesi 10 m'den fazla"],
    ["MPC + potansiyel alan", "Soria vd., 2021", "Ağır hesap; merkezi yapı"],
    ["Böcek benzeri reaktif (SGBA)", "McGuire vd., 2019", "30 g ama düşük verim; basit görevler"],
    ["EGO-Swarm (önceki çalışma)", "Zhou vd., 2021", "Yalnızca 3 dron; zaman profili ayarlanamıyor"],
  ];
  rows.push(["Bu çalışma", "Zhou vd., 2022", "Uzamsal-zamansal optimizasyon; bütün hesap dronda"].map((t) => ({ text: t, options: { bold: true, color: C.accent2, fill: { color: C.background2 } } })));
  s.addTable(rows, { x: M, y: 1.5, w: 9.0, colW: [2.75, 2.05, 4.2], rowH: 0.46, fontSize: 15, color: C.text1, valign: "middle",
    margin: [0.03, 0.1, 0.03, 0.1], border: { type: "solid", pt: 0.75, color: C.accent4 }, objectName: "Önceki çalışmalar tablosu" });
  cite(s, "Zhou vd. (2022), Giriş ve Fig. 1B'deki nitel karşılaştırma");
  note(s, 60, "Daha önce neler denenmiş? Işık gösterilerinde yüzlerce dron görüyorsunuz ama onlar uydu konumuyla önceden çizilmiş bir rotayı izliyor, engel diye bir şey bilmiyorlar. Vásárhelyi ve arkadaşlarının sürüsü kuş sürülerini taklit ediyor; basit itme-çekme kurallarıyla çalışıyor ama hareketler tutarsız ve güvenli kalmak için dronlar arasında ortalama 10 metreden fazla mesafe gerekiyor. Ormanda bu imkânsız. Soria ve arkadaşları daha akıllı bir kontrol ekliyor ama hesap ağır ve bir merkez bilgisayar gerekiyor. McGuire'ın dronları sadece 30 gram ama ancak basit görevleri yapabiliyor. Yazarların kendi önceki çalışması EGO-Swarm ormanda uçtu, ama yalnızca 3 dronla ve hızı ayarlayamadan. Turuncu satır bugün anlatacağım çalışma.");
}

// 8. Radar
{
  const s = newSlide("ICERIK"); crumb(s, "Problem");
  title(s, "Radar grafiğinde önerilen sistem beş eksenin dördünde en dışta; yalnızca ağırlıkta geride");
  const b = img(s, "fig1B", M, 1.4, 5.2, 3.65, { align: "left", alt: "Beş eksenli radar karşılaştırma grafiği" });
  text(s, "Nasıl okunur?", { x: 6.0, y: 1.5, w: 3.5, h: 0.4, fontSize: SIZE.body, bold: true, color: C.accent1 });
  text(s, bullets([
    "Eksenler: optimallik, genişletilebilirlik, boyut, hesap yeri, ağırlık",
    "Merkezden uzaklaştıkça daha iyi",
    ["Yeşil (bu çalışma): ", "dört eksende en dışta"],
    ["Ağırlık: ", "30 g'lık SGBA daha hafif"],
  ]), { x: 6.0, y: 2.0, w: 3.5, h: 3.0, fontSize: SIZE.label, paraSpaceAfter: 8 });
  cite(s, "Kaynak: Zhou vd. (2022), Fig. 1B; karşılaştırılan çalışmalar önceki slayttaki tablodadır");
  note(s, 45, "Bu tabloyu yazarlar tek bir grafikte de özetlemiş. Beş eksen var: yörünge ne kadar optimal, sistem ne kadar genişletilebilir, dron ne kadar küçük, hesap dronun üstünde mi yapılıyor ve dron ne kadar hafif. Merkezden dışa doğru gittikçe daha iyi. Yeşil alan bu çalışma: beş eksenin dördünde en dışta. Dürüst olmak gerekirse ağırlıkta geride, çünkü sarı alan, yani SGBA, sadece 30 gram. Bu dronlar ise 300 gramın altında. Yani yazarlar biraz ağırlıktan vazgeçip karşılığında çok daha fazla yetenek alıyor.", { atla: true });
}

// 9. Araştırma sorusu
{
  const s = newSlide("ICERIK"); crumb(s, "Problem");
  title(s, "Araştırma sorusu: Sürü, bilinmeyen sık bir ormanda yalnızca kendi sensörleriyle uçabilir mi?");
  rect(s, 0.9, 1.5, 8.2, 1.5, { fill: C.background2, line: C.accent1, lineW: 1.5, name: "Soru kutusu" });
  text(s, "Avuç içi büyüklüğündeki dronlardan oluşan bir sürü, bilinmeyen ve sık bir ormanda yalnızca kendi sensör ve bilgisayarlarıyla güvenli, verimli ve koordineli uçabilir mi?",
    { x: 1.15, y: 1.5, w: 7.7, h: 1.5, fontSize: SIZE.body, color: C.text2, align: "center", valign: "middle" });
  ["GPS yok", "Harici konumlama yok", "Önceden harita yok"].forEach((t, i) => {
    const x = 0.9 + i * 2.8;
    rect(s, x, 3.2, 2.6, 0.48, { line: C.accent1, name: "Kısıt " + t });
    text(s, t, { x, y: 3.2, w: 2.6, h: 0.48, fontSize: SIZE.label, bold: true, color: C.accent1, align: "center", valign: "middle" });
  });
  text(s, [
    { text: "Katkı: ", options: { bold: true, color: C.accent2 } },
    { text: "Şekli ve zamanı birlikte optimize eden, göreve göre genişletilebilen, milisaniyeler içinde çözen bir planlayıcı ve açık kaynak avuç içi sürü platformu" },
  ], { x: 0.9, y: 3.95, w: 8.2, h: 1.1, fontSize: SIZE.sub });
  cite(s, "Zhou vd. (2022), Özet ve Giriş");
  note(s, 40, "Böylece makalenin sorusuna geliyoruz. Avuç içi büyüklüğündeki dronlardan oluşan bir sürü, bilinmeyen ve sık bir ormanda, yalnızca kendi sensörleri ve kendi bilgisayarlarıyla güvenli, verimli ve koordineli uçabilir mi? Üç şeyin olmadığına dikkat edin: GPS yok, odaya kurulmuş kamera sistemi gibi harici konumlama yok, önceden çıkarılmış harita yok. Makalenin cevabı evet ve iki parçalı bir katkı sunuyor: bir yörünge planlayıcı ve bu planlayıcıyı taşıyan, yazılımı ve donanımı herkese açık bir dron platformu.");
}

// =====================================================================
section("İlham");
// 10. Kuş mu böcek mi?
{
  const s = newSlide("ICERIK"); crumb(s, "İlham");
  title(s, "Kuş mu böcek mi? Yazarlar refleks yerine planlamayı, yani kuşun yolunu seçiyor");
  const col = (x, head, items, method, hl) => {
    rect(s, x, 1.5, 4.35, 3.4, hl ? { line: C.accent2, lineW: 2, name: head } : { fill: C.background2, name: head });
    text(s, head, { x: x + 0.25, y: 1.62, w: 3.9, h: 0.6, fontSize: 28, bold: true, color: hl ? C.accent2 : C.text2 });
    text(s, bullets(items), { x: x + 0.25, y: 2.3, w: 3.9, h: 1.65, fontSize: SIZE.label, paraSpaceAfter: 6 });
    text(s, [{ text: "Dronda karşılığı: ", options: { bold: true } }, { text: method }], { x: x + 0.25, y: 4.0, w: 3.9, h: 0.75, fontSize: SIZE.small, color: hl ? C.accent2 : C.text1 });
  };
  col(M, "Böcek", ["Kısa vadeli refleks", "Az hesap, çok hafif beden", "Engeli görünce ani dönüş"], "reaktif yöntemler (ör. SGBA)", false);
  col(5.15, "Kuş", ["Uzun vadeli, düzgün manevra", "Keskin görüş, büyük beyin", "Yolu ve hızı birlikte ayarlar"], "yörünge planlama (bu çalışma)", true);
  cite(s, "Zhou vd. (2022), Giriş; Altshuler ve Srinivasan (2018)");
  note(s, 50, "Şimdi en sevdiğim kısma geliyoruz. Doğada bir ormanda çarpmadan uçmanın iki yolu var. Böcekler refleksle uçar: bir engeli görünce aniden döner. Çok az hesap gerekir, bu yüzden bedenleri minicik olabilir. Kuşlar ise planlar: keskin bir görüşleri ve daha büyük bir beyinleri var, yolu ve hızı birlikte ayarlayarak düzgün manevralar yapar. Robotik literatüründe de aynı ikilik var: böcek gibi reaktif yöntemler ve kuş gibi yörünge planlayan yöntemler. Sizce yazarlar hangisini seçti? Evet, kuşu. Çünkü sık bir ormanda verim ve esneklik için planlama gerekiyor.");
}

// 11. Kuş ↔ dron eşlemesi
{
  const s = newSlide("ICERIK"); crumb(s, "İlham");
  title(s, "Dron bir kuş gibi tasarlandı: gözler kamera, iç kulak IMU, beyin planlayıcı");
  const rows = [
    ["Gözler", "Derinlik ve gri tonlu kamera"],
    ["İç kulak (denge)", "IMU: ivme ve dönüş sensörü"],
    ["Yolu ve hızı birlikte ayarlamak", "Uzamsal-zamansal optimizasyon"],
    ["Kuşta olmayan: kablosuz iletişim", "Dronlar yörüngelerini birbirine yayınlar"],
  ];
  rows.forEach((r, i) => {
    const y = 1.68 + i * 0.82, last = i === 3;
    rect(s, M, y, 3.8, 0.66, { fill: last ? C.accent5 : C.background2, name: "Kuş " + r[0] });
    text(s, r[0], { x: M + 0.18, y, w: 3.5, h: 0.66, fontSize: SIZE.label, bold: true, color: C.text2, valign: "middle" });
    seg(s, 4.4, y + 0.33, 5.1, y + 0.33, { color: C.text2, width: 2, arrow: true });
    rect(s, 5.2, y, 4.3, 0.66, { fill: last ? C.accent5 : C.text2, name: "Dron " + r[1] });
    text(s, r[1], { x: 5.38, y, w: 4.0, h: 0.66, fontSize: SIZE.label, color: last ? C.text1 : C.background1, valign: "middle" });
  });
  text(s, "Kuş", { x: M, y: 1.38, w: 3.8, h: 0.3, fontSize: SIZE.small, bold: true, color: C.accent3 });
  text(s, "Dron", { x: 5.2, y: 1.38, w: 4.3, h: 0.3, fontSize: SIZE.small, bold: true, color: C.accent3 });
  cite(s, "Zhou vd. (2022), 'Proposed systematic solution' bölümü");
  note(s, 45, "Yazarlar bu benzetmeyi sonuna kadar götürüyor. Kuş kısa mesafede gözlerine ve iç kulağındaki denge sistemine güvenir. Dronda da aynısı var: kameralar göz, IMU denen ivme ve dönüş sensörü iç kulak. Kuş bir engelden kaçarken hem yolunu hem hızını aynı anda ayarlar ve enerji harcamamak için düzgün uçar; dronun planlayıcısı da tam bunu yapıyor. Ama dronların kuşlardan üstün olduğu bir nokta var, en alttaki sarı satır: kablosuz iletişim. Her dron nereye gideceğini komşularına söyleyebiliyor. Kuşlar bunu yapamaz.", { atla: true });
}

// =====================================================================
section("Yöntem");
// 12. Ayraç
{
  const s = newSlide("BOLUM");
  s.addText("Bölüm 2", { placeholder: "bolumno", bullet: false });
  curTitle = "Yöntem: avuç içi bir dron ve onu yöneten planlayıcı";
  s.addText(curTitle, { placeholder: "title" });
  s.addText("Önce donanım, sonra mimari, sonra da bütün işi yapan fikir: şekil ve zaman birlikte", { placeholder: "teaser", bullet: false });
  note(s, 10, "Problemi gördük. Şimdi çözüme geçelim: önce dronun kendisi, sonra sistemin nasıl kurulduğu, sonra da bütün işi yapan asıl fikir.");
}

// 13. Donanım fotoğrafı
{
  const s = newSlide("ICERIK"); crumb(s, "Yöntem");
  title(s, "Avuç içi platform: kamera, UWB ve bilgisayar 300 gramın altındaki gövdeye sığıyor");
  img(s, "fig2A", M, 1.4, 9.0, 2.75, { alt: "Dronun donanım bileşenleri" });
  const chips = [["Xavier NX", "dron üstü bilgisayar"], ["RealSense D430", "derinlik kamerası"], ["UWB", "dronlar arası mesafe"], ["PX4", "uçuş kontrol birimi"]];
  chips.forEach((c, i) => {
    const x = M + i * 2.29;
    rect(s, x, 4.3, 2.14, 0.75, { fill: C.background2, name: "Parça " + c[0] });
    text(s, [{ text: c[0], options: { bold: true, color: C.text2, breakLine: true } }, { text: c[1], options: { fontSize: 12 } }],
      { x: x + 0.12, y: 4.33, w: 1.9, h: 0.7, fontSize: SIZE.small, valign: "middle" });
  });
  cite(s, "Kaynak: Zhou vd. (2022), Fig. 2A");
  note(s, 45, "İşte dronun kendisi. Solda yandan, sağda üstten görüyorsunuz. En üstte NVIDIA Xavier NX var; kredi kartından küçük ama 6 çekirdekli işlemcisi ve 384 çekirdekli ekran kartıyla bütün hesabı yapan beyin bu. Önde Intel RealSense derinlik kamerası, yani gözler. UWB modülü dronların birbirine olan mesafesini ölçüyor; buna birazdan döneceğiz. Altta da PX4 yazılımıyla çalışan küçük uçuş kontrol kartı. Hepsi 300 gramın altında bir gövdeye sığıyor.");
}

// 14. Ölçek
{
  const s = newSlide("ICERIK"); crumb(s, "Yöntem");
  title(s, "Ne kadar küçük? Dolu bir içecek kutusundan hafif, 11 dakika uçabiliyor");
  const st = [
    ["114 mm", "Çapraz motor mesafesi: avucunuza sığar"],
    ["< 300 g", "Toplam ağırlık; dolu bir içecek kutusundan hafif"],
    ["11 dk", "Uçuş süresi, 100 g'lık batarya ile"],
    ["2,4 kat", "Motorların itkisi, dronun ağırlığının 2,4 katı"],
    ["~120 W", "Havada asılı kalırken harcanan güç"],
    ["< %40", "CPU ve GPU kullanımı (video deneyi hariç)"],
  ];
  const cw = 2.85, gap = (9.0 - 3 * cw) / 2;
  st.forEach((t, i) => stat(s, M + (i % 3) * (cw + gap), 1.5 + Math.floor(i / 3) * 1.75, cw, 1.55, t[0], t[1], { bigColor: i < 2 ? C.accent2 : C.text2 }));
  cite(s, "Zhou vd. (2022), 'Palm-sized drone hardware' bölümü ve Fig. 2C");
  note(s, 45, "Ne kadar küçük olduğunu biraz somutlaştıralım. Motorlar arası çapraz mesafe 114 milimetre; avucunuza sığıyor. Toplam ağırlık 300 gramın altında; yani elinizdeki dolu bir içecek kutusundan daha hafif. Bunun 100 gramı batarya ve 11 dakika uçuş veriyor. Motorlar dronun kendi ağırlığının 2,4 katı itki üretiyor, bu da ani manevralar için yeterli pay bırakıyor. Havada asılı dururken yaklaşık 120 watt harcıyor. En güzeli sağ alttaki sayı: işlemci ve ekran kartı yüzde 40'ın altında çalışıyor, yani başka görevler için yer var.");
}

// 15. Mimari
{
  const s = newSlide("ICERIK"); crumb(s, "Yöntem");
  title(s, "Her dron tam otonom; dronlar arasındaki tek bağlantı yörüngelerin yayınlanması");
  rect(s, M, 1.45, 6.35, 3.45, { line: C.accent1, lineW: 1.5, name: "Dron i çerçevesi" });
  text(s, "Dron i (her dron aynı yapıda)", { x: 0.7, y: 1.55, w: 5, h: 0.3, fontSize: SIZE.small, bold: true, color: C.accent1 });
  [["Algılama", "Derinlik kamerası"], ["Haritalama", "Olasılıksal ızgara"], ["Planlama", "MINCO + cezalar"], ["Kontrol", "PX4 uçuş birimi"]].forEach((m, i) => {
    const x = 0.7 + i * 1.53, core = i === 2;
    rect(s, x, 2.0, 1.38, 1.0, { fill: core ? C.text2 : C.background2, name: "Modül " + m[0] });
    text(s, [{ text: m[0], options: { bold: true, fontSize: SIZE.label, breakLine: true } }, { text: m[1], options: { fontSize: 13 } }],
      { x: x + 0.05, y: 2.0, w: 1.28, h: 1.0, align: "center", valign: "middle", color: core ? C.background1 : C.text1 });
    if (i < 3) seg(s, x + 1.38, 2.5, x + 1.53, 2.5, { color: C.text2, arrow: true });
  });
  rect(s, 0.7, 3.6, 3.0, 1.0, { fill: C.background2, name: "Modül Konum" });
  text(s, [{ text: "Konum kestirimi", options: { bold: true, fontSize: SIZE.label, breakLine: true } }, { text: "VIO + UWB ile kayma düzeltme", options: { fontSize: 13 } }],
    { x: 0.75, y: 3.6, w: 2.9, h: 1.0, align: "center", valign: "middle" });
  poly(s, [[3.7, 4.1], [4.45, 4.1], [4.45, 3.0]], { color: C.text2, arrow: true });
  [["Dron j", 1.75], ["Dron k", 3.05]].forEach(([n, y]) => {
    rect(s, 7.45, y, 2.05, 0.7, { line: C.accent1, name: n });
    text(s, n, { x: 7.45, y, w: 2.05, h: 0.7, fontSize: SIZE.label, bold: true, color: C.accent1, align: "center", valign: "middle" });
  });
  seg(s, 6.85, 2.3, 7.45, 2.1, { color: C.accent2, dash: "dash", arrow: true, beginArrow: true });
  seg(s, 6.85, 2.7, 7.45, 3.4, { color: C.accent2, dash: "dash", arrow: true, beginArrow: true });
  text(s, "Yörüngeler (MINCO parametreleri) kablosuz ağda yayınlanır", { x: 7.15, y: 3.95, w: 2.35, h: 0.95, fontSize: SIZE.small, color: C.accent2 });
  cite(s, "Zhou vd. (2022), Fig. 2B ve 'System architecture' bölümü");
  note(s, 50, "Sistemin mimarisi bu. Kutunun içi tek bir dron ve her dron aynı yapıda. Kamera ortamı görüyor, haritalama modülü bir doluluk haritası çıkarıyor, planlayıcı yörüngeyi hesaplıyor, kontrol kartı da o yörüngeyi izliyor. Konum kamera ve IMU ile bulunuyor; zamanla biriken hata UWB ile düzeltiliyor. Dikkat edin, ortada merkez bir bilgisayar yok. Dronlar arasındaki tek bağlantı sağdaki turuncu kesik çizgiler: her dron kendi planladığı yörüngeyi kablosuz ağda yayınlıyor. Böylece herkes komşusunun birkaç saniye sonra nerede olacağını biliyor. Merkez olmadığı için sistem tek bir bilgisayara da bağımlı değil. Bu yayın işine birazdan ayrı bir bölümde döneceğiz, çünkü sürüyü sürü yapan şey o.");
}

// 16. Bilmece
{
  const s = newSlide("ICERIK"); crumb(s, "Yöntem");
  title(s, "Bir bilmece: iki dron aynı anda tek bir dar boşluğa gelirse ne yapmalı?");
  const opts = [["A", "Biri dolanıp sırasını beklesin"], ["B", "Biri yükselip üstten geçsin"], ["C", "Biri yavaşlasın, sırayla geçsinler"]];
  opts.forEach((o, i) => {
    const x = M + i * 3.07;
    rect(s, x, 1.7, 2.86, 2.6, { fill: C.background2, name: "Seçenek " + o[0] });
    text(s, o[0], { x, y: 1.85, w: 2.86, h: 0.9, fontSize: 48, bold: true, color: C.accent1, align: "center" });
    text(s, o[1], { x: x + 0.2, y: 2.9, w: 2.46, h: 1.2, fontSize: SIZE.sub, align: "center", color: C.text1 });
  });
  text(s, "Salona soru: elinizi kaldırın!", { x: M, y: 4.55, w: 9.0, h: 0.4, fontSize: SIZE.label, italic: true, color: C.accent3 });
  cite(s, "Zhou vd. (2022), 'Fly through dense forest' ve 'Benchmark comparisons' bölümlerinden uyarlanmıştır");
  note(s, 40, "Şimdi size bir soru. (Salona dönün.) İki dron aynı anda tek bir dar boşluğa geliyor. Ne yapmalılar? A: biri dolanıp sırasını beklesin. B: biri yükselip üstten geçsin. C: biri yavaşlasın ve sırayla geçsinler. Elinizi kaldırın. (Birkaç saniye bekleyin, sayıları yorumlayın.) B'yi seçenler için küçük bir ipucu: makale irtifa değiştirmenin hem pervane rüzgârı yüzünden riskli hem de enerji kaybı olduğunu söylüyor. Cevap bir sonraki slaytta.");
}

// 17. Cevap şeması
{
  const s = newSlide("ICERIK"); crumb(s, "Yöntem");
  title(s, "Doğru cevap C: şekil ve zaman birlikte optimize edilince dronlar yavaşlayıp sıraya giriyor");
  const panel = (ox, label, labelColor, temporal) => {
    const oy = 1.45;
    rect(s, ox, oy, 4.35, 3.05, { line: C.accent4, lineW: 1, rounded: false, name: "Panel " + label });
    text(s, label, { x: ox + 0.15, y: oy + 0.1, w: 4.05, h: 0.3, fontSize: SIZE.small, bold: true, color: labelColor });
    rect(s, ox + 2.05, oy + 0.5, 0.22, 0.85, { fill: C.accent3, rounded: false, name: "Engel üst" });
    rect(s, ox + 2.05, oy + 1.85, 0.22, 1.05, { fill: C.accent3, rounded: false, name: "Engel alt" });
    const G = [ox + 2.16, oy + 1.6];
    rect(s, ox + 3.75, oy + 1.45, 0.3, 0.3, { line: C.text2, lineW: 1.5, name: "Hedef" });
    poly(s, [[ox + 0.57, oy + 1.0], G, [ox + 3.73, oy + 1.6]], { color: C.text2, width: 1.75, arrow: true });
    if (!temporal) {
      poly(s, [[ox + 0.57, oy + 2.3], [ox + 1.45, oy + 2.75], [ox + 1.05, oy + 2.9], [ox + 0.75, oy + 2.6], [ox + 1.35, oy + 2.15], [G[0] - 0.08, G[1] + 0.08]],
        { color: C.accent1, width: 1.75, dash: "dash", arrow: true });
      text(s, "B dolanarak sırasını bekliyor", { x: ox + 2.4, y: oy + 2.1, w: 1.85, h: 0.65, fontSize: SIZE.small, color: C.accent3 });
    } else {
      seg(s, ox + 0.57, oy + 2.3, G[0] - 0.08, G[1] + 0.08, { color: C.accent2, width: 1.75, dash: "dash", arrow: true });
      text(s, "B yavaşlıyor, boşluktan sırayla geçiyor", { x: ox + 2.4, y: oy + 2.1, w: 1.85, h: 0.65, fontSize: SIZE.small, color: C.accent2 });
    }
    [["A", oy + 0.9, C.text2], ["B", oy + 2.2, C.accent1]].forEach(([n, y, col]) => {
      s.addShape(pres.shapes.OVAL, { x: ox + 0.3, y, w: 0.28, h: 0.28, fill: { color: col }, line: { type: "none" }, objectName: "Dron " + n });
      text(s, n, { x: ox + 0.3, y, w: 0.28, h: 0.28, fontSize: 11, bold: true, color: C.background1, align: "center", valign: "middle" });
    });
  };
  panel(M, "Yalnızca şekil (MADER, EGO-Swarm)", C.text1, false);
  panel(5.15, "Şekil + zaman (bu çalışma)", C.accent2, true);
  text(s, "Zaman profili de optimize edilince dronlar rotayı değil hızı değiştirerek sıraya giriyor", { x: M, y: 4.62, w: 9.0, h: 0.45, fontSize: SIZE.label });
  cite(s, "Şematik; Zhou vd. (2022) Fig. 7A ve 'Benchmark comparisons' bölümünden uyarlanmıştır");
  note(s, 55, "Doğru cevap C. Ama asıl ilginç olan, önceki planlayıcıların tam da A'yı yapması. Bir yörüngenin iki parçası var: uzaydaki şekli ve o şeklin hangi hızla izlendiğini belirleyen zaman profili. Eski planlayıcılar, soldaki gibi, yalnızca şekli değiştirebiliyor. İkinci dron hızını ayarlayamadığı için dolanarak sırasını bekliyor; bu da arkadakileri tıkıyor, hatta güvensiz yörüngelere yol açabiliyor. Bu çalışmada, sağdaki gibi, şekil ve zaman birlikte optimize ediliyor. İkinci dron sadece biraz yavaşlıyor ve boşluğa sırayla giriyor. Trafikte sağa sola kıvrılmak yerine biraz frene basmak gibi düşünebilirsiniz.");
}

// 18. Fig 7A gerçek kanıt
{
  const s = newSlide("ICERIK"); crumb(s, "Yöntem");
  title(s, "Simülasyon da aynısını gösteriyor: rakipler duvardaki boşlukta dolanıyor, bu çalışma düz geçiyor");
  const b = img(s, "fig7Atop", M, 1.5, 9.0, 1.6, { alt: "Altı dronun duvardaki boşluktan geçişi: MADER, EGO-Swarm, önerilen yöntem" });
  const caps = [["MADER", "Yörüngeler boşluğun önünde düğümleniyor", C.text1], ["EGO-Swarm", "Sonraki dronlar dolanarak bekliyor", C.text1], ["Bu çalışma", "Altı dron düz ve düzgün geçiyor", C.accent2]];
  caps.forEach((c, i) => {
    const x = M + i * 3.0;
    text(s, [{ text: c[0], options: { bold: true, color: c[2], breakLine: true } }, { text: c[1] }], { x: x + 0.1, y: b.y + b.h + 0.2, w: 2.8, h: 1.0, fontSize: SIZE.label });
  });
  text(s, "Altı dron aynı anda, ters yönlerden gelip aynı boşluktan geçiyor", { x: M, y: 4.55, w: 9.0, h: 0.4, fontSize: SIZE.small, italic: true, color: C.accent3 });
  cite(s, "Kaynak: Zhou vd. (2022), Fig. 7A (üst sıra)");
  note(s, 40, "Bu sadece benim çizdiğim bir şema değil. Makalede bunun simülasyonu var. Altı dron duvarın iki tarafından aynı anda yola çıkıyor ve hepsinin tek bir boşluktan geçmesi gerekiyor. Solda MADER: yörüngeler boşluğun önünde düğüm olmuş. Ortada yazarların önceki çalışması EGO-Swarm: sonraki dronlar dolanarak sıralarını bekliyor. Sağda bu çalışma: altı çizgi de düz ve düzgün biçimde boşluktan geçiyor. Bilmecenin cevabını gözünüzle görmüş oldunuz.");
}

// 19. MINCO
{
  const s = newSlide("ICERIK"); crumb(s, "Yöntem");
  title(s, "MINCO uzamı ve zamanı ayırıyor; böylece yörünge birkaç milisaniyede optimize edilebiliyor");
  [["q, T", "ara noktalar, parça süreleri", 0.5], ["c, Tₚ", "polinom katsayıları, zaman profili", 2.45], ["J, ∇J", "toplam ceza ve gradyanı", 4.4]].forEach((b, i) => {
    rect(s, b[2], 1.6, 1.55, 1.1, { fill: i === 0 ? C.text2 : C.background2, name: "MINCO adım " + (i + 1) });
    text(s, [{ text: b[0], options: { bold: true, fontSize: SIZE.body, color: i === 0 ? C.background1 : C.text2, breakLine: true } }, { text: b[1], options: { fontSize: SIZE.small, color: i === 0 ? C.background1 : C.text1 } }],
      { x: b[2] + 0.1, y: 1.65, w: 1.35, h: 1.0, align: "center", valign: "middle" });
  });
  seg(s, 2.05, 2.15, 2.45, 2.15, { color: C.text2, arrow: true });
  seg(s, 4.0, 2.15, 4.4, 2.15, { color: C.text2, arrow: true });
  [2.05, 4.0].forEach((ax) => text(s, "O(M)", { x: ax, y: 1.8, w: 0.4, h: 0.28, fontSize: 11, bold: true, color: C.accent1, align: "center" }));
  poly(s, [[5.17, 2.7], [5.17, 3.15], [1.27, 3.15], [1.27, 2.7]], { color: C.accent1, arrow: true });
  text(s, "Gradyanlar O(M) sürede geri yayılır → L-BFGS ile yeni q, T", { x: 0.5, y: 3.22, w: 5.45, h: 0.35, fontSize: SIZE.small, color: C.accent1, align: "center" });
  rect(s, 0.5, 3.8, 5.45, 1.05, { fill: C.accent5, name: "MINCO açıklama" });
  text(s, "Ham polinomlarda her adımda yoğun bir matrisin tersi gerekirdi; MINCO'nun bantlı matrisi her adımı doğrusal tutuyor", { x: 0.65, y: 3.85, w: 5.15, h: 0.95, fontSize: SIZE.label, valign: "middle" });
  text(s, [{ text: "~40 dk", options: { bold: true, fontSize: 34, color: C.accent3, breakLine: true } }, { text: "Klasik zaman-optimal yörünge hesabı (Foehn vd., 2021)", options: { fontSize: SIZE.small } }], { x: 6.5, y: 1.55, w: 3.0, h: 1.4 });
  text(s, [{ text: "birkaç ms", options: { bold: true, fontSize: 34, color: C.accent2, breakLine: true } }, { text: "Bu planlayıcıda yüksek kaliteli yerel yörünge, en kısıtlı ortamda bile", options: { fontSize: SIZE.small } }], { x: 6.5, y: 3.25, w: 3.0, h: 1.6 });
  cite(s, "Zhou vd. (2022), Özet ve 'Trajectory representation'; MINCO: Wang vd. (2021); Foehn vd. (2021)");
  note(s, 60, "Peki şekil ve zamanı birlikte optimize etmek neden daha önce yapılamadı? Çünkü çok pahalı. Makale bir örnek veriyor: klasik yöntemle zaman-optimal bir yörünge hesaplamak 40 dakika kadar sürebiliyor. Uçan bir dronun 40 dakikası yok. Çözüm MINCO adlı bir yörünge gösterimi. Fikir şu: siz yalnızca iki şeyi seçiyorsunuz, yolun geçeceği ara noktalar q ve her parçanın süresi T. MINCO bunları, parça sayısıyla doğru orantılı bir sürede, yani çok hızlı, gerçek bir yörüngeye çeviriyor. Hatanın ne yöne düzeltileceği bilgisi de aynı hızla geri taşınıyor. Sonuç: en kısıtlı ortamda bile yörünge birkaç milisaniyede hazır. Bu iki sayı aynı problem değil; sadece bu işin tarihsel olarak ne kadar zor olduğunu gösteriyor.");
}

// 20. Ceza terimleri
{
  const s = newSlide("ICERIK"); crumb(s, "Yöntem");
  title(s, "Her gereksinim bir ceza terimi; yeni görev eklemek tek bir parça eklemek demek");
  const sub = (t) => ({ text: t, options: { subscript: true } });
  text(s, [
    { text: "min  J  =  ", options: { bold: true } }, { text: "λ" }, sub("s"), { text: "J" }, sub("s"), { text: " + λ" }, sub("t"), { text: "J" }, sub("t"),
    { text: " + λ" }, sub("d"), { text: "J" }, sub("d"), { text: " + λ" }, sub("o"), { text: "J" }, sub("o"), { text: " + λ" }, sub("w"), { text: "J" }, sub("w"),
    { text: "  + λ" }, sub("f"), { text: "J" }, sub("f"), { text: " / λ" }, sub("v"), { text: "J" }, sub("v"),
  ], { x: M, y: 1.5, w: 9.0, h: 0.55, fontSize: SIZE.body, color: C.text2, objectName: "Amaç fonksiyonu" });
  const tiles = [["s", "Düzgünlük (sarsıntı)"], ["t", "Toplam süre"], ["d", "Dinamik uygunluk"], ["o", "Engelden kaçınma"], ["w", "Sürü içi çarpışma"], ["f", "Formasyon"], ["v", "Hedef takibi"]];
  const tw = (9.0 - 6 * 0.12) / 7;
  tiles.forEach((t, i) => {
    const x = M + i * (tw + 0.12), task = i >= 5;
    rect(s, x, 2.3, tw, 1.35, task ? { line: C.accent1, lineW: 1.5, name: "Ceza " + t[1] } : { fill: C.text2, name: "Ceza " + t[1] });
    text(s, [{ text: "J", options: { bold: true, fontSize: SIZE.body } }, { text: t[0], options: { bold: true, fontSize: SIZE.body, subscript: true, breakLine: true } }, { text: t[1], options: { fontSize: SIZE.small } }],
      { x: x + 0.06, y: 2.38, w: tw - 0.12, h: 1.2, align: "center", color: task ? C.accent1 : C.background1, paraSpaceAfter: 8 });
  });
  text(s, "Genel amaçlı cezalar (GPP): her uçuşta", { x: M, y: 3.75, w: 6.4, h: 0.32, fontSize: SIZE.small, bold: true, color: C.text2 });
  text(s, "Göreve özel", { x: M + 5 * (tw + 0.12), y: 3.75, w: 2 * tw + 0.12, h: 0.32, fontSize: SIZE.small, bold: true, color: C.accent1 });
  text(s, [{ text: "Kısıt cezalarının ağırlığı ", options: { bold: true } }, { text: "diğer hedeflerden kat kat büyük: önce güvenlik, sonra süre ve düzgünlük" }], { x: M, y: 4.3, w: 9.0, h: 0.7, fontSize: SIZE.sub });
  cite(s, "Zhou vd. (2022), 'Constraints transcription' ve 'General purpose penalties' bölümleri, Denk. 8");
  note(s, 55, "Sistemi bu kadar esnek yapan şey bu formül. Fikir çok basit: dronun uyması gereken her kural bir ceza puanına çevriliyor ve bütün puanlar toplanıyor. Planlayıcı da toplam cezayı en küçük yapan yörüngeyi arıyor. Lacivert beş kutu her uçuşta var: yörünge düzgün olsun, kısa sürsün, dronun fiziksel sınırlarını aşmasın, engellere ve diğer dronlara çarpmasın. Sağdaki iki beyaz kutu göreve özel. Formasyon uçuşu mu istiyorsunuz? Formasyon cezasını ekleyin. Birini takip etmek mi istiyorsunuz? Takip cezasını ekleyin. Lego'ya bir parça takmak gibi. Bir de şu var: güvenlikle ilgili cezaların ağırlığı diğerlerinden kat kat büyük. Yani dron önce çarpmamayı, sonra hızlı ve düzgün uçmayı düşünüyor.");
}

// 21. Planlama döngüsü
{
  const s = newSlide("ICERIK"); crumb(s, "Yöntem");
  title(s, "Planlayıcı hiç durmuyor: birkaç saniyede bir ya da yeni engel görünce yeniden planlıyor");
  const steps = ["Kullanıcı hedef verir", "Yakında bir ara hedef seçilir", "L-BFGS aday yörünge önerir", "Ceza ve gradyan hesaplanır", "Yörünge dron tarafından izlenir", "Süre dolunca ya da yeni engelde baştan"];
  steps.forEach((t, i) => {
    const row = Math.floor(i / 3), colI = row === 0 ? i % 3 : 2 - (i % 3);
    const x = M + colI * 3.1, y = 1.55 + row * 1.75;
    rect(s, x, y, 2.7, 1.2, { fill: i === 5 ? C.accent5 : C.background2, name: "Adım " + (i + 1) });
    text(s, [{ text: String(i + 1) + "  ", options: { bold: true, fontSize: 22, color: C.accent1 } }, { text: t, options: { fontSize: SIZE.label } }],
      { x: x + 0.15, y, w: 2.45, h: 1.2, valign: "middle" });
  });
  seg(s, 3.2, 2.15, 3.6, 2.15, { color: C.text2, arrow: true });
  seg(s, 6.3, 2.15, 6.7, 2.15, { color: C.text2, arrow: true });
  seg(s, 7.85, 2.75, 7.85, 3.3, { color: C.text2, arrow: true });
  seg(s, 8.25, 3.3, 8.25, 2.75, { color: C.accent2, dash: "dash", arrow: true });
  text(s, "tekrar", { x: 8.35, y: 2.9, w: 0.8, h: 0.25, fontSize: 11, color: C.accent2 });
  seg(s, 6.7, 3.9, 6.3, 3.9, { color: C.text2, arrow: true });
  seg(s, 3.6, 3.9, 3.2, 3.9, { color: C.text2, arrow: true });
  poly(s, [[1.85, 3.3], [1.85, 3.02], [3.65, 3.02], [3.65, 2.75]], { color: C.accent2, dash: "dash", arrow: true });
  text(s, "6 → 2: yeniden planla", { x: 2.0, y: 2.8, w: 1.7, h: 0.22, fontSize: 11, color: C.accent2 });
  cite(s, "Zhou vd. (2022), 'Trajectory planning procedure' bölümü");
  note(s, 45, "Planlayıcının çalışma döngüsü de şöyle. Kullanıcı ya da üst seviye bir yazılım bir hedef veriyor. Planlayıcı o yöne doğru yakında bir ara hedef seçiyor. Sonra bir optimizasyon döngüsü başlıyor: L-BFGS denen çözücü bir aday yörünge öneriyor, ceza hesaplanıyor, çözücü yörüngeyi düzeltiyor ve bu birkaç kez dönüyor. Sonuçta çıkan yörünge dron tarafından izleniyor. Bir iki saniye geçince ya da dron yeni bir engel görünce her şey baştan başlıyor. Yani dron hiçbir zaman eski bir plana körü körüne bağlı kalmıyor. Hedef de uçuş sırasında istendiği an değiştirilebiliyor; yazarlar buna hedef kovalama diyor.", { atla: true });
}

// =====================================================================
// Dağıtık yapı: makalenin "From single to swarm", "System architecture",
// "Formation expectation", "Localization and drift correction" ve
// "Wireless communication modules" bölümlerinden
function dot(s, cx, cy, d, color, name) {
  s.addShape(pres.shapes.OVAL, { x: cx - d / 2, y: cy - d / 2, w: d, h: d, fill: { color }, line: { type: "none" }, objectName: name });
}
function card(s, x, y, w, h, head, body, o = {}) {
  rect(s, x, y, w, h, { fill: o.fill || C.background2, name: "Kart " + head });
  text(s, [{ text: head, options: { bold: true, fontSize: o.headSize || SIZE.label, color: o.headColor || C.text2, breakLine: true } }, { text: body, options: { fontSize: o.bodySize || 13 } }],
    { x: x + 0.15, y: y + 0.1, w: w - 0.3, h: h - 0.2, paraSpaceAfter: 4, valign: o.valign || "top" });
}
section("Dağıtık yapı");
// D0. Ayraç
{
  const s = newSlide("BOLUM");
  s.addText("Bölüm 3", { placeholder: "bolumno", bullet: false });
  curTitle = "Dağıtık yapı: merkez yok, her dron kendi kararını veriyor";
  s.addText(curTitle, { placeholder: "title" });
  s.addText("Ne paylaşıyorlar, komşuyu nasıl hesaba katıyorlar, kim kimi bekliyor?", { placeholder: "teaser", bullet: false });
  note(s, 15, "Şimdiye kadar tek bir dronun beynine baktık. Ama bu bir sürü: on dron aynı ormanda, aynı anda uçuyor. Kim kime ne söylüyor, kim kimi bekliyor? Bu bölüm bence makalenin en az konuşulan ama en önemli kısmı, çünkü sürüyü sürü yapan şey bu.");
}

// D1. Merkezi vs dağıtık
{
  const s = newSlide("ICERIK"); crumb(s, "Dağıtık yapı");
  title(s, "Merkezi sürüde tek bir beyin herkesi yönetir; burada her dron kendi planını yapıp komşularını dinler");
  const panel = (ox, label, labelColor, central, items) => {
    rect(s, ox, 1.45, 4.35, 3.55, central ? { line: C.accent4, lineW: 1, name: "Panel " + label } : { line: C.accent2, lineW: 1.5, name: "Panel " + label });
    text(s, label, { x: ox + 0.2, y: 1.55, w: 4.0, h: 0.32, fontSize: SIZE.label, bold: true, color: labelColor });
    const cx = ox + 2.175, cy = 2.65;
    const P = [0, 1, 2, 3, 4].map((k) => { const a = -Math.PI / 2 + (k * 2 * Math.PI) / 5; return [cx + 1.45 * Math.cos(a), cy + 0.58 * Math.sin(a)]; });
    if (central) {
      P.forEach((p) => seg(s, cx, cy, p[0], p[1], { color: C.accent3, width: 1.25 }));
      rect(s, cx - 0.5, cy - 0.22, 1.0, 0.44, { fill: C.accent3, name: "Merkez sunucu" });
      text(s, "Sunucu", { x: cx - 0.5, y: cy - 0.22, w: 1.0, h: 0.44, fontSize: 13, bold: true, color: C.background1, align: "center", valign: "middle" });
      P.forEach((p, k) => dot(s, p[0], p[1], 0.26, C.accent4, "Dron " + (k + 1)));
    } else {
      for (let a = 0; a < 5; a++) for (let b = a + 1; b < 5; b++) seg(s, P[a][0], P[a][1], P[b][0], P[b][1], { color: C.accent2, width: 1, dash: "dash" });
      P.forEach((p, k) => dot(s, p[0], p[1], 0.3, C.text2, "Dron " + (k + 1)));
    }
    text(s, bullets(items), { x: ox + 0.2, y: 3.45, w: 3.95, h: 1.45, fontSize: SIZE.small, paraSpaceAfter: 6 });
  };
  panel(M, "Merkezi (ör. SCP, RBP)", C.accent3, true, ["Küresel harita ve uzun çevrimdışı hesap gerekir", "Sunucu giderse sürü kör kalır", "Bütün hesap yükü tek bilgisayarda"]);
  panel(5.15, "Dağıtık (bu çalışma)", C.accent2, false, ["Her dronun kendi kamerası, haritası, planlayıcısı var", "Tek bağ: yörüngelerin yayınlanması", "Zayıf merkezli yapı daha dayanıklı"]);
  cite(s, "Zhou vd. (2022), Giriş ve 'System architecture'; merkezi planlayıcılar (SCP, RBP) Ek Malzeme'de");
  note(s, 55, "Önce iki yaklaşımı yan yana koyalım. Solda merkezi bir sürü: ortada güçlü bir bilgisayar var, bütün haritayı biliyor, herkesin yolunu o hesaplıyor ve dronlara gönderiyor. Bir orkestra gibi düşünün; şef herkesin ne zaman çalacağını söylüyor. Sorun şu: ormanda önceden bir harita yok, hesap uzun sürüyor ve şef düşerse müzik duruyor. Makale bu tür iki planlayıcıyı, SCP ve RBP'yi, ek malzemede deniyor; ikisi de küresel harita ve çevrimdışı hesap istiyor. Sağda bu çalışma: şef yok. Her dron kendi gözüyle görüyor, kendi haritasını çıkarıyor, kendi yolunu planlıyor. Dronlar arasındaki tek bağ turuncu kesik çizgiler, yani yörüngelerini birbirine yayınlamaları. Bu daha çok kalabalık bir kaldırıma benziyor: kimse kimseye emir vermiyor, herkes yanındakilerin nereye gittiğine bakıp kendi yolunu seçiyor. Yazarlar, atıf yaptıkları robotik literatürüne dayanarak bu tür zayıf merkezli yapıların daha dayanıklı olduğunu, iletişim ya da GPS kesildiğinde bile iş görmeye devam edebildiğini söylüyor.");
}

// D2. İkinci bilmece
{
  const s = newSlide("ICERIK"); crumb(s, "Dağıtık yapı");
  title(s, "İkinci bilmece: dronlar kablosuz ağda birbirine ne gönderiyor?");
  const opts = [["A", "Gördüğü kamera görüntüsünü"], ["B", "Çıkardığı haritayı"], ["C", "Birkaç sayı: kendi yörüngesini"]];
  opts.forEach((o, i) => {
    const x = M + i * 3.07;
    rect(s, x, 1.7, 2.86, 2.6, { fill: C.background2, name: "Seçenek " + o[0] });
    text(s, o[0], { x, y: 1.85, w: 2.86, h: 0.9, fontSize: 48, bold: true, color: C.accent1, align: "center" });
    text(s, o[1], { x: x + 0.2, y: 2.9, w: 2.46, h: 1.2, fontSize: SIZE.sub, align: "center", color: C.text1 });
  });
  text(s, "Salona soru: elinizi kaldırın! İpucu: on dron aynı dar bağlantıyı paylaşıyor", { x: M, y: 4.55, w: 9.0, h: 0.4, fontSize: SIZE.label, italic: true, color: C.accent3 });
  cite(s, "Zhou vd. (2022), 'From single to swarm' bölümünden uyarlanmıştır");
  note(s, 30, "Bir bilmece daha. (Salona dönün.) Bu dronlar birbirine kablosuz ağ üzerinden ne gönderiyor sizce? A: gördükleri kamera görüntüsünü. B: çıkardıkları haritayı. C: sadece birkaç sayı, yani kendi yörüngelerini. Elinizi kaldırın. (Birkaç saniye bekleyin.) Ekrandaki ipucuna bakın: avuç içi bir dronun kablosuz bağlantısı sınırlı ve on dron aynı anda konuşuyor.", { atla: true });
}

// D3. Cevap: yörünge yayını
{
  const s = newSlide("ICERIK"); crumb(s, "Dağıtık yapı");
  title(s, "Doğru cevap C: ağda yalnızca yörüngenin birkaç sayısı dolaşıyor; komşunun yakın geleceği bundan çıkıyor");
  rect(s, M, 1.5, 2.6, 1.8, { fill: C.background2, name: "Mesaj paketi" });
  text(s, [
    { text: "Dron j'nin mesajı", options: { bold: true, color: C.accent2, breakLine: true } },
    { text: "q", options: { bold: true } }, { text: "  ara noktalar", options: { breakLine: true } },
    { text: "T", options: { bold: true } }, { text: "  parça süreleri", options: { breakLine: true } },
    { text: "t₀", options: { bold: true } }, { text: "  başlangıç anı (ortak saat)" },
  ], { x: M + 0.15, y: 1.6, w: 2.35, h: 1.6, fontSize: SIZE.small, paraSpaceAfter: 5 });
  seg(s, 3.1, 2.4, 3.5, 2.4, { color: C.accent2, dash: "dash", arrow: true, width: 1.75 });
  rect(s, 3.5, 1.5, 2.2, 1.8, { fill: C.text2, name: "Alıcı dron" });
  text(s, [{ text: "Dron i", options: { bold: true, fontSize: SIZE.label, breakLine: true } }, { text: "MINCO ile yörüngeyi doğrusal sürede geri kurar", options: { fontSize: 13 } }],
    { x: 3.62, y: 1.5, w: 1.96, h: 1.8, color: C.background1, align: "center", valign: "middle", paraSpaceAfter: 6 });
  seg(s, 5.7, 2.4, 6.0, 2.4, { color: C.text2, arrow: true });
  rect(s, 6.0, 1.5, 3.5, 1.8, { line: C.accent4, lineW: 1, rounded: false, name: "Komşunun geleceği" });
  text(s, "Dron j'nin birkaç saniyelik geleceği", { x: 6.1, y: 1.55, w: 3.3, h: 0.28, fontSize: 12, bold: true, color: C.accent3 });
  const pts = [[6.35, 2.95], [7.2, 2.6], [8.1, 2.3], [9.05, 2.05]];
  poly(s, pts.concat([[9.3, 1.98]]), { color: C.accent1, width: 1.75, dash: "dash", arrow: true });
  ["şimdi", "+1 s", "+2 s", "+3 s"].forEach((l, i) => {
    dot(s, pts[i][0], pts[i][1], 0.17, i === 0 ? C.accent2 : C.accent1, "Konum " + l);
    text(s, l, { x: pts[i][0] - 0.3, y: pts[i][1] + 0.12, w: 0.6, h: 0.22, fontSize: 11, align: "center", color: C.accent3 });
  });
  const cards = [
    ["Az veri", "Görüntü ya da harita değil, bir avuç sayı; sınırlı bant genişliğine sığıyor"],
    ["Ortak saat", "Zaman damgası, komşunun 'şimdi' nerede olduğunu hesaplamaya yarıyor"],
    ["Birkaç saniye yeter", "Her dron eski planı bitmeden yenisini yayınlıyor; arada boşluk kalmıyor"],
  ];
  cards.forEach((c, i) => card(s, M + i * 3.07, 3.6, 2.86, 1.35, c[0], c[1]));
  cite(s, "Zhou vd. (2022), 'From single to swarm' bölümü ve Denk. 17–19");
  note(s, 55, "Doğru cevap C. Ağda dolaşan şey görüntü ya da harita değil, yörüngenin birkaç sayısı. Hatırlarsanız MINCO'da bir yörüngeyi tanımlamak için iki şey yetiyordu: ara noktalar ve her parçanın süresi. Dron j bunları ve yörüngeye başladığı anı yayınlıyor. Dron i bu sayıları alıyor ve MINCO ile yörüngeyi kendi tarafında çok hızlı biçimde yeniden kuruyor. Böylece j'nin şimdi, bir saniye sonra, üç saniye sonra nerede olacağını biliyor. Zamanlar ortak bir saate göre hizalanıyor; yoksa 'şimdi' her dron için farklı bir an olurdu. Birkaç saniyelik bilgi de yetiyor, çünkü her dron eski planı bitmeden yenisini yayınlıyor. Arkadaşınıza bütün gün çektiğiniz videoyu göndermek yerine 'saat üçte kafedeyim' diye yazmak gibi: çok az veri, ama tam ihtiyaç duyulan bilgi.");
}

// D4. Komşu = ceza terimi
{
  const s = newSlide("ICERIK"); crumb(s, "Dağıtık yapı");
  title(s, "Komşunun yörüngesi planlayıcıya bir ceza terimi olarak giriyor; güvenlik payı dikeyde daha geniş");
  const sub = (t) => ({ text: t, options: { subscript: true } });
  text(s, [{ text: "J", options: { bold: true } }, sub("w"), { text: " = Σ" }, sub("k≠u"), { text: " Σ" }, sub("i"), { text: " max{ C" }, sub("w"), { text: "² − d" }, sub("uk"), { text: "(tᵢ)², 0 }³" }],
    { x: M, y: 1.5, w: 4.4, h: 0.5, fontSize: SIZE.sub, color: C.text2, objectName: "Sürü cezası" });
  text(s, bullets([
    "Her örnek anında her komşuya olan mesafe d ölçülür",
    "Mesafe güvenlik payının altına inerse ceza hızla büyür",
    "Komşunun planı sabit kabul edilir; herkes böyle yaptığı için kaçınma karşılıklı olur",
    "Yürüyen insan, bisiklet gibi hareketli engeller de aynı yolla: tahmin edilen yörünge, sanal bir komşu olur",
  ]), { x: M, y: 2.15, w: 4.4, h: 2.85, fontSize: SIZE.small, paraSpaceAfter: 8 });
  // Yan görünüş: dron u, dikeyde uzun güvenlik bölgesi, pervane rüzgârı, dron k
  const ux = 6.7, uy = 3.15;
  s.addShape(pres.shapes.OVAL, { x: ux - 0.7, y: uy - 1.3, w: 1.4, h: 2.6, fill: { color: C.accent5 }, line: { color: C.accent2, width: 1.5, dashType: "dash" }, objectName: "Güvenlik bölgesi" });
  seg(s, ux, uy - 0.08, ux, uy - 1.28, { color: C.accent2, arrow: true });
  text(s, "dikeyde daha geniş", { x: 5.0, y: uy - 1.15, w: 0.85, h: 0.5, fontSize: 11, color: C.accent2, align: "right" });
  seg(s, 5.88, uy - 0.9, ux - 0.05, uy - 0.9, { color: C.accent2, width: 0.75, dash: "sysDot" });
  seg(s, ux + 0.25, uy, ux + 0.68, uy, { color: C.accent2, arrow: true });
  text(s, [{ text: "C" }, { text: "w", options: { subscript: true } }], { x: ux + 0.3, y: uy + 0.02, w: 0.4, h: 0.22, fontSize: 12, color: C.accent2 });
  [-0.15, 0, 0.15].forEach((dx) => seg(s, ux + dx, uy + 0.12, ux + dx, uy + 0.55, { color: C.accent3, arrow: true, width: 1.25 }));
  text(s, "pervane rüzgârı", { x: 5.0, y: uy + 0.15, w: 0.95, h: 0.45, fontSize: 11, color: C.accent3, align: "right" });
  rect(s, ux - 0.25, uy - 0.07, 0.5, 0.14, { fill: C.text2, name: "Dron u" });
  text(s, "Dron u", { x: ux - 0.6, y: uy + 1.33, w: 1.2, h: 0.25, fontSize: 12, bold: true, color: C.text2, align: "center" });
  const kx = 8.85, ky = 2.0;
  poly(s, [[kx, ky + 0.1], [8.05, 2.75], [7.7, 3.55], [7.95, 4.35]], { color: C.accent1, dash: "dash", arrow: true });
  rect(s, kx - 0.25, ky - 0.07, 0.5, 0.14, { fill: C.accent1, name: "Dron k" });
  text(s, "Dron k", { x: kx - 0.5, y: ky - 0.38, w: 1.0, h: 0.25, fontSize: 12, bold: true, color: C.accent1, align: "center" });
  text(s, "k'nin yayınlanan yörüngesi bölgenin dışından dolaşıyor", { x: 8.05, y: 3.6, w: 1.45, h: 0.95, fontSize: 11, color: C.accent1 });
  cite(s, "Zhou vd. (2022), 'From single to swarm' (Denk. 17–19) ve 'Dynamic obstacle avoidance'; çizim şematiktir");
  note(s, 55, "Peki dron, komşusunun yörüngesini öğrenince ne yapıyor? Hatırlarsanız her kural bir ceza terimiydi. Komşular da öyle: J_w terimi, her örnek anında her komşuya olan mesafeye bakıyor. Mesafe güvenlik payının altına inerse ceza hızla büyüyor ve planlayıcı yörüngeyi o bölgeden uzaklaştırıyor. Güvenlik bölgesinin şekline dikkat edin: yuvarlak değil, dikeyde uzun bir elips. Çünkü bir dronun tam altında uçmak tehlikeli; pervanelerin aşağı ittiği hava alttaki dronu sarsıyor. Bir de güzel bir ayrıntı var: kimse kimseye 'sen geç' demiyor. Her dron diğerlerinin planını sabit kabul edip kendi planını ona göre ayarlıyor; herkes bunu yaptığı için kaçınma karşılıklı oluyor. Yürüyen bir insan ya da bisiklet gibi hareketli engeller de aynı yolla ele alınıyor: hareketleri tahmin ediliyor ve sanal bir komşu gibi bu terime giriyorlar.");
}

// D5. Asenkron zaman çizelgesi
{
  const s = newSlide("ICERIK"); crumb(s, "Dağıtık yapı");
  title(s, "Kimse kimseyi beklemiyor: her dron kendi zamanında planlıyor ve gelen yörüngeleri hesaba katıyor");
  const lanes = [1.75, 2.4, 3.05], x0 = 1.45, x1 = 9.4;
  const plans = [[1.7, 3.9, 6.3, 8.4], [2.6, 4.9, 6.95], [2.05, 4.35, 7.55, 8.85]];
  lanes.forEach((y, i) => {
    text(s, "Dron " + (i + 1), { x: M, y: y - 0.14, w: 0.9, h: 0.28, fontSize: SIZE.small, bold: true, color: C.text2 });
    seg(s, x0, y, x1, y, { color: C.accent4, width: 1 });
    plans[i].forEach((px) => {
      const hot = i === 1 && px === 6.95;
      rect(s, px, y - 0.14, 0.45, 0.28, { fill: hot ? C.accent2 : C.accent1, name: hot ? "Anında yeniden plan" : "Planla ve yayınla" });
    });
  });
  seg(s, x0, 3.45, x1, 3.45, { color: C.text2, arrow: true });
  text(s, "zaman", { x: 8.7, y: 3.5, w: 0.7, h: 0.22, fontSize: 11, color: C.accent3, align: "right" });
  seg(s, 6.55, lanes[0] + 0.14, 6.98, lanes[1] - 0.14, { color: C.accent2, dash: "dash", arrow: true, width: 1.5 });
  text(s, "yayın geldi → çakışma → hemen yeniden plan", { x: 7.45, y: 1.95, w: 2.05, h: 0.38, fontSize: 11, color: C.accent2 });
  rect(s, x0, 3.55, 0.2, 0.15, { fill: C.accent1, name: "Lejant mavi" });
  text(s, "kendi zamanında planla ve yayınla", { x: x0 + 0.28, y: 3.5, w: 2.6, h: 0.25, fontSize: 11, color: C.accent3 });
  rect(s, 4.4, 3.55, 0.2, 0.15, { fill: C.accent2, name: "Lejant turuncu" });
  text(s, "tehlike görülünce anında yeniden plan", { x: 4.68, y: 3.5, w: 2.9, h: 0.25, fontSize: 11, color: C.accent3 });
  const cards = [
    ["Tur yok, sıra yok", "Herkesin aynı anda planlaması ya da sırasını beklemesi gerekmiyor"],
    ["Arka planda nöbetçi", "Sürekli çarpışma kontrolü; yeniden plan yetmezse acil duruş"],
    ["Kilitlenme nadir", "Rastgele zamanlama ve esnek yörünge, dronların birbirini sonsuza dek beklemesini önlüyor"],
  ];
  cards.forEach((c, i) => card(s, M + i * 3.07, 3.9, 2.86, 1.15, c[0], c[1], { bodySize: 12 }));
  cite(s, "Şematik; Zhou vd. (2022), 'Benchmark comparisons', 'Hierarchical safety guarantee' ve Tartışma");
  note(s, 55, "Sıradaki soru: bu planlama ne zaman oluyor? Herkes aynı anda mı planlıyor, yoksa sırayla mı? İkisi de değil; planlayıcı asenkron. Mavi bloklar her dronun planlama anları. Gördüğünüz gibi herkes kendi zamanında planlıyor ve planını yayınlıyor; kimse bir turun başlamasını ya da sırasının gelmesini beklemiyor. Turuncu oka bakın: Dron 1 yeni bir yörünge yayınladı, Dron 2 bunu aldığında kendi planıyla çakıştığını gördü ve hemen yeniden planladı. Arka planda sürekli çalışan bir güvenlik kontrolü var; yeniden planlama da yetmezse dron acil duruş yörüngesine geçiyor. Bunun güzel bir yan etkisi de var. Çok robotlu sistemlerde iki robotun birbirini sonsuza dek beklediği, kilitlenme denen bir sorun bilinir. Yazarlara göre gerçek dünyanın rastgeleliği ve asenkron planlama bunu büyük ölçüde kendiliğinden önlüyor.");
}

// D6. Tek kanal, dört iş
{
  const s = newSlide("ICERIK"); crumb(s, "Dağıtık yapı");
  title(s, "Paylaşılan bilgi dört işe yarıyor: çarpışmadan kaçınma, lidersiz formasyon, konum düzeltme, ortak takip");
  const hx = 4.0, hy = 2.7, hw = 2.0, hh = 1.1, cw = 3.0;
  const boxes = [
    [M, 1.5, "Çarpışmadan kaçınma", "Paylaşılan: yörünge. Komşu, ceza toplamına bir terim olarak girer"],
    [6.5, 1.5, "Lidersiz formasyon", "Paylaşılan: yörünge. Her dron formasyonun yerini diğerlerinden kendisi çıkarır"],
    [M, 3.75, "Konum düzeltme", "Paylaşılan: yörünge ve UWB mesafesi. Ayrı frekans, ek yük yok (Ek B)"],
    [6.5, 3.75, "Ortak hedef takibi", "Paylaşılan: hedef gözlemi. Bir kamera kapansa diğerleri görmeye devam eder"],
  ];
  boxes.forEach(([x, y]) => {
    const left = x < 5, top = y < 3;
    seg(s, left ? x + cw : x, y + 0.65, left ? hx + 0.25 : hx + hw - 0.25, top ? hy : hy + hh, { color: C.accent2, dash: "dash", width: 1.5 });
  });
  rect(s, hx, hy, hw, hh, { fill: C.text2, name: "Kablosuz ağ" });
  text(s, [{ text: "Kablosuz ağ", options: { bold: true, fontSize: SIZE.label, breakLine: true } }, { text: "her dron yayınlar, herkes dinler", options: { fontSize: 12 } }],
    { x: hx + 0.1, y: hy, w: hw - 0.2, h: hh, color: C.background1, align: "center", valign: "middle", paraSpaceAfter: 4 });
  boxes.forEach(([x, y, h, b]) => card(s, x, y, cw, 1.3, h, b));
  cite(s, "Zhou vd. (2022): sürü cezası, formasyon, konum kayması düzeltme ve çok dronlu takip bölümleri");
  note(s, 50, "Paylaşılan bilginin işi sadece çarpışmayı önlemek değil; aynı kanal dört iş görüyor. Birincisi, az önce gördüğümüz çarpışmadan kaçınma. İkincisi formasyon. Dikkat edin, lider bir dron yok. Her dron diğerlerinin yörüngelerine bakıp formasyonun şu an nerede olması gerektiğini kendisi hesaplıyor ve kendi köşesine gidiyor. Üçüncüsü konum düzeltme: dronlar UWB ile birbirine olan mesafeyi ölçüyor. Komşunun yerini zaten yörüngesinden bildiği için kendi konumundaki kaymayı düzeltebiliyor; ayrıntısı Ek B'de. Dördüncüsü takip deneyinde: dronlar hedef gözlemlerini paylaşıyor, böylece bir dronun kamerası kapansa bile diğerleri hedefi görmeye devam ediyor. Deneylerde bunların hepsini göreceğiz.");
}

// D7. Ağ yapısı ve bedeli
{
  const s = newSlide("ICERIK"); crumb(s, "Dağıtık yapı");
  title(s, "İki ağ denendi: yönlendiricili yıldız ağ daha hızlı, eşler arası ağ büyük sürüye daha uygun");
  const net = (ox, label, star, cap) => {
    rect(s, ox, 1.45, 4.35, 2.15, { line: C.accent4, lineW: 1, rounded: false, name: "Ağ " + label });
    text(s, label, { x: ox + 0.15, y: 1.52, w: 4.05, h: 0.3, fontSize: SIZE.small, bold: true, color: C.text2 });
    const cx = ox + 1.25, cy = 2.6;
    const P = [[cx - 0.85, cy - 0.5], [cx + 0.85, cy - 0.5], [cx - 0.85, cy + 0.5], [cx + 0.85, cy + 0.5]];
    if (star) {
      P.forEach((p) => seg(s, cx, cy, p[0], p[1], { color: C.accent1, width: 1.25 }));
      rect(s, cx - 0.32, cy - 0.17, 0.64, 0.34, { fill: C.accent3, name: "Yönlendirici" });
      text(s, "Wi-Fi", { x: cx - 0.32, y: cy - 0.17, w: 0.64, h: 0.34, fontSize: 11, bold: true, color: C.background1, align: "center", valign: "middle" });
    } else {
      for (let a = 0; a < 4; a++) for (let b = a + 1; b < 4; b++) seg(s, P[a][0], P[a][1], P[b][0], P[b][1], { color: C.accent2, width: 1.25, dash: "dash" });
    }
    P.forEach((p, k) => dot(s, p[0], p[1], 0.26, C.text2, "Dron " + (k + 1)));
    text(s, cap, { x: ox + 2.4, y: 1.95, w: 1.8, h: 1.5, fontSize: 13, valign: "middle" });
  };
  net(M, "Yıldız ağ (tek yönlendirici)", true, "Bant genişliği daha yüksek; bütün mesajlar yönlendiriciden geçer");
  net(5.15, "Eşler arası (ad hoc) ağ", false, "Aracı yok, dronlar doğrudan konuşur; büyük sürüye daha uygun");
  rect(s, M, 3.8, 9.0, 1.2, { line: C.accent2, lineW: 1.5, name: "Dağıtık olmanın bedeli" });
  text(s, "Dağıtık olmanın bedeli", { x: M + 0.2, y: 3.88, w: 4, h: 0.3, fontSize: SIZE.label, bold: true, color: C.accent2 });
  text(s, bullets(["Uçuş başında herkesin koordinat sistemi kabaca uyuşmalı", "Herkes herkesin yörüngesini dinliyor: sürü büyüdükçe ağ ve hesap yükü de büyür*"]),
    { x: M + 0.2, y: 4.22, w: 8.6, h: 0.75, fontSize: SIZE.small, paraSpaceAfter: 4 });
  cite(s, "Zhou vd. (2022), 'Wireless communication modules' ve 'Localization and drift correction'; * sunucunun yorumu");
  note(s, 45, "Bu bilgi hangi ağdan gidiyor? Yazarlar iki yapı deniyor. Solda evlerdeki gibi bir Wi-Fi: ortada bir yönlendirici var, bütün mesajlar onun üzerinden geçiyor. Bant genişliği daha yüksek. Sağda eşler arası, yani ad hoc bir ağ: aracı yok, dronlar doğrudan konuşuyor. Ek malzemedeki ölçümlere göre büyük sürüler için bu daha uygun. Dağıtık olmanın bir bedeli de var. Birincisi, uçuş başında herkesin koordinat sistemi kabaca aynı olmalı; yoksa konum düzeltme doğru bir yerden başlayamıyor. İkincisi, bu benim yorumum: her dron herkesin yörüngesini dinlediği için sürü büyüdükçe ağ ve hesap yükü de büyüyor. Tartışma bölümünde soracağım 100 dron sorusu tam da buraya bağlanıyor.", { atla: true });
}

// =====================================================================
section("Deneyler");
// 22. Ayraç
{
  const s = newSlide("BOLUM");
  s.addText("Bölüm 4", { placeholder: "bolumno", bullet: false });
  curTitle = "Deneyler: dört gerçek uçuş ve bir simülasyon karşılaştırması";
  s.addText(curTitle, { placeholder: "title" });
  s.addText("Bambu ormanı · formasyon · bozucu olaylar · insan takibi · rakiplerle yarış", { placeholder: "teaser", bullet: false });
  note(s, 10, "Teori yeter, şimdi uçuşları izleyelim. Dört gerçek deney var, bir de simülasyonda rakiplerle bir karşılaştırma.");
}

// 23. Orman panorama
{
  const s = newSlide("ICERIK"); crumb(s, "Deneyler");
  title(s, "10 dron, 30 cm'den dar boşluklardan geçerek bambu ormanını zarar görmeden aştı");
  const b = img(s, "fig3A", M, 1.4, 9.0, 1.85, { alt: "Bambu ormanında uçan on dron, beyaz halkalarla işaretli" });
  const st = [["10", "dron, tam otonom"], ["< 30 cm", "bambular arası boşluk; A4 kâğıdının boyu 29,7 cm"], ["65 m", "ileride, orman dışında hedef"]];
  st.forEach((t, i) => stat(s, M + i * 3.07, b.y + b.h + 0.2, 2.86, 1.55, t[0], t[1], { bigColor: i === 1 ? C.accent2 : C.text2 }));
  cite(s, "Kaynak: Zhou vd. (2022), Fig. 3A ve Movie 2");
  note(s, 50, "İlk ve en önemli deney: bambu ormanı. Üstteki fotoğrafta beyaz halkaların içindeki küçük mavi ışıklar dronlar. On dron 65 metre ileride, ormanın dışındaki bir hedefe uçuyor. Bambuların arasındaki boşluk bazı yerlerde 30 santimetrenin altında. Bunu gözünüzde canlandırmak için: bir A4 kâğıdının uzun kenarı 29,7 santimetre. Yani dronlar, A4 kâğıdından dar aralıklardan geçiyor; üstelik çoğu zaman yanlarında komşuları varken. Bu deneyde hiçbir göreve özel ceza yok, sadece genel cezalar kullanılıyor.");
}

// 24. Orman yakın plan
{
  const s = newSlide("ICERIK"); crumb(s, "Deneyler");
  title(s, "Yakından bakınca: dronlar hem bambulardan hem birbirlerinden kaçıyor");
  img(s, "fig3BCD", M, 1.4, 4.4, 3.65, { align: "left", alt: "Dar boşluktan geçen dron, engelden ve birbirinden kaçınma" });
  text(s, "Ne görüyoruz?", { x: 5.25, y: 1.5, w: 4.25, h: 0.4, fontSize: SIZE.body, bold: true, color: C.accent1 });
  text(s, bullets([
    ["B: ", "turuncu ok, dronun geçtiği dar boşluk"],
    ["C: ", "bambudan kaçınma"],
    ["D: ", "dronlar birbirinden kaçınıyor"],
    ["İrtifa oyunu yok: ", "yalnızca hız ayarı"],
  ]), { x: 5.25, y: 2.0, w: 4.25, h: 3.0, fontSize: SIZE.label, paraSpaceAfter: 10 });
  cite(s, "Kaynak: Zhou vd. (2022), Fig. 3B–3D");
  note(s, 45, "Biraz yaklaşalım. B panelinde turuncu ok, bir dronun geçtiği dar boşluğu gösteriyor. C panelinde dron bir bambudan kaçıyor; beyaz çizgi aradaki mesafe. D panelinde ise üç dron birbirinden kaçıyor. Burada bir ayrıntı var: makale, irtifa değiştirerek kaçmak gibi elle yazılmış kuralları bilerek kullanmıyor. Çünkü üstteki dronun pervane rüzgârı alttakini bozar ve gereksiz enerji harcanır. Dronlar sadece hızlarını ayarlayarak sıraya giriyor. Bilmecedeki C şıkkı, gerçek ormanda.");
}

// 25. Orman haritası
{
  const s = newSlide("ICERIK"); crumb(s, "Deneyler");
  title(s, "Kayıtlı yörüngeler, dronların bir boşluktan ötekine düzgün ve doğrudan geçtiğini gösteriyor");
  const b = img(s, "fig3I", M, 1.4, 9.0, 2.2, { alt: "Ormanın birleştirilmiş haritası ve dron yörüngeleri" });
  text(s, bullets([
    ["Renkler: ", "engel yüksekliği (turuncu alçak, mor yüksek)"],
    ["İnce çizgiler: ", "dronların gerçek yörüngeleri, soldan sağa"],
    ["Harita: ", "her dronun kendi haritası birleştirildi"],
  ]), { x: M, y: b.y + b.h + 0.2, w: 9.0, h: 1.4, fontSize: SIZE.label, paraSpaceAfter: 6 });
  cite(s, "Kaynak: Zhou vd. (2022), Fig. 3I");
  note(s, 35, "Bu da aynı uçuşun kuşbakışı haritası. Her dron kendi gördüğü haritayı çıkardı; burada hepsi birleştirilmiş. Renkler engellerin yüksekliğini gösteriyor; mor alanlar yüksek bambular. Soldan sağa uzanan ince çizgiler dronların gerçekte uçtuğu yollar. Dikkat edin, çizgilerde zikzak ya da ani dönüş yok. Reaktif yöntemlerde engelin hemen önünde keskin bir dönüş görürdünüz. Burada yörüngeler bir boşluktan ötekine düzgünce bağlanıyor.", { atla: true });
}

// 26. Formasyon fotoğrafı
{
  const s = newSlide("ICERIK"); crumb(s, "Deneyler");
  title(s, "Tek bir formasyon cezası eklemek yetti: sürü ormanda formasyonunu korudu");
  img(s, "movie3", M, 1.55, 5.3, 3.5, { align: "left", valign: "top", alt: "Bambu ormanında formasyon hâlinde uçan dronlar" });
  text(s, bullets([
    "Genel cezalara tek ekleme: formasyon cezası",
    "Her dron formasyonda bir köşeye atanır",
    "Engeller önceden bilinmiyor: ağaç, çalı, iki demir direk",
  ]), { x: 6.1, y: 1.6, w: 3.4, h: 3.3, fontSize: SIZE.label, paraSpaceAfter: 12 });
  cite(s, "Kaynak: Zhou vd. (2022), Movie 3; bu deneyde engel yoğunluğu ormana göre azaltıldı");
  note(s, 40, "İkinci deney, ceza fikrinin ne kadar esnek olduğunu gösteriyor. Genel cezalara sadece bir tane formasyon cezası ekleniyor. Her dron formasyonda bir köşeye atanıyor ve o köşeden uzaklaştıkça ceza artıyor. Işık gösterilerinde formasyon görmüşsünüzdür, ama orada ortam boş ve her şey önceden programlı. Burada dronlar ağaçların, çalıların ve iki demir direğin arasından, haritasız uçuyor. Bir not: formasyon gözle seçilebilsin diye bu deneyde orman biraz daha seyrek seçilmiş.");
}

// 27. Formasyon esneme
{
  const s = newSlide("ICERIK"); crumb(s, "Deneyler");
  title(s, "Engele gelince formasyon esniyor, geçince toparlanıyor; hız da kendiliğinden ayarlanıyor");
  const b = img(s, "fig4C", M, 1.4, 9.0, 2.0, { alt: "Formasyonun esneyip toparlanmasını gösteren dört kare" });
  ["Esniyor", "Toparlanıyor", "Esniyor", "Toparlanıyor"].forEach((t, i) => {
    text(s, t, { x: b.x + i * (b.w / 4), y: b.y + b.h + 0.08, w: b.w / 4, h: 0.32, fontSize: SIZE.small, bold: true, align: "center", color: i % 2 ? C.accent1 : C.accent2 });
  });
  rect(s, M, 4.0, 9.0, 0.95, { fill: C.accent5, name: "Formasyon çıkarımı" });
  text(s, [{ text: "Kimse programlamadı: ", options: { bold: true } }, { text: "ağaçlar arasında (t ≈ 12 s ve 25 s) sürü kendiliğinden yavaşladı, açıkta yeniden hızlandı" }],
    { x: M + 0.2, y: 4.0, w: 8.6, h: 0.95, fontSize: SIZE.label, valign: "middle" });
  cite(s, "Kaynak: Zhou vd. (2022), Fig. 4C ve 4D");
  note(s, 50, "Bu karelerde formasyonu kuşbakışı görüyoruz; kırmızı-beyaz kesik çizgi formasyonun şekli. Birinci karede bir engel geliyor ve formasyon esniyor; bazı dronlar yana kaçıyor. İkinci karede engel geçilmiş ve formasyon yeniden toparlanmış. Üçüncü ve dördüncü karede aynı şey tekrar oluyor. Asıl sürpriz alttaki sarı kutuda: ağaçların arasından geçerken, 12. ve 25. saniyelerde, bütün sürü kendiliğinden yavaşlıyor; açık alana çıkınca yeniden hızlanıyor. Bunu kimse programlamadı. Güvenlik cezası ile süre cezası arasındaki denge bu davranışı kendiliğinden ortaya çıkardı.");
}

// 28. Bozucu olaylar fotoğrafı
{
  const s = newSlide("ICERIK"); crumb(s, "Deneyler");
  title(s, "Araştırmacı uçuş sırasında engel ekledi, bir dronu elle oynattı; 10 dron yine güvenli kaldı");
  img(s, "fig5A2", M, 1.55, 5.4, 3.3, { align: "left", valign: "top", alt: "Uçuş sırasında dronların arasına kutu yerleştiren araştırmacı" });
  text(s, "Ortam: 10 dron, ~3 dakika", { x: 6.15, y: 1.5, w: 3.35, h: 0.4, fontSize: SIZE.sub, bold: true, color: C.text2 });
  text(s, bullets([
    "Hedefler 3 m yarıçaplı çemberde rastgele",
    "Uçuş sırasında eklenen kutular ve silindirler",
    "Alanda yürüyen insan, elle oynatılan dron",
    "Sonunda kapatılan sabit konum istasyonları",
  ]), { x: 6.15, y: 2.0, w: 3.35, h: 3.0, fontSize: SIZE.small, paraSpaceAfter: 8 });
  cite(s, "Kaynak: Zhou vd. (2022), Fig. 5A ve Movie 4");
  note(s, 45, "Üçüncü deney benim favorim, çünkü araştırmacılar dronlara resmen eziyet ediyor. Fotoğraftaki kişi uçuşun ortasında, dronların arasına kocaman bir kutu taşıyor. On dron, 3 metre yarıçaplı bir çember üzerinde rastgele verilen hedeflere uçuyor; yönler sürekli değiştiği için birbirlerinden kaçmaları gerekiyor. Uçuş sırasında yeni binaları temsil eden kutular ve silindirler ekleniyor, biri alanda yürüyor, biri bir dronu eliyle tutup yerinden oynatıyor. En sonda da konumu desteklemek için kurulmuş sabit istasyonlar kapatılıyor. Peki sonuç ne oldu? Bir sonraki slayt.");
}

// 29. Bozucu olaylar grafikleri
{
  const s = newSlide("ICERIK"); crumb(s, "Deneyler");
  title(s, "Ölçümler: dronlar arası mesafe hiç çarpışma sınırına inmedi, yaklaşık 200 hedefe ulaşıldı");
  const b = img(s, "fig5DEF", M, 1.4, 9.0, 1.95, { alt: "En küçük mesafe, yörüngeler ve ulaşılan hedef sayısı grafikleri" });
  const caps = [
    ["En küçük mesafe", "Kırmızı çarpışma bandına hiç inmedi", 0.0, 0.52],
    ["Yörüngeler", "3 dakikalık rastgele uçuş", 0.52, 0.22],
    ["Ulaşılan hedef", "Doğrusal artış: mavi = yeni engel, kırmızı = istasyonlar kapalı", 0.74, 0.26],
  ];
  caps.forEach((c) => text(s, [{ text: c[0], options: { bold: true, color: C.text2, breakLine: true } }, { text: c[1] }],
    { x: b.x + c[2] * b.w + 0.05, y: b.y + b.h + 0.15, w: c[3] * b.w - 0.1, h: 1.3, fontSize: SIZE.small }));
  cite(s, "Kaynak: Zhou vd. (2022), Fig. 5D–5F; değerler grafikten okunmuştur");
  note(s, 45, "Sonuç bu üç grafikte. Soldaki grafik, her an dronlar arasındaki en küçük mesafe. Alttaki kırmızı şerit çarpışma mesafesi; çizgi bir kez bile oraya inmiyor. Ortada üç dakika boyunca çizilen yörüngelerin yumağı var. Sağdaki grafik ise ulaşılan hedef sayısı; grafikten okunduğu kadarıyla yaklaşık 200. Mavi şeritler yeni engel eklenen anlar, kırmızı alan sabit istasyonların kapatıldığı süre. Çizgi bu anlarda bile kırılmıyor, düz bir doğru gibi devam ediyor. Yani bozucu olaylar sürünün temposunu düşürmüyor.");
}

// 30. Takip
{
  const s = newSlide("ICERIK"); crumb(s, "Deneyler");
  title(s, "Ağır görüntü işleme yükü altında 4 dron, yürüyen bir insanı dört açıdan takip etti");
  img(s, "fig6A", M, 1.4, 5.5, 3.6, { align: "left", alt: "Dört dronun bir insanı farklı açılardan takip etmesi" });
  text(s, "Nasıl başarılıyor?", { x: 6.25, y: 1.5, w: 3.25, h: 0.4, fontSize: SIZE.body, bold: true, color: C.accent1 });
  text(s, bullets([
    "Takip cezası: hıza uy, tercih edilen açıda dur",
    "YOLOv5 ile kişi tespiti",
    "Aynı anda video sıkıştırma ve kayıt",
  ]), { x: 6.25, y: 2.0, w: 3.25, h: 3.0, fontSize: SIZE.label, paraSpaceAfter: 10 });
  cite(s, "Kaynak: Zhou vd. (2022), Fig. 6A ve Movie 5");
  note(s, 45, "Dördüncü deney platformun ne kadar yük kaldırabildiğini test ediyor. Dört dron, ormanda yürüyen bir insanı önden, arkadan, soldan ve sağdan filme alıyor. Her dronda ek bir renkli kamera var ve aynı anda üç ağır iş çalışıyor: videoyu sıkıştırmak, kaydetmek ve YOLOv5 adlı bir yapay sinir ağıyla insanı tespit etmek. Planlayıcıya bir takip cezası ekleniyor: dron kişinin hızına uysun ve ona göre belirli bir açıda dursun. Köşelerdeki dört küçük resim, dört dronun kamerasından gelen görüntü.");
}

// 31. Görüş kapanması
{
  const s = newSlide("ICERIK"); crumb(s, "Deneyler");
  title(s, "Bir dronun kamerası tamamen kapansa da sürü hedefi kaybetmedi");
  const b = img(s, "fig6D", M, 1.4, 9.0, 2.75, { alt: "Beyaz örtüyle kamerası kapanan dron ve takibin sürmesi" });
  text(s, [{ text: "Ortadaki karede ", options: {} }, { text: "kameranın önü beyaz bir örtüyle kapandı", options: { bold: true } }, { text: "; diğer dronların gözlemleri ağ üzerinden birleştirildiği için takip sürdü" }],
    { x: M, y: b.y + b.h + 0.15, w: 9.0, h: 0.8, fontSize: SIZE.label });
  cite(s, "Kaynak: Zhou vd. (2022), Fig. 6D");
  note(s, 35, "Burada araştırmacılar küçük bir oyun oynuyor: dronlardan birinin kamerasının önüne beyaz bir örtü tutuyorlar. Ortadaki karede o dronun gördüğü tek şey beyaz bir perde. Ama takip kopmuyor, çünkü dronlar gördüklerini birbirleriyle paylaşıyor. Bir dron kör kaldığında, diğer üç dronun gözlemi hedefin nerede olduğunu söylüyor. Sağdaki karede örtü kalkınca kişi yeniden yeşil kutunun içinde. Sürü olmanın avantajı tam olarak bu.");
}

// 32. Benchmark düzeni
{
  const s = newSlide("ICERIK"); crumb(s, "Deneyler");
  title(s, "Simülasyonda planlayıcı, MADER ve EGO-Swarm'dan daha düzgün yörüngeyi daha hızlı üretti");
  rect(s, M, 1.5, 3.3, 3.4, { fill: C.background2, name: "Benchmark düzeni" });
  text(s, "Deney düzeni", { x: 0.7, y: 1.62, w: 3.0, h: 0.4, fontSize: SIZE.sub, bold: true, color: C.text2 });
  text(s, bullets(["Rakipler: MADER, EGO-Swarm", "Hız 1–3 m/s; engel aralığı 2 → 1 m", "Her ayar 10 tekrar, rastgele harita", "Her dron ayrı iş parçacığında"]),
    { x: 0.7, y: 2.1, w: 3.0, h: 2.7, fontSize: SIZE.label, paraSpaceAfter: 8 });
  const h = (t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 } } });
  const f = (t) => ({ text: t, options: { bold: true, color: C.accent2 } });
  s.addTable([
    [h("Ölçüt"), h("Bu çalışma"), h("Neden?")],
    ["Hesaplama süresi", f("Daha kısa"), "Daha az karar değişkeni"],
    ["Sarsıntı (kontrol çabası)", f("Daha düşük"), "Zaman profili de optimize"],
    ["Uçuş süresi", f("Benzer"), "Yok"],
    ["En küçük güvenlik payı", f("Hep pozitif"), "Ceza + sonradan kontrol"],
  ], { x: 4.1, y: 1.5, w: 5.4, colW: [2.0, 1.4, 2.0], rowH: 0.52, fontSize: 15, color: C.text1, valign: "middle",
    margin: [0.03, 0.1, 0.03, 0.1], border: { type: "solid", pt: 0.75, color: C.accent4 }, objectName: "Benchmark tablosu" });
  cite(s, "Zhou vd. (2022), Fig. 7 ve 'Benchmark comparisons' bölümü");
  note(s, 40, "Son olarak rakiplerle bir yarış. Gerçek dünyada aynı koşulu tekrarlamak zor olduğu için bu karşılaştırma simülasyonda yapılıyor. Rakipler MIT'den MADER ve yazarların önceki çalışması EGO-Swarm. Üçü de dağıtık ve asenkron planlayıcı, yani aynı sınıftaki yöntemler yarışıyor. Hız saniyede 1 metreden 3 metreye çıkarılıyor, engeller 2 metre aralıktan 1 metreye sıklaştırılıyor; her ayar rastgele haritalarla 10 kez tekrarlanıyor. Tabloyu özetlersem: bu çalışma daha kısa sürede hesaplıyor, daha az sarsıntılı uçuyor, uçuş süresi rakiplerle benzer ve güvenlik payı her zaman pozitif. Bir sonraki slaytta bunu grafiklerde göreceğiz.");
}

// 33. Benchmark grafikleri
{
  const s = newSlide("ICERIK"); crumb(s, "Deneyler");
  title(s, "Grafiklerde fark açık: bu çalışma MADER'den ~100 kat hızlı, MADER zor koşulda çarpışıyor");
  img(s, "fig7Bct", M, 1.4, 4.6, 3.65, { align: "left", alt: "Hesap süresi ve en küçük güvenlik payı grafikleri" });
  text(s, [{ text: "Mavi: MADER  ·  ", options: { color: C.accent1 } }, { text: "Turuncu: EGO-Swarm", options: { color: C.accent2, breakLine: true } }, { text: "Sarı: bu çalışma", options: { bold: true } }],
    { x: 5.35, y: 1.45, w: 4.15, h: 0.5, fontSize: 12 });
  text(s, bullets([
    ["Sol, hesap süresi (log): ", "bu çalışma ≈ 10⁻³·⁵ s, MADER ≈ 10⁻¹ s"],
    ["Sağ, güvenlik payı: ", "MADER 1 m aralıkta ve 3 m/s'de sıfırın altına iniyor, yani çarpışıyor"],
    ["Bu çalışma: ", "her ayarda pozitif"],
  ]), { x: 5.35, y: 2.1, w: 4.15, h: 2.9, fontSize: SIZE.small, paraSpaceAfter: 10 });
  cite(s, "Kaynak: Zhou vd. (2022), Fig. 7B (ilk iki sütun); değerler log eksenden yaklaşık okunmuştur");
  note(s, 55, "Grafiklerde iki şeye bakalım. Soldaki iki grafik hesap süresi ve eksen logaritmik; her çizgi on kat demek. Mavi MADER yaklaşık 0,1 saniyede, yani 100 milisaniyede hesaplıyor. Sarı, yani bu çalışma, bunun yaklaşık yüzde biri kadar sürede, milisaniyenin altında. Sağdaki iki grafik en küçük güvenlik payı; taralı kırmızı bölge çarpışma demek. Engeller 1 metreye sıklaşınca ve hız 3 metreye çıkınca mavi çubuk bu kırmızı bölgeye iniyor: MADER çarpışıyor. Sarı çubuk ise her ayarda sıfırın üstünde. Bu değerleri grafikten okudum; kesin sayılar makalenin ek tablolarında.");
}

// 34. Playground
{
  const s = newSlide("ICERIK"); crumb(s, "Deneyler");
  title(s, "Swarm playground: 40 dronluk simülasyonu Xbox kumandasıyla siz yönetiyorsunuz");
  img(s, "fig8", M, 1.4, 4.5, 3.65, { align: "left", alt: "Swarm playground simülasyon görüntüleri ve oyun kumandaları" });
  text(s, bullets([
    "40 dron, rastgele engeller",
    "Hedefleri Red Alert 2'deki gibi seçip gönderin",
    "Kumandayla siz hedef ya da hareketli engel olun",
    "Kod açık; Ubuntu + ROS ile çalışıyor",
  ]), { x: 5.3, y: 1.5, w: 4.2, h: 3.5, fontSize: SIZE.label, paraSpaceAfter: 12 });
  cite(s, "Kaynak: Zhou vd. (2022), Fig. 8 ve Movie 6");
  note(s, 40, "Makalenin belki de en eğlenceli kısmı bu: swarm playground, yani sürü oyun alanı. Bütün kod açık ve bilgisayarınıza kurup 40 dronluk bir sürüyü izleyebiliyorsunuz. Hedefleri, makalenin kendi deyişiyle, eski strateji oyunu Red Alert 2'deki gibi seçip gönderiyorsunuz. Daha da güzeli: sağ alttaki Xbox kumandalarıyla takip edilen hedef ya da dronların kaçması gereken hareketli engel siz oluyorsunuz. Ubuntu ve ROS kurulu bir bilgisayar yetiyor. Bu konuyla ilgilenen varsa denemek için harika bir başlangıç noktası.", { atla: true });
}

// =====================================================================
section("Tartışma");
// 35. Ayraç
{
  const s = newSlide("BOLUM");
  s.addText("Bölüm 5", { placeholder: "bolumno", bullet: false });
  curTitle = "Tartışma: ne başarıldı, ne eksik kaldı?";
  s.addText(curTitle, { placeholder: "title" });
  s.addText("Katkı, sınırlılıklar ve makalenin işaret ettiği sonraki adımlar", { placeholder: "teaser", bullet: false });
  note(s, 10, "Bu kadar güzel sonuçtan sonra biraz eleştirel bakalım: ne başarıldı, ne eksik kaldı?");
}

// 36. Katkı / sınırlılık
{
  const s = newSlide("ICERIK"); crumb(s, "Tartışma");
  title(s, "TEEM sahada birlikte sağlanıyor; ancak çözüm yerel ve gerçek testler 10 dronla sınırlı");
  rect(s, M, 1.5, 4.35, 3.4, { fill: C.background2, name: "Katkı" });
  text(s, "Katkı", { x: 0.7, y: 1.62, w: 4.0, h: 0.4, fontSize: SIZE.body, bold: true, color: C.accent1 });
  text(s, bullets(["Merkezsiz ve asenkron: tek hata noktası yok", "Hedef her an değiştirilebilir (hedef kovalama)", "Güvenlik planlayıcıda; üst katman göreve odaklanır", "Kod, donanım ve veri açık"]),
    { x: 0.7, y: 2.15, w: 4.0, h: 2.65, fontSize: SIZE.sub, paraSpaceAfter: 10 });
  rect(s, 5.15, 1.5, 4.35, 3.4, { line: C.accent2, lineW: 1.5, name: "Sınırlılıklar" });
  text(s, "Sınırlılıklar", { x: 5.35, y: 1.62, w: 4.0, h: 0.4, fontSize: SIZE.body, bold: true, color: C.accent2 });
  text(s, bullets(["Tamlık ve optimallik ispatı yok; çözüm yerel", "Dar, uzun tüp gibi geometrilerde kilitlenme riski", "Gerçek testler en çok 10 dron"]),
    { x: 5.35, y: 2.15, w: 4.0, h: 2.65, fontSize: SIZE.sub, paraSpaceAfter: 10 });
  cite(s, "Zhou vd. (2022), Tartışma; son sınırlılık maddesi sunucunun değerlendirmesidir");
  note(s, 55, "Katkı tarafında dört şey öne çıkıyor. Birincisi, sürü tamamen merkezsiz ve asenkron çalışıyor; düştüğünde herkesi durduracak tek bir bilgisayar yok. İkincisi, hedef uçuş sırasında istendiği an değiştirilebiliyor; bu da sistemi üst seviye karar veren yazılımlara bağlamayı kolaylaştırıyor. Üçüncüsü, güvenlik ve fiziksel uygunluk planlayıcının içinde çözülüyor; üstteki yazılım sadece göreve odaklanabiliyor. Dördüncüsü, kod, donanım tasarımı ve veri herkese açık. Sınırlılıklarda yazarlar dürüst davranıyor. Gerçek dünya performansı için matematiksel ispattan bilerek vazgeçiyorlar; bulunan çözüm en iyisi değil, yerel olarak iyi. Dronların birbirini beklerken kilitlenmesi nadir görülüyor ama dar ve uzun bir tüp gibi özel geometrilerde olabiliyor. Son madde benim yorumum: gerçek uçuşlar en fazla 10 dronla yapıldı; 40 dron yalnızca simülasyonda.");
}

// 37. Sonraki adımlar
{
  const s = newSlide("ICERIK"); crumb(s, "Tartışma");
  title(s, "Sonraki adımlar: önceden şekli olmayan, kuş sürüsü gibi esnek formasyonlar");
  const cards = [
    ["Serbest formasyon", "Şekil tanımlanmaz; dronlar yalnızca birbirine yakın durur, kuş sürüsü gibi"],
    ["Göreve göre değişen şekil", "Formasyon, görevin gerektirdiği an kendini yeniden kurar"],
    ["Üst seviye karar", "Görev atama modülleri her drona yalnızca hedef gönderir"],
  ];
  cards.forEach((c, i) => {
    const x = M + i * 3.07;
    rect(s, x, 1.5, 2.86, 2.2, { fill: C.background2, name: "Sonraki " + c[0] });
    text(s, [{ text: c[0], options: { bold: true, fontSize: SIZE.sub, color: C.text2, breakLine: true } }, { text: c[1], options: { fontSize: SIZE.small } }],
      { x: x + 0.18, y: 1.65, w: 2.5, h: 1.9, paraSpaceAfter: 6 });
  });
  rect(s, M, 3.95, 9.0, 0.95, { line: C.accent2, lineW: 1.5, name: "Tartışma sorusu" });
  text(s, [{ text: "Salona soru: ", options: { bold: true, color: C.accent2 } }, { text: "100 dronlu gerçek bir orman sürüsünde ilk ne bozulur: iletişim mi, konum mu, planlama mı?" }],
    { x: M + 0.2, y: 3.95, w: 8.6, h: 0.95, fontSize: SIZE.label, valign: "middle" });
  cite(s, "Zhou vd. (2022), Tartışma; alttaki soru sunucunundur");
  note(s, 45, "Makale ileriye dönük birkaç fikir veriyor. Birincisi serbest formasyon: önceden bir şekil tanımlamak yerine dronlar sadece birbirine yakın duruyor ve kuş sürüleri gibi davranıyor. İkincisi, formasyon şeklinin görevin gerektirdiği an değişebilmesi. Üçüncüsü, bir üst katmandaki görev atama yazılımının her drona sadece hedef göndermesi; gerisini planlayıcı halleder. Ben de size bir tartışma sorusu bırakmak istiyorum: bu sürüyü 10 değil 100 dronla gerçek bir ormana salsak, sizce ilk ne bozulur? Kablosuz iletişim mi, konum kestirimi mi, yoksa planlama mı? (Kısa bir süre fikir alın.)", { atla: true });
}

// 38. Sonuçlar
{
  const s = newSlide("SONUC");
  curTitle = "Sonuçlar";
  s.addText("Sonuçlar", { placeholder: "title" });
  text(s, [
    { text: "1.  Şekil ve zaman birlikte optimize edilmeli: ", options: { bold: true } },
    { text: "dar geçitlerde dolambaç yerine sıralı ve düzgün geçiş sağlanıyor.", options: { breakLine: true } },
    { text: "2.  Ceza tabanlı formülasyon genişletilebilir: ", options: { bold: true } },
    { text: "formasyon ve takip gibi görevler tek bir terimle ekleniyor.", options: { breakLine: true } },
    { text: "3.  Merkez yok, yalnızca paylaşılan yörüngeler var: ", options: { bold: true } },
    { text: "her dron kendi planını yapıyor; 300 g altı sürü GPS, harita ve sunucu olmadan ormanda uçuyor." },
  ], { x: M, y: 1.05, w: 9.0, h: 3.4, fontSize: SIZE.body, color: C.background1, paraSpaceAfter: 18 });
  text(s, [
    { text: "Samed Bilgin  ·  251281053", options: { bold: true, breakLine: true } },
    { text: "Makale: doi.org/10.1126/scirobotics.abm5954  ·  Soru ve geri bildirimlerinizi bekliyorum" },
  ], { x: M, y: 4.6, w: 9.0, h: 0.7, fontSize: SIZE.small, color: C.accent6 });
  note(s, 45, "Üç cümleyle özetleyeyim. Bir: sık bir ortamda sürü uçuşu için yörüngenin sadece şeklini değil zamanlamasını da optimize etmek gerekiyor; MINCO bunu milisaniyeler içinde mümkün kılıyor. İki: bütün gereksinimlerin ceza terimine çevrilmesi sistemi genişletilebilir yapıyor; formasyon ve takip birer terimle eklendi. Üç: sürünün bir merkezi yok. Her dron kendi planını yapıyor ve komşularıyla yalnızca birkaç sayılık yörüngeler paylaşıyor. Bütün bunlar 300 gramın altındaki dronlara sığıyor ve sürü GPS, harita ya da merkezi bir sunucu olmadan sık bir ormanda uçabiliyor. Bilim kurgu filmleriyle başlamıştık; görünüşe göre o gelecek sandığımızdan yakın. Dinlediğiniz için teşekkürler; soru ve geri bildirimlerinizi bekliyorum. (Bu slayt soru-cevap boyunca ekranda kalsın.)");
}

// 39. Kaynakça
{
  const s = newSlide("ICERIK");
  title(s, "Kaynakça");
  const refs = [
    [["Altshuler, D. L. ve Srinivasan, M. V. (2018). Comparison of visually guided flight in insects and birds. ", 0], ["Frontiers in Neuroscience, 12", 1], [", 157.", 0]],
    [["Foehn, P., Romero, A. ve Scaramuzza, D. (2021). Time-optimal planning for quadrotor waypoint flight. ", 0], ["Science Robotics, 6", 1], [", eabh1221.", 0]],
    [["Grand View Research (2021). Commercial drone market size, share & trends analysis report, 2021–2028.", 0]],
    [["McGuire, K., De Wagter, C., Tuyls, K., Kappen, H. ve de Croon, G. C. (2019). Minimal navigation solution for a swarm of tiny flying robots to explore an unknown environment. ", 0], ["Science Robotics, 4", 1], [", eaaw9710.", 0]],
    [["Nikkei (2021). Teardown of DJI drone reveals secrets of its competitive pricing. ", 0], ["Nikkei Asia", 1], [".", 0]],
    [["Soria, E., Schiano, F. ve Floreano, D. (2021). Predictive control of aerial swarms in cluttered environments. ", 0], ["Nature Machine Intelligence, 3", 1], [", 545–554.", 0]],
    [["Tordesillas, J. ve How, J. P. (2022). MADER: Trajectory planner in multiagent and dynamic environments. ", 0], ["IEEE Transactions on Robotics", 1], [".", 0]],
    [["Vásárhelyi, G., Virágh, C., Somorjai, G., Nepusz, T., Eiben, A. E. ve Vicsek, T. (2018). Optimized flocking of autonomous drones in confined environments. ", 0], ["Science Robotics, 3", 1], [", eaat3536.", 0]],
    [["Wang, Z., Zhou, X., Xu, C. ve Gao, F. (2021). Geometrically constrained trajectory optimization for multicopters. ", 0], ["arXiv:2103.00190", 1], [".", 0]],
    [["Zhou, X., Wen, X., Zhu, J., Zhou, H., Xu, C. ve Gao, F. (2021). EGO-Swarm: A fully autonomous and decentralized quadrotor swarm system in cluttered environments. ", 0], ["IEEE ICRA", 1], [".", 0]],
    [["Zhou, X., Wen, X., Wang, Z., Gao, Y., Li, H., Wang, Q., Yang, T., Lu, H., Cao, Y., Xu, C. ve Gao, F. (2022). Swarm of micro flying robots in the wild. ", 0], ["Science Robotics, 7", 1], [", eabm5954. Görseller bu makaleden alınmıştır.", 0]],
  ];
  const runs = [];
  refs.forEach((r, i) => r.forEach(([t, it], j) => runs.push({ text: t, options: { italic: !!it, breakLine: j === r.length - 1 && i < refs.length - 1 } })));
  text(s, runs, { x: M, y: 0.9, w: 9.0, h: 4.15, fontSize: 12, paraSpaceAfter: 1 });
  note(s, 5, "Sunumda atıf yaptığım bütün kaynaklar burada. Görsellerin tamamı ana makaleden alındı.");
}

// =====================================================================
section("Ek");
{
  const s = newSlide("EK");
  s.addText("Ek A: Kısıt dönüştürme ve kademeli güvenlik", { placeholder: "eketiket", bullet: false });
  title(s, "Kısıtlar örneklenmiş cezalara dönüşüyor; güvenlik katmanlı kontrollerle sonradan sağlanıyor");
  ["Sürekli kısıt → büyük ağırlıklı ceza integrali", "İntegral → eşit aralıklı örneklerin toplamı", "Kısıtsız problem → L-BFGS ile hızlı çözüm"].forEach((t, i) => {
    const y = 1.5 + i * 1.15;
    rect(s, M, y, 4.3, 0.85, { fill: i === 2 ? C.text2 : C.background2, name: "Dönüşüm adımı " + (i + 1) });
    text(s, [{ text: (i + 1) + "   ", options: { bold: true, color: i === 2 ? C.background1 : C.accent1 } }, { text: t, options: { color: i === 2 ? C.background1 : C.text1 } }],
      { x: M + 0.2, y, w: 3.95, h: 0.85, fontSize: SIZE.label, valign: "middle" });
    if (i < 2) seg(s, M + 2.15, y + 0.85, M + 2.15, y + 1.15, { color: C.text2, arrow: true });
  });
  text(s, "Kademeli güvenlik", { x: 5.2, y: 1.5, w: 4.3, h: 0.4, fontSize: SIZE.sub, bold: true, color: C.accent2 });
  const steps = ["Plan sonrası kontrol; ihlalde ağırlığı artırıp yeniden dene", "Yine başarısızsa 10 ms bekleyip yeniden planla", "Arka planda sürekli çarpışma kontrolü", "Çarpışma yakınsa acil durma yörüngesi"];
  text(s, steps.map((t, i) => ({ text: t, options: { bullet: { type: "number" }, breakLine: i < steps.length - 1 } })), { x: 5.2, y: 2.0, w: 4.3, h: 2.9, fontSize: SIZE.label, paraSpaceAfter: 10 });
  cite(s, "Zhou vd. (2022), 'Constraints transcription' ve 'Hierarchical safety guarantee' bölümleri, Denk. 4–7");
  note(s, 60, "(Soru gelirse.) Kısıtları cezaya çevirince çözüm bir kısıtı ihlal edebilir; güvenlik nasıl sağlanıyor? Cevap iki katmanlı. Önce dönüşüm: sürekli zamanda sonsuz sayıda eşitsizlik var, bunlar büyük ağırlıklı ceza integrallerine çevriliyor, integraller de eşit aralıklı örneklerin toplamıyla hesaplanıyor. Sonuç kısıtsız bir problem ve L-BFGS onu hızla çözüyor. Sonra güvenlik merdiveni: her planlamadan sonra kontrol yapılıyor; ihlal varsa o cezanın ağırlığı artırılıp yeniden deneniyor. Birkaç denemede olmazsa 10 milisaniye beklenip yeniden planlanıyor. Harita değiştiği için arka planda sürekli bir çarpışma kontrolü çalışıyor; tehlike görülürse hemen yeniden planlanıyor, o da olmazsa acil durma yörüngesi üretiliyor.", { baslik: "Ek A: Kısıt dönüştürme ve kademeli güvenlik" });
}
{
  const s = newSlide("EK");
  s.addText("Ek B: UWB ile konum kayması düzeltme", { placeholder: "eketiket", bullet: false });
  title(s, "UWB mesafeleri ve paylaşılan yörüngeler, konum kaymasını ek iletişim yükü olmadan düzeltiyor");
  ["VIO konumu (zamanla kayar)", "UWB mesafeleri r(u,k)", "Komşu konumları (yayınlanan yörüngelerden)"].forEach((t, i) => {
    const y = 1.5 + i * 0.95;
    rect(s, M, y, 2.7, 0.75, { fill: C.background2, name: "Girdi " + (i + 1) });
    text(s, t, { x: M + 0.12, y, w: 2.46, h: 0.75, fontSize: SIZE.small, valign: "middle" });
    seg(s, M + 2.7, y + 0.375, 3.6, 2.8, { color: C.text2, arrow: i === 1 });
  });
  rect(s, 3.6, 2.2, 2.6, 1.2, { fill: C.text2, name: "Optimizasyon" });
  text(s, [{ text: "En küçük kareler", options: { bold: true, breakLine: true } }, { text: "Ceres + düzenlileştirme", options: { fontSize: SIZE.small } }],
    { x: 3.7, y: 2.2, w: 2.4, h: 1.2, fontSize: SIZE.label, color: C.background1, align: "center", valign: "middle" });
  seg(s, 6.2, 2.8, 6.6, 2.8, { color: C.text2, arrow: true });
  rect(s, 6.6, 2.2, 2.9, 1.2, { line: C.accent2, lineW: 1.5, name: "Çıktı" });
  text(s, "Kayma kestirimi → alçak geçiren filtre → düzeltilmiş konum", { x: 6.72, y: 2.2, w: 2.66, h: 1.2, fontSize: SIZE.small, color: C.accent2, valign: "middle" });
  text(s, [{ text: "Ek yük yok: ", options: { bold: true } }, { text: "komşu konumları zaten yörüngelerden hesaplanıyor; UWB ayrı frekansta çalışıyor" }], { x: M, y: 4.45, w: 9.0, h: 0.6, fontSize: SIZE.label });
  cite(s, "Zhou vd. (2022), 'Localization and drift correction' bölümü, Denk. 24");
  note(s, 50, "(Soru gelirse.) GPS yokken dronların konumu zamanla kaymaz mı, bu da çarpışmaya yol açmaz mı? Evet, kamera ve IMU ile bulunan konum zamanla kayıyor. Bunu düzeltmek için her dron UWB ile komşularına olan mesafeyi ölçüyor. Komşuların konumunu zaten yayınlanan yörüngelerden biliyor. Ölçülen mesafe ile hesaplanan mesafe arasındaki farkı en küçük kareler yöntemiyle en aza indiriyor. Çıkan konumu doğrudan kullanmak yerine yavaş değişen kaymayı kestiriyor, onu filtreden geçirip konuma ekliyor. İletişime neredeyse hiç ek yük binmiyor, çünkü UWB yörünge yayınından ayrı bir frekansta çalışıyor.", { baslik: "Ek B: UWB ile konum kayması düzeltme" });
}

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  fs.writeFileSync(path.join(__dirname, "konusma.json"), JSON.stringify(SCRIPT, null, 1), "utf8");
  const main = SCRIPT.filter((x) => !x.baslik.startsWith("Ek "));
  const total = main.reduce((a, b) => a + b.sure, 0), skip = main.filter((x) => x.atlanabilir).reduce((a, b) => a + b.sure, 0);
  const md = [
    "# Konuşma metni: Ormanda kendi başına uçan avuç içi dron sürüsü", "",
    "Zhou vd. (2022), Science Robotics 7, eabm5954. Sunan: Samed Bilgin · 251281053.", "",
    `Ana slaytlarda yaklaşık ${Math.round(total / 60)} dakika; atlanabilir işaretli slaytlar geçilirse yaklaşık ${Math.round((total - skip) / 60)} dakika. Ek A ve Ek B yalnızca soru gelirse açılır. Parantez içindeki notlar sahne yönergesidir.`, "",
  ];
  SCRIPT.forEach((x) => md.push(`## ${x.n}. ${x.baslik}`, "", `*≈ ${x.sure} sn${x.atlanabilir ? " · zaman kısaysa atlanabilir" : ""}*`, "", x.metin, ""));
  fs.writeFileSync(path.join(__dirname, "..", "Konusma_Metni.md"), md.join("\n"), "utf8");
  console.log("OK", OUT, "| slayt:", SCRIPT.length, "| ana süre ≈", Math.round(total / 60), "dk | atlanabilirler geçilirse ≈", Math.round((total - skip) / 60), "dk");
})().catch((e) => { console.error(e); process.exit(1); });
