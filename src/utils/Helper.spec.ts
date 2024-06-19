import { describe, expect, it } from "@jest/globals";
import { getRandom, shuffleArray } from "./Helper";

describe("getRandom", () => {
    it("should return a number within the specified range", () => {
        const min = 1;
        const max = 10;
        for (let i = 0; i < 100; i++) {
            // Run the test multiple times to cover randomness
            const result = getRandom(min, max);
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        }
    });

    it("should return the min value when min and max are the same", () => {
        const minMax = 5;
        const result = getRandom(minMax, minMax);
        expect(result).toBe(minMax);
    });

    it("should return min when max is just one greater than min", () => {
        const min = 3;
        const max = 4;
        const result = getRandom(min, max);
        expect([min, max]).toContain(result);
    });
});

describe("shuffleArray", () => {
    it("should return an array of the same length", () => {
        const array = [1, 2, 3, 4, 5];
        const shuffled = shuffleArray(array);
        expect(shuffled.length).toBe(array.length);
    });

    it("should return an array with the same elements", () => {
        const array = [1, 2, 3, 4, 5];
        const shuffled = shuffleArray(array);
        expect(shuffled.sort()).toEqual(array.sort());
    });

    it("should not return the same array instance", () => {
        const array = [1, 2, 3, 4, 5];
        const shuffled = shuffleArray(array);
        expect(shuffled).not.toBe(array);
    });

    it("should handle an empty array", () => {
        const array: number[] = [];
        const shuffled = shuffleArray(array);
        expect(shuffled).toEqual([]);
    });

    it("should handle an array with one element", () => {
        const array = [1];
        const shuffled = shuffleArray(array);
        expect(shuffled).toEqual([1]);
    });

    it("should shuffle the array (non-deterministic check)", () => {
        const array = [1, 2, 3, 4, 5];
        let shuffleCount = 0;
        for (let i = 0; i < 1000; i++) {
            const shuffled = shuffleArray(array);
            if (shuffled.join("") !== array.join("")) {
                shuffleCount++;
                break;
            }
        }
        expect(shuffleCount).toBeGreaterThan(0); // The array should be shuffled at least once in 1000 attempts
    });
});
