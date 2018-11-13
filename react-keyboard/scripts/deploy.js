const fs = require('fs-extra');

const dist = '../docs';
const source = './build';

async function main() {
  await fs.remove(dist);
  await fs.copy(source, dist);
}

main()
  .then(() => {
    console.log('done.');
  })
  .catch((err) => {
    console.error(err);
  });
