import{test} from '@playwright/test';

test('pagination table', async({page})=> {

await page.goto('https://d3fe7lyo6qkivt.cloudfront.net/login');

await page.getByRole('button', {hasText: 'Sign In'}).click();
await page.getByPlaceholder('Enter username').fill('test.reviewer');
await page.getByPlaceholder('Enter password').fill('Reviewer@123');

await page.locator("[type='submit']").click();// e94cee4

await page.locator('.relative.px-6.py-3.text-sm.font-medium').click();

//pagination

await page.locator








})