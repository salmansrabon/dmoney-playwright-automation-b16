import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../page/login";
import { User } from "../page/User";

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});
test.afterAll(async () => {
  await page.close();
});

test("Admin can login successfully", async () => {
  await page.goto("https://dmoneyportal.roadtocareer.net/login");
  const login=new LoginPage(page);
  await login.userLogin("admin@dmoney.com","1234");

  await expect(page.getByRole("banner")).toContainText("Admin Dashboard");

  const headerText = await page.getByText("Admin Dashboard").textContent();
  expect(headerText).toContain("Admin Dashboard");

  await expect(page.getByText("Admin Dashboard")).toContainText(
    "Admin Dashboard"
  );
});

test("Search by user Id", async () => {
  const user=new User(page);
  await user.searchUser("98773")
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "View" }).click();
  await expect(page).toHaveURL(/.*\/users\/98773\/?/);
  
});

test("Create new user",async()=>{
  const user=new User(page);
  await user.createUser("Test user 1550 b16","testuserb161550@test.com","1234","01504478966","123456789","Customer")  
})