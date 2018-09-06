function button_kmer() {
 var Urlgo;
 var str = document.getElementById('area').value;
 var mae = ("https://ja.glosbe.com/km/ja/");
 var urlc = encodeURI(str);
 var ushiro = ("");
 Urlgo = mae + urlc + ushiro;
 var gog = window.open(Urlgo,'_blank','menubar=0,width=700,height=600,top=100,left=100');
 }

