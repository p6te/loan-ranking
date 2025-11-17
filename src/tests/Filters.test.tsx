import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";

vi.mock("../components/StepperWithRange", () => {
  return {
    StepperWithRange: (props: any) => {
      return (
        <div data-testid={`stepper-${props.id}`}>
          <button
            data-testid={`stepper-btn-${props.id}`}
            onClick={() => props.onChange(props.min ?? 0)}
          >
            mock-change
          </button>
        </div>
      );
    },
  };
});

import { Filters } from "../components/Filters";

describe("Filters component", () => {
  let setAmount: (n: number) => void;
  let setPeriod: (n: number) => void;
  let setTags: (tags: string[]) => void;

  beforeEach(() => {
    setAmount = vi.fn() as unknown as (n: number) => void;
    setPeriod = vi.fn() as unknown as (n: number) => void;
    setTags = vi.fn() as unknown as (tags: string[]) => void;
  });

  const renderFilters = (overrideProps = {}) => {
    const props = {
      amount: 5000,
      period: 12,
      tags: [],
      allTags: ["Online", "0% RRSO", "Szybka decyzja"],
      setAmount,
      setPeriod,
      setTags,
      ...overrideProps,
    };

    return render(<Filters {...props} />);
  };

  it("renders header and tag buttons", () => {
    renderFilters();

    expect(screen.getByText(/Dopasuj najlepszą ofertę/i)).toBeInTheDocument();

    ["Online", "0% RRSO", "Szybka decyzja"].forEach((t) => {
      expect(
        screen.getByRole("button", { name: new RegExp(t, "i") }),
      ).toBeInTheDocument();
    });
  });

  it("toggles tag: clicking unselected tag adds it (calls setTags)", () => {
    const props = {
      amount: 500,
      period: 12,
      tags: ["Online"],
      allTags: ["Online", "Ratalna", "Szybka decyzja"],
      setAmount,
      setPeriod,
      setTags,
    };

    render(<Filters {...props} />);

    const ratalnaBtn = screen.getByRole("button", { name: /ratalna/i });
    fireEvent.click(ratalnaBtn);

    expect(setTags).toHaveBeenCalledTimes(1);
    expect(setTags).toHaveBeenCalledWith(
      expect.arrayContaining(["Online", "Ratalna"]),
    );
  });

  it("toggles tag: clicking selected tag removes it (calls setTags with filtered array)", () => {
    const props = {
      amount: 500,
      period: 12,
      tags: ["Online", "Ratalna"],
      allTags: ["Online", "Ratalna", "Szybka decyzja"],
      setAmount,
      setPeriod,
      setTags,
    };

    render(<Filters {...props} />);

    const onlineBtn = screen.getByRole("button", { name: /online/i });
    fireEvent.click(onlineBtn);

    expect(setTags).toHaveBeenCalledTimes(1);
    expect(setTags).toHaveBeenCalledWith(["Ratalna"]);
  });

  it("stepper amount mock triggers setAmount and stepper period triggers setPeriod", () => {
    renderFilters({ amount: 1000, period: 12, allTags: ["a", "b"] });

    const stepperAmountBtn = screen.getByTestId("stepper-btn-amount");
    fireEvent.click(stepperAmountBtn);

    expect(setAmount).toHaveBeenCalledTimes(1);
    expect(setAmount).toHaveBeenCalledWith(200);

    const stepperPeriodBtn = screen.getByTestId("stepper-btn-period");
    fireEvent.click(stepperPeriodBtn);

    expect(setPeriod).toHaveBeenCalledTimes(1);
    expect(setPeriod).toHaveBeenCalledWith(1);
  });
});
