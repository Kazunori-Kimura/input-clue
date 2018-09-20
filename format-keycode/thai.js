const fs = require('fs-extra');
const HTML_FILE = '../downloads/So-net-all/Thai_Pickup.html';

async function main() {
  const data = await fs.readFile(HTML_FILE, 'utf-8');
  const re = /getresult\(([0-9,]+)\)/ig;
  let matches;
  while (matches = re.exec(data)) {
    if (matches.length === 2) {
      const item = matches[1];
      // const arr = item.split(',');
      // const value = parseInt(arr[3], 10);
      console.log(`{ code: [${item}] },`);
    }
  }
}


main().then(() => {
  console.log('done');
}).catch((err) => {
  console.error(err);
});
