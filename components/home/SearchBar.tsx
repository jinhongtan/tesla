// components/home/SearchBar.tsx
"use client";

import { useState, useEffect } from 'react';
import { Search, Filter, X, Tag, DollarSign } from 'lucide-react';
import { useSkinContext } from '@/context/SkinContext';

export default function SearchBar() {
  const { filters, updateFilters, clearFilters } = useSkinContext();
  const [localSearch, setLocalSearch] = useState(filters.searchQuery);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    { id: 'matte', name: 'Matte', color: 'bg-gray-800 text-white' },
    { id: 'chrome', name: 'Chrome', color: 'bg-gray-300 text-gray-900' },
    { id: 'carbon-fiber', name: 'Carbon', color: 'bg-gray-900 text-white' },
    { id: 'gradient', name: 'Gradient', color: 'bg-gradient-to-r from-blue-400 to-purple-400 text-white' },
    { id: 'color', name: 'Colors', color: 'bg-gradient-to-r from-red-400 to-blue-400 text-white' },
    { id: 'custom', name: 'Custom', color: 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' },
  ];

  const toggleCategory = (categoryId: string) => {
    const newCategories = filters.selectedCategories.includes(categoryId)
      ? filters.selectedCategories.filter(id => id !== categoryId)
      : [...filters.selectedCategories, categoryId];
    updateFilters({ selectedCategories: newCategories });
  };

  const applyFilters = () => {
    setIsFilterOpen(false);
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateFilters({ searchQuery: localSearch });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearch, updateFilters]);

  const hasActiveFilters = filters.selectedCategories.length > 0 || filters.selectedPrice !== 'all';

  return (
    <div className="relative">
      {/* Main Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search skins by name, category, theme, or creator..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full pl-10 pr-24 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-gray-800 bg-white shadow-sm text-sm placeholder-gray-500"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-2 rounded-lg transition-all duration-200 flex items-center gap-1 text-xs font-medium ${
              hasActiveFilters
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Filter options"
          >
            <Filter className="h-3 w-3" />
            {hasActiveFilters && (
              <span className="bg-white text-blue-600 rounded-full h-4 w-4 text-xs flex items-center justify-center">
                {filters.selectedCategories.length + (filters.selectedPrice !== 'all' ? 1 : 0)}
              </span>
            )}
          </button>
          {localSearch && (
            <>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => {
                  setLocalSearch('');
                  updateFilters({ searchQuery: '' });
                }}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                title="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    updateFilters({ selectedCategories: [], selectedPrice: 'all' });
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded hover:bg-blue-50"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Price Filter */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-3 w-3 text-gray-500" />
              <h4 className="text-xs font-medium text-gray-700">PRICE</h4>
            </div>
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'free', label: 'Free Only' },
                { id: 'paid', label: 'Paid Only' },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateFilters({ selectedPrice: option.id as any })}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                    filters.selectedPrice === option.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag className="h-3 w-3 text-gray-500" />
              <h4 className="text-xs font-medium text-gray-700">CATEGORIES</h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                    filters.selectedCategories.includes(category.id)
                      ? `${category.color} shadow-sm scale-95`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  {filters.selectedCategories.includes(category.id) && (
                    <X className="h-3 w-3" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Active filters display */}
      {hasActiveFilters && !isFilterOpen && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-600">Active filters:</span>
          {filters.selectedPrice !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
              <DollarSign className="h-3 w-3" />
              {filters.selectedPrice === 'free' ? 'Free' : 'Paid'}
              <button
                onClick={() => updateFilters({ selectedPrice: 'all' })}
                className="hover:text-blue-900 ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.selectedCategories.map(catId => {
            const category = categories.find(c => c.id === catId);
            return (
              <span
                key={catId}
                className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
              >
                {category?.name}
                <button
                  onClick={() => toggleCategory(catId)}
                  className="hover:text-blue-900 ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })}
          <button
            onClick={() => updateFilters({ selectedCategories: [], selectedPrice: 'all' })}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}