import { describe, expect, it } from 'vitest';
import events from './events-fallback.json';

describe('events-fallback.json', () => {
    it('U01: is an array with at least 1 event', () => {
        expect(Array.isArray(events)).toBe(true);
        expect(events.length).toBeGreaterThan(0);
    });

    it('U02: each event has required fields', () => {
        events.forEach((e, i) => {
            expect(typeof e.title).toBe('string');
            expect(e.title.trim().length).toBeGreaterThan(0);
            expect(typeof e.date).toBe('string');
            expect(e.date).toMatch(/^\d{4}-\d{2}-\d{2}T/);
            expect(typeof e.address).toBe('string');
            expect(typeof e.category).toBe('string');
            expect(typeof e.institution).toBe('string');
        });
    });

    it('U03: each event has a valid date string', () => {
        events.forEach((e) => {
            const d = new Date(e.date);
            expect(d instanceof Date && !isNaN(d.getTime())).toBe(true);
        });
    });
});
