import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

// Background step now handled by "I am logged in as Admin" in common.steps.ts

Then('I should see the product menu', async function (this: CustomWorld) {
   await this.page.pause(); 
  await this.webContentPage.productMenuToggle.click();
});

Then('I should able to see Content & Data menu', async function (this: CustomWorld) {
  await this.webContentPage.contentAndDataMenu.isVisible();
});

When('I click on Content & Data menu', async function (this: CustomWorld) {
  await this.webContentPage.contentAndDataMenu.click();
});

Then('I should able to see Web content folder', async function (this: CustomWorld) {
  await this.webContentPage.webContentLink.isVisible();
});