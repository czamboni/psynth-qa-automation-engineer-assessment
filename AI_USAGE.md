# AI usage

## Tools

I used ChatGPT (GPT-5.6 Sol) as a pair-programming and review tool while exploring the repository, reviewing inherited Playwright tests, reasoning about failure classification, improving test/CI code, and drafting these reports.

## What I accepted

I accepted suggestions to:
- preserve the two meaningful inherited failing assertions instead of weakening them;
- strengthen API assertions beyond status-only checks;
- replace fixed waits and styling/position-based locators with observable responses and accessible locators;
- add focused API coverage for detail and narrative behavior;
- make PR test selection conservative for unknown and infrastructure changes.

## What I changed or rejected

I kept the solution deliberately small rather than introducing a page-object framework, a second API-test framework, retries, or broad exhaustive coverage. Those options would add complexity without improving the main risks this exercise asks about.

I also did not change product code merely to make the inherited suite green: the date and empty-note behaviors are recorded as product findings so the test evidence remains honest.

## What I verified myself

I reviewed the assessment instructions, the existing tests, application code, seed data, impact map, selector, and GitHub Actions workflow. I also inspected the baseline GitHub Actions evidence showing 5 passing and 2 failing tests and used the failure output to classify the date and note-validation findings.

Before submitting, I will review the final PR diff and its GitHub Actions run, including the selected-test output and Playwright artifacts, so I can explain every retained test and CI decision.
