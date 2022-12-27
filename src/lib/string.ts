
export function capitalize(input: string): string {
  return input[0].toUpperCase() + input.substring(1);
}

export function objectFormatting(input: string): string {
  return input.length ? ` ${input} ` : '';
}
