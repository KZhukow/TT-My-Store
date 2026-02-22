import { expect } from '@playwright/test';

import test from '../../../Extensions/baseTest';
import MainPage from '../../../Pages/Pages/MainPage/MainPage';
import CartPage from '../../../Pages/Pages/CartPage/CartPage';
import ClearCart from '../../../Extensions/Preconditions/ClearCart';
import ProductPage from '../../../Pages/Pages/ProductPage/ProductPage';
import { ICardInfo } from '../../../Pages/Components/BaseComponents/BaseProductCard';

test.describe('Корзина. Вход не осуществлён.', () => {
  let mainPage: MainPage;
  let cartPage: CartPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);

    await mainPage.openPage();

    await ClearCart(mainPage);
  });

  test(`Заказ товара без логина @3`, async () => {
    let productInfo1: ICardInfo;
    let productInfo2: ICardInfo;

    await test.step(`STEP_1 Выбираем два разных товара и добавляем в корзину`, async () => {
      const card1 = mainPage.mostPopularBlock.getAnyCard();
      productInfo1 = await card1.getAllInfo(true);

      await card1.wrapper.click();

      productPage = new ProductPage(mainPage.page);
      await productPage.waitToLoad();

      await productPage.productCard.addToCart(1);

      const card2 = productPage.alsoPurchasedProductsBlock.getAnyCard();
      productInfo2 = await card2.getAllInfo(true);

      await card2.wrapper.click();
      await productPage.waitToLoad();

      await productPage.productCard.addToCart(1);

      // В корзину добавились оба товара и сумма посчитана верно
      await expect(productPage.header.cartInfo.itemsQuantity).toHaveText('2');

      await productPage.header.cartInfo.gotoCartLink.click();

      cartPage = new CartPage(productPage.page);
      const table = cartPage.summaryTable;
      await cartPage.waitToLoad();

      const totalPrice = `$${productInfo1.parsedPrice + productInfo2.parsedPrice}.00`;

      await expect(table.getRowByText(productInfo1.title).allCells).toContainText(['1', productInfo1.title, productInfo1.price, productInfo1.price]);
      await expect(table.getRowByText(productInfo2.title).allCells).toContainText(['1', productInfo2.title, productInfo2.price, productInfo2.price]);
      await expect(table.totalPrice).toHaveText(totalPrice);

      // Данные по пользователю пустые
      const { customerDetailsForm: form } = cartPage;
      await expect(form.address1Input).toBeEmpty();
      await expect(form.cityInput).toBeEmpty();
      await expect(form.emailInput).toBeEmpty();
      await expect(form.firstNameInput).toBeEmpty();
      await expect(form.lastNameInput).toBeEmpty();
      await expect(form.phoneInput).toBeEmpty();
      await expect(form.postcodeInput).toBeEmpty();
    });

    await test.step(`STEP_2 Возврат на домашнюю страницу`, async () => {
      await cartPage.header.logoImg.click();
      await mainPage.waitToLoad();

      // Выбранные товары отображаются в блоке "Recently Viewed"
      const { recentlyViewedBlock } = mainPage;
      await expect(recentlyViewedBlock.allCards).toHaveCount(2);
      await expect(recentlyViewedBlock.getAnyCard().img).toHaveAttribute('src', productInfo2.imgSrc);
      await expect(recentlyViewedBlock.getAnyCard(1).img).toHaveAttribute('src', productInfo1.imgSrc);
    });
  });
});
