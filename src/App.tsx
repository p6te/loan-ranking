import { useOffers } from "./hooks/useOffers";
import { OfferCard } from "./components/OfferCard";
import { Filters } from "./components/Filters";
import { Sorter } from "./components/Sorter";

export default function App() {
  const {
    filteredOffers,
    loading,
    error,
    load,
    amount,
    setAmount,
    period,
    setPeriod,
    sortBy,
    setSortBy,
    tags,
    setTags,
    allTags,
    limits,
  } = useOffers();

  return (
    <div className="min-h-[101vh] bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Ranking pożyczek</h1>

        <Filters
          amount={amount}
          setAmount={setAmount}
          allTags={allTags}
          tags={tags}
          setTags={setTags}
          period={period}
          setPeriod={setPeriod}
          limits={limits}
        />

        <Sorter setSort={setSortBy} sort={sortBy} />

        {loading && (
          <div className="space-y-3">
            <div className="h-20 bg-white animate-pulse rounded-xl border" />
          </div>
        )}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-600 mb-3">{error}</p>
            <button
              onClick={load}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Retry
            </button>
          </div>
        )}
        {!loading &&
          !error &&
          filteredOffers.map((o) => <OfferCard key={o.id} offer={o} />)}
      </div>
    </div>
  );
}
