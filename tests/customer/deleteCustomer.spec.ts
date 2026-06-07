import { test, expect } from '@playwright/test';

test('Supprimer un client', async ({ page }) => {
  // 1. Login
  await page.goto('http://localhost:5173/login');
  await page.fill('input[name="email"]', 'med97@test.tn');
  await page.fill('input[name="password"]', '123456');
  await page.click('button[type="submit"]');
  await page.waitForURL('http://localhost:5173/', { timeout: 10000 });
  
  // 2. Aller à la page des clients
  await page.goto('http://localhost:5173/customers');
  await page.waitForLoadState('networkidle');
  
  // 3. Vérifier que le client existe avant suppression
  const customerExists = await page.locator('tr:has-text("Jane Smith")').count();
  if (customerExists === 0) {
    console.log("⚠️ Client 'Jane Smith' non trouvé, test ignoré");
    return;
  }
  console.log("✅ Client trouvé");
  
  // 4. Configurer l'écouteur de dialogue AVANT le clic
  page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept(); // Accepter la confirmation
  });
  
  // 5. Trouver et cliquer sur le bouton supprimer
  const customerRow = page.locator('tr:has-text("Jane Smith")');
  const deleteButton = customerRow.locator('button.text-red-600');
  await deleteButton.click();
  console.log("✅ Bouton supprimer cliqué");
  
  // 6. Attendre la suppression (attendre que la ligne disparaisse)
  await page.waitForTimeout(2000);
  
  // 7. Vérifier que le client a disparu
  const deleted = await page.locator('tr:has-text("Jane Smith")').count();
  if (deleted === 0) {
    console.log("✅ Client supprimé avec succès!");
  } else {
    console.log("❌ Client toujours présent");
  }
  
  // Alternative avec expect
  await expect(page.locator('tr:has-text("Jane Smith")')).toHaveCount(0);
});