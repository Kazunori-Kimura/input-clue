function button_Google() {
var Urlgoogle;
 var area = document.getElementById('area').value;
 var mae = ("https://www.google.co.jp/search?q=");
 var ushiro = ("&hl=ja&source=lnms&tbm=isch&sa=X&ved=0ahUKEwig9rq7l77ZAhXIE7wKHShXC3YQ_AUICigB&biw=919&bih=604");
 var Urlgoogle = mae + area + ushiro;

 var gog = window.open(Urlgoogle,'_blank');
 }


//https://www.google.co.jp/search?hl=ja&source=hp&ei=nCSRWqSuPIG28QXcqLPQAw&q=march&oq=march&gs_l=psy-ab.3..0i131k1l3j0l5.10469.11873.0.13674.6.5.0.0.0.0.134.474.4j1.5.0....0...1c.1.64.psy-ab..1.5.473.0..35i39k1j0i4k1j0i131i4k1j0i67k1.0.PownLnhpXS8