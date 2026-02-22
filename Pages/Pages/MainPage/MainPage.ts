import { Page } from '@playwright/test';

import BasePage from '../BasePages/BasePage';
import WindowsTitles from '../../../Extensions/EnumData/WindowsTitles';
import BlockWithCards from '../../Components/BlockWithCards/BlockWithCards';

export default class MainPage extends BasePage {
  constructor(page: Page) {
    super({ page, pageTitle: WindowsTitles.OnlineStore, requiredElement: page.locator('#slider') });
  }

  get mostPopularBlock(): BlockWithCards {
    return new BlockWithCards(this.page, 'Most Popular');
  }

  get recentlyViewedBlock(): BlockWithCards {
    return new BlockWithCards(this.page, 'Recently Viewed');
  }
}
