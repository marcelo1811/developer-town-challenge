import { renderHook, act } from "@testing-library/react-hooks";
import useFetch from ".";

describe("useFetch", () => {
  let originalFetch: any;

  beforeEach(() => {
    originalFetch = { ...global.fetch };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve("success"),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
    global.fetch = originalFetch;
  });

  it("should return data on success", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch<string>("https://example.com")
    );

    await waitForNextUpdate();

    expect(result.current.data).toBe("success");
    expect(result.current.error).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  it("should return error true on failure", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve("error"),
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch<string>("https://example.com/error")
    );

    await waitForNextUpdate();

    expect(result.current.error).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
  });
});
