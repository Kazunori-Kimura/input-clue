const fs = require('fs-extra');
const path = require('path');

const HTML_FILE_BASE = '../downloads/So-net-all';

const re = /getresult\(([0-9,]+)\)/ig;

async function convert(filename) {
  const data = await fs.readFile(path.resolve(HTML_FILE_BASE, filename), 'utf-8');
  
  let matches;
  const lines = [];
  while (matches = re.exec(data)) {
    if (matches.length === 2) {
      const item = matches[1];
      // const arr = item.split(',');
      // const value = parseInt(arr[3], 10);
      lines.push(`{ "code": [${item}] }`);
    }
  }
  const json = `[${lines.join(',')}]`;
  const obj = JSON.parse(json);
  const file = filename.replace('.html', '.json');
  await fs.writeJson(file, obj);
}

async function main() {
  const files = [
    'Thai_Pho_Pickup.html',
    'Pinyin_Pickup.html',
    'Vietnam_Pickup.html',
    'Lao_Pickup.html',
    'Tibetan_Pickup.html',
  ];

  const tasks = files.map(convert);
  await Promise.all(tasks);
}


main().then(() => {
  console.log('done');
}).catch((err) => {
  console.error(err);
});
