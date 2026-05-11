import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// ─── Admin Login (reusable across all features) ────────────────────────────────

Given('I am logged in as Admin', async function (this: CustomWorld) {
  await this.loginPage.navigate();
  await this.loginPage.openSignInDialog();
  await this.loginPage.fillEmail('test@liferay.com');
  await this.loginPage.fillPassword('learn');
  await this.loginPage.submitSignIn();
  await this.loginPage.assertLoginSuccess();
});

// ─── Shared steps ──────────────────────────────────────────────────────────────

When('I enter password {string}', async function (this: CustomWorld, password: string) {
  await this.loginPage.fillPassword(password);
});

When('I click the Sign In button in the dialog', async function (this: CustomWorld) {
  await this.loginPage.submitSignIn();
});

Then('I should see the home heading', async function (this: CustomWorld) {
  await this.loginPage.assertLoginSuccess();
});

Then('I should see the {string} link', async function (this: CustomWorld, linkName: string) {
  await expect(this.page.getByRole('link', { name: linkName })).toBeVisible({ timeout: 30000 });
});

Then('I should see an error message', async function (this: CustomWorld) {
  await expect(this.page.locator('.alert-danger, .portlet-msg-error')).toBeVisible({ timeout: 30000 });
});

When('I click on the product menu toggle', async function (this: CustomWorld) {
  const modal = this.page
    .locator('.liferay-modal.show')
    .getByRole('button', { name: 'Close' })
    .first();

  if (await modal.isVisible().catch(() => false)) {
    await modal.click();
    await this.page.waitForSelector('.liferay-modal', {
      state: 'hidden',
      timeout: 5_000,
    });
  }
  // Works for both pages since both have productMenuToggle locator
  await this.page.locator('div').filter({ hasText: 'Liferay DXP' }).first().click();
});

Then('I should see the product menu', async function (this: CustomWorld) {
  await expect(
    this.page.getByRole('menuitem', { name: /Site Builder|Content & Data/ }).first()
  ).toBeVisible({ timeout: 30_000 });
});