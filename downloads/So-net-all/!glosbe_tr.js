function button_tr() {
 var Urlgoo;
 var str = document.getElementById('area').value;
 var mae = ("https://ja.glosbe.com/tr/ja/");
 var urlc = encodeURI(str);
 var ushiro = ("");
 var Urlgo = mae + urlc + ushiro;
 var gog = window.open(Urlgo,'_blank','menubar=0,width=700,height=600,top=100,left=100');
 }

