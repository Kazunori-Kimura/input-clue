const fs = require('fs-extra');
const path = require('path');

const HTML_FILE_BASE = '../downloads/So-net-all';

const re = /getresult\(([0-9,]+)\)/ig;

const files = [
  // {
  //   file: 'Myanmar_Pickup.html',
  //   json: 'myanmar.json',
  // },
  // {
  //   file: 'Myanmar_Pickup_2.html',
  //   json: 'myanmar_basic.json',
  // },
  // {
  //   file: 'Pashto_Pickup.html',
  //   json: 'pashto.json',
  // },
  // {
  //   file: 'Assamese_Pickup.html',
  //   json: 'assamese.json',
  // },
  // {
  //   file: 'Sanskrit_Pickup.html',
  //   json: 'sanskrit.json',
  // },
  // {
  //   file: 'Bengali_Pickup.html',
  //   json: 'bengali.json',
  // },
  // {
  //   file: 'kmer_Cambodian.html',
  //   json: 'kmer.json',
  // },
  // {
  //   file: 'Tamil_Pickup.html',
  //   json: 'tamil.json',
  // },
  // {
  //   file: 'Sinhala_EM_Pickup.html',
  //   json: 'sinhala.json',
  // },
  // {
  //   file: 'Napali_Pickup.html',
  //   json: 'napali.json',
  // },
  // {
  //   file: 'Hindi_Pickup.html',
  //   json: 'hindi.json',
  // },
  // {
  //   file: 'Syrian_Pickup.html',
  //   json: 'syrian.json',
  // },
  // {
  //   file: 'Turkish_Pickup.html',
  //   json: 'turkish.json',
  // },
  // {
  //   file: 'Turkish_Pho_Pickup.html',
  //   json: 'turkish_pho.json',
  // },
  // {
  //   file: 'Hangary_Pickup.html',
  //   json: 'hangary.json',
  // },
  // {
  //   file: 'English_Pho_Pickup.html',
  //   json: 'english_pho.json',
  // },
  // {
  //   file: 'Cyrillic_Pickup.html',
  //   json: 'cyrillic.json',
  // },
  // {
  //   file: 'Russian_Pickup.html',
  //   json: 'russian.json',
  // },
  // {
  //   file: 'Suomi_Pickup.html',
  //   json: 'suomi.json',
  // },
  // {
  //   file: 'French_Pho_Pickup.html',
  //   json: 'french_pho.json',
  // },
  // - [ ] Mongolian_Pickup.html ＜古モンゴル語＞
  // {
  //   file: 'Mongolian_Pickup.html',
  //   json: 'mongolian.json',
  // },
  // // - [ ] Lao_Pickup3.html ＜ラオス語 拡張版＞
  // {
  //   file: 'Lao_Pickup3.html',
  //   json: 'lao_ext.json',
  // }
  {
    file: 'korean_Pickup.html',
    json: 'korean.json',
  },
  {
    file: 'korean_PickupV1.html',
    json: 'korean_pro.json',
  },
  // - [ ] Arabic_Pickup.html ＜アラビア語サウジアラビア＞
  {
    file: 'Arabic_Pickup.html',
    json: 'arabic.json',
  },
  // - [ ] Hebrew_Pickup.html ＜へブル語＞
  {
    file: 'Hebrew_Pickup.html',
    json: 'hebrew.json',
  },
];

async function convert({ file, json }) {
  const data = await fs.readFile(path.resolve(HTML_FILE_BASE, file), 'utf-8');
  
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
  const jsonStr = `[\n  ${lines.join(',\n  ')}\n]`;
  // const obj = JSON.parse(jsonStr);
  await fs.writeFile(path.resolve('./lang', json), jsonStr);
}

async function main() {
  const tasks = files.map(convert);
  await Promise.all(tasks);
}


main().then(() => {
  console.log('done');
}).catch((err) => {
  console.error(err);
});
