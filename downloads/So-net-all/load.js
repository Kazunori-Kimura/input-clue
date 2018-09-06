//それ以上小さくなると構図が崩れるため、windowサイズの決定
//window.resizeTo(620, 700);
//ローカル変数定義
var code_point1;
var code_point2;
var code_point3;
var result1;
var shosei=0;
var chusei=0;
var shusei=0;
//コードから文字取得
function getresult(shosei,chusei,shusei){//文字引数を受け取り、文字に変換
document.getElementById("area").focus();
	if(shosei==0 && chusei==0)
{result1=String.fromCharCode(shusei);}
else {if(shosei==0 && chusei>0)
{result1=String.fromCharCode(shusei,chusei);}
else
{result1=String.fromCharCode(shusei,chusei,shosei);}
}
//document.form.txtbox.value=result1
i_result1=result1
i_shosei=shosei;
i_chusei=chusei;
}

//ボタン用
function ins(text){
var str = text;
//テキストエリア位置取得
document.getElementById("area").focus();
var selection = document.selection.createRange();
//テキストエリアの位置に取得した内容をセット
selection.text = str+selection.text;
}
//消去の関数

	function CLR(){
document.form.text2.value="";
	}

//全コピーの関数

 function textcopy() {
        obj = document.form.text2.createTextRange();
        obj.execCommand("Copy");
    }