export function isBuiltInType(type: string): boolean {
  return Boolean(
    [
      'null',
      'undefined',
      'boolean',
      'number',
      'string',
      'object',
      'symbol',
      'unknown',
      'never',
    ].find((builtIn) => builtIn === type),
  );
}
