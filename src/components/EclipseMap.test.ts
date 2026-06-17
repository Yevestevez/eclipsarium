import { describe, expect, it } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import EclipseMap from './EclipseMap.astro';

describe('EclipseMap.astro', () => {
    it('renders map container with id, class, and data attributes', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(EclipseMap);

        expect(html).toContain('id="eclipse-map"');
        expect(html).toContain('class="map-container"');
        expect(html).toContain('data-polygon=');
        expect(html).toContain('data-places=');
        expect(html).toContain('<section');
        expect(html).toContain('class="map-section"');
    });

    it('data-polygon is valid JSON with 83 points (47 north + 36 south)', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(EclipseMap);

        const match = html.match(/data-polygon="(.*?)"/);
        expect(match).not.toBeNull();
        const raw = match![1].replace(/&quot;/g, '"');
        const polygon = JSON.parse(raw);

        expect(Array.isArray(polygon)).toBe(true);
        expect(polygon).toHaveLength(83);
        polygon.forEach((pt: unknown) => {
            expect(Array.isArray(pt)).toBe(true);
            expect(pt as number[]).toHaveLength(2);
            expect(typeof (pt as number[])[0]).toBe('number');
            expect(typeof (pt as number[])[1]).toBe('number');
        });
    });

    it('data-places is valid JSON with all 29 locations', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(EclipseMap);

        const match = html.match(/data-places="(.*?)"/s);
        expect(match).not.toBeNull();
        const raw = match![1].replace(/&quot;/g, '"');
        const places = JSON.parse(raw);

        expect(Array.isArray(places)).toBe(true);
        expect(places).toHaveLength(29);
    });

    it('every place in data-places has required fields', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(EclipseMap);

        const match = html.match(/data-places="(.*?)"/s);
        const raw = match![1].replace(/&quot;/g, '"');
        const places: Record<string, unknown>[] = JSON.parse(raw);

        places.forEach((p) => {
            expect(typeof p.city).toBe('string');
            expect(typeof p.lat).toBe('number');
            expect(typeof p.lng).toBe('number');
            expect(['total', 'edge', 'partial']).toContain(p.type);
            expect(typeof p.slug).toBe('string');
        });
    });
});
