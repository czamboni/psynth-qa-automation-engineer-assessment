import { test, expect } from '@playwright/test';

test('adds a clinical note', async ({ page }) => {
  await page.goto('/assessments/asmt_001');

  const note = `Follow-up recommended ${Date.now()}`;
  await page.getByPlaceholder('Add a clinical observation...').fill(note);

  const noteResponse = page.waitForResponse(
    (response) =>
      response.url().endsWith('/api/assessments/asmt_001/notes') &&
      response.request().method() === 'POST',
  );

  await page.getByRole('button', { name: 'Add Note' }).click();
  expect((await noteResponse).status()).toBe(200);

  await expect(page.getByText(note)).toBeVisible();
  await expect(page.getByPlaceholder('Add a clinical observation...')).toHaveValue('');
});
