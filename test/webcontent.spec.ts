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
  await this.webContentPage.webContentLink.click();

});
Then('I click on New', async function (this: CustomWorld) {
  await this.webContentPage.newButton.click();
});

Then('I click on menu item Basic Web content option', async function (this: CustomWorld) {
  await this.webContentPage.basicWebContentOption.click();
});
Then('I am able to view a Form', async function (this: CustomWorld) {
  await this.webContentPage.webContentForm.isVisible();
});



