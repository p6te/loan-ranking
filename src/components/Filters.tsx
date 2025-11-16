import React from "react";
import { StepperWithRange } from "./StepperWithRange";

type Props = {
  amount: number;
  period: number;
  tags: string[];
  allTags: string[];
  setAmount: (n: number) => void;
  setPeriod: (p: number) => void;
  setTags: (tags: string[]) => void;
  limits: {
    AMOUNT_MIN: number;

    AMOUNT_MAX: number;

    PERIOD_MIN: number;
    PERIOD_MAX: number;
  };
};

export const Filters: React.FC<Props> = ({
  amount,
  period,
  tags,
  allTags,
  setAmount,
  setPeriod,
  setTags,
  limits = {
    AMOUNT_MAX: 150000,
    AMOUNT_MIN: 100,
    PERIOD_MAX: 60,
    PERIOD_MIN: 1,
  },
}) => {
  const { AMOUNT_MAX, AMOUNT_MIN, PERIOD_MAX, PERIOD_MIN } = limits;
  const AMOUNT_STEP = 100;

  const toggleTag = (tag: string) => {
    setTags(
      tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag],
    );
  };

  return (
    <div className="bg-background-component component-shadow p-4 rounded-xl shadow-sm mb-6 border border-primary">
      <h2 className="text-lg font-semibold mb-8">Dopasuj najlepszą ofertę</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StepperWithRange
          id="amount"
          label="Kwota (zł)"
          value={amount}
          min={AMOUNT_MIN}
          max={AMOUNT_MAX}
          step={AMOUNT_STEP}
          onChange={setAmount}
        />

        <StepperWithRange
          id="period"
          label="Okres (mies.)"
          value={period}
          min={PERIOD_MIN}
          max={PERIOD_MAX}
          step={1}
          onChange={setPeriod}
        />

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-600">Filtry</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {allTags.map((tag) => {
              const isSelected = tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full cursor-pointer border text-sm outline-none
    focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-1 transition-shadow
    ${
      isSelected
        ? "bg-secondary text-white border-secondary hover:bg-secondary-hover"
        : "bg-background text-gray-800 border-primary-hover hover:border-secondary"
    }`}
                  aria-pressed={isSelected}
                  aria-label={`${isSelected ? "Usuń" : "Dodaj"} tag ${tag}`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
