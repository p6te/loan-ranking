import React, { useMemo } from "react";
import { StepperWithRange } from "./StepperWithRange";

type Props = {
  amount: number;
  period: number;
  tags: string[];
  allTags: string[];
  setAmount: (n: number) => void;
  setPeriod: (p: number) => void;
  setTags: (tags: string[]) => void;
  loading?: boolean;
};

export const Filters: React.FC<Props> = ({
  amount,
  period,
  tags,
  allTags,
  setAmount,
  setPeriod,
  setTags,
  loading,
}) => {
  const amountStep = useMemo(() => {
    if (amount < 5000) {
      return 100;
    } else if (amount < 10000) {
      return 200;
    } else if (amount < 50000) {
      return 500;
    } else {
      return 1000;
    }
  }, [amount]);

  const toggleTag = (tag: string) => {
    setTags(
      tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag],
    );
  };

  return (
    <div className="bg-background-component  p-4 rounded-xl shadow-sm mb-6 border border-primary">
      <div className="flex flex-col md:flex-row justify-between gap-8 lg:gap-32 md:gap-16">
        <h2 className="text-2xl font-semibold md:mb-8 mt-3">
          Dopasuj najlepszą ofertę
        </h2>
        <div className="flex flex-col gap-6 flex-1">
          <StepperWithRange
            id="amount"
            label="Kwota (zł)"
            value={amount}
            min={200}
            step={amountStep}
            onChange={setAmount}
            roundValue={100}
          />

          <StepperWithRange
            id="period"
            label="Okres (mies.)"
            value={period}
            min={1}
            max={60}
            step={1}
            onChange={setPeriod}
            withRange
            roundValue={1}
          />
        </div>
      </div>
      <div className="md:col-span-2">
        <label className="text-sm font-medium ">Filtry</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {!loading ? (
            allTags.map((tag) => {
              const isSelected = tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full cursor-pointer border text-sm outline-none transition-shadow
    ${
      isSelected
        ? "bg-secondary text-white border-secondary hover:bg-secondary-hover"
        : "bg-background border-primary-hover hover:border-secondary"
    }`}
                  aria-pressed={isSelected}
                  aria-label={`${isSelected ? "Usuń" : "Dodaj"} tag ${tag}`}
                >
                  {tag}
                </button>
              );
            })
          ) : (
            <>
              {Array.from({ length: 10 }).map((_, i) => {
                const width = Math.max(
                  Math.min(Math.floor(Math.random() * 100 * 1.5), 130),
                  90,
                );

                return (
                  <div
                    key={i}
                    style={{ width: `${width}px` }}
                    className="h-[30px] rounded-full bg-gray-200 animate-pulse"
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
