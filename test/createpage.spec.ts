import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// ─────────────────────────────────────────────────────────────────────────────
// Background: "Given I am logged in as Admin" handled in common.steps.ts
// ─────────────────────────────────────────────────────────────────────────────

// ── Step 1: Click product menu toggle ────────────────────────────────────────
/*When('I click on the product menu toggle', async function (this: CustomWorld) {
  // Dismiss any blocking modal left open after login
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

  await this.createPagePage.productMenuToggle.click();
});

// ── Step 2: Assert product menu is open ──────────────────────────────────────
Then('I should see the product menu', async function (this: CustomWorld) {
  await this.createPagePage.assertSiteBuilderVisible();
});*/

// ── Step 3: Click Site Builder menu ──────────────────────────────────────────
When('I click on Site Builder menu', async function (this: CustomWorld) {
  await this.createPagePage.siteBuilderMenu.click();
});

// ── Step 4: Assert Pages option is visible ───────────────────────────────────
Then('I should see the Pages option', async function (this: CustomWorld) {
  await this.createPagePage.assertPagesOptionVisible();
});

// ── Step 5: Click on Pages ────────────────────────────────────────────────────
When('I click on Pages', async function (this: CustomWorld) {
  await this.createPagePage.pagesLink.click();
});

// ── Step 6: Assert Pages list is visible ─────────────────────────────────────
Then('I should see the Pages list', async function (this: CustomWorld) {
  await this.page.waitForLoadState('networkidle');
  await this.createPagePage.assertPagesListVisible();
});

// ── Step 7: Click Add Page button ────────────────────────────────────────────
When('I click on the Add Page button', async function (this: CustomWorld) {
  await this.createPagePage.addPageButton.click();
});

// ── Step 8: Assert page type selection panel appears ─────────────────────────
Then('I should see the page type selection panel', async function (this: CustomWorld) {
  await this.createPagePage.assertPageTypePanelVisible();
});

// ── Step 9: Select Basic page type ───────────────────────────────────────────
When('I select the Basic page type', async function (this: CustomWorld) {
  await this.createPagePage.basicPageType.click();
});

// ── Step 10: Assert page name input is visible ───────────────────────────────
Then('I should see the page name input', async function (this: CustomWorld) {
  await this.createPagePage.assertPageNameInputVisible();
});

// ── Step 11: Fill in page name ────────────────────────────────────────────────
When('I fill in the page name with {string}', async function (this: CustomWorld, pageName: string) {
  await this.createPagePage.fillPageName(pageName);
});

// ── Step 12: Click Add button ─────────────────────────────────────────────────
When('I click the Add button', async function (this: CustomWorld) {
  await this.createPagePage.addButton.click();
});

// ── Step 13: Assert page design options appear ───────────────────────────────
Then('I should see the page design options', async function (this: CustomWorld) {
  await this.page.waitForLoadState('networkidle');
  await this.createPagePage.assertPageDesignOptionsVisible();
});

// ── Step 14: Click Done button ────────────────────────────────────────────────
When('I click the Done button', async function (this: CustomWorld) {
  await this.createPagePage.doneButton.click();
});

// ── Step 15: Assert new page appears in the pages list ───────────────────────
Then('I should see {string} in the pages list', async function (this: CustomWorld, pageName: string) {
  await this.page.waitForLoadState('networkidle');
  await this.createPagePage.assertPageInList(pageName);
});
