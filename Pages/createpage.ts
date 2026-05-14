import { Page, Locator, expect } from '@playwright/test';

export class CreatePagePage {
  readonly page: Page;

  // ── Navigation ───────────────────────────────────────────────────────────────
  readonly productMenuToggle: Locator;
  readonly siteBuilderMenu: Locator;
  readonly pagesLink: Locator;



  // ── Pages list toolbar ───────────────────────────────────────────────────────
  readonly newButton: Locator;


  readonly pagetemplate: Locator;
  // Select page design options
  
  readonly blankTemplateOption: Locator;

  // readonly pageNameField: Locator; // New page name field locator
  readonly pageNameField: Locator; // New Add button locator

  //Add button locator to add the page name after filling it in the field
  readonly addButton: Locator;
  readonly pageNameInput: Locator;


  constructor(page: Page) {
    this.page = page;

    // ── Navigation ──────────────────────────────────────────────────────────────
    // Hamburger product menu toggle
    this.productMenuToggle = page.locator('div').filter({ hasText: 'Liferay DXP' }).first();

    // Site Builder parent menu item in left panel
    this.siteBuilderMenu = page.getByRole('menuitem', { name: 'Site Builder' });

    // Pages child link under Site Builder
    this.pagesLink = page.locator('a').filter({ hasText: 'Pages' }).first();


    // ── Pages list ──────────────────────────────────────────────────────────────

    //New Butotn for create New page
    this.newButton = page.locator('a:has-text("New")');
// Page template sets section in page design options

    this.pagetemplate = page.locator(':text-is("PAGE TEMPLATE SETS")');
// Blank template option in page design options
    
    this.blankTemplateOption = page.locator('li:has-text("Blank")');

    // provide page name field locator
    this.pageNameField = page.getByText('Add Page', { exact: true });
  
    //Clik on Add button to add the page name
    this.addButton = page
  .frameLocator('#addLayoutDialog_iframe_')
  .getByRole('button', { name: 'Add' })
  .first();


    this.pageNameInput = page
  .frameLocator('#addLayoutDialog_iframe_')
  .getByLabel('Name');

  }

  // ── Assertion helpers ────────────────────────────────────────────────────────

  async assertSiteBuilderVisible() {
    await expect(this.siteBuilderMenu).toBeVisible({ timeout: 30_000 });
  }

  async assertPagesOptionVisible() {
    await expect(this.pagesLink).toBeVisible({ timeout: 30_000 });
  }
  async assertBlankTemplateOptionVisible() {
    await expect(this.blankTemplateOption).toBeVisible({ timeout: 30_000 });
  }

  async assertPageNameFieldVisible() {
    await expect(this.pageNameField).toBeVisible({ timeout: 30_000 });
  }

}
