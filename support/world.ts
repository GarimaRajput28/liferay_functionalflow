import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../Pages/login';
import { WebContentPage } from '../Pages/webcontent';

export interface ICustomWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  loginPage: LoginPage;
  webContentPage: WebContentPage;   
}

export class CustomWorld extends World implements ICustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  webContentPage!: WebContentPage;  

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);