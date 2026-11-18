# Ormanda kendi başına uçan avuç içi dron sürüsü

Zhou vd. (2022) makalesinin Türkçe sunumu: 41 slayt, konuşmacı notları ve sayfa sayfa konuşma metni.

> Zhou, X., Wen, X., Wang, Z., Gao, Y., Li, H., Wang, Q., Yang, T., Lu, H., Cao, Y., Xu, C. ve Gao, F. (2022). Swarm of micro flying robots in the wild. *Science Robotics, 7*, eabm5954. [doi.org/10.1126/scirobotics.abm5954](https://doi.org/10.1126/scirobotics.abm5954)

Sunan: Samed Bilgin

## Dosyalar

| Dosya | İçerik |
|---|---|
| `Zhou2022_Suru_Sunumu.pptx` | Sunum. Her slaydın konuşmacı notunda o slaytta söylenecek metin var |
| `Konusma_Metni.md` | Aynı konuşma metni, slayt slayt, süreleriyle |
| `build/build.js` | Sunumu baştan üreten script (pptxgenjs) |
| `build/gorseller/` | Makaleden kırpılmış figürler ve film kareleri |

## Sunumun yapısı

Yaklaşık 27 dakika. Zaman kısalırsa "atlanabilir" işaretli slaytlar geçilerek 22 dakikaya iner.

1. **Problem:** bilim kurgudaki sürüler, TEEM gereksinimlerinin çelişkisi, önceki çalışmalar, araştırma sorusu
2. **İlham:** böcek gibi refleks mi, kuş gibi planlama mı
3. **Yöntem:** donanım, mimari, şekil ve zamanın birlikte optimizasyonu (MINCO), ceza terimleri
4. **Deneyler:** bambu ormanı, formasyon, bozucu olaylar, insan takibi, MADER ve EGO-Swarm ile karşılaştırma
5. **Tartışma:** katkı, sınırlılıklar, sonraki adımlar
6. **Ek:** kısıt dönüştürme ve UWB ile konum düzeltme (soru gelirse)

## Sunumu yeniden üretmek

Script, renkleri PowerPoint temasına yazmak için Anthropic'in `pptx` Claude skill'indeki `scripts/apply_theme.js` dosyasını kullanır. Bu dosya repoda yok.

```bash
cd build
npm install
PPTX_SKILL=/skill/klasorunun/yolu NODE_PATH="$PWD/node_modules" node build.js
```

Çıktı repo kökündeki `Zhou2022_Suru_Sunumu.pptx` dosyasının üzerine yazılır.

## Nasıl hazırlandı

- İçerik ve yapı: [academic-pptx-skill](https://github.com/Gabberflast/academic-pptx-skill) (her başlık bir sonuç cümlesi, slayt başına tek kanıt, her görselde kaynak)
- Dosya üretimi: Anthropic `pptx` skill'i ve pptxgenjs
- Türkçe denetimi: [turkish-humanizer](https://github.com/deligoez/skills) (terimler: dron, uzamsal-zamansal, güvenlik payı)

Grafiklerden okunan değerler (ör. "MADER'den ~100 kat hızlı", "yaklaşık 200 hedef") slaytlarda yaklaşık olarak işaretlidir; kesin değerler makalenin ek tablolarındadır.

## Telif notu

`build/gorseller/` klasöründeki figürler ve fotoğraflar makaleye aittir (© 2022 The Authors, Science Robotics / AAAS). Burada yalnızca akademik sunum amacıyla, kaynak gösterilerek kullanılmıştır ve bu reponun herhangi bir lisansı kapsamında değildir. Makalenin PDF'i repoya eklenmemiştir.
