import { useOffers } from "./hooks/useOffers";
import { OfferCard } from "./components/OfferCard";
import { Filters } from "./components/Filters";
import { Sorter } from "./components/Sorter";
import SkeletonLoadingOffer from "./components/OfferLoadingSkeleton";
import { mockOffers } from "./assets/mockData";
import { ErrorState } from "./components/ErrorState";
import { Footer } from "./components/Footer";

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
  } = useOffers();

  return (
    <div className="min-h-[101vh] flex flex-col bg-background">
      <div className="max-w-5xl mx-auto px-4 pt-8 flex flex-col grow">
        <header>
          <h1 className="text-4xl font-bold mb-6" data-testid="title">
            Ranking pożyczek
          </h1>
        </header>

        <main className="grow">
          <Filters
            amount={amount}
            setAmount={setAmount}
            allTags={allTags}
            tags={tags}
            setTags={setTags}
            period={period}
            setPeriod={setPeriod}
            loading={loading}
          />

          <Sorter
            setSort={setSortBy}
            sort={sortBy}
            error={error}
            loading={loading}
            offersNumber={filteredOffers.length}
          />

          {loading &&
            mockOffers.map((o, index) => (
              <SkeletonLoadingOffer number={index + 1} key={o.id + index} />
            ))}

          {error && <ErrorState load={load} />}

          {!loading &&
            !error &&
            (filteredOffers.length === 0 ? (
              <div className="flex flex-col justify-center items-center w-full mt-16 text-2xl text-center">
                <div>Nie znaleziono pasujących ofert.</div>
                <div className="font-bold">
                  Dopasuj filtry i spróbuj ponownine.
                </div>
              </div>
            ) : (
              filteredOffers.map((o, index) => (
                <OfferCard key={o.id} number={index + 1} offer={o} />
              ))
            ))}
        </main>

        <Footer />
      </div>
    </div>
  );
}
