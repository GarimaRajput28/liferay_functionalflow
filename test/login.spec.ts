import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

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
  await expect(this.loginPage.signInDialog).toBeVisible();
});

When('I enter email {string}', async function (this: CustomWorld, email: string) {
  await this.loginPage.fillEmail(email);
});

When('I enter password {string}', async function (this: CustomWorld, password: string) {
  await this.loginPage.fillPassword(password);
});

When('I click the Sign In button in the dialog', async function (this: CustomWorld) {
  await this.loginPage.submitSignIn();
});

Then('I should see the home heading', async function (this: CustomWorld) {
  await this.loginPage.assertLoginSuccess();
});

// Keep these for future scenarios
Then('I should see the {string} link', async function (this: CustomWorld, linkName: string) {
  await expect(this.page.getByRole('link', { name: linkName })).toBeVisible();
});

Then('I should see an error message', async function (this: CustomWorld) {
  await expect(this.page.locator('.alert-danger, .portlet-msg-error')).toBeVisible();
});