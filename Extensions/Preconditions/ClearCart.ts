import CartPage from '../../Pages/Pages/CartPage/CartPage';
import MainPage from '../../Pages/Pages/MainPage/MainPage';
import SuccessOrderPage from '../../Pages/Pages/SuccessOrderPage/SuccessOrderPage';

export default async function ClearCart(mainPage: MainPage): Promise<void> {
  await mainPage.header.cartInfo.gotoCartLink.click();

  const cartPage = new CartPage(mainPage.page);
  await cartPage.waitToLoad();

  if (await cartPage.confirmOrderBtn.isVisible()) {
    await cartPage.confirmOrderBtn.click();

    const successOrderPage = new SuccessOrderPage(cartPage.page);
    await successOrderPage.successOrderMsg.waitFor();
  }

  await mainPage.openPage();
}
