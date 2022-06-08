import { act, renderHook } from "@testing-library/react-hooks";
import useStarships from ".";

describe("useStarships hook", () => {
  beforeEach(() => {});

  afterEach(() => {});

  it("should return values", async () => {
    const { result } = renderHook(() => useStarships());

    expect(result.current.starships).toStrictEqual([]);
    expect(result.current.handleChangeSelectedManufacturer).toBeDefined();
    expect(result.current.selectedManufacturer).toBe("");
    expect(result.current.starshipManufacturers).toStrictEqual([]);
    expect(result.current.handleClickNextPage).toBeDefined();
    expect(result.current.handleClickPreviousPage).toBeDefined();
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.error).toBe(false);
    expect(result.current.loading).toBe(true);
  });

  it("should change selectManufacturer on handleChangeSelectedManufacturer", async () => {
    const { result } = renderHook(() => useStarships());

    act(() => {
      result.current.handleChangeSelectedManufacturer("test");
    });
    expect(result.current.selectedManufacturer).toBe("test");
  });

  it("should change to next page on handleClickNextPage", async () => {
    const { result } = renderHook(() => useStarships());

    act(() => {
      result.current.handleClickNextPage();
    });
    expect(result.current.currentPage).toBe(2);
  });

  it("should change to previous page on handleClickPreviousPage", async () => {
    const { result } = renderHook(() => useStarships(2));

    act(() => {
      result.current.handleClickPreviousPage();
    });
    expect(result.current.currentPage).toBe(1);
  });
});
