import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Table from ".";

describe("Table component", () => {
  it("should render with correct data", () => {
    render(
      <Table
        columns={[{ name: "name", label: "Name" }]}
        rows={[{ name: "John" }, { name: "Marcelo" }]}
        keyExtractor={(row) => row.name}
        currentPage={1}
        totalItems={1}
      />
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Marcelo")).toBeInTheDocument();
    expect(screen.getByText(/current page: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/total items: 1/i)).toBeInTheDocument();
  });

  it('should change page when "Next" button is clicked', () => {
    const handleClickNext = jest.fn();
    const mockRows = Array.from({ length: 20 }, (_, i) => ({
      name: `Marcelo ${i}`,
    }));

    render(
      <Table
        columns={[{ name: "name", label: "Name" }]}
        rows={mockRows}
        keyExtractor={(row) => row.name}
        currentPage={1}
        totalItems={15}
        onClickNextPage={handleClickNext}
      />
    );

    fireEvent.click(screen.getByText(/next/i));
    expect(handleClickNext).toHaveBeenCalled();
  });

  it('should change page when "Previous" button is clicked', () => {
    const handleClickPrevious = jest.fn();
    const mockRows = Array.from({ length: 20 }, (_, i) => ({
      name: `Marcelo ${i}`,
    }));

    render(
      <Table
        columns={[{ name: "name", label: "Name" }]}
        rows={mockRows}
        keyExtractor={(row) => row.name}
        currentPage={2}
        totalItems={20}
        onClickPreviousPage={handleClickPrevious}
      />
    );

    fireEvent.click(screen.getByText(/previous/i));
    expect(handleClickPrevious).toHaveBeenCalled();
  });
});
