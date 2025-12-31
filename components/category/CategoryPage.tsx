// components/category/CategoryPage.tsx
"use client";

import { useState, useEffect } from 'react';
import { Category } from '@/types/skin';
import SkinCard from '@/components/home/SkinCard';
import { MOCK_SKINS } from '@/data/mock-skins';
import { 
  ChevronLeft, Grid, List, Filter, X, Download, 
  TrendingUp, Star, Clock, ArrowUpDown 
} from 'lucide-react';
import Link from 'next/link';
import { useSkinContext } from '@/context/SkinContext';

interface CategoryPageProps {
  category: Category;
}

type SortOption = 'newest' | 'popular' | 'downloads' | 'name-asc' | 'name-desc';
type ViewMode = 'grid' | 'list';

export default function CategoryPage({ category }: CategoryPageProps) {
  const { filters, updateFilters } = useSkinContext();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [modelFilter, setModelFilter] = useState<string>('all');

  // Get all skins for this category
  const categorySkins = MOCK_SKINS.filter(skin => skin.category === category.id);

  // Get unique models from category skins
  const uniqueModels = Array.from(new Set(categorySkins.map(skin => skin.model)));

  // Apply filters
  let filteredSkins = categorySkins.filter(skin => {
    // Price filter
    if (priceFilter === 'free' && !skin.isFree) return false;
    if (priceFilter === 'paid' && skin.isFree) return false;
    
    // Model filter
    if (modelFilter !== 'all' && skin.model !== modelFilter) return false;
    
    return true;
  });

  // Apply sorting
  filteredSkins.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
        return b.likes - a.likes;
      case 'downloads':
        return b.downloadCount - a.downloadCount;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Clear all filters
  const clearAllFilters = () => {
    setPriceFilter('all');
    setModelFilter('all');
    setSortBy('popular');
  };

  const hasActiveFilters = priceFilter !== 'all' || modelFilter !== 'all';

  // Update category stats
  const totalDownloads = categorySkins.reduce((sum, skin) => sum + skin.downloadCount, 0);
  const avgRating = 4.8; // Mock data
  const freeSkins = categorySkins.filter(skin => skin.isFree).length;
  const paidSkins = categorySkins.filter(skin => !skin.isFree).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-16 z-40 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-3">
                <div className="text-2xl">{category.icon}</div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{category.name}</h1>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {filteredSkins.length} of {categorySkins.length} skins
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Category Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Download className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">Total Downloads</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {(totalDownloads / 1000).toFixed(1)}K
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-gray-600">Avg. Rating</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{avgRating}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-600">Free Skins</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{freeSkins}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-600">Paid Skins</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{paidSkins}</div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 py-8">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Grid view"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="downloads">Most Downloads</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
            </select>
          </div>

          {/* Filter Button */}
          <div className="flex items-center gap-4">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-2 hover:bg-blue-50 rounded-lg"
              >
                Clear filters
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="h-4 w-4" />
              Filter
              {hasActiveFilters && (
                <span className="bg-white text-blue-600 rounded-full h-5 w-5 text-xs flex items-center justify-center">
                  {(priceFilter !== 'all' ? 1 : 0) + (modelFilter !== 'all' ? 1 : 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl p-6 mb-8 shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Price Filter */}
              <div>
                <h4 className="font-medium text-gray-700 mb-4">Price</h4>
                <div className="flex gap-3">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'free', label: 'Free Only' },
                    { id: 'paid', label: 'Paid Only' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setPriceFilter(option.id as any)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        priceFilter === option.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Model Filter */}
              <div>
                <h4 className="font-medium text-gray-700 mb-4">Tesla Model</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setModelFilter('all')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      modelFilter === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Models
                  </button>
                  {uniqueModels.map((model) => (
                    <button
                      key={model}
                      onClick={() => setModelFilter(model)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        modelFilter === model
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowFilters(false)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && !showFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-600">Active filters:</span>
            {priceFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {priceFilter === 'free' ? 'Free Only' : 'Paid Only'}
                <button
                  onClick={() => setPriceFilter('all')}
                  className="hover:text-blue-900 ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {modelFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {modelFilter}
                <button
                  onClick={() => setModelFilter('all')}
                  className="hover:text-blue-900 ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {filteredSkins.length} {category.name} Skins
          </h2>
          <p className="text-gray-600">
            Showing {filteredSkins.length} of {categorySkins.length} total skins in {category.name} category
          </p>
        </div>

        {/* Skins Display */}
        {filteredSkins.length > 0 ? (
          viewMode === 'grid' ? (
            // Grid View
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredSkins.map((skin) => (
                <SkinCard key={skin.id} skin={skin} />
              ))}
            </div>
          ) : (
            // List View
            <div className="space-y-4">
              {filteredSkins.map((skin) => (
                <div
                  key={skin.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Thumbnail */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${skin.thumbnailUrl})` }}
                      />
                    </div>
                    
                    {/* Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900">{skin.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{skin.description}</p>
                        </div>
                        <div className="text-right">
                          {skin.isFree ? (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                              FREE
                            </span>
                          ) : (
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                              ${skin.price}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          {skin.downloadCount.toLocaleString()} downloads
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          {skin.likes} likes
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(skin.createdAt).toLocaleDateString()}
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                          Tesla {skin.model}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                          <span className="text-sm text-gray-700">{skin.creator.name}</span>
                        </div>
                        <Link
                          href={`/skins/${skin.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          // No Results
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No skins found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or browse other categories
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={clearAllFilters}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Clear all filters
              </button>
              <Link
                href="/"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Browse All Categories
              </Link>
            </div>
          </div>
        )}

        {/* Pagination (if needed) */}
        {filteredSkins.length > 24 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
                Previous
              </button>
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">1</button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
                2
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
                3
              </button>
              <span className="px-2 text-gray-500">...</span>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
                10
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
                Next
              </button>
            </nav>
          </div>
        )}
      </main>

      {/* Related Categories */}
      {/* <section className="border-t bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Explore Other Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['matte', 'chrome', 'carbon-fiber', 'gradient', 'color', 'custom']
              .filter(id => id !== category.id)
              .map((catId) => {
                const cat = CATEGORIES.find(c => c.id === catId);
                if (!cat) return null;
                const catSkins = MOCK_SKINS.filter(skin => skin.category === catId);
                return (
                  <Link
                    key={catId}
                    href={`/category/${catId}`}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-200 group"
                  >
                    <div className="text-2xl mb-2">{cat.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{cat.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{catSkins.length} skins</p>
                    <span className="text-blue-600 text-sm font-medium group-hover:text-blue-800">
                      Browse →
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </section> */}
    </div>
  );
}