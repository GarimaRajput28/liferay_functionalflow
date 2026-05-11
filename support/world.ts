import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../Pages/login';
import { WebContentPage } from '../Pages/webcontent';
import { CreatePagePage } from '../Pages/createpage';          // ← capital C, capital P, capital P

export interface ICustomWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  loginPage: LoginPage;
  webContentPage: WebContentPage;
  createPagePage: CreatePagePage;                              // ← CreatePagePage not createpage
}

export class CustomWorld extends World implements ICustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  webContentPage!: WebContentPage;
  createPagePage!: CreatePagePage;                            // ← ADD this line (was missing)

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);