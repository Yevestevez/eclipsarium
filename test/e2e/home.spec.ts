import { test, expect } from '@playwright/test';

test.describe('home.spec.ts — Load and structure', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    // E01: page responds 200
    test('E01: page responds 200', async ({ page }) => {
        expect(page.url()).toBe('http://localhost:4321/');
    });

    // E02: `<title>` contains "ECLIPSARIUM"
    test('E02: <title> contains "ECLIPSARIUM"', async ({ page }) => {
        const title = await page.title();
        expect(title).toContain('ECLIPSARIUM');
    });

    // E03: `<meta name="description">` is present and not empty
    test('E03: <meta name="description"> is present and not empty', async ({
        page,
    }) => {
        const description = await page.locator('meta[name="description"]');
        await expect(description).toHaveAttribute('content');
        const content = await description.getAttribute('content');
        expect(content).toBeTruthy();
        expect(content?.length).toBeGreaterThan(0);
    });

    // E04: `<html lang="es">`
    test('E04: <html lang="es">', async ({ page }) => {
        const html = await page.locator('html');
        await expect(html).toHaveAttribute('lang', 'es');
    });

    // E05: section `#evento` exists and is visible
    test('E05: section #evento exists and is visible', async ({ page }) => {
        const section = await page.locator('#evento');
        await expect(section).toBeVisible();
    });

    // E06: section `#donde` exists and is visible
    test('E06: section #donde exists and is visible', async ({ page }) => {
        const section = await page.locator('#donde');
        await expect(section).toBeVisible();
    });

    // E07: section `#cuenta` exists and is visible
    test('E07: section #cuenta exists and is visible', async ({ page }) => {
        const section = await page.locator('#cuenta');
        await expect(section).toBeVisible();
    });

    // E08: footer shows ISO 12312-2 safety warning
    test('E08: footer shows ISO 12312-2 safety warning', async ({ page }) => {
        const footerWarn = await page.locator('.foot__warn');
        await expect(footerWarn).toBeVisible();
        const footerText = await footerWarn.textContent();
        // Use regex to allow special spaces
        expect(footerText).toMatch(/ISO\s*12312-2/);
    });
});
