import { Locator, Page } from '@playwright/test';

import Row from './Row';

export default class SummaryTable {
  wrapper: Locator;

  constructor(wrapperLocator: Locator | Page, wrapper: Locator = wrapperLocator.locator('table.dataTable')) {
    this.wrapper = wrapper;
  }

  get allRows(): Locator {
    return this.wrapper.locator('//tr[not(@class)]');
  }

  getRowByIndex(index = 0): Row {
    return new Row(this.allRows.nth(index));
  }

  getRowByText(text: string): Row {
    return new Row(this.allRows.filter({ hasText: text }));
  }

  get totalPrice(): Locator {
    return this.wrapper.locator('tr.footer td').last();
  }
}
