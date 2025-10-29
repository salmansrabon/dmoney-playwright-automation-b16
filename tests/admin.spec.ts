import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../page/login";
import { User } from "../page/User";
import { Person, Role } from "../models/person.model";
import { faker } from "@faker-js/faker";
import { generateRadnomNumber, saveJsonData } from "../utils/utils";

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});
test.afterAll(async () => {
  await page.close();
});

test.describe.serial(async () => {
  test("Admin can login successfully", { tag: "@smoke" }, async () => {
    await page.goto("https://dmoneyportal.roadtocareer.net/login");
    const login = new LoginPage(page);
    await login.userLogin("admin@dmoney.com", "1234");

    await expect(page.getByRole("banner")).toContainText("Admin Dashboard");

    const headerText = await page.getByText("Admin Dashboard").textContent();
    expect(headerText).toContain("Admin Dashboard");

    await expect(page.getByText("Admin Dashboard")).toContainText(
      "Admin Dashboard"
    );
  });

  test("Search by user Id", async () => {
    const user = new User(page);
    await user.searchUser("98773");
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "View" }).click();
    await expect(page).toHaveURL(/.*\/users\/98773\/?/);
  });

  test("Create new user", { tag: "@smoke" }, async () => {
    const person: Person = {
      fullName: faker.person.fullName(),
      email: `salmansrabon+${generateRadnomNumber(1000, 9999)}@gmail.com`,
      password: "1234",
      phoneNumber: "0130" + generateRadnomNumber(1000000, 9999999),
      nid: generateRadnomNumber(100000000, 999999999).toString(),
      role: Role.Customer,
    };
    const user = new User(page);
    await user.createUser(person);
    saveJsonData(person, "./resources/users.json");
  });
});
