import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../Pages/login';  

export interface ICustomWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  loginPage: LoginPage;
}

export class CustomWorld extends World implements ICustomWorld {  // ← must be "export class"
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);