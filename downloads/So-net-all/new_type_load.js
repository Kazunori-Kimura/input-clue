/*IE以外用ダミー*/
function pos(){}
function ins(){}


function ins(a){

//var result1k=a
 var mojiretsu = a;
 var area = document.getElementById('area');
 var bun = document.getElementById('area').value;
 var nagasa = bun.length;
 var basho = area.selectionStart;
 var mae = bun.substr(0, basho);
 var ushiro = bun.substr(basho, nagasa);
 area.value = mae + mojiretsu + ushiro;
}


//オールデリート
function CLR(){
var reset_target = document.getElementById("area");

reset_target.value = '';


//document.getElementById('area').value="";
document.getElementById("area").focus();
}

//全コピーの関数



function textcopy() {

		var doctext = document.getElementById('area');
                        doctext.select();
		document.execCommand("copy");
document.getElementById("area").focus();
		}

//BACKSPACE

function debef(){

var areav = document.getElementById('area').value;

var length = areav.length;

var str = areav.substring(0,length-1);

var result = document.getElementById('area').value=str;

document.getElementById("area").focus();

}
