import { test, expect } from '@playwright/test';

test('generates a narrative summary from Alex Thompson scores', async ({ page }) => {
  await page.goto('/assessments/asmt_001');

  const narrativeResponse = page.waitForResponse(
    (response) =>
      response.url().endsWith('/api/assessments/asmt_001/narrative') &&
      response.request().method() === 'GET',
  );

  await page.getByRole('button', { name: 'Generate Report' }).click();
  expect((await narrativeResponse).status()).toBe(200);

  await expect(page.getByText(/Alex Thompson.*12-year-old/)).toBeVisible();
  await expect(page.getByText(/Full Scale IQ.*score of 102/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'PDF' })).toBeVisible();
});
