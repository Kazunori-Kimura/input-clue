function button_weblio() {
 var Urlgo;
 var str = document.getElementById('area').value;
 var mae = ("https://tjjt.weblio.jp/content_find/contains/0/");
 var urlc = encodeURI(str);
 var ushiro = ("");
 Urlgo = mae + urlc + ushiro;

 var gog = window.open(Urlgo,'_blank','menubar=0,width=700,height=600,top=100,left=100');
 }

