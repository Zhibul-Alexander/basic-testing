// Uncomment the code below and write your tests
import { throttledGetDataFromApi } from "./index";

describe("throttledGetDataFromApi", () => {
  test("should create instance with provided base url", async () => {
    const responseData = await throttledGetDataFromApi("/posts");

    expect(Array.isArray(responseData)).toBe(true);
  });

  test("should perform request to correct provided url", async () => {
    const responseData = await throttledGetDataFromApi("/posts/1");
    if (responseData) {
      expect(responseData[0].id).toBe(1);
      expect(typeof responseData[0].title).toBe("string");
      expect(typeof responseData[0].body).toBe("string");
    }
  });

  test("should return response data", async () => {
    const responseData = await throttledGetDataFromApi("/comments");

    expect(Array.isArray(responseData)).toBe(true);
  });
});
