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

    it('renders CCAA observation points for matching region (Castilla y León)', async () => {
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
                    description: 'Test description',
                    bestSpots: [],
                    localEvents: [],
                    schedule: {
                        partialStart: '19:30',
                        partialEnd: '21:15',
                    },
                },
            },
        });

        expect(html).toContain('Puntos de observación en Castilla y León');
        expect(html).toContain('73 puntos');
        expect(html).toContain('Vinuesa (Soria)');
        expect(html).toContain('1m 42s');
        expect(html).toContain('Iberia Eclipse Festival');
        expect(html).toContain('Fuente:');
        expect(html).toContain('Patrimonio Activo CyL');
    });

    it('renders CCAA observation points for Comunidad de Madrid', async () => {
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
                    description: 'Test description',
                    bestSpots: [],
                    localEvents: [],
                    schedule: {
                        partialStart: '19:30',
                        partialEnd: '21:15',
                    },
                },
            },
        });

        expect(html).toContain('Puntos de observación en Comunidad de Madrid');
        expect(html).toContain('Somosierra');
        expect(html).toContain('1m 29s');
        expect(html).toContain('11 puntos');
        expect(html).toContain('34 de información');
    });

    it('does not render CCAA section for region without CCAA data', async () => {
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

        expect(html).not.toContain('Puntos de observación en Galicia');
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
