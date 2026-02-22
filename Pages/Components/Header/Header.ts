import { Locator, Page } from '@playwright/test';

import CartInfo from './CartInfo';

export default class Header {
  wrapper: Locator;

  constructor(parrentWrapper: Locator | Page, wrapper: Locator = parrentWrapper.locator('header#header')) {
    this.wrapper = wrapper;
  }

  get cartInfo(): CartInfo {
    return new CartInfo(this.wrapper);
  }

  get logoImg(): Locator {
    return this.wrapper.locator('#logotype-wrapper img');
  }
}
