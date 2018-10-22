const files = require('./file.json');
const data = [
  {
    file: 'Myanmar_Pickup.html',
    json: 'myanmar.json',
  },
  {
    file: 'Myanmar_Pickup_2.html',
    json: 'myanmar_basic.json',
  },
  {
    file: 'Pashto_Pickup.html',
    json: 'pashto.json',
  },
  {
    file: 'Assamese_Pickup.html',
    json: 'assamese.json',
  },
  {
    file: 'Sanskrit_Pickup.html',
    json: 'sanskrit.json',
  },
  {
    file: 'Bengali_Pickup.html',
    json: 'bengali.json',
  },
  {
    file: 'kmer_Cambodian.html',
    json: 'kmer.json',
  },
  {
    file: 'Tamil_Pickup.html',
    json: 'tamil.json',
  },
  {
    file: 'Sinhala_EM_Pickup.html',
    json: 'sinhala.json',
  },
  {
    file: 'Napali_Pickup.html',
    json: 'napali.json',
  },
  {
    file: 'Hindi_Pickup.html',
    json: 'hindi.json',
  },
  {
    file: 'Syrian_Pickup.html',
    json: 'syrian.json',
  },
  {
    file: 'Turkish_Pickup.html',
    json: 'turkish.json',
  },
  {
    file: 'Turkish_Pho_Pickup.html',
    json: 'turkish_pho.json',
  },
  {
    file: 'Hangary_Pickup.html',
    json: 'hangary.json',
  },
  {
    file: 'English_Pho_Pickup.html',
    json: 'english_pho.json',
  },
  {
    file: 'Cyrillic_Pickup.html',
    json: 'cyrillic.json',
  },
  {
    file: 'Russian_Pickup.html',
    json: 'russian.json',
  },
  {
    file: 'Suomi_Pickup.html',
    json: 'suomi.json',
  },
  {
    file: 'French_Pho_Pickup.html',
    json: 'french_pho.json',
  },
];

// filesとdataをマージして { keycode, name } な配列を作る
const list = data.map((item) => {
  const file = files.find(f => f.file === item.file);
  return Object.assign(file, item);
});

// 設定ファイルに必要なJSON
list.forEach(({ json, name }) => {
  console.log(`  // ${name}
  ${json.replace('.json', '')}: {
    keycode: '${json}',
  },`);
});

// console.log('-----');

// // 言語ファイルに必要なJSON
// list.forEach(({ json, name }) => {
//   console.log(`    "${json.replace('.json', '')}": "${name}",`);
// });
