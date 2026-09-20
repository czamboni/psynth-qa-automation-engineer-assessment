# AI usage

## Tools

I used ChatGPT (GPT-5.6 Sol) extensively as a pair-programming and review tool while exploring the repository, reviewing inherited Playwright tests, reasoning about failure classification, improving test/CI code, and drafting these reports.

## What I accepted

I accepted suggestions to:
- preserve the two meaningful inherited failing assertions instead of weakening them;
- strengthen API assertions beyond status-only checks;
- replace fixed waits and styling/position-based locators with observable responses and accessible locators;
- add focused API coverage for detail and narrative behavior;
- make PR test selection conservative for unknown and infrastructure changes.

## What I changed or rejected

I kept the solution deliberately small rather than introducing a page-object framework, a second API-test framework, retries, or broad exhaustive coverage. Those options would add complexity without improving the main risks this exercise asks about.

I also did not change product code merely to make the inherited suite green: the date and empty-note behaviors are recorded as product findings so the test evidence remains honest. For a production workflow, I would separate defect severity and priority from CI blocking policy; a known, explicitly accepted defect could be tracked and treated as an expected failure rather than weakening its assertion or blocking unrelated delivery indefinitely.

## What I verified and reviewed

I reviewed the assessment requirements and the resulting changes to the inherited tests, application behavior, seed data, impact map, selector, GitHub Actions workflow, and quality report. I also reviewed the failure evidence and the reasoning behind keeping the two product findings visible.

The supplied baseline GitHub Actions run completed with 5 passing and 2 failing tests. The final PR behavior was reproduced consistently: 12 tests ran, 10 passed, and the same 2 known product findings failed. The PR selector chose __ALL__ for the infrastructure/test-impact changes, and the workflow still uploaded Playwright artifacts and ran cleanup after the test failure.

I understand and can explain the main decisions in this submission: why the two failures were classified as product behavior rather than weakened to make CI green, why the suite combines focused API and E2E coverage, why fixed waits and brittle locators were replaced, why I did not introduce a page-object layer for this suite, and how direct, indirect, conservative full-suite, and unknown-change fallback selection work.
