import { Locator } from '@playwright/test';

import BaseProductCard from '../../Components/BaseComponents/BaseProductCard';

export default class ProductCard extends BaseProductCard {
  get title(): Locator {
    return this.wrapper.locator('//a[./strong]');
  }

  get quantityInput(): Locator {
    return this.wrapper.locator('[name="quantity"]');
  }

  get finalPrice(): Locator {
    return this.wrapper.locator('//p[contains(text(), "$")]');
  }
}
