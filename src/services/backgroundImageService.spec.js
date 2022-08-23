import { getImageFromBing } from "./backgroundImageService";
import * as localStorageService from "./localStorageService";

import axios from "axios";

jest.mock("axios");
jest.mock("./localStorageService");

axios.get = jest.fn();

const mockedBackgroundReturn = {
    data: {
        startDate: "20220823",
        endDate: "20220824",
        url: "https://www.bing.com",
    },
};

describe("backgroundImageService", () => {
    test("fetch if localStorage is empty", () => {
        localStorageService.getItem.mockResolvedValue(null);
        axios.get.mockResolvedValue(mockedBackgroundReturn);

        return getImageFromBing().then((data) => {
            expect(data).toEqual("https://www.bing.com");
        });
    });

    test("fetch if localStorage endDate has already gone", () => {
        localStorageService.getItem.mockResolvedValue(
            JSON.stringify(
                Object.assign({}, mockedBackgroundReturn.data, {
                    endDate: "19990101",
                })
            )
        );

        axios.get.mockResolvedValue(
            Object.assign({}, mockedBackgroundReturn, {
                data: { url: "https://www.google.com" },
            })
        );

        return getImageFromBing().then((data) => {
            expect(data).toEqual("https://www.google.com");
        });
    });

    test("fetch if localStorage endDate is not over", () => {
        localStorageService.getItem.mockResolvedValue(
            JSON.stringify(mockedBackgroundReturn.data)
        );

        return getImageFromBing().then((data) => {
            expect(data).toEqual(mockedBackgroundReturn.data.url);
        });
    });
});
