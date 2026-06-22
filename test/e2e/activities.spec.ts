import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('activities.spec.ts — KidsActivities', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    // E30: section #actividades exists and is visible
    test('E30: section #actividades exists and is visible', async ({ page }) => {
        const section = page.locator('#actividades');
        await expect(section).toBeVisible();
        await expect(section.locator('.eyebrow')).toContainText('En familia');
        await expect(section.locator('.kac__title')).toContainText('Actividades');
    });

    // E31: all 6 activity cards are rendered
    test('E31: all 6 activity cards are rendered', async ({ page }) => {
        const section = page.locator('#actividades');
        const cards = section.locator('.kac__card');
        await expect(cards).toHaveCount(6);
    });

    // E32: clicking "Materiales y pasos" expands the details panel
    test('E32: expanding activity details shows materials and steps', async ({ page }) => {
        const firstCard = page.locator('.kac__card').first();
        const details = firstCard.locator('.kac__details');
        const summary = details.locator('.kac__details-head');

        // Initially collapsed
        await expect(details).not.toHaveAttribute('open');

        // Click to expand
        await summary.click();
        await expect(details).toHaveAttribute('open');

        // Verify content inside — label is "⊘ Materiales"
        await expect(details.locator('.kac__label').first()).toContainText('Materiales');
        await expect(details.locator('.kac__label').nth(1)).toContainText('Instrucciones');
    });

    // E33: source link is visible inside expanded details
    test('E33: source link visible inside expanded details', async ({ page }) => {
        const firstCard = page.locator('.kac__card').first();
        await firstCard.locator('.kac__details-head').click();

        const source = firstCard.locator('.kac__source');
        await expect(source).toBeVisible();
        await expect(source).toContainText('Fuente:');
    });

    // E34: quiz section is visible with title and buttons
    test('E34: quiz section is visible with title and buttons', async ({ page }) => {
        const quiz = page.locator('[data-quiz]');
        await expect(quiz).toBeVisible();

        await expect(page.locator('.kac__quiz-title')).toContainText('¿Cuánto sabes del eclipse?');

        const trueBtn = quiz.locator('[data-btn="true"]');
        const falseBtn = quiz.locator('[data-btn="false"]');
        await expect(trueBtn).toBeVisible();
        await expect(trueBtn).toContainText('Verdadero');
        await expect(falseBtn).toBeVisible();
        await expect(falseBtn).toContainText('Falso');
    });

    // E35: answering a quiz question shows feedback
    test('E35: answering quiz question shows feedback', async ({ page }) => {
        const quiz = page.locator('[data-quiz]');
        const feedback = quiz.locator('[data-feedback]');

        await expect(feedback).toBeVisible();
        expect(await feedback.textContent()).toBe('');

        // Click an answer
        await quiz.locator('[data-btn="true"]').click();

        // Feedback should now contain explanation text
        const feedbackText = await feedback.textContent();
        expect(feedbackText?.length).toBeGreaterThan(0);

        // Next button should appear
        await expect(quiz.locator('[data-next]')).toBeVisible();
    });

    // E36: completing quiz shows result screen
    test('E36: completing quiz shows result screen', async ({ page }) => {
        const quiz = page.locator('[data-quiz]');
        const stage = quiz.locator('[data-stage]');
        const result = quiz.locator('[data-result]');

        // Answer all 5 questions
        for (let i = 0; i < 5; i++) {
            await expect(stage).toBeVisible();
            await quiz.locator('[data-btn="true"]').click();

            const nextBtn = quiz.locator('[data-next]');
            await nextBtn.click();
        }

        // Result screen should be visible
        await expect(stage).not.toBeVisible();
        await expect(result).toBeVisible();
        await expect(result.locator('[data-score]')).toBeVisible();
        await expect(result.locator('[data-retry]')).toContainText('Repetir');
    });

    // E37: no critical axe violations on the activities section
    test('E37: no critical axe violations on the activities section', async ({ page }) => {
        const results = await new AxeBuilder({ page })
            .include('#actividades')
            .analyze();

        const criticalViolations = results.violations.filter(
            (v) => v.impact === 'critical',
        );
        expect(criticalViolations).toEqual([]);
    });
});
