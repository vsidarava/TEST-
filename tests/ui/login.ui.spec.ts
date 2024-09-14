import { test } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:8081";
console.log("frontendUrl", frontendUrl);

test("successful login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(frontendUrl);
  await loginPage.login("admin", "admin");
  await loginPage.verifySuccessfulLogin();

  await loginPage.verifyRegisteredUser("Slawomir Radzyminski");
});

test("failed login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(frontendUrl);
  await loginPage.login("abcd", "1234");
  await loginPage.verifyFailedLogin();
});
