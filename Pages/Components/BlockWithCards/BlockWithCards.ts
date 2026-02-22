import { Locator, Page } from '@playwright/test';

import Card from './Card';

export default class BlockWithCards {
  wrapper: Locator;

  constructor(parrentWrapper: Locator | Page, blockName: string) {
    this.wrapper = parrentWrapper.locator(`//*[./h3[text()="${blockName}"]]`);
  }

  get cardsWrapper(): Locator {
    return this.wrapper.locator('ul');
  }

  get allCards(): Locator {
    return this.cardsWrapper.locator('li');
  }

  getAnyCard(index = 0): Card {
    return new Card(this.allCards.nth(index));
  }

  getCardWithoutSale(index = 0): Card {
    return new Card(this.cardsWrapper.locator('//li[not(.//*[contains(@class, "sticker") and contains(@class, "sale")])]').nth(index));
  }

  getCardWithSale(index = 0): Card {
    return new Card(this.cardsWrapper.locator('//li[.//*[contains(@class, "sticker") and contains(@class, "sale")]]').nth(index));
  }
}
