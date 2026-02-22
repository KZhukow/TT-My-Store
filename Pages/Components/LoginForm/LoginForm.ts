import { Locator, Page } from '@playwright/test';

export default class LoginForm {
  wrapper: Locator;

  constructor(parrentWrapper: Locator | Page, wrapper: Locator = parrentWrapper.locator('//*[contains(@id, "-login")]')) {
    this.wrapper = wrapper;
  }

  get loginInput(): Locator {
    return this.wrapper.locator('[name="email"]');
  }

  get passwordInput(): Locator {
    return this.wrapper.locator('[name="password"]');
  }

  get loginBtn(): Locator {
    return this.wrapper.locator('//button[@name="login" and text()="Login"]');
  }
}
