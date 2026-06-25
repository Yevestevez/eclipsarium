import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('quiz-general.spec.ts — QuizGeneral', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('E38: section #quiz-general exists and is visible', async ({ page }) => {
        const section = page.locator('#quiz-general');
        await expect(section).toBeVisible();
        await expect(section.locator('.eyebrow')).toContainText('¿Lo sabías?');
        await expect(section.locator('.qz__title')).toContainText('Quiz general');
    });

    test('E39: quiz shows first question with category badge', async ({ page }) => {
        const quiz = page.locator('#quiz-general');
        await expect(quiz.locator('[data-quiz-general]')).toBeVisible();

        const category = quiz.locator('[data-category]');
        await expect(category).toBeVisible();
        expect(await category.textContent()).toBe('Eclipses');

        const question = quiz.locator('[data-question]');
        await expect(question).toBeVisible();
        expect(await question.textContent()).toBe(
            '¿Un eclipse solar total solo puede ocurrir durante la luna nueva?',
        );

        await expect(quiz.locator('[data-count]')).toContainText('1 / 12');
    });

    test('E40: answering quiz question shows feedback', async ({ page }) => {
        const quiz = page.locator('#quiz-general');
        const feedback = quiz.locator('[data-feedback]');

        await expect(feedback).toBeVisible();
        expect(await feedback.textContent()).toBe('');

        await quiz.locator('[data-btn="true"]').click();

        const feedbackText = await feedback.textContent();
        expect(feedbackText?.length).toBeGreaterThan(0);

        await expect(quiz.locator('[data-next]')).toBeVisible();
    });

    test('E41: completing quiz shows result screen', async ({ page }) => {
        const quiz = page.locator('#quiz-general');
        const stage = quiz.locator('[data-stage]');
        const result = quiz.locator('[data-result]');

        for (let i = 0; i < 12; i++) {
            await expect(stage).toBeVisible();
            await quiz.locator('[data-btn="true"]').click();

            const nextBtn = quiz.locator('[data-next]');
            await nextBtn.click();
        }

        await expect(stage).not.toBeVisible();
        await expect(result).toBeVisible();
        await expect(result.locator('[data-score]')).toBeVisible();
        await expect(result.locator('[data-retry]')).toContainText('Repetir');
    });

    test('E42: no critical axe violations on the quiz-general section', async ({ page }) => {
        const results = await new AxeBuilder({ page })
            .include('#quiz-general')
            .analyze();

        const criticalViolations = results.violations.filter(
            (v) => v.impact === 'critical',
        );
        expect(criticalViolations).toEqual([]);
    });
});
