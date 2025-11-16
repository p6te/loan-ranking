import { SortBy } from "../types";

interface SorterProps {
  sort: SortBy;
  setSort: (e: SortBy) => void;
}
export const Sorter = ({ sort, setSort }: SorterProps) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-sm text-gray-600">Sortuj:</span>

      <button
        onClick={() => setSort(SortBy.apr)}
        className={`px-3 py-1 rounded-lg border  cursor-pointer ${
          sort === "apr"
            ? "bg-secondary text-white border-secondary hover:bg-secondary-hover"
            : "bg-background text-gray-800 border-primary-hover hover:border-secondary"
        }`}
      >
        RRSO rosnąco
      </button>

      <button
        onClick={() => setSort(SortBy.rating)}
        className={`px-3 py-1 rounded-lg border  cursor-pointer ${
          sort === "rating"
            ? "bg-secondary text-white border-secondary hover:bg-secondary-hover"
            : "bg-background text-gray-800 border-primary-hover hover:border-secondary"
        }`}
      >
        Ocena malejąco
      </button>
    </div>
  );
};
