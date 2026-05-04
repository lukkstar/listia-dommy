"use client";

export type SortKey =
  | "recommended"
  | "ending-soonest"
  | "newly-listed"
  | "lowest-price"
  | "highest-price";

export type ViewMode = "grid" | "list";

interface Props {
  total: number;
  sort: SortKey;
  view: ViewMode;
  onSortChange: (sort: SortKey) => void;
  onViewChange: (view: ViewMode) => void;
}

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "ending-soonest", label: "Ending Soonest" },
  { value: "newly-listed", label: "Newly Listed" },
  { value: "lowest-price", label: "Lowest Price" },
  { value: "highest-price", label: "Highest Price" },
];

export default function SortBar({
  total,
  sort,
  view,
  onSortChange,
  onViewChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl px-5 py-3">
      <p className="text-sm text-gray-600">
        <span className="font-semibold text-gray-900">
          {total.toLocaleString()}
        </span>{" "}
        results
      </p>

      <div className="flex items-center gap-3">
        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort:</label>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* View toggle */}
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => onViewChange("grid")}
            className={`px-3 py-1.5 text-sm transition ${
              view === "grid"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Grid
          </button>
          <button
            type="button"
            onClick={() => onViewChange("list")}
            className={`px-3 py-1.5 text-sm transition ${
              view === "list"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            List
          </button>
        </div>
      </div>
    </div>
  );
}
