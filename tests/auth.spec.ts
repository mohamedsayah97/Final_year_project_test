// import { test, expect } from '@playwright/test';

// test('s\'inscrire', async ({ page }) => {
//   await page.goto('http://localhost:5173/register');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle('OptiManage');

//   // Remplir les champs de l'inscription
//   await page.locator('input[name="firstName"]').fill('John');
//   await page.locator('input[name="lastName"]').fill('Doe');
//   await page.locator('input[name="email"]').fill('john4.doe@example.com');
//   await page.locator('input[name="password"]').fill('password123');
//   await page.locator('input[name="phoneNumber"]').fill('12345678');
//   await page.locator('textarea[name="address"]').fill('123 Rue Example, 75000 Paris');

//   // Cochez la case des conditions générales
//   await page.locator('input[name="terms"]').check();

//    // Soumettre et attendre la redirection
//   await Promise.all([
//     page.waitForURL('http://localhost:5173/login'),
//     page.click('button[type="submit"]')
//   ]);

//   // Attendre que la page de connexion soit affichée
//   await expect(page).toHaveURL(/.*\/login$/);

// });

// test('login', async ({ page }) => {
//   await page.goto('http://localhost:5173/login');

//   await page.locator('input[name="email"]').fill('john4.doe@example.com');
//   await page.locator('input[name="password"]').fill('password123');
  
//   // Cochez la case des conditions générales
//   await page.locator('input[name="remember-me"]').check();

//   // Soumettre et attendre la redirection
//   await Promise.all([
//     page.waitForURL('http://localhost:5173'),
//     page.click('button[type="submit"]')
//   ]);
// });
