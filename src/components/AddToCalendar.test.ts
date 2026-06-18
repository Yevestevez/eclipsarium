import { describe, expect, it } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import AddToCalendar from './AddToCalendar.astro';

describe('AddToCalendar.astro', () => {
    it('renders heading and lead paragraph', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(AddToCalendar);

        expect(html).toContain('Añadir a calendario');
        expect(html).toContain('No te olvides del evento astronómico del año');
    });

    it('renders 4 calendar buttons', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(AddToCalendar);

        expect(html).toContain('Google Calendar');
        expect(html).toContain('Apple Calendar');
        expect(html).toContain('Outlook');
        expect(html).toContain('Descargar .ics');
    });

    it('Google Calendar link uses web intent URL', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(AddToCalendar);

        expect(html).toContain('calendar.google.com/calendar/render?action=TEMPLATE');
    });

    it('Apple Calendar link uses webcal protocol', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(AddToCalendar);
        const match = html.match(/href="(webcal:[^"]+)"/);

        expect(match).not.toBeNull();
        expect(match![1]).toMatch(/^webcal:\/\//);
        expect(match![1]).toContain('.ics');
    });

    it('Outlook link uses deeplink URL', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(AddToCalendar);

        expect(html).toContain('outlook.live.com/calendar/0/deeplink/compose');
    });

    it('ICS download button uses download attribute', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(AddToCalendar);

        expect(html).toContain('download');
        expect(html).toContain('/eclipse-2026.ics');
    });

    it('buttons have cut-corner clip-path style and icons', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(AddToCalendar);

        const btnCount = (html.match(/class="cal-btn"/g) || []).length;
        expect(btnCount).toBe(4);

        const iconCount = (html.match(/class="cal-btn__icon"/g) || []).length;
        expect(iconCount).toBe(4);
    });
});
