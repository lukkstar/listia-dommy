import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auctions } from "@/data/auctions";
import { categories } from "@/data/categories";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AuctionDetailPage({ params }: Props) {
  const { id } = await params;
  const auction = auctions.find((a) => a.id === id);

  if (!auction) {
    notFound();
  }

  const category = categories.find((c) => c.slug === auction.category);

  // Get 4 related items from the same category (excluding this one)
  const related = auctions
    .filter((a) => a.category === auction.category && a.id !== auction.id)
    .slice(0, 4);

  return (
    <main className="max-w-screen-lg mx-auto px-6 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/search" className="hover:text-indigo-600">
          Browse
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link href="/search" className="hover:text-indigo-600">
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-900 font-medium line-clamp-1">
          {auction.title}
        </span>
      </nav>

      {/* Main content: image + info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div className="relative aspect-square bg-white border border-gray-200 rounded-xl overflow-hidden">
          <Image
            src={auction.imageUrl}
            alt={auction.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {auction.title}
          </h1>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {auction.shipsFree && (
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                Free Shipping
              </span>
            )}
            {auction.localPickup && (
              <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded">
                Local Pickup
              </span>
            )}
            {auction.digitalDelivery && (
              <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2.5 py-1 rounded">
                Digital Delivery
              </span>
            )}
          </div>

          {/* Bid box */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">
              Current Bid
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-4">
              {auction.bidPoints.toLocaleString()}{" "}
              <span className="text-base text-gray-500 font-normal">PTS</span>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="number"
                placeholder="Enter your bid"
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-500 transition"
              />
              <button
                type="button"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
              >
                Place Bid
              </button>
            </div>

            <button
              type="button"
              className="w-full px-6 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition"
            >
              ❤ Add to Watchlist
            </button>
          </div>

          {/* Meta info */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Auction Ends</span>
              <span className="font-medium text-gray-900">
                {auction.endsAt}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Category</span>
              <span className="font-medium text-gray-900">
                {category?.name ?? "—"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Item ID</span>
              <span className="font-medium text-gray-900">#{auction.id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-12">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Description</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          This is a beautiful {auction.title.toLowerCase()}. Item is in great
          condition and ready to ship. Bid now to win this amazing piece for
          your collection. All bids are final and items ship within 3 business
          days of auction close.
        </p>
      </section>

      {/* Related items */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Related Items
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((a) => (
              <Link
                key={a.id}
                href={`/auction/${a.id}`}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-indigo-300 hover:shadow-sm transition group"
              >
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <Image
                    src={a.imageUrl}
                    alt={a.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 line-clamp-1 mb-1">
                    {a.title}
                  </h3>
                  <div className="text-sm font-bold text-gray-900">
                    {a.bidPoints.toLocaleString()}{" "}
                    <span className="text-xs text-gray-500 font-normal">
                      PTS
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
