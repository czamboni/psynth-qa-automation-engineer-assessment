import { test, expect } from '@playwright/test';
import { apiURL } from '../env';

test('returns assessment detail with scores and clinical notes', async ({ request }) => {
  const response = await request.get(`${apiURL}/api/assessments/asmt_001`);

  expect(response.status()).toBe(200);
  const assessment = await response.json();

  expect(assessment.id).toBe('asmt_001');
  expect(assessment.client).toMatchObject({
    first_name: 'Alex',
    last_name: 'Thompson',
  });
  expect(assessment.scores.full_scale_iq).toMatchObject({
    score: 102,
    percentile: 55,
  });
  expect(assessment.clinical_notes.length).toBeGreaterThan(0);
});

test('returns 404 for an unknown assessment', async ({ request }) => {
  const response = await request.get(`${apiURL}/api/assessments/does-not-exist`);

  expect(response.status()).toBe(404);
});
