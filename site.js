// Panda Puki ve Ailesi — küçük site betiği

// Telefon menüsü
document.querySelectorAll(".menu-dugme").forEach(function (d) {
  d.addEventListener("click", function () {
    var m = document.getElementById("menu");
    var acik = m.classList.toggle("acik");
    d.setAttribute("aria-expanded", acik ? "true" : "false");
  });
});

// Videoları listele (liste: videolar-listesi.js)
(function () {
  var dil = (document.documentElement.lang || "tr").slice(0, 2);
  var METIN = {
    tr: { yakinda: "İlk bölüm çok yakında!", haber: "Yeni bölümler yayınlandığında haber almak için YouTube kanalımıza abone olabilirsiniz.", abone: "YouTube'da abone ol" },
    en: { yakinda: "The first episode is coming soon!", haber: "Subscribe to our YouTube channel to hear when new episodes come out.", abone: "Subscribe on YouTube" },
    ru: { yakinda: "Первая серия совсем скоро!", haber: "Подпишитесь на наш YouTube-канал, чтобы узнать о выходе новых серий.", abone: "Подписаться на YouTube" }
  };
  if (!METIN[dil]) dil = "tr";
  var M = METIN[dil];
  var hedefler = document.querySelectorAll("[data-videolar]");
  if (!hedefler.length) return;
  var liste = (window.VIDEOLAR || []).filter(function (v) { return v && v.id; });

  hedefler.forEach(function (hedef) {
    var adet = parseInt(hedef.getAttribute("data-videolar"), 10) || liste.length;
    var secilen = liste.slice(0, adet);

    if (!secilen.length) {
      hedef.outerHTML =
        '<div class="bos-video">' +
        '<img src="/img/apple-touch-icon.png" alt="" width="140" height="140">' +
        "<h3>" + M.yakinda + "</h3>" +
        "<p>" + M.haber + "</p>" +
        '<a class="dugme dugme-yt" href="https://www.youtube.com/@pandapukitv?sub_confirmation=1" target="_blank" rel="noopener">' + M.abone + "</a>" +
        "</div>";
      document.querySelectorAll("[data-bos-gizle]").forEach(function (e) { e.hidden = true; });
      return;
    }

    hedef.innerHTML = secilen.map(function (v) {
      // İsteğe bağlı çeviri: baslik_en, aciklama_ru gibi alanlar; yoksa Türkçesi görünür
      var baslik = (v["baslik_" + dil] || v.baslik || "Panda Puki ve Ailesi").replace(/</g, "&lt;");
      var aciklama = (v["aciklama_" + dil] || v.aciklama || "").replace(/</g, "&lt;");
      return (
        '<article class="kart">' +
        '<div class="video-kutu">' +
        '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id) + '?rel=0" ' +
        'title="' + baslik + '" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" ' +
        'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' +
        "</div>" +
        '<div class="kart-ic"><h3>' + baslik + "</h3>" + (aciklama ? "<p>" + aciklama + "</p>" : "") + "</div>" +
        "</article>"
      );
    }).join("");
  });
})();
