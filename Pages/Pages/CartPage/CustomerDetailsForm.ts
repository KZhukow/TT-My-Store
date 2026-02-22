import { Locator, Page } from '@playwright/test';

export default class CustomerDetailsForm {
  wrapper: Locator;

  constructor(parrentWrapper: Locator | Page, wrapper: Locator = parrentWrapper.locator('//*[./h2[text()="Customer Details"]]')) {
    this.wrapper = wrapper;
  }

  get firstNameInput(): Locator {
    return this.wrapper.locator('input[name="firstname"]');
  }

  get lastNameInput(): Locator {
    return this.wrapper.locator('input[name="lastname"]');
  }

  get address1Input(): Locator {
    return this.wrapper.locator('input[name="address1"]');
  }

  get postcodeInput(): Locator {
    return this.wrapper.locator('input[name="postcode"]');
  }

  get cityInput(): Locator {
    return this.wrapper.locator('input[name="city"]');
  }

  get emailInput(): Locator {
    return this.wrapper.locator('input[name="email"]');
  }

  get phoneInput(): Locator {
    return this.wrapper.locator('input[name="phone"]');
  }
}
