import { sortObjects } from "../sortObjects";

describe("Test utils functions", () => {
    it("Test sort objects function", () => {
        const unsorted = [{ id: 1 }, { id: 3 }, { id: 2 }];
        const sorted = [{ id: 1 }, { id: 2 }, { id: 3 }];

        expect(sortObjects(unsorted, "id")).toEqual(sorted);
    });
});