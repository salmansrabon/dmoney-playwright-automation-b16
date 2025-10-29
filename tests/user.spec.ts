import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../page/login";
import { getLastUser } from "../utils/utils.ts";

test("User can login with valid creds",{tag:"@smoke"}, async ({ page }) => {
  await page.goto("https://dmoneyportal.roadtocareer.net/login");
  const login = new LoginPage(page);
  const userData= getLastUser("./resources/users.json");
  await login.userLogin(userData.email, userData.password);
});
