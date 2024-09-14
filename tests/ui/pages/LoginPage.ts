import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly welcomeHeading: Locator;
  readonly successMessage: Locator;
  readonly allUsersHeading: Locator;
  readonly logoutLink: Locator;
  readonly addUsersLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.locator('.alert-danger');
    this.welcomeHeading = page.getByRole("heading", { name: "Hi Slawomir!" });
    this.successMessage = page.getByText("You're logged in! Congratulations :)");
    this.allUsersHeading = page.getByRole("heading", { name: "All registered users:" });
    this.logoutLink = page.getByRole("link", { name: "Logout" });
    this.addUsersLink = page.getByRole("link", { name: "Add more users" });
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifySuccessfulLogin() {
    await expect(this.welcomeHeading).toBeVisible();
    await expect(this.successMessage).toBeVisible();
    await expect(this.allUsersHeading).toBeVisible();
    await expect(this.logoutLink).toBeVisible();
    await expect(this.addUsersLink).toBeVisible();
  }

  async verifyRegisteredUser(name: string) {
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async verifyFailedLogin() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText("Invalid username/password supplied");
    await expect(this.page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.page.getByRole("link", { name: "Register" })).toBeVisible();
  }
}