import { APIRequestContext } from "@playwright/test";

const LOGIN_URL = "https://dmoney.roadtocareer.net/user/login";

export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Send POST /user/login and return parsed JSON body.
 */
export async function loginRequest(request: APIRequestContext, payload: LoginPayload) {
  const response = await (await request.post(LOGIN_URL, { data: payload })).json();
  return { response };
}
