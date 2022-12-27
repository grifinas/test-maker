import { makeTest } from './src/make-test';

if (process.argv.length < 3) {
  console.log('Usage: ts-node index.ts path-to-file');
  process.exit(1);
}

makeTest(process.argv[2]).catch(error => console.error('critical error', error));
