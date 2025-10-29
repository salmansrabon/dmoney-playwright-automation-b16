import { test, expect } from "@playwright/test";
import { LoginPage } from "../page/login";
import { getLastUser } from "../utils/utils";

test("User can login successfully", async ({ page }) => {
  await page.goto("https://dmoneyportal.roadtocareer.net/login");
  const login = new LoginPage(page);
  const user = getLastUser("./resources/users.json");
  await login.userLogin(user.email, user.password);
  await expect(page.getByRole("banner")).toContainText("Dashboard");
});
