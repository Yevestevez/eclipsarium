import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import EventList from './EventList.astro';

const mockEvents = [
    {
        id: 1,
        title: 'Conferencia eclipse solar',
        date: new Date(Date.now() + 86400000 * 7).toISOString(),
        address: 'Madrid, España',
        province: 'Madrid',
        institution: 'Observatorio Nacional',
        url: 'https://example.com/evento',
        category: { name: 'Conferencia', slug: 'conference' },
        description: '<p>Charla sobre el eclipse</p>',
        image: null,
        event_category_id: 4,
        event_location_id: null,
        latitude: null,
        longitude: null,
        featured: false,
        short_description: '',
        slug: 'conferencia-eclipse',
        created_at: '2026-01-01T00:00:00.000000Z',
        updated_at: '2026-01-01T00:00:00.000000Z',
        event_language_id: 1,
        duration_hours: '1',
        event_audience_id: 3,
        event_access_type_id: 1,
        ticket_url: null,
        event_type_id: 1,
        tags: [],
        location: null,
        language: { id: 1, name: 'Castellano', code: 'es' },
        audience: { id: 3, name: 'Todos los públicos', slug: 'todos-los-publicos' },
        access_type: { id: 1, name: 'Entrada libre', slug: 'entrada-libre', requires_url: false },
        event_type: { id: 1, name: 'Presencial', slug: 'presencial', disables_location: false },
        translations: [],
    },
    {
        id: 2,
        title: 'Observación astronómica',
        date: new Date(Date.now() + 86400000 * 14).toISOString(),
        address: 'Barcelona, España',
        province: 'Barcelona',
        institution: 'Agrupación Astronómica',
        url: null,
        category: { name: 'Observación', slug: 'night_observation' },
        description: '',
        image: null,
        event_category_id: 2,
        event_location_id: null,
        latitude: null,
        longitude: null,
        featured: false,
        short_description: '',
        slug: 'observacion-astronomica',
        created_at: '2026-01-01T00:00:00.000000Z',
        updated_at: '2026-01-01T00:00:00.000000Z',
        event_language_id: 1,
        duration_hours: '2',
        event_audience_id: 3,
        event_access_type_id: 1,
        ticket_url: null,
        event_type_id: 1,
        tags: [],
        location: null,
        language: { id: 1, name: 'Castellano', code: 'es' },
        audience: { id: 3, name: 'Todos los públicos', slug: 'todos-los-publicos' },
        access_type: { id: 1, name: 'Entrada libre', slug: 'entrada-libre', requires_url: false },
        event_type: { id: 1, name: 'Presencial', slug: 'presencial', disables_location: false },
        translations: [],
    },
];

beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
            status: 'success',
            data: { data: mockEvents },
        }),
    }));
});

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('EventList.astro', () => {
    it('renders section with id="eventos"', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(EventList);

        expect(html).toContain('id="eventos"');
        expect(html).toContain('Próximas actividades');
    });

    it('renders event cards from API data', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(EventList);

        expect(html).toContain('Conferencia eclipse solar');
        expect(html).toContain('Observación astronómica');
        expect(html).toContain('Observatorio Nacional');
        expect(html).toContain('Agrupación Astronómica');
    });

    it('event card with url shows "Más información" link', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(EventList);

        expect(html).toContain('Más información');
        expect(html).toContain('https://example.com/evento');
    });

    it('event card without url shows "Entrada libre"', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(EventList);

        expect(html).toContain('Entrada libre');
    });

    it('renders source citation before CTA', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(EventList);

        expect(html).toContain('Fuente:');
        expect(html).toContain('Divulgación Trio Eclipses');
    });

    it('renders CTA button to full calendar', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(EventList);

        expect(html).toContain('Ver calendario completo');
        expect(html).toContain('divulgacion.trioeclipses.es/eventos');
    });

    it('province is displayed in event card meta', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(EventList);

        expect(html).toContain('Madrid');
        expect(html).toContain('Barcelona');
    });

    it('fetches from correct API URL', async () => {
        const container = await AstroContainer.create();
        await container.renderToString(EventList);

        expect(fetch).toHaveBeenCalledWith(
            'https://divulgacion.trioeclipses.es/api/events?per_page=10',
        );
    });
});
