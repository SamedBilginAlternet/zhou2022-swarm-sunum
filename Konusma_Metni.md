# Konuşma metni: Ormanda kendi başına uçan avuç içi dron sürüsü

Zhou vd. (2022), Science Robotics 7, eabm5954. Sunan: Samed Bilgin · 251281053.

Ana slaytlarda yaklaşık 27 dakika; atlanabilir işaretli slaytlar geçilirse yaklaşık 22 dakika. Ek A ve Ek B yalnızca soru gelirse açılır. Parantez içindeki notlar sahne yönergesidir.

## 1. Ormanda kendi başına uçan avuç içi dron sürüsü

*≈ 30 sn*

Herkese merhaba. Bugün size bir bambu ormanında, insan yardımı almadan uçan bir dron sürüsünü anlatacağım. Arkadaki fotoğraf gerçek: Zhejiang Üniversitesi'nden bir ekip on tane avuç içi büyüklüğünde dronu sık bir ormana salıyor. Dronların ne GPS'i var ne de önceden çıkarılmış bir haritası. Makale 2022'de Science Robotics'te yayımlandı. Sonuna kadar dinlerseniz bu dronların birbirine çarpmadan 30 santimetreden dar boşluklardan nasıl geçtiğini birlikte göreceğiz.

## 2. Bilim kurgunun dron sürüleri artık gerçek bir ormanda uçuyor

*≈ 50 sn*

Makale çok hoş bir yerden açılıyor: bilim kurgu filmlerinden. Prometheus'ta astronotlar bilinmeyen bir uzay gemisini keşfetmek için küçük uçan sondalar salıyor. Ender'in Oyunu'nda dron sürüsü gemiye kalkan oluyor. Star Wars ve Blade Runner 2049'da gökdelenlerin arasında kalabalık ama son derece düzenli bir hava trafiği var. Yazarlar diyor ki bu filmler pek çok araştırmacıya ilham verdi ve biz o geleceğe bir adım attık. Sağdaki fotoğraf filmden değil, makaleden: gerçek dronlar, gerçek ağaçlar.

## 3. Dronlar ucuzladı ve yaygınlaştı: popüler bir modelin parçaları yaklaşık 135 dolar

*≈ 40 sn · zaman kısaysa atlanabilir*

Neden şimdi bu konuyu konuşuyoruz? Çünkü dronlar inanılmaz ucuzladı. Nikkei'nin yaptığı bir söküm analizine göre, en çok satan modellerden biri olan DJI Mavic Air 2'nin parçalarının toplam maliyeti yaklaşık 135 dolar. Bu dronun 10 kilometre iletişim menzili, engelden kaçınma ve takip özelliği de var. Pazarın 2028'de 500 milyar dolara ulaşacağı öngörülüyor. Yani tek bir dron artık ucuz ve akıllı. Asıl merak edilen, çok sayıda dronun birlikte neler yapabileceği.

## 4. Dron sürüleri pek çok alanda işe yarar, ama sık ve bilinmeyen ortamlara henüz giremiyor

*≈ 45 sn*

Peki sürüler ne işe yarar? Makale dört örnek veriyor. Deprem ya da sel sonrasında mahsur kalan insanları aramak, onlara yol göstermek ve malzeme taşımak. Biyologların bir ekosisteme dokunmadan dar alanları incelemesi. Binaların arasında yoğun bir hava trafiği; makale burada Mars'a inen keşif araçlarını bile örnek veriyor. Son olarak tek bir dronun kaldıramayacağı bir yükü birkaç dronun birlikte taşıması. Bunların hepsinde ortak bir engel var, sağda görüyorsunuz: ortam önceden bilinmiyor, geçitler çok dar ve her dron komşularına da çarpmamak zorunda.

## 5. Tek bir dronun ormanda uçması büyük ölçüde çözüldü; zor olan sürünün birlikte uçması

*≈ 40 sn*

Burada önemli bir ayrım var. Tek bir dronun kendi başına uçması artık büyük ölçüde çözülmüş bir problem: çevik kontrol, kamera ve ivme sensörüyle konum bulma, harita çıkarma, engelden kaçma, hepsi olgun. Ama aynı şeyi sürüyle yapmak çok daha zor. Her dron hem ağaçlardan hem de komşularından kaçmak zorunda. Bazen on dronun aynı dar boşluktan geçmesi gerekiyor. Ortada bir yönetici bilgisayar yok ve bütün bunlar avuç içi kadar bir gövdeye sığmalı. Makale tam olarak bu sağdaki kutuyu çözmeye çalışıyor.

## 6. Dört temel gereksinim (TEEM) birbiriyle çelişiyor: birini iyileştirmek ötekini zorluyor

*≈ 50 sn*

Yazarlar bu gereksinimleri dört harfle topluyor: TEEM. T, yörüngenin olabildiğince iyi olması: kısa, düzgün, hızlı. E, sistemin farklı görevlere uyarlanabilmesi. İkinci E, hesaplamanın ucuz olması, çünkü küçük bir bilgisayarda çalışacak. M de minyatür boyut. Sorun şu ki bu dördü birbirini çekiştiriyor. Daha iyi yörünge istiyorsanız daha çok deneme yapmanız gerekir, bu da hesap süresini uzatır. Sistemi her göreve uyacak kadar genel yazarsanız, belirli bir göreve özel hızlandırmalardan vazgeçersiniz. Gövde küçüldükçe de bilgisayar ve batarya küçülür. Makalenin iddiası bu dördünü aynı anda sağlamak.

## 7. Önceki sürüler önceden programlı, reaktif ya da merkezi; hiçbiri TEEM'i birlikte sağlamıyor

*≈ 60 sn*

Daha önce neler denenmiş? Işık gösterilerinde yüzlerce dron görüyorsunuz ama onlar uydu konumuyla önceden çizilmiş bir rotayı izliyor, engel diye bir şey bilmiyorlar. Vásárhelyi ve arkadaşlarının sürüsü kuş sürülerini taklit ediyor; basit itme-çekme kurallarıyla çalışıyor ama hareketler tutarsız ve güvenli kalmak için dronlar arasında ortalama 10 metreden fazla mesafe gerekiyor. Ormanda bu imkânsız. Soria ve arkadaşları daha akıllı bir kontrol ekliyor ama hesap ağır ve bir merkez bilgisayar gerekiyor. McGuire'ın dronları sadece 30 gram ama ancak basit görevleri yapabiliyor. Yazarların kendi önceki çalışması EGO-Swarm ormanda uçtu, ama yalnızca 3 dronla ve hızı ayarlayamadan. Turuncu satır bugün anlatacağım çalışma.

## 8. Radar grafiğinde önerilen sistem beş eksenin dördünde en dışta; yalnızca ağırlıkta geride

*≈ 45 sn · zaman kısaysa atlanabilir*

Bu tabloyu yazarlar tek bir grafikte de özetlemiş. Beş eksen var: yörünge ne kadar optimal, sistem ne kadar genişletilebilir, dron ne kadar küçük, hesap dronun üstünde mi yapılıyor ve dron ne kadar hafif. Merkezden dışa doğru gittikçe daha iyi. Yeşil alan bu çalışma: beş eksenin dördünde en dışta. Dürüst olmak gerekirse ağırlıkta geride, çünkü sarı alan, yani SGBA, sadece 30 gram. Bu dronlar ise 300 gramın altında. Yani yazarlar biraz ağırlıktan vazgeçip karşılığında çok daha fazla yetenek alıyor.

## 9. Araştırma sorusu: Sürü, bilinmeyen sık bir ormanda yalnızca kendi sensörleriyle uçabilir mi?

*≈ 40 sn*

Böylece makalenin sorusuna geliyoruz. Avuç içi büyüklüğündeki dronlardan oluşan bir sürü, bilinmeyen ve sık bir ormanda, yalnızca kendi sensörleri ve kendi bilgisayarlarıyla güvenli, verimli ve koordineli uçabilir mi? Üç şeyin olmadığına dikkat edin: GPS yok, odaya kurulmuş kamera sistemi gibi harici konumlama yok, önceden çıkarılmış harita yok. Makalenin cevabı evet ve iki parçalı bir katkı sunuyor: bir yörünge planlayıcı ve bu planlayıcıyı taşıyan, yazılımı ve donanımı herkese açık bir dron platformu.

## 10. Kuş mu böcek mi? Yazarlar refleks yerine planlamayı, yani kuşun yolunu seçiyor

*≈ 50 sn*

Şimdi en sevdiğim kısma geliyoruz. Doğada bir ormanda çarpmadan uçmanın iki yolu var. Böcekler refleksle uçar: bir engeli görünce aniden döner. Çok az hesap gerekir, bu yüzden bedenleri minicik olabilir. Kuşlar ise planlar: keskin bir görüşleri ve daha büyük bir beyinleri var, yolu ve hızı birlikte ayarlayarak düzgün manevralar yapar. Robotik literatüründe de aynı ikilik var: böcek gibi reaktif yöntemler ve kuş gibi yörünge planlayan yöntemler. Sizce yazarlar hangisini seçti? Evet, kuşu. Çünkü sık bir ormanda verim ve esneklik için planlama gerekiyor.

## 11. Dron bir kuş gibi tasarlandı: gözler kamera, iç kulak IMU, beyin planlayıcı

*≈ 45 sn · zaman kısaysa atlanabilir*

Yazarlar bu benzetmeyi sonuna kadar götürüyor. Kuş kısa mesafede gözlerine ve iç kulağındaki denge sistemine güvenir. Dronda da aynısı var: kameralar göz, IMU denen ivme ve dönüş sensörü iç kulak. Kuş bir engelden kaçarken hem yolunu hem hızını aynı anda ayarlar ve enerji harcamamak için düzgün uçar; dronun planlayıcısı da tam bunu yapıyor. Ama dronların kuşlardan üstün olduğu bir nokta var, en alttaki sarı satır: kablosuz iletişim. Her dron nereye gideceğini komşularına söyleyebiliyor. Kuşlar bunu yapamaz.

## 12. Yöntem: avuç içi bir dron ve onu yöneten planlayıcı

*≈ 10 sn*

Problemi gördük. Şimdi çözüme geçelim: önce dronun kendisi, sonra sistemin nasıl kurulduğu, sonra da bütün işi yapan asıl fikir.

## 13. Avuç içi platform: kamera, UWB ve bilgisayar 300 gramın altındaki gövdeye sığıyor

*≈ 45 sn*

İşte dronun kendisi. Solda yandan, sağda üstten görüyorsunuz. En üstte NVIDIA Xavier NX var; kredi kartından küçük ama 6 çekirdekli işlemcisi ve 384 çekirdekli ekran kartıyla bütün hesabı yapan beyin bu. Önde Intel RealSense derinlik kamerası, yani gözler. UWB modülü dronların birbirine olan mesafesini ölçüyor; buna birazdan döneceğiz. Altta da PX4 yazılımıyla çalışan küçük uçuş kontrol kartı. Hepsi 300 gramın altında bir gövdeye sığıyor.

## 14. Ne kadar küçük? Dolu bir içecek kutusundan hafif, 11 dakika uçabiliyor

*≈ 45 sn*

Ne kadar küçük olduğunu biraz somutlaştıralım. Motorlar arası çapraz mesafe 114 milimetre; avucunuza sığıyor. Toplam ağırlık 300 gramın altında; yani elinizdeki dolu bir içecek kutusundan daha hafif. Bunun 100 gramı batarya ve 11 dakika uçuş veriyor. Motorlar dronun kendi ağırlığının 2,4 katı itki üretiyor, bu da ani manevralar için yeterli pay bırakıyor. Havada asılı dururken yaklaşık 120 watt harcıyor. En güzeli sağ alttaki sayı: işlemci ve ekran kartı yüzde 40'ın altında çalışıyor, yani başka görevler için yer var.

## 15. Her dron tam otonom; dronlar arasındaki tek bağlantı yörüngelerin yayınlanması

*≈ 50 sn*

Sistemin mimarisi bu. Kutunun içi tek bir dron ve her dron aynı yapıda. Kamera ortamı görüyor, haritalama modülü bir doluluk haritası çıkarıyor, planlayıcı yörüngeyi hesaplıyor, kontrol kartı da o yörüngeyi izliyor. Konum kamera ve IMU ile bulunuyor; zamanla biriken hata UWB ile düzeltiliyor. Dikkat edin, ortada merkez bir bilgisayar yok. Dronlar arasındaki tek bağlantı sağdaki turuncu kesik çizgiler: her dron kendi planladığı yörüngeyi kablosuz ağda yayınlıyor. Böylece herkes komşusunun birkaç saniye sonra nerede olacağını biliyor. Merkez olmadığı için sistem tek bir bilgisayara da bağımlı değil.

## 16. Bir bilmece: iki dron aynı anda tek bir dar boşluğa gelirse ne yapmalı?

*≈ 40 sn*

Şimdi size bir soru. (Salona dönün.) İki dron aynı anda tek bir dar boşluğa geliyor. Ne yapmalılar? A: biri dolanıp sırasını beklesin. B: biri yükselip üstten geçsin. C: biri yavaşlasın ve sırayla geçsinler. Elinizi kaldırın. (Birkaç saniye bekleyin, sayıları yorumlayın.) B'yi seçenler için küçük bir ipucu: makale irtifa değiştirmenin hem pervane rüzgârı yüzünden riskli hem de enerji kaybı olduğunu söylüyor. Cevap bir sonraki slaytta.

## 17. Doğru cevap C: şekil ve zaman birlikte optimize edilince dronlar yavaşlayıp sıraya giriyor

*≈ 55 sn*

Doğru cevap C. Ama asıl ilginç olan, önceki planlayıcıların tam da A'yı yapması. Bir yörüngenin iki parçası var: uzaydaki şekli ve o şeklin hangi hızla izlendiğini belirleyen zaman profili. Eski planlayıcılar, soldaki gibi, yalnızca şekli değiştirebiliyor. İkinci dron hızını ayarlayamadığı için dolanarak sırasını bekliyor; bu da arkadakileri tıkıyor, hatta güvensiz yörüngelere yol açabiliyor. Bu çalışmada, sağdaki gibi, şekil ve zaman birlikte optimize ediliyor. İkinci dron sadece biraz yavaşlıyor ve boşluğa sırayla giriyor. Trafikte sağa sola kıvrılmak yerine biraz frene basmak gibi düşünebilirsiniz.

## 18. Simülasyon da aynısını gösteriyor: rakipler duvardaki boşlukta dolanıyor, bu çalışma düz geçiyor

*≈ 40 sn*

Bu sadece benim çizdiğim bir şema değil. Makalede bunun simülasyonu var. Altı dron duvarın iki tarafından aynı anda yola çıkıyor ve hepsinin tek bir boşluktan geçmesi gerekiyor. Solda MADER: yörüngeler boşluğun önünde düğüm olmuş. Ortada yazarların önceki çalışması EGO-Swarm: sonraki dronlar dolanarak sıralarını bekliyor. Sağda bu çalışma: altı çizgi de düz ve düzgün biçimde boşluktan geçiyor. Bilmecenin cevabını gözünüzle görmüş oldunuz.

## 19. MINCO uzamı ve zamanı ayırıyor; böylece yörünge birkaç milisaniyede optimize edilebiliyor

*≈ 60 sn*

Peki şekil ve zamanı birlikte optimize etmek neden daha önce yapılamadı? Çünkü çok pahalı. Makale bir örnek veriyor: klasik yöntemle zaman-optimal bir yörünge hesaplamak 40 dakika kadar sürebiliyor. Uçan bir dronun 40 dakikası yok. Çözüm MINCO adlı bir yörünge gösterimi. Fikir şu: siz yalnızca iki şeyi seçiyorsunuz, yolun geçeceği ara noktalar q ve her parçanın süresi T. MINCO bunları, parça sayısıyla doğru orantılı bir sürede, yani çok hızlı, gerçek bir yörüngeye çeviriyor. Hatanın ne yöne düzeltileceği bilgisi de aynı hızla geri taşınıyor. Sonuç: en kısıtlı ortamda bile yörünge birkaç milisaniyede hazır. Bu iki sayı aynı problem değil; sadece bu işin tarihsel olarak ne kadar zor olduğunu gösteriyor.

## 20. Her gereksinim bir ceza terimi; yeni görev eklemek tek bir parça eklemek demek

*≈ 55 sn*

Sistemi bu kadar esnek yapan şey bu formül. Fikir çok basit: dronun uyması gereken her kural bir ceza puanına çevriliyor ve bütün puanlar toplanıyor. Planlayıcı da toplam cezayı en küçük yapan yörüngeyi arıyor. Lacivert beş kutu her uçuşta var: yörünge düzgün olsun, kısa sürsün, dronun fiziksel sınırlarını aşmasın, engellere ve diğer dronlara çarpmasın. Sağdaki iki beyaz kutu göreve özel. Formasyon uçuşu mu istiyorsunuz? Formasyon cezasını ekleyin. Birini takip etmek mi istiyorsunuz? Takip cezasını ekleyin. Lego'ya bir parça takmak gibi. Bir de şu var: güvenlikle ilgili cezaların ağırlığı diğerlerinden kat kat büyük. Yani dron önce çarpmamayı, sonra hızlı ve düzgün uçmayı düşünüyor.

## 21. Planlayıcı hiç durmuyor: birkaç saniyede bir ya da yeni engel görünce yeniden planlıyor

*≈ 45 sn · zaman kısaysa atlanabilir*

Planlayıcının çalışma döngüsü de şöyle. Kullanıcı ya da üst seviye bir yazılım bir hedef veriyor. Planlayıcı o yöne doğru yakında bir ara hedef seçiyor. Sonra bir optimizasyon döngüsü başlıyor: L-BFGS denen çözücü bir aday yörünge öneriyor, ceza hesaplanıyor, çözücü yörüngeyi düzeltiyor ve bu birkaç kez dönüyor. Sonuçta çıkan yörünge dron tarafından izleniyor. Bir iki saniye geçince ya da dron yeni bir engel görünce her şey baştan başlıyor. Yani dron hiçbir zaman eski bir plana körü körüne bağlı kalmıyor. Hedef de uçuş sırasında istendiği an değiştirilebiliyor; yazarlar buna hedef kovalama diyor.

## 22. Deneyler: dört gerçek uçuş ve bir simülasyon karşılaştırması

*≈ 10 sn*

Teori yeter, şimdi uçuşları izleyelim. Dört gerçek deney var, bir de simülasyonda rakiplerle bir karşılaştırma.

## 23. 10 dron, 30 cm'den dar boşluklardan geçerek bambu ormanını zarar görmeden aştı

*≈ 50 sn*

İlk ve en önemli deney: bambu ormanı. Üstteki fotoğrafta beyaz halkaların içindeki küçük mavi ışıklar dronlar. On dron 65 metre ileride, ormanın dışındaki bir hedefe uçuyor. Bambuların arasındaki boşluk bazı yerlerde 30 santimetrenin altında. Bunu gözünüzde canlandırmak için: bir A4 kâğıdının uzun kenarı 29,7 santimetre. Yani dronlar, A4 kâğıdından dar aralıklardan geçiyor; üstelik çoğu zaman yanlarında komşuları varken. Bu deneyde hiçbir göreve özel ceza yok, sadece genel cezalar kullanılıyor.

## 24. Yakından bakınca: dronlar hem bambulardan hem birbirlerinden kaçıyor

*≈ 45 sn*

Biraz yaklaşalım. B panelinde turuncu ok, bir dronun geçtiği dar boşluğu gösteriyor. C panelinde dron bir bambudan kaçıyor; beyaz çizgi aradaki mesafe. D panelinde ise üç dron birbirinden kaçıyor. Burada bir ayrıntı var: makale, irtifa değiştirerek kaçmak gibi elle yazılmış kuralları bilerek kullanmıyor. Çünkü üstteki dronun pervane rüzgârı alttakini bozar ve gereksiz enerji harcanır. Dronlar sadece hızlarını ayarlayarak sıraya giriyor. Bilmecedeki C şıkkı, gerçek ormanda.

## 25. Kayıtlı yörüngeler, dronların bir boşluktan ötekine düzgün ve doğrudan geçtiğini gösteriyor

*≈ 35 sn · zaman kısaysa atlanabilir*

Bu da aynı uçuşun kuşbakışı haritası. Her dron kendi gördüğü haritayı çıkardı; burada hepsi birleştirilmiş. Renkler engellerin yüksekliğini gösteriyor; mor alanlar yüksek bambular. Soldan sağa uzanan ince çizgiler dronların gerçekte uçtuğu yollar. Dikkat edin, çizgilerde zikzak ya da ani dönüş yok. Reaktif yöntemlerde engelin hemen önünde keskin bir dönüş görürdünüz. Burada yörüngeler bir boşluktan ötekine düzgünce bağlanıyor.

## 26. Tek bir formasyon cezası eklemek yetti: sürü ormanda formasyonunu korudu

*≈ 40 sn*

İkinci deney, ceza fikrinin ne kadar esnek olduğunu gösteriyor. Genel cezalara sadece bir tane formasyon cezası ekleniyor. Her dron formasyonda bir köşeye atanıyor ve o köşeden uzaklaştıkça ceza artıyor. Işık gösterilerinde formasyon görmüşsünüzdür, ama orada ortam boş ve her şey önceden programlı. Burada dronlar ağaçların, çalıların ve iki demir direğin arasından, haritasız uçuyor. Bir not: formasyon gözle seçilebilsin diye bu deneyde orman biraz daha seyrek seçilmiş.

## 27. Engele gelince formasyon esniyor, geçince toparlanıyor; hız da kendiliğinden ayarlanıyor

*≈ 50 sn*

Bu karelerde formasyonu kuşbakışı görüyoruz; kırmızı-beyaz kesik çizgi formasyonun şekli. Birinci karede bir engel geliyor ve formasyon esniyor; bazı dronlar yana kaçıyor. İkinci karede engel geçilmiş ve formasyon yeniden toparlanmış. Üçüncü ve dördüncü karede aynı şey tekrar oluyor. Asıl sürpriz alttaki sarı kutuda: ağaçların arasından geçerken, 12. ve 25. saniyelerde, bütün sürü kendiliğinden yavaşlıyor; açık alana çıkınca yeniden hızlanıyor. Bunu kimse programlamadı. Güvenlik cezası ile süre cezası arasındaki denge bu davranışı kendiliğinden ortaya çıkardı.

## 28. Araştırmacı uçuş sırasında engel ekledi, bir dronu elle oynattı; 10 dron yine güvenli kaldı

*≈ 45 sn*

Üçüncü deney benim favorim, çünkü araştırmacılar dronlara resmen eziyet ediyor. Fotoğraftaki kişi uçuşun ortasında, dronların arasına kocaman bir kutu taşıyor. On dron, 3 metre yarıçaplı bir çember üzerinde rastgele verilen hedeflere uçuyor; yönler sürekli değiştiği için birbirlerinden kaçmaları gerekiyor. Uçuş sırasında yeni binaları temsil eden kutular ve silindirler ekleniyor, biri alanda yürüyor, biri bir dronu eliyle tutup yerinden oynatıyor. En sonda da konumu desteklemek için kurulmuş sabit istasyonlar kapatılıyor. Peki sonuç ne oldu? Bir sonraki slayt.

## 29. Ölçümler: dronlar arası mesafe hiç çarpışma sınırına inmedi, yaklaşık 200 hedefe ulaşıldı

*≈ 45 sn*

Sonuç bu üç grafikte. Soldaki grafik, her an dronlar arasındaki en küçük mesafe. Alttaki kırmızı şerit çarpışma mesafesi; çizgi bir kez bile oraya inmiyor. Ortada üç dakika boyunca çizilen yörüngelerin yumağı var. Sağdaki grafik ise ulaşılan hedef sayısı; grafikten okunduğu kadarıyla yaklaşık 200. Mavi şeritler yeni engel eklenen anlar, kırmızı alan sabit istasyonların kapatıldığı süre. Çizgi bu anlarda bile kırılmıyor, düz bir doğru gibi devam ediyor. Yani bozucu olaylar sürünün temposunu düşürmüyor.

## 30. Ağır görüntü işleme yükü altında 4 dron, yürüyen bir insanı dört açıdan takip etti

*≈ 45 sn*

Dördüncü deney platformun ne kadar yük kaldırabildiğini test ediyor. Dört dron, ormanda yürüyen bir insanı önden, arkadan, soldan ve sağdan filme alıyor. Her dronda ek bir renkli kamera var ve aynı anda üç ağır iş çalışıyor: videoyu sıkıştırmak, kaydetmek ve YOLOv5 adlı bir yapay sinir ağıyla insanı tespit etmek. Planlayıcıya bir takip cezası ekleniyor: dron kişinin hızına uysun ve ona göre belirli bir açıda dursun. Köşelerdeki dört küçük resim, dört dronun kamerasından gelen görüntü.

## 31. Bir dronun kamerası tamamen kapansa da sürü hedefi kaybetmedi

*≈ 35 sn*

Burada araştırmacılar küçük bir oyun oynuyor: dronlardan birinin kamerasının önüne beyaz bir örtü tutuyorlar. Ortadaki karede o dronun gördüğü tek şey beyaz bir perde. Ama takip kopmuyor, çünkü dronlar gördüklerini birbirleriyle paylaşıyor. Bir dron kör kaldığında, diğer üç dronun gözlemi hedefin nerede olduğunu söylüyor. Sağdaki karede örtü kalkınca kişi yeniden yeşil kutunun içinde. Sürü olmanın avantajı tam olarak bu.

## 32. Simülasyonda planlayıcı, MADER ve EGO-Swarm'dan daha düzgün yörüngeyi daha hızlı üretti

*≈ 40 sn*

Son olarak rakiplerle bir yarış. Gerçek dünyada aynı koşulu tekrarlamak zor olduğu için bu karşılaştırma simülasyonda yapılıyor. Rakipler MIT'den MADER ve yazarların önceki çalışması EGO-Swarm. Hız saniyede 1 metreden 3 metreye çıkarılıyor, engeller 2 metre aralıktan 1 metreye sıklaştırılıyor; her ayar rastgele haritalarla 10 kez tekrarlanıyor. Tabloyu özetlersem: bu çalışma daha kısa sürede hesaplıyor, daha az sarsıntılı uçuyor, uçuş süresi rakiplerle benzer ve güvenlik payı her zaman pozitif. Bir sonraki slaytta bunu grafiklerde göreceğiz.

## 33. Grafiklerde fark açık: bu çalışma MADER'den ~100 kat hızlı, MADER zor koşulda çarpışıyor

*≈ 55 sn*

Grafiklerde iki şeye bakalım. Soldaki iki grafik hesap süresi ve eksen logaritmik; her çizgi on kat demek. Mavi MADER yaklaşık 0,1 saniyede, yani 100 milisaniyede hesaplıyor. Sarı, yani bu çalışma, bunun yaklaşık yüzde biri kadar sürede, milisaniyenin altında. Sağdaki iki grafik en küçük güvenlik payı; taralı kırmızı bölge çarpışma demek. Engeller 1 metreye sıklaşınca ve hız 3 metreye çıkınca mavi çubuk bu kırmızı bölgeye iniyor: MADER çarpışıyor. Sarı çubuk ise her ayarda sıfırın üstünde. Bu değerleri grafikten okudum; kesin sayılar makalenin ek tablolarında.

## 34. Swarm playground: 40 dronluk simülasyonu Xbox kumandasıyla siz yönetiyorsunuz

*≈ 40 sn · zaman kısaysa atlanabilir*

Makalenin belki de en eğlenceli kısmı bu: swarm playground, yani sürü oyun alanı. Bütün kod açık ve bilgisayarınıza kurup 40 dronluk bir sürüyü izleyebiliyorsunuz. Hedefleri, makalenin kendi deyişiyle, eski strateji oyunu Red Alert 2'deki gibi seçip gönderiyorsunuz. Daha da güzeli: sağ alttaki Xbox kumandalarıyla takip edilen hedef ya da dronların kaçması gereken hareketli engel siz oluyorsunuz. Ubuntu ve ROS kurulu bir bilgisayar yetiyor. Bu konuyla ilgilenen varsa denemek için harika bir başlangıç noktası.

## 35. Tartışma: ne başarıldı, ne eksik kaldı?

*≈ 10 sn*

Bu kadar güzel sonuçtan sonra biraz eleştirel bakalım: ne başarıldı, ne eksik kaldı?

## 36. TEEM sahada birlikte sağlanıyor; ancak çözüm yerel ve gerçek testler 10 dronla sınırlı

*≈ 55 sn*

Katkı tarafında üç şey öne çıkıyor. Birincisi, hedef uçuş sırasında istendiği an değiştirilebiliyor; bu da sistemi üst seviye karar veren yazılımlara bağlamayı kolaylaştırıyor. İkincisi, güvenlik ve fiziksel uygunluk planlayıcının içinde çözülüyor; üstteki yazılım sadece göreve odaklanabiliyor. Üçüncüsü, kod, donanım tasarımı ve veri herkese açık. Sınırlılıklarda yazarlar dürüst davranıyor. Gerçek dünya performansı için matematiksel ispattan bilerek vazgeçiyorlar; bulunan çözüm en iyisi değil, yerel olarak iyi. Dronların birbirini beklerken kilitlenmesi nadir görülüyor ama dar ve uzun bir tüp gibi özel geometrilerde olabiliyor. Son madde benim yorumum: gerçek uçuşlar en fazla 10 dronla yapıldı; 40 dron yalnızca simülasyonda.

## 37. Sonraki adımlar: önceden şekli olmayan, kuş sürüsü gibi esnek formasyonlar

*≈ 45 sn · zaman kısaysa atlanabilir*

Makale ileriye dönük birkaç fikir veriyor. Birincisi serbest formasyon: önceden bir şekil tanımlamak yerine dronlar sadece birbirine yakın duruyor ve kuş sürüleri gibi davranıyor. İkincisi, formasyon şeklinin görevin gerektirdiği an değişebilmesi. Üçüncüsü, bir üst katmandaki görev atama yazılımının her drona sadece hedef göndermesi; gerisini planlayıcı halleder. Ben de size bir tartışma sorusu bırakmak istiyorum: bu sürüyü 10 değil 100 dronla gerçek bir ormana salsak, sizce ilk ne bozulur? Kablosuz iletişim mi, konum kestirimi mi, yoksa planlama mı? (Kısa bir süre fikir alın.)

## 38. Sonuçlar

*≈ 45 sn*

Üç cümleyle özetleyeyim. Bir: sık bir ortamda sürü uçuşu için yörüngenin sadece şeklini değil zamanlamasını da optimize etmek gerekiyor; MINCO bunu milisaniyeler içinde mümkün kılıyor. İki: bütün gereksinimlerin ceza terimine çevrilmesi sistemi genişletilebilir yapıyor; formasyon ve takip birer terimle eklendi. Üç: bütün bunlar 300 gramın altındaki dronlara sığıyor ve sürü GPS, harita ya da merkezi bir sunucu olmadan sık bir ormanda uçabiliyor. Bilim kurgu filmleriyle başlamıştık; görünüşe göre o gelecek sandığımızdan yakın. Dinlediğiniz için teşekkürler; soru ve geri bildirimlerinizi bekliyorum. (Bu slayt soru-cevap boyunca ekranda kalsın.)

## 39. Kaynakça

*≈ 5 sn*

Sunumda atıf yaptığım bütün kaynaklar burada. Görsellerin tamamı ana makaleden alındı.

## 40. Ek A: Kısıt dönüştürme ve kademeli güvenlik

*≈ 60 sn*

(Soru gelirse.) Kısıtları cezaya çevirince çözüm bir kısıtı ihlal edebilir; güvenlik nasıl sağlanıyor? Cevap iki katmanlı. Önce dönüşüm: sürekli zamanda sonsuz sayıda eşitsizlik var, bunlar büyük ağırlıklı ceza integrallerine çevriliyor, integraller de eşit aralıklı örneklerin toplamıyla hesaplanıyor. Sonuç kısıtsız bir problem ve L-BFGS onu hızla çözüyor. Sonra güvenlik merdiveni: her planlamadan sonra kontrol yapılıyor; ihlal varsa o cezanın ağırlığı artırılıp yeniden deneniyor. Birkaç denemede olmazsa 10 milisaniye beklenip yeniden planlanıyor. Harita değiştiği için arka planda sürekli bir çarpışma kontrolü çalışıyor; tehlike görülürse hemen yeniden planlanıyor, o da olmazsa acil durma yörüngesi üretiliyor.

## 41. Ek B: UWB ile konum kayması düzeltme

*≈ 50 sn*

(Soru gelirse.) GPS yokken dronların konumu zamanla kaymaz mı, bu da çarpışmaya yol açmaz mı? Evet, kamera ve IMU ile bulunan konum zamanla kayıyor. Bunu düzeltmek için her dron UWB ile komşularına olan mesafeyi ölçüyor. Komşuların konumunu zaten yayınlanan yörüngelerden biliyor. Ölçülen mesafe ile hesaplanan mesafe arasındaki farkı en küçük kareler yöntemiyle en aza indiriyor. Çıkan konumu doğrudan kullanmak yerine yavaş değişen kaymayı kestiriyor, onu filtreden geçirip konuma ekliyor. İletişime neredeyse hiç ek yük binmiyor, çünkü UWB yörünge yayınından ayrı bir frekansta çalışıyor.

