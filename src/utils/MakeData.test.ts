import { MakeData } from "./MakeData";
import { getRandom } from "./Helper";

jest.mock("./Names.json", () => ({
    data: ["John", "Jane", "Doe"]
}));

jest.mock("./Helper", () => ({
    getRandom: jest.fn()
}));

describe("MakeData", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("newPerson generates a person with valid properties", () => {
        (getRandom as jest.Mock)
            .mockReturnValueOnce(0) // firstName
            .mockReturnValueOnce(1) // lastName
            .mockReturnValueOnce(25) // age
            .mockReturnValueOnce(500) // visits
            .mockReturnValueOnce(50) // progress
            .mockReturnValueOnce(2); // status ("single")

        const { firstName, lastName, age, visits, progress, status } = MakeData(1)[0];

        expect(firstName).toBe("John");
        expect(lastName).toBe("Jane");
        expect(age).toBe(25);
        expect(visits).toBe(500);
        expect(progress).toBe(50);
        expect(status).toBe("single");
    });

    test("MakeData generates correct number of persons and nested subRows", () => {
        (getRandom as jest.Mock).mockReturnValue(0); // Mock all random calls to return 0 for simplicity

        const data = MakeData(2, 3); // Create a dataset with 2 top-level persons, each having 3 subRows

        expect(data).toHaveLength(2);
        data.forEach((person) => {
            expect(person.subRows).toHaveLength(3);
            person.subRows!.forEach((subRow) => {
                expect(subRow.subRows).toBeUndefined(); // No deeper levels
            });
        });
    });
});
