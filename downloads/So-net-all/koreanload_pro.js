var shoseik = 0;
var chuseik = 0;
var shuseik = 0;
var overik = 0;
var str2 = 0;


function getresult_k1(shoseik, chuseik, shuseik, overik, str2) {//文字引数を受け取り、文字に変換

  code_point = 44032 + (shoseik * 28 * 21) + (chuseik * 28) + shuseik; //44302=0xac01
  result1k = String.fromCharCode(code_point);
  i_result1 = result1k
  i_shoseik = shoseik;
  i_chuseik = chuseik;


  show_R = String.fromCharCode(str2);

  document.getElementById('hungeularea').value = show_R;
}



function getresult_k2(shoseik, chuseik, shuseik, overik, str2) {//文字引数を受け取り、文字に変換

  code_point = 44032 + (shoseik * 28 * 21) + (chuseik * 28) + shuseik; //44302=0xac01
  result2k = String.fromCharCode(code_point);
  i_result1 = result2k
  i_shoseik = shoseik;
  i_chuseik = chuseik;
  overik = overik
  //var selection =document.getElementById('hungeularea').value=result1k;
  document.getElementById('hungeularea').value = i_result1;
}






function getresult_k3(shoseik, chuseik, shuseik, overik, str2) {//文字引数を受け取り、文字に変換

  code_point = 44032 + (shoseik * 28 * 21) + (chuseik * 28) + shuseik; //44302=0xac01
  result3k = String.fromCharCode(code_point);
  i_result1 = result3k
  i_shoseik = shoseik;
  i_chuseik = chuseik;
  overik = overik
  str2 = str2
  var selection = document.getElementById('hungeularea').value = i_result1;
}


























function result2() {
  { i_result1 = String.fromCharCode(code_point); }
}

/*IE以外用ダミー*/
function pos() { }
function ins() { }
//-->

var n = 0
function pos() {
  if (!document.all) return
  var r = document.selection.createRange()
  r.moveEnd("textedit")
  n = r.text.length
}
function insk() {
  document.getElementById("hungeularea").focus();
  var a = document.getElementById('hungeularea').value;

  var mojiretsu = a;
  var area = document.getElementById('area');
  var bun = document.getElementById('area').value;
  var nagasa = bun.length;
  var basho = area.selectionStart;
  var mae = bun.substr(0, basho);

  var ushiro = bun.substr(basho, nagasa);
  document.getElementById('area').focus();
  document.getElementById('area').value = mae + mojiretsu + ushiro;


}



function inscode() {
  var dd = document.getElementById('hungeularea').value;
  var ee = dd.charCodeAt(0);
  document.getElementById('hungeulcode').value = ee;



}
