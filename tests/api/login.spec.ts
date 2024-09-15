import { test, expect } from "@playwright/test";
import { attemptLogin } from "../../requests/postSignIn";
import { LoginResponse, ErrorLoginResponse } from "../../types/api/postSignInTypes";
import { Roles } from "../../types/api/roles";
test("successful login", async ({ request }) => {
  // when
  const response = await attemptLogin(request, 'admin', 'admin');

  // then
  expect(response.status()).toBe(200);
  const responseBody = await response.json() as LoginResponse;
  expect(responseBody).toEqual(expect.objectContaining({
    username: 'admin',
    roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT],
    firstName: 'Slawomir',
    lastName: 'Radzyminski',
    email: 'admin@email.com'
  } as Partial<LoginResponse>));

  // Check if token is present and is a non-empty string
  expect(responseBody.token).toBeTruthy();
  expect(typeof responseBody.token).toBe('string');
});

test('failed login', async ({ request }) => {
  // when
  const response = await attemptLogin(request, 'invaliduser', 'invalidpassword');

  // then
  expect(response.status()).toBe(422);
  const responseBody = await response.json() as ErrorLoginResponse;
  expect(responseBody).toEqual(expect.objectContaining({
    status: 422,
    error: 'Unprocessable Entity',
    message: 'Invalid username/password supplied',
    path: '/users/signin'
  } satisfies Partial<ErrorLoginResponse>));
  expect(responseBody.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
});