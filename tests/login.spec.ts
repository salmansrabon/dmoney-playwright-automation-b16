import { test, expect } from "@playwright/test";
import { loginRequest } from "../services/login.service";
import { fetchGmailMessages } from "../services/gmail.service.ts";
import { saveEnvVar } from "../utils/utils";
import * as dotenv from "dotenv";
dotenv.config();

test("Admin can login via API and save token to .env", async ({ request }) => {
  const payload = {
    email: "admin@dmoney.com",
    password: "1234",
  };

  const { response } = await loginRequest(request, payload);
  console.log(response);
  saveEnvVar("TOKEN", response.token, ".env");
});

test.only("Load gmail list", async ({ request }) => {
    //console.log(process.env.GMAIL_ACCESS_TOKEN)
  const res = await fetchGmailMessages(
    request,
    process.env.GMAIL_ACCESS_TOKEN
  );
  const messageId=res.messages[0].id;
  saveEnvVar("GMAIL_MESSAGE_ID", messageId, ".env");
});
