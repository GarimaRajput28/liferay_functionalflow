import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// ─── Login-specific steps only ─────────────────────────────────────────────────
// Shared steps (password, sign in, home heading) are in common.steps.ts

Given('I am on the Liferay DXP homepage', async function (this: CustomWorld) {
  await this.loginPage.navigate();
});

Then('I should see the Liferay DXP navigation link', async function (this: CustomWorld) {
  await this.loginPage.assertHomePageLoaded();
});

When('I click the {string} button', async function (this: CustomWorld, _buttonName: string) {
  await this.loginPage.openSignInDialog();
});

Then('the Sign In dialog should be visible', async function (this: CustomWorld) {
  await expect(this.loginPage.signInDialog).toBeVisible({ timeout: 30000 });
});

When('I enter email {string}', async function (this: CustomWorld, email: string) {
  await this.loginPage.fillEmail(email);
});