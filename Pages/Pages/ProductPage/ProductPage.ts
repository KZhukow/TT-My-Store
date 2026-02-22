import { Page } from '@playwright/test';

import BasePage from '../BasePages/BasePage';
import BlockWithCards from '../../Components/BlockWithCards/BlockWithCards';

import ProductCard from './ProductCard';

export default class ProductPage extends BasePage {
  constructor(page: Page, pageTitle?: string) {
    super({ page, pageTitle, requiredElement: page.locator('#box-product') });
  }

  get productCard(): ProductCard {
    return new ProductCard(this.page.locator('#box-product'));
  }

  get alsoPurchasedProductsBlock(): BlockWithCards {
    return new BlockWithCards(this.page, 'Also Purchased Products');
  }
}
