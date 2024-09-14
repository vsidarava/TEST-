import { test, expect } from '@playwright/test';

test('successful login', async ({ request }) => {
  const response = await request.post('http://backend:4001/users/signin', {
    data: {
      username: 'admin',
      password: 'admin'
    }
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody).toEqual(expect.objectContaining({
    username: 'admin',
    roles: ['ROLE_ADMIN', 'ROLE_CLIENT'],
    firstName: 'Slawomir',
    lastName: 'Radzyminski',
    email: 'admin@email.com'
  }));

  // Check if token is present and is a non-empty string
  expect(responseBody.token).toBeTruthy();
  expect(typeof responseBody.token).toBe('string');
});