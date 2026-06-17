import { describe, expect, it } from 'vitest';
import locations from './locations.json';

describe('locations.json', () => {
    it('U05: places is an array with at least one item', () => {
        // GIVEN valid locations data
        const source = locations;

        // WHEN reading places
        const { places } = source;

        // THEN places contains at least one entry
        expect(Array.isArray(places)).toBe(true);
        expect(places.length).toBeGreaterThan(0);
    });

    it('U06: each place has non-empty city, region, duration, and contact', () => {
        // GIVEN valid locations data
        const source = locations;

        // WHEN iterating over places
        const { places } = source;

        // THEN each place has required non-empty string fields
        places.forEach((place) => {
            expect(typeof place.city).toBe('string');
            expect(place.city.trim().length).toBeGreaterThan(0);

            expect(typeof place.region).toBe('string');
            expect(place.region.trim().length).toBeGreaterThan(0);

            expect(typeof place.duration).toBe('string');
            expect(place.duration.trim().length).toBeGreaterThan(0);

            expect(typeof place.contact).toBe('string');
            expect(place.contact.trim().length).toBeGreaterThan(0);
        });
    });

    it('U07: totality is a boolean for every place', () => {
        // GIVEN valid locations data
        const source = locations;

        // WHEN checking each place
        const { places } = source;

        // THEN totality is always boolean
        places.forEach((place) => {
            expect(typeof place.totality).toBe('boolean');
        });
    });

    it('U08: at least one place has totality set to true', () => {
        // GIVEN valid locations data
        const source = locations;

        // WHEN filtering places by totality = true
        const totalPlaces = source.places.filter((place) => place.totality);

        // THEN at least one place is in totality
        expect(totalPlaces.length).toBeGreaterThan(0);
    });

    it('U09: at least one place has totality set to false', () => {
        // GIVEN valid locations data
        const source = locations;

        // WHEN filtering places by totality = false
        const partialPlaces = source.places.filter((place) => !place.totality);

        // THEN at least one place is partial
        expect(partialPlaces.length).toBeGreaterThan(0);
    });
});
