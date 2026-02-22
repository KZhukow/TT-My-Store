import { chromium } from '@playwright/test';

import { User, Users } from '../EnumData/Users';
import LoginPage from '../../Pages/Pages/LoginPage/LoginPage';

export default class CookieManager {
  static async createAllCookies(baseUrl: string, workers: number): Promise<void> {
    console.log('Создание куки файлов для авторизации');

    const users = Object.values(Users).filter((user) => user.isNeedCreateCookie);

    const chunkedUsers: User[][] = [];

    for (let i = 0; i < users.length; i += workers) {
      const chunk = users.slice(i, i + workers);
      chunkedUsers.push(chunk);
    }

    for (const chunkUsers of chunkedUsers) {
      await Promise.all(chunkUsers.map((user) => this.createUserCookie(user, baseUrl)));
    }

    console.log('Создание куки файлов завершено');
  }

  static async createUserCookie(user: User, baseUrl: string): Promise<void> {
    const mediaPath = `test-results/_failedLogin`;

    const browser = await chromium.launch();
    // const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage({
      ignoreHTTPSErrors: true,
      baseURL: baseUrl,
      recordVideo: { dir: `${mediaPath}/user_${user.login}` },
      storageState: undefined,
    });

    const loginPage = new LoginPage(page);

    try {
      await loginPage.login(user);
      await loginPage.page.locator('#slider').waitFor();

      await page.context().storageState({ path: user.cookiePath });

      await loginPage.page.close();
      await loginPage.page.video().delete();

      console.log(`Куки для пользователя ${user.login} созданы`);
    } catch (error) {
      await loginPage.page.screenshot({ path: `${mediaPath}/user_${user.login}.png` });

      console.log(`Куки для пользователя ${user.login} НЕ созданы`);

      if (user.isRequiredForRun) {
        throw new Error(error);
      }

      console.log(error);
    } finally {
      await loginPage.page.close();
      await browser.close();
    }
  }
}
