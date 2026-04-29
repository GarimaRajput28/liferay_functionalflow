import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { CustomWorld } from './world';
import { LoginPage } from '../Pages/login';

let browser: Browser;

BeforeAll(async () => {
  const isHeaded = process.env.HEADED === 'true';
  browser = await chromium.launch({
    headless: !isHeaded,       // false = headed, true = headless
    slowMo: isHeaded ? 500 : 0 // slow down actions in headed mode so you can see them
  });
});

Before(async function (this: CustomWorld) {
  this.context   = await browser.newContext();
  this.page      = await this.context.newPage();
  this.loginPage = new LoginPage(this.page);
});

After(async function (this: CustomWorld) {
  await this.context.close();
});

AfterAll(async () => {
  await browser.close();
});