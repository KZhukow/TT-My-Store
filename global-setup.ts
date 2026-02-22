import config from './appConfig';
import devConfig from './_configs/playwright.config';
import CookieManager from './Extensions/Preconditions/CookieManager';

async function globalSetup(): Promise<void> {
  /* Создание cookies */
  await CookieManager.createAllCookies(config.baseURL, +devConfig.workers);
}

export default globalSetup;
