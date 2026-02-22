import { Locator, Page } from '@playwright/test';

import BasePage from '../BasePages/BasePage';
import WindowsTitles from '../../../Extensions/EnumData/WindowsTitles';

export default class SuccessOrderPage extends BasePage {
  constructor(page: Page) {
    super({ page, pageTitle: WindowsTitles.OrderSuccess, requiredElement: page.locator('#box-order-success'), link: 'order_success' });
  }

  get successOrderMsg(): Locator {
    return this.page.locator('//h1[text()="Your order is successfully completed!"]');
  }
}
