import { expect, test } from 'vitest';
import { EquipmentSlot, Slot } from '@/modules/plan/Slot';
import { Item, ITEM } from '@/modules/api';

const flower: Item = ITEM[205102];
const swordOfJustice: Item = ITEM[120302];

test('new Slot', () => {
  const slot = new Slot();

  expect(slot.item).toBe(undefined);
  expect(slot.quantity).toBe(0);
  expect(slot.has(flower)).toBe(false);
});

test('Slot add', () => {
  const slot = new Slot();
  slot.add(flower);

  expect(slot.item).toBe(flower);
});

test('Slot remove', () => {
  const slot = new Slot();
  slot.add(flower);
  slot.remove();

  expect(slot.item).toBe(undefined);
  expect(slot.quantity).toBe(0);
});

test('Slot clear', () => {
  const slot = new Slot();
  slot.add(flower);
  slot.add(flower);
  slot.clear();

  expect(slot.item).toBe(undefined);
  expect(slot.quantity).toBe(0);
});

test('Slot canAdd', () => {
  const slot = new Slot();
  expect(slot.canAdd(flower)).toBe(true);
  slot.add(flower);
  expect(slot.canAdd(flower)).toBe(true);
  slot.add(flower);
  expect(slot.canAdd(flower)).toBe(false);
  expect(slot.quantity).toBe(2);
});

test('Slot has', () => {
  const slot = new Slot();

  expect(slot.has(flower)).toBe(false);
  slot.add(flower);
  expect(slot.has(flower)).toBe(true);
});

test('Slot isFull', () => {
  const slot = new Slot();

  expect(slot.isFull()).toBe(false);
  slot.add(flower);
  expect(slot.isFull()).toBe(false);
  slot.add(flower);
  expect(slot.isFull()).toBe(true);
});

test('Slot isEmpty', () => {
  const slot = new Slot();

  expect(slot.isEmpty()).toBe(true);
  slot.add(flower);
  expect(slot.isEmpty()).toBe(false);
});

test('new EquipmentSlot', () => {
  const slot = new EquipmentSlot('Weapon');

  expect(slot.item).toBe(undefined);
  expect(slot.has(flower)).toBe(false);
});

test('EquipmentSlot add', () => {
  const slot = new EquipmentSlot('Weapon');

  expect(slot.item).toBe(undefined);
  expect(slot.add(flower)).toBe(false);
  expect(slot.item).toBe(undefined);
  expect(slot.add(swordOfJustice)).toBe(true);
  expect(slot.item).toBe(swordOfJustice);
});

test('EquipmentSlot remove', () => {
  const slot = new EquipmentSlot('Weapon');
  slot.add(swordOfJustice);
  expect(slot.remove()).toBe(true);

  expect(slot.item).toBe(undefined);
});

test('EquipmentSlot clear', () => {
  const slot = new EquipmentSlot('Weapon');
  slot.add(swordOfJustice);
  slot.clear();

  expect(slot.item).toBe(undefined);
});

test('EquipmentSlot has', () => {
  const slot = new EquipmentSlot('Weapon');

  expect(slot.has(swordOfJustice)).toBe(false);
  slot.add(swordOfJustice);
  expect(slot.has(swordOfJustice)).toBe(true);
});

test('EquipmentSlot isFull', () => {
  const slot = new EquipmentSlot('Weapon');

  expect(slot.isFull()).toBe(false);
  slot.add(swordOfJustice);
  expect(slot.isFull()).toBe(true);
});

test('EquipmentSlot isEmpty', () => {
  const slot = new EquipmentSlot('Weapon');

  expect(slot.isEmpty()).toBe(true);
  slot.add(swordOfJustice);
  expect(slot.isEmpty()).toBe(false);
});
