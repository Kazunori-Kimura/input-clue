var result1;
var shosei=0;
var chusei=0;
var shusei=0;
var overi=0;
//コードから文字取得
function getresult(overi,shosei,chusei,shusei){
document.getElementById("area").focus();
if (overi==0 && shosei==0 && chusei==0)
		{result1=String.fromCharCode(shusei);}
else if (overi==0 && shosei==0 && chusei>0)
			{result1=String.fromCharCode(shusei,chusei);}
else if (overi==0 && shosei>0 && chusei>0)
		{result1=String.fromCharCode(shusei,chusei,shosei);}
else
result1=String.fromCharCode(shusei,chusei,shosei,overi);
i_result1=result1;	
}