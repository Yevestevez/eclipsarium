import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('checklist.spec.ts — PrepChecklist', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    // E20: section #checklist exists and is visible
    test('E20: section #checklist exists and is visible', async ({ page }) => {
        const section = page.locator('#checklist');
        await expect(section).toBeVisible();
        await expect(section.locator('.pcl__title')).toContainText('Checklist');
    });

    // E21: checking a checkbox updates the progress bar
    test('E21: checking a checkbox updates the progress bar', async ({
        page,
    }) => {
        const section = page.locator('#checklist');

        // Progress bar container is visible
        await expect(
            section.locator('[role="progressbar"]'),
        ).toBeVisible();
        await expect(section.locator('[data-label="total"]')).toContainText(
            '14',
        );

        // Click the label of the first checkbox (input is visually hidden)
        const firstLabel = section.locator('.pcl__check').first();
        await firstLabel.click();

        // Progress should now show 1/14
        await expect(
            section.locator('[data-cat-count="vital"]'),
        ).toHaveText('1');
    });

    // E22: checkbox state persists after page reload (localStorage)
    test('E22: checkbox state persists after page reload', async ({
        page,
    }) => {
        const section = page.locator('#checklist');

        // Click label of first checkbox (input is visually hidden)
        const firstLabel = section.locator('.pcl__check').first();
        await firstLabel.click();
        await expect(
            section.locator('[data-cat-count="vital"]'),
        ).toHaveText('1');

        // Reload page
        await page.reload();

        // State should have persisted: still 1 checked
        await expect(
            page.locator('[data-cat-count="vital"]'),
        ).toHaveText('1');

        // Click to uncheck — verifies it toggles correctly
        const labelAfterReload = page
            .locator('#checklist .pcl__check')
            .first();
        await labelAfterReload.click();
        await expect(
            page.locator('[data-cat-count="vital"]'),
        ).toHaveText('0');
    });

    // E23: no critical axe violations on the checklist section
    test('E23: no critical axe violations on the checklist section', async ({
        page,
    }) => {
        const results = await new AxeBuilder({ page })
            .include('#checklist')
            .analyze();

        const criticalViolations = results.violations.filter(
            (v) => v.impact === 'critical',
        );
        expect(criticalViolations).toEqual([]);
    });
});
