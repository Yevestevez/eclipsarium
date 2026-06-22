import { describe, expect, it } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import LocationPage, { getStaticPaths } from '../pages/location/[slug].astro';
import data from '../data/locations.json';

describe('[slug].astro', () => {
    it('getStaticPaths returns 29 paths', async () => {
        const paths = await getStaticPaths();
        expect(paths).toHaveLength(29);
    });

    it('getStaticPaths paths match all locations', async () => {
        const paths = await getStaticPaths();
        const slugs = paths.map((p) => p.params.slug).sort();
        const expected = data.places.map((p) => p.slug).sort();
        expect(slugs).toEqual(expected);
    });

    it('each path receives a place prop with matching slug', async () => {
        const paths = await getStaticPaths();
        paths.forEach((p) => {
            expect(p.props.place).toBeDefined();
            expect(p.props.place.slug).toBe(p.params.slug);
        });
    });

    it('renders city name for total place', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(LocationPage, {
            props: {
                place: {
                    city: 'A Coruña',
                    region: 'Galicia',
                    duration: '1m 48s',
                    contact: '18:28',
                    slug: 'a-coruna',
                    type: 'total',
                    lat: 43.37,
                    lng: -8.41,
                },
            },
        });

        expect(html).toContain('A Coruña');
        expect(html).toContain('Galicia');
        expect(html).toContain('1m 48s');
        expect(html).toContain('18:28');
        expect(html).toContain('Totalidad');
    });

    it('renders city name for edge place', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(LocationPage, {
            props: {
                place: {
                    city: 'Burgos',
                    region: 'Castilla y León',
                    duration: '1m 30s',
                    contact: '18:10',
                    slug: 'burgos',
                    type: 'edge',
                    lat: 42.34,
                    lng: -3.7,
                },
            },
        });

        expect(html).toContain('Burgos');
        expect(html).toContain('Borde');
        expect(html).toContain('Rozando');
    });

    it('renders city name for partial place', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(LocationPage, {
            props: {
                place: {
                    city: 'Madrid',
                    region: 'Comunidad de Madrid',
                    duration: '93%',
                    contact: '18:15',
                    slug: 'madrid',
                    type: 'partial',
                    lat: 40.42,
                    lng: -3.7,
                },
            },
        });

        expect(html).toContain('Madrid');
        expect(html).toContain('Parcial');
        expect(html).toContain('parcial');
    });

    it('renders back link to /#donde', async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(LocationPage, {
            props: {
                place: {
                    city: 'A Coruña',
                    region: 'Galicia',
                    duration: '1m 48s',
                    contact: '18:28',
                    slug: 'a-coruna',
                    type: 'total',
                    lat: 43.37,
                    lng: -8.41,
                },
            },
        });

        expect(html).toContain('href="/#donde"');
        expect(html).toContain('Volver al mapa');
    });
});
