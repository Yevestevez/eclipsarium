import { test, expect } from '@playwright/test';

test.describe('search.spec.ts — Search & filter', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    // E30: search input visible with correct placeholder
    test('E30: search input visible with correct placeholder and label', async ({
        page,
    }) => {
        const input = page.locator('#location-search');
        await expect(input).toBeVisible();
        await expect(input).toHaveAttribute('type', 'search');
        await expect(input).toHaveAttribute(
            'placeholder',
            'Buscar localidad…',
        );
        await expect(input).toHaveAttribute(
            'aria-label',
            'Filtrar localidades por nombre o región',
        );
    });

    // E31: typing filters places — only matching ones visible
    test('E31: typing filters places by city name', async ({ page }) => {
        const input = page.locator('#location-search');
        await input.fill('Madrid');

        const visible = page.locator('.place:not(.place--hidden)');
        const hidden = page.locator('.place.place--hidden');

        await expect(visible).toHaveCount(1);
        await expect(hidden).toHaveCount(28);
        await expect(visible).toContainText('Madrid');
    });

    // E32: clearing input restores all places
    test('E32: clearing input restores all places', async ({ page }) => {
        const input = page.locator('#location-search');
        await input.fill('Madrid');
        await input.clear();

        const visible = page.locator('.place:not(.place--hidden)');
        await expect(visible).toHaveCount(29);
    });

    // E33: accent-insensitive matching
    test('E33: accent-insensitive matching (coruna → A Coruña)', async ({
        page,
    }) => {
        const input = page.locator('#location-search');
        await input.fill('coruna');

        const visible = page.locator('.place:not(.place--hidden)');
        await expect(visible).toHaveCount(1);
        await expect(visible).toContainText('Coruña');
    });

    // E34: accent-insensitive ñ match
    test('E34: accent-insensitive ñ match (Coruña)', async ({ page }) => {
        const input = page.locator('#location-search');
        await input.fill('Coruña');

        const visible = page.locator('.place:not(.place--hidden)');
        await expect(visible).toHaveCount(1);
        await expect(visible).toContainText('A Coruña');
    });

    // E35: no matching query hides all places and shows empty message
    test('E35: non-matching query hides all places', async ({ page }) => {
        const input = page.locator('#location-search');
        await input.fill('Xyzzy');

        const visible = page.locator('.place:not(.place--hidden)');
        const hidden = page.locator('.place.place--hidden');

        await expect(visible).toHaveCount(0);
        await expect(hidden).toHaveCount(29);
    });
});
