import { expect } from '@playwright/test';

import test from '../../../Extensions/baseTest';
import MainPage from '../../../Pages/Pages/MainPage/MainPage';
import CartPage from '../../../Pages/Pages/CartPage/CartPage';
import ClearCart from '../../../Extensions/Preconditions/ClearCart';
import ProductPage from '../../../Pages/Pages/ProductPage/ProductPage';
import ProductCard from '../../../Pages/Pages/ProductPage/ProductCard';
import { getUserCookie, Users } from '../../../Extensions/EnumData/Users';
import { ICardInfo } from '../../../Pages/Components/BaseComponents/BaseProductCard';
import SuccessOrderPage from '../../../Pages/Pages/SuccessOrderPage/SuccessOrderPage';

test.describe('Корзина. Осуществлён вход.', () => {
  let mainPage: MainPage;
  let cartPage: CartPage;
  let productPage: ProductPage;
  let choosingProduct: ProductCard;

  test.use({ storageState: getUserCookie(Users.testTestCom) });

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);

    await mainPage.openPage();

    await ClearCart(mainPage);
  });

  test(`Заказ одного товара без скидки @1`, async () => {
    const productQuantity = '3';
    let productInfo: ICardInfo;

    await test.step(`STEP_2 Выбираем один товар без скидки`, async () => {
      const card = mainPage.mostPopularBlock.getCardWithoutSale();
      productInfo = await card.getAllInfo();

      await card.wrapper.click();

      productPage = new ProductPage(mainPage.page);
      await productPage.waitToLoad();

      // Товар выбран
      choosingProduct = productPage.productCard;
      await expect(choosingProduct.title).toBeVisible();
      await expect(choosingProduct.img).toBeVisible();
      await expect(choosingProduct.finalPrice).toBeVisible();
      expect(productInfo).toEqual(await choosingProduct.getAllInfo());
    });

    await test.step(`STEP_3 Добавляем в корзину 3шт выбранного товара`, async () => {
      await choosingProduct.addToCart(productQuantity);

      // Товары были добавлены в корзину
      await expect(productPage.header.cartInfo.itemsQuantity).toHaveText(productQuantity);
    });

    await test.step(`STEP_4 Осуществляем переход в корзину`, async () => {
      await productPage.header.cartInfo.gotoCartLink.click();

      cartPage = new CartPage(productPage.page);
      const table = cartPage.summaryTable;
      await cartPage.waitToLoad();

      // Проверяем что кол-во продукта и цена соответствуют ожидаемому значению
      await expect(cartPage.productCard.quantityInput).toHaveValue(productQuantity);
      await expect(cartPage.productCard.finalPrice).toHaveText(productInfo.price);

      const totalPrice = `$${productInfo.parsedPrice * +productQuantity}.00`;

      await expect(table.getRowByIndex().allCells).toContainText([productQuantity, productInfo.title, productInfo.price, totalPrice]);
      await expect(table.totalPrice).toHaveText(totalPrice);
    });

    await test.step(`STEP_5 Подтверждение заказа`, async () => {
      await cartPage.confirmOrderBtn.click();

      const successOrderPage = new SuccessOrderPage(cartPage.page);

      // Заказ создан успешно
      await expect(successOrderPage.successOrderMsg).toBeVisible();
      await expect(successOrderPage.header.cartInfo.itemsQuantity).toHaveText('0');
    });
  });

  test(`Заказ одного товара со скидкой @2`, async () => {
    const productQuantity = '2';
    let productInfo: ICardInfo;

    await test.step(`STEP_2 Выбираем один товар со скидкой`, async () => {
      const card = mainPage.mostPopularBlock.getCardWithSale();
      productInfo = await card.getAllInfo();

      await card.wrapper.click();

      productPage = new ProductPage(mainPage.page);
      await productPage.waitToLoad();

      // Товар выбран
      choosingProduct = productPage.productCard;
      await expect(choosingProduct.title).toBeVisible();
      await expect(choosingProduct.img).toBeVisible();
      await expect(choosingProduct.finalPrice).toBeVisible();
      expect(productInfo).toEqual(await choosingProduct.getAllInfo());
    });

    await test.step(`STEP_3 Добавляем в корзину 2шт выбранного товара`, async () => {
      await choosingProduct.addToCart(productQuantity);

      // Товары были добавлены в корзину
      await expect(productPage.header.cartInfo.itemsQuantity).toHaveText(productQuantity);
    });

    await test.step(`STEP_4 Осуществляем переход в корзину`, async () => {
      await productPage.header.cartInfo.gotoCartLink.click();

      cartPage = new CartPage(productPage.page);
      const table = cartPage.summaryTable;
      await cartPage.waitToLoad();

      // Проверяем что кол-во продукта и цена соответствуют ожидаемому значению
      await expect(cartPage.productCard.quantityInput).toHaveValue(productQuantity);
      await expect(cartPage.productCard.finalPrice).toHaveText(productInfo.price);

      const totalPrice = `$${productInfo.parsedPrice * +productQuantity}.00`;

      await expect(table.getRowByIndex().allCells).toContainText([productQuantity, productInfo.title, productInfo.price, totalPrice]);
      await expect(table.totalPrice).toHaveText(totalPrice);
    });

    await test.step(`STEP_5 Подтверждение заказа`, async () => {
      await cartPage.confirmOrderBtn.click();

      const successOrderPage = new SuccessOrderPage(cartPage.page);

      // Заказ создан успешно
      await expect(successOrderPage.successOrderMsg).toBeVisible();
      await expect(successOrderPage.header.cartInfo.itemsQuantity).toHaveText('0');
    });
  });
});
