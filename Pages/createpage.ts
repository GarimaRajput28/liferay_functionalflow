import { Page, Locator, expect } from '@playwright/test';

export class CreatePagePage {
  readonly page: Page;

  // ── Navigation ───────────────────────────────────────────────────────────────
  readonly productMenuToggle: Locator;
  readonly siteBuilderMenu: Locator;
  readonly pagesLink: Locator;



  // ── Pages list toolbar ───────────────────────────────────────────────────────
  readonly addPageButton: Locator;

  // ── Page type selection panel ────────────────────────────────────────────────
  readonly pageTypePanel: Locator;
  readonly basicPageType: Locator;

  // ── Page name input ──────────────────────────────────────────────────────────
  readonly pageNameInput: Locator;
  readonly addButton: Locator;

  // ── Page design / layout step ────────────────────────────────────────────────
  readonly pageDesignOptions: Locator;
  readonly doneButton: Locator;

  // ── Pages list assertion ─────────────────────────────────────────────────────
  readonly pagesList: Locator;

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

    // "Add Page" button / icon in the management toolbar
    // Liferay 7.4 renders this as a button with a plus icon or "New Page" label
    this.addPageButton = page.locator('a:has-text("New")');

    // ── Page type panel ─────────────────────────────────────────────────────────
    // Right-side panel that slides in after clicking Add
    this.pageTypePanel = page.locator(
      '.sidebar-panel, .page-type-renderer-panel, .add-page-panel'
    ).first();

    // "Basic Page" / "Widget Page" card in the type selector
    // In DXP 7.4 2025 Q1 the default type is "Content Page" or "Widget Page"
    this.basicPageType = page
      .locator('.page-type-renderer-card, .card')
      .filter({ hasText: /Basic|Content Page|Widget Page/ })
      .first();

    // ── Page name input ─────────────────────────────────────────────────────────
    // Name input field shown after selecting page type
    this.pageNameInput = page.getByPlaceholder('Name');

    // "Add" button to confirm page name and proceed
    this.addButton = page
      .locator('.modal-footer, .add-page-form-footer')
      .getByRole('button', { name: 'Add' })
      .first();

    // ── Page design step ────────────────────────────────────────────────────────
    // The layout/theme selection container shown after Add
    this.pageDesignOptions = page.locator(
      '.page-design-options, .layout-page-template-entry, .master-layout-panel'
    ).first();

    // "Done" button on the design/master options panel
    this.doneButton = page.getByRole('button', { name: 'Done' }).first();

    // ── Pages list container ────────────────────────────────────────────────────
    this.pagesList = page.locator('#miller-columns-list-undefined:visible')
  }

  // ── Assertion helpers ────────────────────────────────────────────────────────

  async assertSiteBuilderVisible() {
    await expect(this.siteBuilderMenu).toBeVisible({ timeout: 30_000 });
  }

  async assertPagesOptionVisible() {
    await expect(this.pagesLink).toBeVisible({ timeout: 30_000 });
  }

}
