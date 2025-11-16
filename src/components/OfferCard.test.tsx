import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../assets/icons/arrow.svg?react", () => {
  return {
    default: (props: any) => <svg data-testid="arrow-icon" {...props} />,
  };
});

vi.mock("./OfferDetaiils", () => {
  return {
    default: (props: any) => (
      <div data-testid={`offer-detail-${props.name}`}>{props.value}</div>
    ),
  };
});

vi.mock("../hooks/useMediaQuery", () => {
  return {
    screens: { sm: 640 },
    useMediaQuery: (_q: any) => false,
  };
});

vi.mock("../lib/logEvent", () => {
  return {
    logEvent: vi.fn(),
  };
});

import { OfferCard } from "./OfferCard";
import type { Offer } from "../types";
import { logEvent } from "../lib/logEvent";

const logEventMock = vi.mocked(logEvent);

beforeEach(() => {
  vi.clearAllMocks();

  if (typeof window !== "undefined" && typeof window.alert === "function") {
    vi.spyOn(window, "alert").mockImplementation(() => {});
  } else {
    (globalThis as any).alert = vi.fn();
  }

  try {
    localStorage.clear();
  } catch {}
});

describe("OfferCard (mocked logEvent)", () => {
  const sampleOffer: Offer = {
    id: "abc123",
    name: "TestLoan",
    logo: "https://example.com/logo.png",
    apr: 49.5,
    minAmount: 200,
    maxAmount: 5000,
    minPeriod: 1,
    maxPeriod: 12,
    decision: "online",
    tags: ["chwilówka", "online"],
    rating: 85,
  };

  it("renders core fields and CTA", () => {
    render(<OfferCard offer={sampleOffer} number={1} />);

    expect(screen.getByText(/TestLoan/i)).toBeInTheDocument();

    expect(screen.getByTestId("offer-detail-RRSO")).toBeInTheDocument();
    expect(screen.getByTestId("offer-detail-Kwota")).toBeInTheDocument();

    const ctas = screen.getAllByText(/Sprawdź ofertę/i);
    expect(ctas.length).toBeGreaterThan(0);
  });

  it("calls logEvent with cta_click when CTA clicked", () => {
    render(<OfferCard offer={sampleOffer} number={2} />);

    const cta = screen.getAllByText(/Sprawdź ofertę/i)[0];
    fireEvent.click(cta);

    expect(logEventMock).toHaveBeenCalledTimes(1);
    expect(logEventMock).toHaveBeenCalledWith("cta_click", {
      id: sampleOffer.id,
      name: sampleOffer.name,
    });
  });

  it("calls logEvent with expand_offer when details toggled", () => {
    render(<OfferCard offer={sampleOffer} number={3} />);

    const toggle = screen.getByText(/Pokaż szczegóły/i);
    fireEvent.click(toggle);

    expect(logEventMock).toHaveBeenCalledTimes(1);
    expect(logEventMock).toHaveBeenCalledWith("expand_offer", {
      id: sampleOffer.id,
    });
  });

  it("rotates arrow icon on toggle and logs expand_offer twice", () => {
    render(<OfferCard offer={sampleOffer} number={4} />);

    const toggle = screen.getByText(/Pokaż szczegóły/i);
    const arrow = screen.getByTestId("arrow-icon");

    expect(arrow.className).not.toContain("rotate-180");

    fireEvent.click(toggle);
    expect(arrow.className).toContain("rotate-180");
    expect(logEventMock).toHaveBeenCalledWith("expand_offer", {
      id: sampleOffer.id,
    });

    fireEvent.click(toggle);
    expect(arrow.className).not.toContain("rotate-180");
    expect(logEventMock).toHaveBeenCalledTimes(2);
  });
});
