// app/page.tsx
"use client";

import ModelSelector from '@/components/home/ModelSelector';
import SearchBar from '@/components/home/SearchBar';
import CategorySection from '@/components/home/CategorySection';
import HeroSection from '@/components/home/HeroSection';
import { useSkinContext } from '@/context/SkinContext';

export default function HomePage() {
  const { filteredSkins, categories, filters, clearFilters } = useSkinContext();
  const hasActiveFilters = filters.selectedModel !== 'All' || 
                          filters.searchQuery.trim() || 
                          filters.selectedCategories.length > 0 || 
                          filters.selectedPrice !== 'all';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeroSection />

      <main className="container mx-auto px-4 sm:px-6 py-6">
        {/* Results header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tesla Skins & Wraps</h1>
            <p className="text-gray-600 mt-1 text-sm">
              {filteredSkins.length} {filteredSkins.length === 1 ? 'skin' : 'skins'} found
              {hasActiveFilters && ' (with filters applied)'}
            </p>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium px-4 py-2 hover:bg-blue-50 rounded-lg"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Model Selection */}
        <section className="mb-8">
          <ModelSelector />
        </section>

        {/* Search Section */}
        <section className="mb-8">
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </section>

        {/* Skin Gallery by Category */}
        {filteredSkins.length > 0 ? (
          <section className="space-y-12">
            {categories
              .filter(category => category.featuredSkins.length > 0)
              .map((category) => (
                <CategorySection 
                  key={category.id} 
                  category={category}
                />
              ))}
          </section>
        ) : (
          // No results state
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No skins found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        {filteredSkins.length > 0 && (
          <section className="mt-16 mb-8 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-3">
                Found {filteredSkins.length} amazing skins!
              </h2>
              <p className="text-blue-100 text-sm mb-6 max-w-xl mx-auto">
                Continue browsing or start customizing your Tesla today
              </p>
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 shadow-lg">
                Explore More Skins
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}