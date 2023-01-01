declare module 'prettier' {
  type PrettierConfig = {};

  export function resolveConfig(path: string): PrettierConfig;
  export function format(content: string, config: PrettierConfig): string;
}
