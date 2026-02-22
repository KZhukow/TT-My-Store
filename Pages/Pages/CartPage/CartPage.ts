import { Locator, Page } from '@playwright/test';

import BasePage from '../BasePages/BasePage';
import WindowsTitles from '../../../Extensions/EnumData/WindowsTitles';

import ProductCard from './ProductCard';
import SummaryTable from './SummaryTable/SummaryTable';
import CustomerDetailsForm from './CustomerDetailsForm';

export default class CartPage extends BasePage {
  constructor(page: Page) {
    super({ page, pageTitle: WindowsTitles.Checkout, requiredElement: page.locator('#customer-service-wrapper'), link: 'checkout' });
  }

  get productCard(): ProductCard {
    return new ProductCard(this.page.locator('[name="cart_form"]'));
  }

  get summaryTable(): SummaryTable {
    return new SummaryTable(this.page);
  }

  get confirmOrderBtn(): Locator {
    return this.page.locator('//button[text()="Confirm Order"]');
  }

  get customerDetailsForm(): CustomerDetailsForm {
    return new CustomerDetailsForm(this.page);
  }
}
