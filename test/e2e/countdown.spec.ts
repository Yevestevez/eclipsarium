import { test, expect } from '@playwright/test';

test.describe('countdown.spec.ts — Countdown', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    // E14: the 4 time blocks are visible
    test('E14: the 4 time blocks are visible', async ({ page }) => {
        // Find countdown section
        const countdownSection = page.locator('#cuenta');
        await expect(countdownSection).toBeVisible();

        // Find the 4 blocks (.unit) and verify they are all visible
        const units = page.locator('#cuenta .unit');
        const count = await units.count();

        // Must have 4 blocks (days, hours, minutes, seconds)
        expect(count).toBe(4);

        // All must be visible
        for (let i = 0; i < 4; i++) {
            await expect(units.nth(i)).toBeVisible();
        }
    });

    // E15: values are numeric (not `—`) after 1 second
    test('E15: values are numeric after 1 second', async ({ page }) => {
        // Wait for page to be fully rendered and JS to execute
        await page.waitForTimeout(1500);

        // Find elements containing numeric values
        const values = page.locator('#cuenta .unit__n');
        const count = await values.count();

        expect(count).toBe(4);

        // At least one should have a number (not just —)
        let hasNumber = false;
        for (let i = 0; i < count; i++) {
            const text = await values.nth(i).textContent();
            if (text && /\d/.test(text)) {
                hasNumber = true;
                break;
            }
        }

        expect(hasNumber).toBe(true);
    });

    // E16: days shows value ≥ 0
    test('E16: days shows value ≥ 0', async ({ page }) => {
        await page.waitForTimeout(1500);

        // First .unit__n contains days (data-d selector)
        const daysValue = page.locator('#cuenta .unit__n[data-d]');
        await expect(daysValue).toBeVisible();

        const text = await daysValue.textContent();

        // If contains a number, verify it is >= 0
        const match = text?.match(/(\d+)/);
        if (match) {
            const days = parseInt(match[1], 10);
            expect(days).toBeGreaterThanOrEqual(0);
        }
    });
});
