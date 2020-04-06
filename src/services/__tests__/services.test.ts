import { load } from "../load"

jest.mock("axios");
const axiosMock: any = require("axios");

describe("Test async services", () => {
    it("Test news load function", () => {
        const data = { data: [1, 2, 3] };

        axiosMock.get.mockImplementationOnce(() => Promise.resolve(data));

        return load({
            onSuccess: (data) => expect(data).toHaveLength(3)
        })
    })
})