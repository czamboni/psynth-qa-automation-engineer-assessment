import { test, expect } from '@playwright/test';

test('assessments page loads the seeded clients', async ({ page }) => {
  await page.goto('/assessments');

  await expect(page.getByRole('heading', { name: 'Assessments' })).toBeVisible();
  const rows = page.getByRole('table').getByRole('row');
  await expect(rows).toHaveCount(6);
  await expect(page.getByRole('row').filter({ hasText: 'Alex Thompson' })).toBeVisible();
});
