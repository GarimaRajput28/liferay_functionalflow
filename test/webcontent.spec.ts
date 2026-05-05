import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// ─────────────────────────────────────────────────────────────────────────────
// Background: "Given I am logged in as Admin" is handled in common.steps.ts
// ─────────────────────────────────────────────────────────────────────────────

// ── Step 1: Product menu is visible ──────────────────────────────────────────

When('I click on the product menu toggle', async function (this: CustomWorld) {
  await this.webContentPage.productMenuToggle.click();
});


Then('I should see the product menu', async function (this: CustomWorld) {
  await this.webContentPage.productMenuToggle.click();
});

// ── Step 2: Content & Data menu is visible ────────────────────────────────────
Then('I should able to see Content & Data menu', async function (this: CustomWorld) {
  await expect(this.webContentPage.contentAndDataMenu).toBeVisible({ timeout: 30_000 });
});

// ── Step 3: Click Content & Data menu ────────────────────────────────────────
When('I click on Content & Data menu', async function (this: CustomWorld) {
  await this.webContentPage.contentAndDataMenu.click();
});

// ── Step 4: Web Content folder is visible ────────────────────────────────────
Then('I should able to see Web content folder', async function (this: CustomWorld) {
  await this.webContentPage.assertWebContentFolderVisible();
});

// ── Step 5: Click Web Content folder ─────────────────────────────────────────
Then('I click on Web content folder', async function (this: CustomWorld) {
  await this.webContentPage.webContentLink.click();
});

// ── Step 6: Click New button ──────────────────────────────────────────────────
Then('I click on New', async function (this: CustomWorld) {
  await this.webContentPage.newButton.click();
});

// ── Step 7: Select Basic Web Content from dropdown ───────────────────────────
Then('I click on menu item Basic Web content option', async function (this: CustomWorld) {
  await expect(this.webContentPage.basicWebContentOption).toBeVisible({ timeout: 10_000 });
  await this.webContentPage.basicWebContentOption.click();
});

// ── Step 8: Assert the creation form is rendered ─────────────────────────────
Then('I am able to view a Form', async function (this: CustomWorld) {
  await this.webContentPage.assertFormVisible();
});

// ── Step 9: Fill in Title ─────────────────────────────────────────────────────
When('I fill in the Title field with {string}', async function (this: CustomWorld, title: string) {
  await this.webContentPage.fillTitle(title);
});

// ── Step 10: Fill in Content body ────────────────────────────────────────────
When('I fill in the Content body with {string}', async function (this: CustomWorld, content: string) {
  await this.webContentPage.fillContentBody(content);
});

// ── Step 11: Click Publish ────────────────────────────────────────────────────
When('I click the Publish button', async function (this: CustomWorld) {
  await this.webContentPage.publishButton.click();
});

// ── Step 12: Assert success toast ────────────────────────────────────────────
Then('I should see the success message', async function (this: CustomWorld) {
  await this.webContentPage.assertSuccessMessageVisible();
});

// ── Step 13: Assert web content appears in list ───────────────────────────────
Then('I should see {string} listed in the Web Content list', async function (this: CustomWorld, title: string) {
  await this.webContentPage.assertWebContentInList(title);
});
