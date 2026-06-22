import { describe, expect, it } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import WhereToWatch from './WhereToWatch.astro';
import data from '../data/locations.json';

describe('WhereToWatch.astro', () => {
    it('renders section with id="donde" and correct structure', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(WhereToWatch);

        expect(html).toContain('id="donde"');
        expect(html).toContain('class="where"');
        expect(html).toContain('Dónde verlo');
        expect(html).toContain('La franja de');
    });

    it('includes the EclipseMap component', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(WhereToWatch);

        expect(html).toContain('id="eclipse-map"');
        expect(html).toContain('data-polygon=');
    });

    it('renders all 29 places', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(WhereToWatch);

        const total = (html.match(/class="place place--total"/g) || []).length;
        const edge = (html.match(/class="place place--edge"/g) || []).length;
        const partial = (html.match(/class="place place--partial"/g) || [])
            .length;

        expect(total + edge + partial).toBe(29);
        expect(total).toBeGreaterThan(0);
        expect(edge).toBeGreaterThan(0);
        expect(partial).toBeGreaterThan(0);
    });

    it('sorts places: total first, then edge, then partial', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(WhereToWatch);

        const classes = html.match(/class="place place--\w+"/g) || [];
        const types = classes.map((c) =>
            c.replace('class="place place--', '').replace('"', ''),
        );

        const firstTotal = types.indexOf('total');
        const lastTotal = types.lastIndexOf('total');
        const firstEdge = types.indexOf('edge');
        const lastEdge = types.lastIndexOf('edge');
        const firstPartial = types.indexOf('partial');

        expect(firstTotal).toBe(0);
        expect(lastTotal).toBeLessThan(firstEdge);
        expect(lastEdge).toBeLessThan(firstPartial);
    });

    it('each place links to /location/{slug}', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(WhereToWatch);

        data.places.forEach((p) => {
            expect(html).toContain(`href="/location/${p.slug}"`);
        });
    });

    it('each place link has class="place__link"', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(WhereToWatch);

        const links = html.match(/class="place__link"/g) || [];
        expect(links).toHaveLength(29);
    });
});
