import { SortBy } from "../types";

interface SorterProps {
  sort: SortBy;
  setSort: (e: SortBy) => void;
}
export const Sorter = ({ sort, setSort }: SorterProps) => {
  return (
    <div className="flex items-center gap-3 ">
      <span className="text-sm ">Sortuj:</span>

      <button
        onClick={() => setSort(SortBy.apr)}
        className={`px-3 py-1 rounded-lg  border-2  cursor-pointer bg-background ${
          sort === "apr" ? "  border-secondary " : "  border-primary-hover "
        }`}
      >
        RRSO rosnąco
      </button>

      <button
        onClick={() => setSort(SortBy.rating)}
        className={`px-3 py-1 rounded-lg border-2  cursor-pointer ${
          sort === "rating" ? "  border-secondary " : "  border-primary-hover "
        }`}
      >
        Ocena malejąco
      </button>
    </div>
  );
};
