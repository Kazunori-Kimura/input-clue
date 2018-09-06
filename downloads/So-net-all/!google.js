function button_Google() {
 var Urlgo;
 var str = document.getElementById('area').value;
 var mae = ("https://www.google.co.jp/search?q=");
 var urlc = encodeURI(str);
 var ushiro = ("&aqs = chrome.1.69i57j69i59j0l4.3860j0j8&sourceid=chrome&ie=UTF-8https:");
 Urlgo = mae + urlc + ushiro;

 var gog = window.open(Urlgo,'_blank','menubar=0,width=700,height=600,top=100,left=100');
 }

