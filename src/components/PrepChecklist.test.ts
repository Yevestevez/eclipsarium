import { describe, expect, it } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import PrepChecklist from './PrepChecklist.astro';

describe('PrepChecklist.astro', () => {
    it('renders section with id="checklist"', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(PrepChecklist);

        expect(html).toContain('id="checklist"');
        expect(html).toContain('class="pcl section"');
        expect(html).toContain('Checklist');
    });

    it('includes the recommendations block', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(PrepChecklist);

        expect(html).toContain('Recomendaciones');
        expect(html).toContain('Antes del eclipse');
        expect(html).toContain('El día del eclipse');
        expect(html).toContain('Después del eclipse');
    });

    it('includes both checklist categories with progress indicators', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(PrepChecklist);

        expect(html).toContain('Imprescindible');
        expect(html).toContain('Preparativos');
        expect(html).toContain('data-cat="vital"');
        expect(html).toContain('data-cat="prep"');
        expect(html).toContain('data-cat-count=');
    });

    it('renders all 14 checklist items', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(PrepChecklist);

        const items = html.match(/data-key="[^"]+"/g) || [];
        expect(items).toHaveLength(14);
    });

    it('renders key checklist items', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(PrepChecklist);

        expect(html).toContain('Gafas eclipse ISO 12312-2');
        expect(html).toContain('Filtro solar para cámara o móvil');
        expect(html).toContain('Agua');
        expect(html).toContain('Protección solar');
        expect(html).toContain('Depósito de combustible lleno');
        expect(html).toContain('Power bank');
        expect(html).toContain('Ubicación definitiva elegida');
        expect(html).toContain('Plan B meteorológico');
    });

    it('renders the safety warnings section', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(PrepChecklist);

        expect(html).toContain('Esto NO protege tu vista');
        expect(html).toContain('Solo las gafas ISO 12312-2');
        expect(html).toMatch(/sol convencionales/);
        expect(html).toContain('Radiografías');
        expect(html).toContain('Cristal');
        expect(html).toMatch(/retina no tiene receptores/);
    });

    it('includes a global progress bar', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(PrepChecklist);

        expect(html).toContain('role="progressbar"');
        expect(html).toContain('data-bar="total"');
        expect(html).toContain('aria-valuemax');
    });

    it('includes the Perseids recommendation', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(PrepChecklist);

        expect(html).toContain('Perseidas');
        expect(html).toContain('noche del 12 al 13');
    });
});
