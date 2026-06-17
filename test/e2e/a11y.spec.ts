import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('a11y.spec.ts — Accessibility', () => {
    // E17: axe does not report critical violations on home (desktop)
    test('E17: axe does not report critical violations on home (desktop)', async ({
        page,
    }) => {
        await page.goto('/');
        const results = await new AxeBuilder({ page }).analyze();

        // Filter only violations with impact "critical" (not "serious")
        const criticalViolations = results.violations.filter(
            (v) => v.impact === 'critical',
        );
        expect(criticalViolations).toEqual([]);
    });

    // E18: axe does not report critical violations on home (mobile 375px)
    test('E18: axe does not report critical violations on home (mobile)', async ({
        page,
        context,
    }) => {
        const mobilePage = await context.newPage();
        await mobilePage.setViewportSize({ width: 375, height: 667 });
        await mobilePage.goto('/');
        const results = await new AxeBuilder({ page: mobilePage }).analyze();

        // Filter only violations with impact "critical"
        const criticalViolations = results.violations.filter(
            (v) => v.impact === 'critical',
        );
        expect(criticalViolations).toEqual([]);

        await mobilePage.close();
    });

    // E19: `EclipseAnimation` has `role="img"` and `aria-label`
    test('E19: EclipseAnimation has role="img" and aria-label', async ({
        page,
    }) => {
        await page.goto('/');

        // Find element with role="img"
        const eclipseAnimation = page.locator('[role="img"]');

        // Verify it exists
        const count = await eclipseAnimation.count();
        expect(count).toBeGreaterThan(0);

        // Verify it has aria-label
        const ariaLabel = await eclipseAnimation.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
        expect(ariaLabel?.length).toBeGreaterThan(0);
    });
});
