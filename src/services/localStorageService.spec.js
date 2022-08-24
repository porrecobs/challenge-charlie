import * as localStorageService from "./localStorageService";

jest.spyOn(Storage.prototype, "getItem");
jest.spyOn(Storage.prototype, "setItem");

Storage.prototype.getItem = jest.fn();
Storage.prototype.setItem = jest.fn();

describe("localStorageService", () => {
    test("getItem", () => {
        Storage.prototype.getItem.mockReturnValue('"value"');

        const result = localStorageService.getItem("teste");

        expect(result).toEqual("value");
    });
});
