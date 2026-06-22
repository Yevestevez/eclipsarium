import { describe, expect, it } from 'vitest';
import data from './activities.json';

describe('activities.json', () => {
    it('U10: activities is an array with exactly 6 items', () => {
        const { activities } = data;
        expect(Array.isArray(activities)).toBe(true);
        expect(activities).toHaveLength(6);
    });

    it('U11: each activity has required string fields', () => {
        const { activities } = data;
        activities.forEach((a) => {
            expect(typeof a.id).toBe('string');
            expect(a.id.trim().length).toBeGreaterThan(0);

            expect(typeof a.title).toBe('string');
            expect(a.title.trim().length).toBeGreaterThan(0);

            expect(typeof a.subtitle).toBe('string');
            expect(a.subtitle.trim().length).toBeGreaterThan(0);

            expect(typeof a.age).toBe('string');
            expect(typeof a.time).toBe('string');

            expect(typeof a.explain).toBe('string');
            expect(a.explain.trim().length).toBeGreaterThan(0);
        });
    });

    it('U12: each activity has materials array (≥1 item) and steps array (≥2 items)', () => {
        const { activities } = data;
        activities.forEach((a) => {
            expect(Array.isArray(a.materials)).toBe(true);
            expect(a.materials.length).toBeGreaterThanOrEqual(2);

            expect(Array.isArray(a.steps)).toBe(true);
            expect(a.steps.length).toBeGreaterThanOrEqual(2);
        });
    });

    it('U13: quiz is an array with exactly 5 items', () => {
        const { quiz } = data;
        expect(Array.isArray(quiz)).toBe(true);
        expect(quiz).toHaveLength(5);
    });

    it('U14: each quiz item has valid fields', () => {
        const { quiz } = data;
        quiz.forEach((q) => {
            expect(typeof q.id).toBe('string');
            expect(q.id.trim().length).toBeGreaterThan(0);

            expect(typeof q.question).toBe('string');
            expect(q.question.trim().length).toBeGreaterThan(0);

            expect(typeof q.answer).toBe('boolean');

            expect(typeof q.explain).toBe('string');
            expect(q.explain.trim().length).toBeGreaterThan(0);
        });
    });

    it('U15: each activity has source with non-empty name and url', () => {
        const { activities } = data;
        activities.forEach((a) => {
            expect(a.source).toBeDefined();
            expect(typeof a.source.name).toBe('string');
            expect(a.source.name.trim().length).toBeGreaterThan(0);
            expect(typeof a.source.url).toBe('string');
            expect(a.source.url.trim().length).toBeGreaterThan(0);
        });
    });
});
