import { test, expect } from '@playwright/test';
import { apiURL } from '../env';

test('generates a narrative consistent with assessment scores', async ({ request }) => {
  const response = await request.get(`${apiURL}/api/assessments/asmt_001/narrative`);

  expect(response.status()).toBe(200);
  const body = await response.json();

  expect(body.narrative).toContain('Alex Thompson');
  expect(body.narrative).toContain('score of 102');
  expect(body.narrative).toContain('Average');
  expect(body.narrative).toContain('Working Memory Index');
});

test('returns 404 when generating a narrative for an unknown assessment', async ({ request }) => {
  const response = await request.get(`${apiURL}/api/assessments/does-not-exist/narrative`);

  expect(response.status()).toBe(404);
});
