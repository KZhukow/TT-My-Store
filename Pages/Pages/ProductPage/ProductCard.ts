import delay from 'delay';
import { Locator } from '@playwright/test';

import BaseProductCard from '../../Components/BaseComponents/BaseProductCard';

export default class ProductCard extends BaseProductCard {
  get imgWrapper(): Locator {
    return this.wrapper.locator('.images-wrapper');
  }

  get img(): Locator {
    return this.imgWrapper.locator('img');
  }

  get title(): Locator {
    return this.wrapper.locator('h1.title');
  }

  get quantityInput(): Locator {
    return this.wrapper.locator('[name="quantity"]');
  }

  get sizeSelect(): Locator {
    return this.wrapper.locator('[name="options[Size]"]');
  }

  get addToCartBtn(): Locator {
    return this.wrapper.locator('//button[text()="Add To Cart"]');
  }

  async addToCart(quantity: number | string): Promise<void> {
    await this.quantityInput.fill(`${quantity}`);
    if (await this.sizeSelect.isVisible()) {
      await this.sizeSelect.selectOption({ value: 'Small', label: 'Small' });
    }

    await this.addToCartBtn.click();
    await delay(1000);
  }
}
