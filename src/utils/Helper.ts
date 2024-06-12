export const getRandom = (min: number, max: number): number => {
    const floatRandom = Math.random();
    const difference = max - min;
    const random = Math.round(difference * floatRandom);
    const randomWithinRange = random + min;
    return randomWithinRange;
};

/**
 * Randomizes (shuffles) the items of an array.
 * @param array - The array to shuffle.
 * @returns The shuffled array.
 */
export function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array]; // Create a copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Get a random index from 0 to i
        // Swap elements at indices i and j
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}
