import { Page, Locator, expect } from '@playwright/test';
import { config } from '../support/config';

export class LoginPage {
  readonly page: Page;
  readonly signInNavButton: Locator;
  readonly signInDialog: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly dialogSignInButton: Locator;
  readonly homepage: Locator;
  readonly liferayDXPLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.liferayDXPLink = page.getByRole('link', { name: 'Liferay DXP' });
    this.signInNavButton = page.getByRole('button', { name: 'Sign In' });
    this.signInDialog = page.getByRole('dialog', { name: 'Sign In - Loading' });
    this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.dialogSignInButton = page.getByLabel('Sign In- Loading').getByRole('button', { name: 'Sign In' });
    this.homepage = page.locator('span').filter({ hasText: 'Home' }).first();
  }

  async navigate() {
    await this.page.goto(config.baseUrl);  // ← single source of truth
  }

  async assertHomePageLoaded() {
    await expect(this.liferayDXPLink).toBeVisible();
  }

  async openSignInDialog() {
    await this.signInNavButton.click();
    await expect(this.signInDialog).toBeVisible();
  }

  async fillEmail(email: string) {
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.emailInput.press('Tab');
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submitSignIn() {
    await this.dialogSignInButton.click();
  }

  async assertLoginSuccess() {
    await expect(this.homepage).toBeVisible();
  }
}