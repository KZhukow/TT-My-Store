import { Locator, Page } from '@playwright/test';

import BasePage from '../BasePages/BasePage';
import { User } from '../../../Extensions/EnumData/Users';
import LoginForm from '../../Components/LoginForm/LoginForm';
import WindowsTitles from '../../../Extensions/EnumData/WindowsTitles';

export default class LoginPage extends BasePage {
  constructor(page: Page) {
    super({
      pageTitle: WindowsTitles.Login,
      link: `login`,
      page,
      requiredElement: page.locator('[name="email"]'),
    });
  }

  get loginForm(): LoginForm {
    return new LoginForm(this.page);
  }

  /**
   * Вход в приложение через форму на странице "Логина"
   * @param user Пользователь, под которым будет осуществляться вход
   * @param password Пароль для авторизации
   */
  async login(user: User, password = user.password) {
    const { loginInput, passwordInput, loginBtn } = this.loginForm;
    await this.openPage();
    await loginInput.fill(user.login);
    await passwordInput.fill(password);
    await loginBtn.click();
  }

  get notification(): Locator {
    return this.page.locator('.notice');
  }
}
