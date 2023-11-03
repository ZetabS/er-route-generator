import type { Item } from '.';

export class ItemStack {
  item: Item;
  quantity: number = 0;
  // private _quantity: number = 0;

  constructor(item: Item, quantity?: number) {
    this.item = item;
    if (quantity) {
      this.quantity = quantity;
    }
  }

  // set quantity(quantity: number) {
  //   if (quantity > this.item.stackable) {
  //     throw new Error(
  //       `Quantity exceeds the stackable limit(${this.item.stackable}) for '${this.item.name}'.`
  //     );
  //   } else if (quantity < 0) {
  //     throw new Error(`Quantity must be 0 or greater for '${this.item.name}'.`);
  //   }
  //   this._quantity = quantity;
  // }
  //
  // get quantity() {
  //   return this._quantity;
  // }
}
