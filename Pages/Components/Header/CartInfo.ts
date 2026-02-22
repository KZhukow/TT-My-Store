import { Locator, Page } from '@playwright/test';

export default class CartInfo {
  wrapper: Locator;

  constructor(parrentWrapper: Locator | Page, wrapper: Locator = parrentWrapper.locator('#cart-wrapper')) {
    this.wrapper = wrapper;
  }

  get itemsQuantity(): Locator {
    return this.wrapper.locator('.quantity');
  }

  get gotoCartLink(): Locator {
    return this.wrapper.locator('//a[text()="Checkout »"]');
  }
}
