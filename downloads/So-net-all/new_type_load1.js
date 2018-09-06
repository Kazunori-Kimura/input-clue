/*IE以外用ダミー*/
 var n=0
 function pos(){
 if(!document.all)return
 var r=document.selection.createRange()
 r.moveEnd("textedit")
 n=r.text.length
 }

function moo(){document.getElementById("area").focus();}

function ins(a){
document.getElementById("area").focus();
 var mojiretsu = a;
 var area = document.getElementById('area');
 var bun = document.getElementById('area').value;
 var nagasa = bun.length;
 var basho = area.selectionStart;
 var mae = bun.substr(0, basho);
 var ushiro = bun.substr(basho, nagasa);
document.getElementById('area').value = mae + mojiretsu+ ushiro;
}

//オールデリート 
function CLR(){document.getElementById('area').value="";
document.getElementById('area').focus()
}

//全コピーの関数



function textcopy() {

		var text = document.getElementById('area').value;

		clipboardData.setData("Text",text);
		 document.getElementById('area').focus()

	}

