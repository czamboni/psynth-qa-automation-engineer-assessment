import { test, expect } from '@playwright/test';

test('opens Alex Thompson assessment from the list', async ({ page }) => {
  await page.goto('/assessments');

  const alexRow = page.getByRole('row').filter({ hasText: 'Alex Thompson' });
  await alexRow.getByRole('link', { name: 'View' }).click();

  await expect(page).toHaveURL(/\/assessments\/asmt_001$/);
  await expect(page.getByRole('heading', { name: 'Alex Thompson' })).toBeVisible();
});
