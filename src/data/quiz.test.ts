import { describe, expect, it } from 'vitest';
import data from './quiz.json';

describe('quiz.json', () => {
    const { quiz } = data;

    it('quiz has 12 questions', () => {
        expect(Array.isArray(quiz)).toBe(true);
        expect(quiz.length).toBe(12);
    });

    it('each question has required fields', () => {
        quiz.forEach((q) => {
            expect(q.id).toBeTruthy();
            expect(typeof q.id).toBe('string');
            expect(q.category).toBeTruthy();
            expect(typeof q.category).toBe('string');
            expect(q.question).toBeTruthy();
            expect(typeof q.question).toBe('string');
            expect(typeof q.answer).toBe('boolean');
            expect(q.explain).toBeTruthy();
            expect(typeof q.explain).toBe('string');
        });
    });

    it('each question id is unique', () => {
        const ids = quiz.map((q) => q.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('questions belong to valid categories', () => {
        const valid = ['Eclipses', 'Sistema Solar', 'Mitos', 'Curiosidades'];
        quiz.forEach((q) => {
            expect(valid).toContain(q.category);
        });
    });

    it('has at least 2 questions per category', () => {
        const cats = quiz.map((q) => q.category);
        const counts: Record<string, number> = {};
        cats.forEach((c) => {
            counts[c] = (counts[c] || 0) + 1;
        });
        Object.entries(counts).forEach(([cat, n]) => {
            expect(
                n,
                `category "${cat}" has ${n} questions (min 2)`,
            ).toBeGreaterThanOrEqual(2);
        });
    });
});
