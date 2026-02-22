import { Locator } from '@playwright/test';

export interface ICardInfo {
  price: string;
  title: string;
  imgAlt: string;
  parsedPrice: number;
  imgSrc: string;
}

export default class BaseProductCard {
  wrapper: Locator;

  constructor(wrapper: Locator) {
    this.wrapper = wrapper;
  }

  get title(): Locator {
    return this.wrapper.locator('.name');
  }

  get img(): Locator {
    return this.wrapper.locator('img');
  }

  get priceWrapper(): Locator {
    return this.wrapper.locator('.price-wrapper');
  }

  get finalPrice(): Locator {
    return this.priceWrapper.locator('//*[@class="campaign-price" or @class="price"]');
  }

  async getAllInfo(isImgSrcNeed = false): Promise<ICardInfo> {
    const title = await this.title.textContent();
    const price = await this.finalPrice.textContent();
    const imgAlt = await this.img.getAttribute('alt');
    const imgSrc = isImgSrcNeed ? await this.img.getAttribute('src') : '';
    const parsedPrice = +price.replace('$', '');

    return { title, price, imgAlt, parsedPrice, imgSrc };
  }
}
