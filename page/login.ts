import { Page } from "@playwright/test";
import { getLastUser } from "../utils/utils";

export class LoginPage {
  constructor(private page: Page) {}
  async userLogin(email:string, password:string) {
    await this.page.getByRole("textbox", { name: "Email or Phone Number" }).fill(email);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("button", { name: "LOGIN" }).click();
  }
}
