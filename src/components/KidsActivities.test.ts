import { describe, expect, it } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import KidsActivities from './KidsActivities.astro';
import data from '../data/activities.json';

describe('KidsActivities.astro', () => {
    it('renders section with id="actividades"', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(KidsActivities);

        expect(html).toContain('id="actividades"');
        expect(html).toContain('class="kac"');
        expect(html).toContain('Actividades');
        expect(html).toContain('para el eclipse');
    });

    it('renders all 6 activity cards', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(KidsActivities);

        const { activities } = data;
        activities.forEach((act) => {
            expect(html).toContain(act.title);
            expect(html).toContain(act.subtitle);
            expect(html).toContain(act.age);
            expect(html).toContain(act.time);
        });
    });

    it('each activity card has a source link', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(KidsActivities);

        const { activities } = data;
        activities.forEach((act) => {
            expect(html).toContain(act.source.name);
            expect(html).toContain(act.source.url);
        });
    });

    it('each activity card has materials and steps', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(KidsActivities);

        const { activities } = data;
        activities.forEach((act) => {
            act.materials.forEach((m) => {
                expect(html).toContain(m);
            });
            act.steps.forEach((step) => {
                expect(html).toContain(step);
            });
        });
    });

    it('each activity card includes science explanation', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(KidsActivities);

        expect(html).toContain('Qué está pasando');

        const { activities } = data;
        activities.forEach((act) => {
            expect(html).toContain(act.explain);
        });
    });

    it('renders the quiz section with title and help text', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(KidsActivities);

        expect(html).toContain('¿Cuánto sabes del eclipse?');
        expect(html).toContain('5 preguntas');
        expect(html).toContain('Verdadero');
        expect(html).toContain('Falso');
    });

    it('quiz data attribute contains serialized 5 questions', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(KidsActivities);

        expect(html).toContain('data-quiz=');
        expect(html).toContain('¿Durante la totalidad');
        expect(html).toContain('¿Las gafas de sol normales');
        expect(html).toContain('¿El Sol y la Luna');
        expect(html).toContain('¿La totalidad del eclipse');
        expect(html).toContain('¿Después de 2026');
    });

    it('quiz has Verdadero and Falso buttons', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(KidsActivities);

        const trueBtn = html.match(/data-btn="true"/g) || [];
        const falseBtn = html.match(/data-btn="false"/g) || [];
        expect(trueBtn.length).toBeGreaterThanOrEqual(1);
        expect(falseBtn.length).toBeGreaterThanOrEqual(1);
    });

    it('includes intro paragraph about family supervision', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(KidsActivities);

        expect(html).toMatch(/supervisión\s+de\s+un\s+adulto/);
    });

    it('includes "Fuente:" prefix for each source link', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(KidsActivities);

        const sourceCount = (html.match(/Fuente:/g) || []).length;
        expect(sourceCount).toBe(6);
    });
});
