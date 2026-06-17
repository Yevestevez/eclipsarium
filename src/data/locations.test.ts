import { describe, expect, it } from 'vitest';
import locations from './locations.json';

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
});
