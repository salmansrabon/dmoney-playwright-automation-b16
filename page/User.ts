import { Page } from "@playwright/test";
import { Person } from "../models/person.model";

export class User{
constructor(private page:Page){}
    async searchUser(userId:string){
        await this.page.getByRole("link", { name: "User List" }).click();
        await this.page.locator(".MuiSelect-select").first().click();
        await this.page.getByRole("option", { name: "All Users" }).press("ArrowDown");
        await this.page.getByRole("option", { name: "Search by ID" }).press("Enter");
        await this.page.getByRole("textbox", { name: "Enter User ID" }).click();
        await this.page.getByRole("textbox", { name: "Enter User ID" }).fill(userId);

    }
    async createUser(person:Person){
        await this.page.getByRole('link', { name: 'Create User' }).click();
        await this.page.getByRole('textbox', { name: 'Name' }).fill(person.fullName);
        await this.page.getByRole('textbox', { name: 'Email' }).fill(person.email);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(person.password);
        await this.page.getByRole('textbox', { name: 'Phone Number' }).fill(person.phoneNumber);
        await this.page.getByRole('textbox', { name: 'NID' }).fill(person.nid);
        await this.page.getByRole('combobox', { exact: true }).click();
        await this.page.getByRole('option', { name: person.role }).click();
        await this.page.getByRole('button', { name: 'Create User' }).click();
    }

}