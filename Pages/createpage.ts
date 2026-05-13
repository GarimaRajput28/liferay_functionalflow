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
    this.newButton = page.locator('div').locator('a').nth(1);




    this.pagetemplate = page.locator(':text-is("PAGE TEMPLATE SETS")');




  }

  // ── Assertion helpers ────────────────────────────────────────────────────────

  async assertSiteBuilderVisible() {
    await expect(this.siteBuilderMenu).toBeVisible({ timeout: 30_000 });
  }

  async assertPagesOptionVisible() {
    await expect(this.pagesLink).toBeVisible({ timeout: 30_000 });
  }
  

}
