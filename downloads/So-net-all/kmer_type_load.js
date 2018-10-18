// ローカル変数定義
var result1;
var shosei = 0;
var chusei = 0;
var shusei = 0;
var overi = 0;
//コードから文字取得
function getresult(overi, shosei, chusei, shusei) {
	if (overi == 0 && shosei == 0 && chusei == 0) {
		result1 = String.fromCharCode(shusei);
	} else if (overi == 0 && shosei == 0 && chusei > 0) {
		result1 = String.fromCharCode(shusei, chusei);
	}
	else if (overi == 0 && shosei > 0 && chusei > 0) {
		result1 = String.fromCharCode(shusei, chusei, shosei);
	}
	else {
		result1 = String.fromCharCode(shusei, chusei, shosei, overi);
	}
	i_result1 = result1;
}

//ボタ用
function ins(text) {
	document.getElementById("area").focus();
	var str = text;
	//テキストエリア位置取得
	var selection = document.selection.createRange();
	//テキストエリアの位置に取得した内容をセット
	selection.text = str + selection.text;
}
//消去の関数

function CLR() {
	document.form.text2.value = "";
}

//全コピーの関数

function textcopy() {
	obj = document.form.text2.createTextRange();
	obj.execCommand("Copy");
}