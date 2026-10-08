import { test, expect } from './Fixture.spec.js';

test('Login test', async ({ appPage }) => {

    await appPage
        .getByRole('textbox', { name: 'Username' })
        .fill('standard_user');

    await appPage
        .getByRole('textbox', { name: 'Password' })
        .fill('secret_sauce');

    await appPage
        .getByRole('button', { name: 'Login' })
        .click();

    await expect(appPage).toHaveURL(/inventory.html/);
});