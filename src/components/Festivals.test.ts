import { describe, expect, it } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Festivals from './Festivals.astro';

describe('Festivals.astro', () => {
    it('renders section with id="festivales"', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Festivals);

        expect(html).toContain('id="festivales"');
        expect(html).toContain('Festivales del eclipse');
    });

    it('renders all 3 groups', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Festivals);

        expect(html).toContain('Festivales');
        expect(html).toContain('Tours guiados');
        expect(html).toContain('Observaciones públicas');
    });

    it('renders at least one festival card', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Festivals);

        expect(html).toContain('Iberia Eclipse Festival');
        expect(html).toContain('Más información');
        expect(html).toContain('AstroAfición');
    });
});