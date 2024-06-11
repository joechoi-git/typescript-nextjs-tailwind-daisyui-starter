import Names from "./Names.json";
import { getRandom } from "./Helper";

export type Person = {
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    progress: number;
    status: "relationship" | "complicated" | "single";
    subRows?: Person[];
};

const newPerson = (): Person => {
    return {
        firstName: Names.data[getRandom(0, Names.data.length - 1)],
        lastName: Names.data[getRandom(0, Names.data.length - 1)],
        age: getRandom(1, 100),
        visits: getRandom(0, 1000),
        progress: getRandom(0, 100),
        status: ["relationship", "complicated", "single"][getRandom(0, 3)] as Person["status"]
    };
};

export function MakeData(...lens: number[]) {
    const buildArray = (len: number): number[] => {
        const arr: number[] = [];
        for (let i = 0; i < len; i++) {
            arr.push(i);
        }
        return arr;
    };

    const makeDataLevel = (depth = 0): Person[] => {
        const len = lens[depth]!;
        return buildArray(len).map((): Person => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
            };
        });
    };

    return makeDataLevel();
}
