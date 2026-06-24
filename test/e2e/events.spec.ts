import { test, expect } from '@playwright/test';

test.describe('events.spec.ts — Eventos section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('E14: section #eventos exists and is visible', async ({ page }) => {
        const section = page.locator('#eventos');
        await expect(section).toBeVisible();
    });

    test('E15: section shows heading "Próximas actividades"', async ({ page }) => {
        const heading = page.locator('#eventos .events__title');
        await expect(heading).toHaveText('Próximas actividades');
    });

    test('E16: at least one event card is rendered with title', async ({ page }) => {
        const cards = page.locator('#eventos .event-card');
        await expect(cards.first()).toBeVisible();

        const title = cards.first().locator('.event-card__title');
        await expect(title).not.toBeEmpty();
    });

    test('E17: source citation "Fuente:" is visible before CTA', async ({ page }) => {
        const source = page.locator('#eventos .events__source');
        await expect(source).toBeVisible();
        await expect(source).toContainText('Fuente:');
        await expect(source.locator('a')).toHaveAttribute(
            'href',
            'https://divulgacion.trioeclipses.es/eventos',
        );
    });

    test('E18: CTA button links to full calendar', async ({ page }) => {
        const cta = page.locator('#eventos .events__cta a');
        await expect(cta).toBeVisible();
        await expect(cta).toHaveText('Ver calendario completo');
        await expect(cta).toHaveAttribute(
            'href',
            'https://divulgacion.trioeclipses.es/eventos',
        );
    });

    test('E19: desktop nav link "Eventos" scrolls to section', async ({
        page,
    }) => {
        test.skip(
            page.viewportSize()?.width !== undefined &&
                page.viewportSize()!.width <= 560,
            'Desktop only',
        );

        const scrollBefore = await page.evaluate(() => window.scrollY);
        const link = page.locator('.nav--desktop a[href="#eventos"]');
        await expect(link).toBeVisible();

        await link.click();
        await page.waitForFunction(
            (y) => window.scrollY > y,
            scrollBefore,
            { timeout: 5000 },
        );

        const scrollAfter = await page.evaluate(() => window.scrollY);
        expect(scrollAfter).toBeGreaterThan(scrollBefore);
    });
});
