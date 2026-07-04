import { describe, expect, it } from 'vitest';
import data from './festivals.json';

describe('festivals.json', () => {
    it('U16: festivals is an array with exactly 11 items', () => {
        const { festivals } = data;
        expect(Array.isArray(festivals)).toBe(true);
        expect(festivals).toHaveLength(11);
    });

    it('U17: each festival has required string fields', () => {
        const { festivals } = data;
        festivals.forEach((f) => {
            expect(typeof f.id).toBe('string');
            expect(f.id.trim().length).toBeGreaterThan(0);
            expect(typeof f.name).toBe('string');
            expect(f.name.trim().length).toBeGreaterThan(0);
            expect(typeof f.date).toBe('string');
            expect(f.date.trim().length).toBeGreaterThan(0);
            expect(typeof f.location).toBe('string');
            expect(f.location.trim().length).toBeGreaterThan(0);
            expect(typeof f.ccaa).toBe('string');
            expect(f.ccaa.trim().length).toBeGreaterThan(0);
            expect(typeof f.description).toBe('string');
            expect(f.description.trim().length).toBeGreaterThan(10);
            expect(typeof f.url).toBe('string');
            expect(f.url.startsWith('http')).toBe(true);
        });
    });

    it('U18: each festival has valid type', () => {
        const { festivals } = data;
        const validTypes = ['festival', 'tour', 'observacion'];
        festivals.forEach((f) => {
            expect(validTypes).toContain(f.type);
        });
    });

    it('U19: each festival has highlights array with at least 1 item', () => {
        const { festivals } = data;
        festivals.forEach((f) => {
            expect(Array.isArray(f.highlights)).toBe(true);
            expect(f.highlights.length).toBeGreaterThanOrEqual(1);
            f.highlights.forEach((h: string) => {
                expect(typeof h).toBe('string');
                expect(h.trim().length).toBeGreaterThan(0);
            });
        });
    });

    it('U20: contains at least 5 festivals, 2 tours, and 2 observaciones', () => {
        const { festivals } = data;
        expect(festivals.filter((f) => f.type === 'festival').length).toBeGreaterThanOrEqual(5);
        expect(festivals.filter((f) => f.type === 'tour').length).toBeGreaterThanOrEqual(2);
        expect(festivals.filter((f) => f.type === 'observacion').length).toBeGreaterThanOrEqual(2);
    });
});