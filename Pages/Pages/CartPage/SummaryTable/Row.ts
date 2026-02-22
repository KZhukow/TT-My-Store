import { Locator } from '@playwright/test';

export default class Row {
  wrapper: Locator;

  constructor(wrapper: Locator) {
    this.wrapper = wrapper;
  }

  get allCells(): Locator {
    return this.wrapper.locator('td');
  }
}
