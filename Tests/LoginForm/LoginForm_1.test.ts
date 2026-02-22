import { expect } from '@playwright/test';

import test from '../../Extensions/baseTest';
import Colors from '../../Extensions/EnumData/Colors';
import { Users } from '../../Extensions/EnumData/Users';
import LoginPage from '../../Pages/Pages/LoginPage/LoginPage';
import OtherStrings from '../../Extensions/EnumData/OtherStrings';

test.describe('Форма входа.', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.openPage();
  });

  test(`Невалидный логин @4`, async () => {
    await test.step(`STEP_1 Логин с некорректным паролем`, async () => {
      const invalidPassword = 'invalidPassword';

      await loginPage.login(Users.testTestCom, invalidPassword);

      // Логин прошел не успешно
      // Красным цветом выделено сообщение о том что юзер или пароль не верны
      await expect(loginPage.notification).toBeVisible();
      await expect(loginPage.notification).toHaveCSS('background-color', Colors.red_ffcccc);
      await expect(loginPage.notification).toHaveText(OtherStrings.WrongPassOrAccount);
      await expect(loginPage.page).toHaveTitle(loginPage.pageTitle);
    });
  });
});
