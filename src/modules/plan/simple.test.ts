import { test } from 'vitest';

class TestClass {
  name: string
  constructor(name) {
    this.name = name;
  }
  toString(): string {
    return 'TestClass: ' + this.name
  }
}

test('object key iterate', () => {
  const test1 = new TestClass()
  const obj =
});