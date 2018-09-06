function getresult_k(shoseik,chuseik,shuseik){//文字引数を受け取り、文字に変換
code_point=44032+(shoseik*28*21)+(chuseik*28)+shuseik; //44302=0xac01
result1k=String.fromCharCode(code_point);
document.form.textbox.value=result1k;
i_result1=result1k
i_shoseik=shoseik;
i_chuseik=chuseik;
var selection =document.form.text2.createTextRange();
}

function result2(){
{i_result1=String.fromCharCode(code_point);}
}

/*IE以外用ダミー*/
function pos(){}
function ins(){}
 //-->

 var n=0
 function pos(){
 if(!document.all)return
 var r=document.selection.createRange()
 r.moveEnd("textedit")
 n=r.text.length
 }
function insk(i_result1){
document.getElementById("hungeularea").focus();
var a = document.getElementById('hungeularea').value;
//document.getElementById("area").focus();
 var mojiretsu = a;
 var area = document.getElementById('area');
 var bun = document.getElementById('area').value;
 var nagasa = bun.length;
 var basho = area.selectionStart;
 var mae = bun.substr(0, basho);
 
var ushiro = bun.substr(basho, nagasa);

document.getElementById('area').value = mae + mojiretsu+ ushiro;

}
