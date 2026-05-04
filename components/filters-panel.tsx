"use client";

interface Props {
  freeShippingOnly: boolean;
  localPickupOnly: boolean;
  digitalOnly: boolean;
  onFreeShippingChange: (value: boolean) => void;
  onLocalPickupChange: (value: boolean) => void;
  onDigitalChange: (value: boolean) => void;
}

export default function FiltersPanel({
  freeShippingOnly,
  localPickupOnly,
  digitalOnly,
  onFreeShippingChange,
  onLocalPickupChange,
  onDigitalChange,
}: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Filters</h2>

      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={freeShippingOnly}
            onChange={(e) => onFreeShippingChange(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900">
            Free Shipping Only
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={localPickupOnly}
            onChange={(e) => onLocalPickupChange(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900">
            Local Pickup
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={digitalOnly}
            onChange={(e) => onDigitalChange(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900">
            Digital Delivery
          </span>
        </label>
      </div>
    </div>
  );
}
