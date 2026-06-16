import { describe, expect, it } from 'vitest';
import event from './event.json';

describe('event.json', () => {
    it('U01: date exists and matches YYYY-MM-DD format', () => {
        // GIVEN valid event data
        const source = event;

        // WHEN reading the date field
        const { date } = source;

        // THEN date is a string with YYYY-MM-DD format
        expect(typeof date).toBe('string');
        expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('U02: dateLabel, type, and intro are non-empty strings', () => {
        // GIVEN valid event data
        const source = event;

        // WHEN reading text fields
        const { dateLabel, type, intro } = source;

        // THEN each required text field is a non-empty string
        expect(typeof dateLabel).toBe('string');
        expect(dateLabel.trim().length).toBeGreaterThan(0);

        expect(typeof type).toBe('string');
        expect(type.trim().length).toBeGreaterThan(0);

        expect(typeof intro).toBe('string');
        expect(intro.trim().length).toBeGreaterThan(0);
    });

    it('U03: facts is an array with exactly 4 items', () => {
        // GIVEN valid event data
        const source = event;

        // WHEN reading facts
        const { facts } = source;

        // THEN facts has exactly 4 entries
        expect(Array.isArray(facts)).toBe(true);
        expect(facts).toHaveLength(4);
    });

    it('U04: each fact has non-empty label, value, and note', () => {
        // GIVEN valid event data
        const source = event;

        // WHEN iterating over facts
        const { facts } = source;

        // THEN each fact includes non-empty required fields
        facts.forEach((fact) => {
            expect(typeof fact.label).toBe('string');
            expect(fact.label.trim().length).toBeGreaterThan(0);

            expect(typeof fact.value).toBe('string');
            expect(fact.value.trim().length).toBeGreaterThan(0);

            expect(typeof fact.note).toBe('string');
            expect(fact.note.trim().length).toBeGreaterThan(0);
        });
    });
});
