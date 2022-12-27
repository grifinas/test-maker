import { TypescriptParser } from 'typescript-parser';

const parser = new TypescriptParser();

export function getParser() {
  return parser;
}
