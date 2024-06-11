import names from "../sample/Names.json";

export type Person = {
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    progress: number;
    status: "relationship" | "complicated" | "single";
    subRows?: Person[];
};

const range = (len: number) => {
    const arr: number[] = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const getRandom = (min: number, max: number): number => {
    const floatRandom = Math.random();
    const difference = max - min;
    const random = Math.round(difference * floatRandom);
    const randomWithinRange = random + min;
    return randomWithinRange;
};

const newPerson = (): Person => {
    return {
        firstName: names.data[getRandom(0, names.data.length)],
        lastName: names.data[getRandom(0, names.data.length)],
        age: getRandom(0, 100),
        visits: getRandom(0, 1000),
        progress: getRandom(0, 100),
        status: ["relationship", "complicated", "single"][getRandom(0, 3)] as Person["status"]
    };
};

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): Person[] => {
        const len = lens[depth]!;
        return range(len).map((): Person => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
            };
        });
    };

    return makeDataLevel();
}
