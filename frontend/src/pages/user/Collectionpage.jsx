import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { CardSkeleton } from "../../components/common/CardSkeleton";
import { Filter } from "../../components/pages/collectionPage/Filter";
import { useProducts } from "../../hooks/useProducts";
import { NoItemsFound } from "../../components/common/NoItemsFound";

export const CollectionPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const [sort, setSort] = useState("");

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearch);

  useEffect(() => {
    setSearchTerm(urlSearch);
    setDebouncedSearch(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      // Sync URL if search is updated locally
      if (searchTerm) {
        setSearchParams({ search: searchTerm });
      } else {
        setSearchParams({});
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, setSearchParams]);

  const { products, loading, error, meta } = useProducts({ search: debouncedSearch });

  console.log(products)

  return (
    <>
      <main className="pt-20 md:pt-24">
        <div className="px-6 md:px-12 lg:px-16 py-8 md:py-12">
          <div style={{ opacity: 1, transform: "none" }}>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal">
              Shop Collection
            </h1>
            <p className="text-medium-gray mt-2 text-sm md:text-base max-w-lg">
              Curated pieces selected by AI to match your style DNA. Browse our
              full range of premium fashion.
            </p>
          </div>
        </div>
        <div className="px-6 md:px-12 lg:px-16 pb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-medium-gray text-lg" />
              <input
                placeholder="Search products, styles, categories..."
                className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-charcoal transition-colors"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <label
                htmlFor="sort"
                className="text-sm font-medium text-charcoal"
              >
                Sort By
              </label>

              <div className="relative">
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-charcoal outline-none focus:border-charcoal cursor-pointer"
                >
                  <option value="">Default</option>
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="title-asc">Name: A-Z</option>
                  <option value="title-desc">Name: Z-A</option>
                </select>

                <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-medium-gray" />
              </div>
            </div>
          </div>
          <p className="text-xs text-medium-gray mt-4">
            {loading ? "Searching..." : `${meta?.totalProducts ?? products?.length ?? 0} products found`}
          </p>
        </div>
        <div className="px-6 md:px-12 lg:px-16 pb-20 md:pb-28">
          <div className="flex gap-8 lg:gap-10">

            <Filter />
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-6">
                {error && <div className="col-span-full text-red-500 text-sm">Error: {error.message}</div>}

                {loading ? (
                  Array.from({ length: 8 }).map((_, index) => (
                    <CardSkeleton key={index} />
                  ))
                ) : products.length > 0 ? (
                  products.map((item) => (
                    <Card key={item._id} item={item} />
                  ))
                ) : (
                  <NoItemsFound
                    title="No Products Found"
                    description={`No products found for "${debouncedSearch}". Try another keyword.`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
