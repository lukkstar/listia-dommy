"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auctions } from "@/data/auctions";
import AuctionCard from "@/components/auction-card";
import CategorySidebar from "@/components/category-sidebar";
import FiltersPanel from "@/components/filters-panel";
import SortBar, { type SortKey, type ViewMode } from "@/components/sort-bar";
import Pagination from "@/components/pagination";

const PER_PAGE = 6;

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read query AND category from URL
  const query = searchParams.get("q") ?? "";
  const activeCategory = searchParams.get("category");

  // Update category in URL (called by sidebar)
  const handleCategoryChange = useCallback(
    (slug: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug) {
        params.set("category", slug);
      } else {
        params.delete("category");
      }
      router.push(`/search?${params.toString()}`);
    },
    [router, searchParams],
  );

  // Local state for other controls
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [localPickupOnly, setLocalPickupOnly] = useState(false);
  const [digitalOnly, setDigitalOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [view, setView] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);

  // Reset to page 1 whenever any filter changes
  useEffect(() => {
    setPage(1);
  }, [
    query,
    activeCategory,
    freeShippingOnly,
    localPickupOnly,
    digitalOnly,
    sort,
  ]);

  // 1. Filter
  const filtered = useMemo(() => {
    return auctions.filter((a) => {
      if (query && !a.title.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      if (activeCategory && a.category !== activeCategory) {
        return false;
      }
      if (freeShippingOnly && !a.shipsFree) {
        return false;
      }
      if (localPickupOnly && !a.localPickup) {
        return false;
      }
      if (digitalOnly && !a.digitalDelivery) {
        return false;
      }
      return true;
    });
  }, [query, activeCategory, freeShippingOnly, localPickupOnly, digitalOnly]);

  // 2. Sort
  const sorted = useMemo(() => {
    const copy = [...filtered];
    switch (sort) {
      case "lowest-price":
        return copy.sort((a, b) => a.bidPoints - b.bidPoints);
      case "highest-price":
        return copy.sort((a, b) => b.bidPoints - a.bidPoints);
      case "ending-soonest":
        return copy.sort(
          (a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime(),
        );
      case "newly-listed":
        return copy.reverse();
      default:
        return copy;
    }
  }, [filtered, sort]);

  // 3. Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const pageItems = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <main className="max-w-screen-lg mx-auto px-6 py-8">
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Browse Listings</h1>
        <p className="text-sm text-gray-500 mt-1">
          {query
            ? `Showing results for "${query}"`
            : "Discover items from sellers around the world"}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column: sidebar + filters */}
        <div className="lg:w-64 lg:shrink-0 space-y-4">
          <CategorySidebar
            activeSlug={activeCategory}
            onChange={handleCategoryChange}
          />
          <FiltersPanel
            freeShippingOnly={freeShippingOnly}
            localPickupOnly={localPickupOnly}
            digitalOnly={digitalOnly}
            onFreeShippingChange={setFreeShippingOnly}
            onLocalPickupChange={setLocalPickupOnly}
            onDigitalChange={setDigitalOnly}
          />
        </div>

        {/* Right column: results */}
        <div className="flex-1 space-y-4">
          <SortBar
            total={sorted.length}
            sort={sort}
            view={view}
            onSortChange={setSort}
            onViewChange={setView}
          />

          {/* Auction list/grid */}
          {pageItems.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center">
              <p className="text-gray-500">No items match your filters.</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pageItems.map((a) => (
                <AuctionCard key={a.id} auction={a} view="grid" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {pageItems.map((a) => (
                <AuctionCard key={a.id} auction={a} view="list" />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pt-4">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
