import { APIRequestContext } from "@playwright/test";

export async function fetchGmailMessages(
  request: APIRequestContext,
  accessToken: string | undefined
) {
  if (!accessToken) throw new Error("Missing Gmail access token");

  const res = await request.get(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok()) throw new Error(`Gmail API error ${res.status()}`);

  return res.json();
}