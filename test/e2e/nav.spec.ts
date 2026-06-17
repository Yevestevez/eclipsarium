import { test, expect } from '@playwright/test';

test.describe('nav.spec.ts — Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    // E09: desktop nav links go to correct sections
    test('E09: desktop nav links go to correct sections', async ({ page }) => {
        const navLinks = page.locator('.nav--desktop a');
        const count = await navLinks.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const link = navLinks.nth(i);
            const href = await link.getAttribute('href');
            expect(href).toMatch(/^#/);
            const section = page.locator(href!);
            await expect(section).toBeVisible();
        }
    });

    // E10: hamburger menu not visible on desktop
    test('E10: hamburger menu not visible on desktop', async ({ page }) => {
        test.skip(
            page.viewportSize()?.width !== undefined &&
                page.viewportSize()!.width <= 560,
            'Desktop only',
        );

        const hamburger = page.locator('.nav-mobile');
        // On desktop, should not be visible
        await expect(hamburger).not.toBeVisible();
    });

    // E11: hamburger menu visible on mobile viewport (375px)
    test('E11: hamburger menu visible on mobile viewport', async ({
        page,
        context,
    }) => {
        // Create new page with mobile viewport
        const mobilePage = await context.newPage();
        await mobilePage.setViewportSize({ width: 375, height: 667 });
        await mobilePage.goto('/');

        const hamburger = mobilePage.locator('.nav-mobile');
        await expect(hamburger).toBeVisible();

        await mobilePage.close();
    });

    // E12: pressing hamburger opens the panel
    test('E12: pressing hamburger opens the panel', async ({
        page,
        context,
    }) => {
        const mobilePage = await context.newPage();
        await mobilePage.setViewportSize({ width: 375, height: 667 });
        await mobilePage.goto('/');

        const details = mobilePage.locator('.nav-mobile');
        const summary = details.locator('summary');
        const navPanel = details.locator('.nav-mobile__panel');

        // Should initially be closed (details without open attribute)
        const isOpen = await details.evaluate((el: HTMLDetailsElement) =>
            el.hasAttribute('open'),
        );
        expect(isOpen).toBe(false);

        // Click on hamburger
        await summary.click();

        // Should open
        const isOpenAfter = await details.evaluate((el: HTMLDetailsElement) =>
            el.hasAttribute('open'),
        );
        expect(isOpenAfter).toBe(true);
        await expect(navPanel).toBeVisible();

        await mobilePage.close();
    });

    // E13: clicking a panel link closes the panel
    test('E13: clicking a panel link closes the panel', async ({
        page,
        context,
    }) => {
        const mobilePage = await context.newPage();
        await mobilePage.setViewportSize({ width: 375, height: 667 });
        await mobilePage.goto('/');

        const details = mobilePage.locator('.nav-mobile');
        const summary = details.locator('summary');
        const navLink = details.locator('.nav-mobile__panel a').first();

        // Open panel
        await summary.click();
        let isOpen = await details.evaluate((el: HTMLDetailsElement) =>
            el.hasAttribute('open'),
        );
        expect(isOpen).toBe(true);

        // Click on link
        await navLink.click();

        // Should close
        isOpen = await details.evaluate((el: HTMLDetailsElement) =>
            el.hasAttribute('open'),
        );
        expect(isOpen).toBe(false);

        await mobilePage.close();
    });
});
