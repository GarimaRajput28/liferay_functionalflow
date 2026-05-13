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
// ── Step 12: Click Add button ─────────────────────────────────────────────────
When('I click the Add button', async function (this: CustomWorld) {
  await this.createPagePage.addButton.click();
});



// ── Step 14: Click Done button ────────────────────────────────────────────────
When('I click the Done button', async function (this: CustomWorld) {
  await this.createPagePage.doneButton.click();
});


