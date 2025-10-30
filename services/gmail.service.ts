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

  const response = await res.json();
  return response.messages[0].id;
}
export async function readLatestMessage(request: APIRequestContext, accessToken: string | undefined) {
  if (!accessToken) throw new Error("Missing Gmail access token");
  const messageId = await fetchGmailMessages(request, accessToken);
  const res = await request.get(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok()) throw new Error(`Gmail API error ${res.status()}`);

  const jsonResponse = await res.json();
  return jsonResponse.snippet;
}
