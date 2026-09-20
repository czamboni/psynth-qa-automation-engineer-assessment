import { test, expect } from '@playwright/test';
import { apiURL } from '../env';

test('lists the expected assessment summaries', async ({ request }) => {
  const response = await request.get(`${apiURL}/api/assessments`);

  expect(response.status()).toBe(200);
  const assessments = await response.json();

  expect(assessments).toHaveLength(5);
  expect(assessments[0]).toMatchObject({
    id: 'asmt_001',
    client_name: 'Alex Thompson',
    assessment_type: 'WISC-V',
    date_administered: '2024-01-15',
    status: 'completed',
  });
});

test('filters assessments by status', async ({ request }) => {
  const response = await request.get(`${apiURL}/api/assessments?status=pending_review`);

  expect(response.status()).toBe(200);
  const assessments = await response.json();

  expect(assessments).toHaveLength(2);
  expect(assessments.every((assessment: { status: string }) => assessment.status === 'pending_review')).toBe(true);
});
