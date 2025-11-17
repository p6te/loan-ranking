import { SortBy } from "../types";

interface SorterProps {
  sort: SortBy;
  setSort: (e: SortBy) => void;
  loading: boolean;
  error: string | null;
  offersNumber: number;
}

export const Sorter = ({
  sort,
  setSort,
  error,
  loading,
  offersNumber,
}: SorterProps) => {
  return (
    <div
      className="flex flex-col md:flex-row md:items-center mb-4 gap-3 justify-between mx-3"
      role="region"
      aria-label="Sortowanie ofert"
    >
      <div className="flex items-center h-7">
        <span className="text mr-2">Liczba znalezionych ofert:</span>

        {loading ? (
          <span
            className="inline-block w-6 h-6 rounded-md bg-gray-300 animate-pulse"
            aria-hidden="true"
          />
        ) : (
          <strong
            className="inline-block text-xl font-bold"
            aria-live="polite"
            aria-atomic="true"
          >
            {error ? "0" : offersNumber}
          </strong>
        )}
      </div>

      <div className="flex items-center gap-3" aria-labelledby="sorter-label">
        <span id="sorter-label" className="sr-only">
          Sortuj
        </span>

        <div
          role="radiogroup"
          aria-label="Sortowanie ofert"
          className="flex gap-3"
        >
          <button
            type="button"
            role="radio"
            aria-checked={sort === SortBy.apr}
            aria-label="Sortuj: RRSO rosnąco"
            onClick={() => setSort(SortBy.apr)}
            disabled={loading}
            className={`px-3 py-1 rounded-3xl border-2 cursor-pointer bg-background ${
              sort === SortBy.apr ? "border-secondary" : "border-primary-hover"
            } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            RRSO rosnąco
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={sort === SortBy.rating}
            aria-label="Sortuj: Ocena malejąco"
            onClick={() => setSort(SortBy.rating)}
            disabled={loading}
            className={`px-3 py-1 rounded-3xl border-2 cursor-pointer bg-background ${
              sort === SortBy.rating
                ? "border-secondary"
                : "border-primary-hover"
            } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            Ocena malejąco
          </button>
        </div>
      </div>
    </div>
  );
};
