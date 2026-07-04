import { describe, expect, it } from 'vitest';
import locations from './locations.json';
import ccaaEvents from './ccaa-events.json';

describe('locations.json', () => {
    it('U05: places is an array with exactly 29 items', () => {
        const { places } = locations;
        expect(Array.isArray(places)).toBe(true);
        expect(places).toHaveLength(29);
    });

    it('U06: each place has non-empty city, region, duration, contact, slug', () => {
        const { places } = locations;
        places.forEach((place) => {
            expect(typeof place.city).toBe('string');
            expect(place.city.trim().length).toBeGreaterThan(0);

            expect(typeof place.region).toBe('string');
            expect(place.region.trim().length).toBeGreaterThan(0);

            expect(typeof place.duration).toBe('string');
            expect(place.duration.trim().length).toBeGreaterThan(0);

            expect(typeof place.contact).toBe('string');
            expect(place.contact.trim().length).toBeGreaterThan(0);

            expect(typeof place.slug).toBe('string');
            expect(place.slug.trim().length).toBeGreaterThan(0);
        });
    });

    it('U07: each place has type total, edge, or partial', () => {
        const { places } = locations;
        places.forEach((place) => {
            expect(['total', 'edge', 'partial']).toContain(place.type);
        });
    });

    it('U08: at least one place of each type exists', () => {
        const types = locations.places.map((p) => p.type);
        expect(types.filter((t) => t === 'total').length).toBeGreaterThan(0);
        expect(types.filter((t) => t === 'edge').length).toBeGreaterThan(0);
        expect(types.filter((t) => t === 'partial').length).toBeGreaterThan(0);
    });

    it('U09: each place has valid lat/lng numbers', () => {
        const { places } = locations;
        places.forEach((place) => {
            expect(typeof place.lat).toBe('number');
            expect(typeof place.lng).toBe('number');
            expect(place.lat).toBeGreaterThanOrEqual(35);
            expect(place.lat).toBeLessThanOrEqual(50);
            expect(place.lng).toBeGreaterThanOrEqual(-12);
            expect(place.lng).toBeLessThanOrEqual(6);
        });
    });

    it('U10: every region in locations.json has matching CCAA entry in ccaa-events.json', () => {
        const regions = [...new Set(locations.places.map((p) => p.region))];
        const ccaaNames = ccaaEvents.map((c) => c.ccaa);
        const missing = regions.filter((r) => !ccaaNames.includes(r));
        expect(missing).toEqual([]);
    });

    it('U11: ccaa-events.json has all 12 regions', () => {
        expect(ccaaEvents).toHaveLength(12);
    });

    it('U12: each CCAA entry has required fields', () => {
        ccaaEvents.forEach((entry) => {
            expect(typeof entry.ccaa).toBe('string');
            expect(typeof entry.descripcion).toBe('string');
            expect(entry.descripcion.length).toBeGreaterThan(0);
            expect(typeof entry.enlace_oficial).toBe('string');
            expect(entry.enlace_oficial.startsWith('http')).toBe(true);
            expect(typeof entry.fuente).toBe('string');
            expect(entry.fuente.length).toBeGreaterThan(0);
            expect(Array.isArray(entry.puntos)).toBe(true);
            expect(entry.puntos.length).toBeGreaterThan(0);
            expect(Array.isArray(entry.eventos)).toBe(true);
        });
    });
});
