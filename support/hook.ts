import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, request } from '@playwright/test';
import { CustomWorld } from './world';
import { LoginPage } from '../Pages/login';
import { WebContentPage } from '../Pages/webcontent';

setDefaultTimeout(30 * 1000);

let browser: Browser;
const BASE_URL = 'http://localhost:8081/';

BeforeAll(async () => {
  //  Check server is reachable before running any tests
  try {
    const apiContext = await request.newContext();
    await apiContext.get(BASE_URL);
    await apiContext.dispose();
  } catch {
    throw new Error(
      `❌ Liferay server is not running at ${BASE_URL}\n` +
      `   Please start your Liferay DXP server before running tests.`
    );
  }

  const isHeaded = process.env.HEADED === 'true';
  browser = await chromium.launch({
    headless: !isHeaded,
    slowMo: isHeaded ? 500 : 0
  });
});

Before(async function (this: CustomWorld) {
  this.context        = await browser.newContext();
  this.page           = await this.context.newPage();
  this.loginPage      = new LoginPage(this.page);
  this.webContentPage = new WebContentPage(this.page);
});

After(async function (this: CustomWorld) {
  await this.context.close();
});

AfterAll(async () => {
  await browser.close();
});