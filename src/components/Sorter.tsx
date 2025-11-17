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
    <div className="flex flex-col md:flex-row md:items-center mb-4  gap-3 justify-between mx-3">
      <div className="flex items-center h-7">
        <span className="text mr-2">Liczba znalezionych ofert:</span>
        {loading ? (
          <span className="inline-block w-6 h-6 rounded-md bg-gray-300 animate-pulse  " />
        ) : (
          <strong className="inline-block text-xl font-bold">
            {error ? "0" : offersNumber}{" "}
          </strong>
        )}
      </div>
      <div className="flex items-center gap-3 ">
        <span className="text-sm ">Sortuj:</span>

        <button
          onClick={() => setSort(SortBy.apr)}
          className={`px-3 py-1 rounded-3xl  border-2  cursor-pointer bg-background ${
            sort === "apr" ? "  border-secondary " : "  border-primary-hover "
          }`}
        >
          RRSO rosnąco
        </button>

        <button
          onClick={() => setSort(SortBy.rating)}
          className={`px-3 py-1 rounded-3xl border-2  cursor-pointer ${
            sort === "rating"
              ? "  border-secondary "
              : "  border-primary-hover "
          }`}
        >
          Ocena malejąco
        </button>
      </div>
    </div>
  );
};
