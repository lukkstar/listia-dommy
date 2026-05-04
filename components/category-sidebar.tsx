"use client";

import { categories } from "@/data/categories";

interface Props {
  activeSlug: string | null;
  onChange: (slug: string | null) => void;
}

export default function CategorySidebar({ activeSlug, onChange }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Categories</h2>
      <ul className="space-y-1">
        <li>
          <button
            type="button"
            onClick={() => onChange(null)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
              activeSlug === null
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            All Categories
          </button>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <button
              type="button"
              onClick={() => onChange(c.slug)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                activeSlug === c.slug
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {c.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
