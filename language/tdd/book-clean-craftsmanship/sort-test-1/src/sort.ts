export function sort(values: number[]): number[] {
  if (values.length === 0 || values.length === 1) return values;

  const [first, second] = values;

  if (first < second) return [first, second];

  return [second, first];
}