import { test, expect } from 'vitest';
import { removeAt } from '@/common/utils';

test('removeAt', () => {
  const array = [0, 1, 2, 3, 4, 5];
  expect(removeAt([0, 1, 2, 3, 4, 5], 2)).toStrictEqual([0, 1, 3, 4, 5]);
  expect(array).toStrictEqual([0, 1, 2, 3, 4, 5]);
});
