import { APIRequestContext } from "@playwright/test";

const appUrl = process.env.BACKEND_URL || "http://localhost:4001";

export const attemptLogin = async (
  request: APIRequestContext,
  username: string,
  password: string
) => {
  return await request.post(`${appUrl}/users/signin`, {
    data: {
      username,
      password,
    },
  });
};
