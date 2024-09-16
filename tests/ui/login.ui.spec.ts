import { test } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:8081";
console.log("frontendUrl", frontendUrl);

test("successful login", async ({ page }) => {
  // given
  const loginPage = new LoginPage(page);
  await loginPage.goto(frontendUrl);

  // when
  await loginPage.login("admin", "admin");

  // then
  await loginPage.verifySuccessfulLogin();
  await loginPage.verifyRegisteredUser("Slawomir Radzyminski");
});

test("failed login", async ({ page }) => {
  // given
  const loginPage = new LoginPage(page);
  await loginPage.goto(frontendUrl);

  // when
  await loginPage.login("abcd", "1234");

  // then
  await loginPage.verifyFailedLogin();
});
