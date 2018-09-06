function button_tyakusu() {
var Urlgoo;
 var area = document.getElementById('area').value;
 var mae = ("https://tyakusu.appspot.com/search?q=");
 var ushiro = ("&action=translate");
 var Urlgoo = mae + area + ushiro;
 var gog = window.open(Urlgoo,'_blank');
 }

