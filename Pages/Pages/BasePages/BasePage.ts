import { Locator, Page } from '@playwright/test';

import Header from '../../Components/Header/Header';

export interface IBasePage {
  pageTitle?: string;
  link?: string;
  page: Page;
  requiredElement: Locator;
}

export default class BasePage {
  page: Page;
  link: string;
  pageTitle: string;
  linkRegExp: RegExp;
  titleRegExp: RegExp;
  requiredElement: Locator;

  constructor({ page, pageTitle, link = '', requiredElement }: IBasePage) {
    this.pageTitle = `${pageTitle} | My Store`;
    this.link = link;
    this.linkRegExp = new RegExp(link);
    this.titleRegExp = new RegExp(pageTitle);
    this.page = page;
    this.requiredElement = requiredElement;
  }

  get header(): Header {
    return new Header(this.page);
  }

  async openPage(): Promise<void> {
    const attemptCount = 3;

    for (let i = 0; i < attemptCount; i++) {
      try {
        await this.page.goto(`${this.link}`, { timeout: 20000, waitUntil: 'load' });
        await this.requiredElement.waitFor();
        break;
      } catch (error) {
        console.log(`Ошибка при открытии страницы`, `(попытка ${i + 1} из ${attemptCount})`);

        if (i === attemptCount - 1) {
          throw new Error(error);
        }
      }
    }
  }

  async waitToLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('domcontentloaded');
    await this.requiredElement.waitFor();
  }
}
