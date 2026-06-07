import { test, expect } from '@playwright/test';

test('ajouter un customer - version finale', async ({ page }) => {
  const customerEmail = `jane.smith.${Date.now()}@example.com`;
  
  // Login
  await page.goto('http://localhost:5173/login');
  await page.fill('input[name="email"]', 'med97@test.tn');
  await page.fill('input[name="password"]', '123456');
  await page.click('button[type="submit"]');
  await page.waitForURL('http://localhost:5173/', { timeout: 10000 });
  
  // Aller à add-customer
  await page.goto('http://localhost:5173/add-customer');
  await page.waitForLoadState('networkidle');
  
  // Remplir le formulaire
  await page.fill('input[placeholder="First name"]', 'Jane');
  await page.fill('input[placeholder="Last name"]', 'Smith');
  await page.fill('input[placeholder="customer@example.com"]', customerEmail);
  await page.fill('input[placeholder="+216 12345678"]', '22876543'); // Format valide
  await page.fill('textarea[placeholder="Full address"]', '456 Avenue Habib Bourguiba, Tunis');
  await page.selectOption('select', 'vip');
  
  // Soumettre
  await page.click('button[type="submit"]');
  
  // Attendre le message de succès
  await page.waitForSelector('.bg-green-100', { timeout: 10000 });
  console.log("✅ Client ajouté avec succès!");
  
  // Attendre la redirection
  await page.waitForURL(/.*\/customers/, { timeout: 10000 });
  
  // Vérifier dans le tableau
  await page.waitForSelector('table', { timeout: 10000 });
  await expect(page.locator('table')).toContainText('Jane Smith');
  
  console.log("🎉 Test réussi !");
});

