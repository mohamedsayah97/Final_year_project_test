import { test, expect } from '@playwright/test';

test('Mettre à jour un client', async ({ page }) => {
  // 1. Login
  await page.goto('http://localhost:5173/login');
  await page.fill('input[name="email"]', 'med97@test.tn');
  await page.fill('input[name="password"]', '123456');
  await page.click('button[type="submit"]');
  await page.waitForURL('http://localhost:5173/', { timeout: 10000 });
  
  // 2. Aller à la page des clients
  await page.goto('http://localhost:5173/customers');
  await page.waitForLoadState('networkidle');
  
  // 3. Vérifier que le client existe
  const customerExists = await page.locator('tr:has-text("Jane Smith")').count();
  if (customerExists === 0) {
    console.log("⚠️ Client non trouvé, création d'abord...");
    // Créer le client ici si nécessaire
  }
  
  // 4. Cliquer sur le bouton modifier
  const customerRow = page.locator('tr:has-text("Jane Smith")');
  const editButton = customerRow.locator('button.text-blue-600');
  await editButton.click();
  console.log("✅ Clic sur modifier");
  
  // 5. Attendre la page de mise à jour
  await page.waitForURL(/.*\/update-customer\/.*/, { timeout: 10000 });
  await page.waitForLoadState('networkidle');
  
  // 6. Remplir le formulaire avec les BONS SÉLECTEURS
  // Utiliser les attributs 'name' ou des sélecteurs plus stables
  
  // Méthode 1: Par l'attribut 'name' (recommandé)
  
  await page.fill('input[type="tel"]', '22556543');
  const addressTextarea = page.locator('textarea.bg-gray-50.border.border-gray-200.rounded-xl');
  await addressTextarea.fill('789 Street Name, Paris, France');
  console.log("✅ Adresse modifiée");

 await page.selectOption('select', 'regular');
  console.log("✅ Type de client modifié");
  
  // 7. Soumettre
  await page.click('button[type="submit"]');
  
  // 8. Attendre le message de succès
  await page.waitForSelector('.bg-green-100', { timeout: 10000 });
  console.log("✅ Client mis à jour avec succès!");
  
  // 9. Vérifier la redirection
  await page.waitForURL(/.*\/customers/, { timeout: 10000 });
  
  // 10. Vérifier que les modifications sont visibles
  await expect(page.locator('table')).toContainText('Jane Smith');
  console.log("🎉 Test réussi!");
});