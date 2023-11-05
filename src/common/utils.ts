export function removeAt(array: any[], index: number): any[] {
  return [...array.slice(0, index), ...array.slice(index + 1, array.length)];
}
