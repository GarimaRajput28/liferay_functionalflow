import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

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

Then('I click on New Button', async function (this: CustomWorld) {
  await this.createPagePage.newButton.click();
});

Then('I should see page templates set', async function (this: CustomWorld) {
  await this.createPagePage.pagetemplate.isVisible();
});
