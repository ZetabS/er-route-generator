export function removeAt(array: any[], index: number): any[] {
  return [...array.slice(0, index), ...array.slice(index + 1, array.length)];
}

export function ceilToMultipleOf(value: number, multiple: number): number {
  if (multiple <= 0) {
    throw new Error("The 'multiple' parameter must be greater than zero.");
  }
  const quotient = Math.ceil(value / multiple);
  return quotient * multiple;
}

export function countKoreanCharacters(inputString: string) {
  const koreanCharacters = inputString.match(/[가-힣]/g);
  return koreanCharacters ? koreanCharacters.length : 0;
}
