"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { categories } from "@/data/categories";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  // Keep input in sync with URL when user navigates
  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }
    router.push(`/search?${params.toString()}`);
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-screen-lg mx-auto flex items-center gap-6 px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Listia</span>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-md">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              const newValue = e.target.value;
              setQuery(newValue);
              // If user cleared the input (clicked X), update URL immediately
              if (newValue === "") {
                const params = new URLSearchParams(searchParams.toString());
                params.delete("q");
                router.push(`/search?${params.toString()}`);
              }
            }}
            placeholder="Search for items..."
            autoComplete="off"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </form>

        {/* Categories dropdown */}
        <select
          value={searchParams.get("category") ?? ""}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString());
            if (e.target.value) {
              params.set("category", e.target.value);
            } else {
              params.delete("category");
            }
            router.push(`/search?${params.toString()}`);
          }}
          className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 cursor-pointer hover:border-gray-300"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-gray-700 hover:text-gray-900 font-medium"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
