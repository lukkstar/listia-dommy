import Image from "next/image";
import Link from "next/link";
import type { Auction } from "@/types";

interface Props {
  auction: Auction;
  view?: "grid" | "list";
}

function Badges({ auction }: { auction: Auction }) {
  return (
    <div className="flex flex-wrap gap-1">
      {auction.shipsFree && (
        <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
          Free Shipping
        </span>
      )}
      {auction.localPickup && (
        <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
          Local Pickup
        </span>
      )}
      {auction.digitalDelivery && (
        <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
          Digital
        </span>
      )}
    </div>
  );
}

export default function AuctionCard({ auction, view = "grid" }: Props) {
  if (view === "list") {
    return (
      <Link
        href={`/auction/${auction.id}`}
        className="flex gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-sm transition cursor-pointer"
      >
        <div className="relative w-32 h-32 shrink-0 rounded-lg overflow-hidden bg-gray-50">
          <Image
            src={auction.imageUrl}
            alt={auction.title}
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-base font-medium text-gray-900 hover:text-indigo-600 line-clamp-2">
            {auction.title}
          </h3>
          <Badges auction={auction} />
          <div className="mt-auto flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Current Bid
              </div>
              <div className="text-lg font-bold text-gray-900">
                {auction.bidPoints.toLocaleString()}{" "}
                <span className="text-xs text-gray-500 font-normal">PTS</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Ends</div>
              <div className="text-sm font-medium text-gray-700">
                {auction.endsAt}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid view (default)
  return (
    <Link
      href={`/auction/${auction.id}`}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-indigo-300 hover:shadow-sm transition cursor-pointer group"
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={auction.imageUrl}
          alt={auction.title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 line-clamp-2 min-h-[2.5rem] mb-2">
          {auction.title}
        </h3>

        <Badges auction={auction} />

        <div className="mt-3 flex items-end justify-between">
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wide">
              Current Bid
            </div>
            <div className="text-base font-bold text-gray-900">
              {auction.bidPoints.toLocaleString()}{" "}
              <span className="text-xs text-gray-500 font-normal">PTS</span>
            </div>
          </div>
          <div className="text-xs text-gray-500">{auction.endsAt}</div>
        </div>
      </div>
    </Link>
  );
}
