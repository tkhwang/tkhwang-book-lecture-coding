export function wrap(text: string, width: number): string {
  if (text.length <= width) return text;

  return text.slice(0, width) + "\n" + wrap(text.slice(width).trim(), width);
}