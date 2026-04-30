import { Page, Locator, expect } from '@playwright/test';

export class WebContentPage {
  readonly page: Page;
  readonly productMenuToggle: Locator;
  readonly contentAndDataMenu: Locator;
  readonly webContentLink: Locator;
  readonly passwordInput: Locator;
  readonly dialogSignInButton: Locator;
  readonly homeHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // ✅ Product menu toggle button (try multiple selectors for robustness)
    this.productMenuToggle = this.page.getByLabel('Product Menu', { exact: true }).getByText('Liferay DXP');
    // ✅ Content & Data — menuitem role in the left panel
    this.contentAndDataMenu = this.page.getByRole('menuitem', { name: 'Content & Data' });

    // ✅ Web Content sub-link under Content & Data
    this.webContentLink = page.getByRole('menuitem', { name: 'Web Content' });

    // ✅ Password and Sign In (used by shared steps via loginPage,
    //    but kept here in case webContentPage needs them directly)
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.dialogSignInButton = page.getByLabel('Sign In- Loading')
      .getByRole('button', { name: 'Sign In' });

    // ✅ Home span after login
    this.homeHeading = page.locator('span').filter({ hasText: 'Home' }).first();
  }

  async navigate(url = 'http://localhost:8081/') {
    await this.page.goto(url);
  }

  // Step 4 — assert Web Content link visible
  async assertWebContentFolderVisible() {
  await expect(this.webContentLink).toBeVisible({ timeout: 30000 });
}

  // Used by common steps
  async fillPassword(password: string) {
  await this.passwordInput.fill(password);
}

  async submitSignIn() {
  await this.dialogSignInButton.click();
}

  async assertLoginSuccess() {
  await expect(this.homeHeading).toBeVisible({ timeout: 30000 });
}
}
function getByLabel(arg0: string, arg1: { exact: boolean; }) {
  throw new Error('Function not implemented.');
}

