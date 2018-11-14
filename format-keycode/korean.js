const fs = require('fs-extra');
const path = require('path');

const HTML_FILE = '../downloads/So-net-all/korean_Pickup.html';
const re = /value="([^"]+)"/ig;

const data = fs.readFileSync(path.resolve(HTML_FILE), 'utf-8');
let matches;
while (matches = re.exec(data)) {
  if (matches.length === 2) {
    let value = matches[1];
    if (value.indexOf('&#') >= 0) {
      // 数値文字参照を文字列に変換
      value = decNumRefToString(value);
    }
    console.log(value);
  }
}

function decNumRefToString(decNumRef) {
	return decNumRef.replace(/&#(\d+);/ig, (match, $1) => String.fromCharCode($1));
}