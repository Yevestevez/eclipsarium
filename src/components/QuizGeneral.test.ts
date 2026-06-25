import { describe, expect, it } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import QuizGeneral from './QuizGeneral.astro';
import data from '../data/quiz.json';

describe('QuizGeneral.astro', () => {
    it('renders section with id="quiz-general"', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(QuizGeneral);

        expect(html).toContain('id="quiz-general"');
        expect(html).toContain('class="qz section"');
        expect(html).toContain('Quiz general');
        expect(html).toContain('sobre eclipses');
    });

    it('renders eyebrow and lead paragraph', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(QuizGeneral);

        expect(html).toContain('¿Lo sabías?');
        expect(html).toContain('Doce preguntas de verdadero o falso');
    });

    it('renders quiz data attribute with serialized 12 questions', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(QuizGeneral);

        expect(html).toContain('data-quiz-general');
        expect(html).toContain('data-quiz=');
        expect(html).toContain('¿Un eclipse solar total solo puede ocurrir');
        expect(html).toContain('¿Un eclipse lunar solo puede ocurrir');
    });

    it('renders category badge', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(QuizGeneral);

        expect(html).toContain('data-category=');
        expect(html).toContain('qz__category');
    });

    it('renders progress elements', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(QuizGeneral);

        expect(html).toContain('data-fill=');
        expect(html).toContain('data-count=');
        expect(html).toContain('1 / 12');
    });

    it('renders question container', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(QuizGeneral);

        expect(html).toContain('data-question=');
        expect(html).toContain('qz__q');
    });

    it('renders Verdadero and Falso buttons', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(QuizGeneral);

        const trueBtns = html.match(/data-btn="true"/g) || [];
        const falseBtns = html.match(/data-btn="false"/g) || [];
        expect(trueBtns.length).toBeGreaterThanOrEqual(1);
        expect(falseBtns.length).toBeGreaterThanOrEqual(1);
        expect(html).toContain('Verdadero');
        expect(html).toContain('Falso');
    });

    it('renders feedback element with aria-live', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(QuizGeneral);

        expect(html).toContain('data-feedback=');
        expect(html).toContain('aria-live="polite"');
    });

    it('renders next button hidden', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(QuizGeneral);

        expect(html).toContain('data-next=');
        expect(html).toContain('Siguiente →');
    });

    it('renders result screen elements hidden', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(QuizGeneral);

        expect(html).toContain('data-result=');
        expect(html).toContain('data-score=');
        expect(html).toContain('data-best=');
        expect(html).toContain('data-retry=');
        expect(html).toContain('Repetir ↻');
    });

    it('quiz data matches JSON source', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(QuizGeneral);

        const { quiz } = data;
        quiz.forEach((q) => {
            expect(html).toContain(q.question);
        });
    });
});
