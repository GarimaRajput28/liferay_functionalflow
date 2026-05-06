import { Page, Locator, expect } from '@playwright/test';

export class WebContentPage {
  readonly page: Page;

  // ── Navigation ──────────────────────────────────────────────────────────────
  readonly productMenuToggle: Locator;
  readonly contentAndDataMenu: Locator;
  readonly webContentLink: Locator;

  // ── Login (shared / fallback) ────────────────────────────────────────────────
  readonly passwordInput: Locator;
  readonly dialogSignInButton: Locator;
  readonly homeHeading: Locator;

  // ── Web Content list toolbar ─────────────────────────────────────────────────
  readonly newButton: Locator;
  readonly basicWebContentOption: Locator;

  // ── Web Content creation form ────────────────────────────────────────────────
  readonly webContentForm: Locator;
  readonly titleInput: Locator;
  readonly contentBodyEditor: Locator;
  readonly publishButton: Locator;
  readonly publishWithpermissionsButton: Locator;
  readonly publishOnPermisson: Locator;

  // ── Post-publish assertions ──────────────────────────────────────────────────
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // ── Navigation ─────────────────────────────────────────────────────────────
    // Product menu toggle (Liferay DXP 7.4 / 2025 Q1 top-left hamburger)
    this.productMenuToggle = this.productMenuToggle = page.locator('div').filter({ hasText: 'Liferay DXP' }).first();

    // Left-panel "Content & Data" parent menu item
    this.contentAndDataMenu = page.getByRole('menuitem', { name: 'Content & Data' });

    // "Web Content" child menu item under Content & Data
    this.webContentLink = page.getByRole('menuitem', { name: 'Web Content' });

    // ── Login ──────────────────────────────────────────────────────────────────
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.dialogSignInButton = page
      .getByLabel('Sign In- Loading')
      .getByRole('button', { name: 'Sign In' });
    this.homeHeading = page.locator('span').filter({ hasText: 'Home' }).first();

    // ── Toolbar ────────────────────────────────────────────────────────────────
    // "New" button in the Web Content portlet toolbar
    this.newButton = page.getByText('New', { exact: true });

    // Dropdown item that appears after clicking "New"
    this.basicWebContentOption = page.getByText('Basic Web Content', { exact: true });

    // ── Creation form ──────────────────────────────────────────────────────────
    // The outer form container rendered by the Web Content editor
    this.webContentForm = page.locator('.portlet-body form').first();

    // Title input field at the top of the Basic Web Content form
    this.titleInput = page.getByPlaceholder('Title');

    // Alloy Editor / CKEditor content-editable body (DXP 7.4 2025 Q1)
    this.contentBodyEditor = page
      .getByRole('textbox', { name: 'Content' })
      .frameLocator('iframe[title="editor"]')
      .locator('body.cke_editable');

    // Publish button in the top-right action bar
    this.publishButton = page.getByRole('button', { name: 'Publish' });

    // Publish with permissions button
    this.publishWithpermissionsButton = page.getByRole('menuitem', { name: 'Publish With Permissions' });

    //publish on permissions success message
    this.publishOnPermisson = page.locator('button').filter({ hasText: 'Publish' }).last();

    // ── Success toast ──────────────────────────────────────────────────────────
    // Liferay DXP shows a clay alert toast on successful publish
    this.successMessage = page.locator(
      '[id="_com_liferay_journal_web_portlet_JournalPortlet_successMessageWithLink"]'
    );
  }

  // ── Navigation helpers ───────────────────────────────────────────────────────

  async navigate(url = 'http://localhost:8081/') {
    await this.page.goto(url);
  }

  // ── Assertion helpers ────────────────────────────────────────────────────────

  async assertWebContentFolderVisible() {
    await expect(this.webContentLink).toBeVisible({ timeout: 30_000 });
  }

  async assertFormVisible() {
    await expect(this.webContentForm).toBeVisible({ timeout: 30_000 });
  }

  async assertSuccessMessageVisible() {
    await expect(this.successMessage).toBeVisible({ timeout: 30_000 });
  }

  async assertWebContentInList(title: string) {
    const listItem = this.page.getByRole('link', { name: title });
    await expect(listItem).toBeVisible({ timeout: 30_000 });
  }

  // ── Action helpers ───────────────────────────────────────────────────────────

  async fillTitle(title: string) {
    await this.titleInput.click();
    await this.titleInput.fill(title);
  }

  async fillContentBody(content: string) {
    await this.contentBodyEditor.click();
    await this.contentBodyEditor.fill(content);
  }


  // ── Login helpers (used by common/shared steps) ───────────────────────────────

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submitSignIn() {
    await this.dialogSignInButton.click();
  }

  async assertLoginSuccess() {
    await expect(this.homeHeading).toBeVisible({ timeout: 30_000 });
  }

  // ── New method — extract title from toast and assert in list ──────────────────
  async assertRecentlyCreatedWebContentVisible() {
    // Wait for the success toast to appear
    await expect(this.successMessage).toBeVisible({ timeout: 30_000 });

    // Extract the dynamic title from the toast link (no hardcoding)
    const toastLink = this.successMessage.getByRole('link').first();
    const createdTitle = await toastLink.innerText();

    // Assert the same title appears in the list table
    const listItem = this.page
      .getByTitle(createdTitle.trim(), { exact: true })
      .first();
    await expect(listItem).toBeVisible({ timeout: 30_000 });

    return createdTitle.trim(); // return for logging if needed
  }
}

