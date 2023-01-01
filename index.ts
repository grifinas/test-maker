import { TestMaker } from './src';

if (process.argv.length < 3) {
  console.log('Usage: ts-node index.ts path-to-file');
  process.exit(1);
}

const testMaker = new TestMaker();

testMaker
  .makeTest(process.argv[2])
  .catch((error) => console.error('critical error', error));
