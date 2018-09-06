function button_Google() {
var Urlgoogle;
 var area = document.getElementById('area').value;
 var mae = ("http://www.google.co.jp/search?output=&sitesearch=&hl=ja&q=");
 var ushiro = ("");
 var Urlgoogle = mae + area + ushiro;

 var gog = window.open(Urlgoogle,'_blank');
 }
