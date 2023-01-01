import { File } from 'typescript-parser';

export const TestTypes = {
  IT: 'integration',
  UNIT: 'unit',
} as const;

export type GetTestType = (file: File) => string;
