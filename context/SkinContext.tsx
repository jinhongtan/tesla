// context/SkinContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Skin, TeslaModel, Category } from '@/types/skin';
import { MOCK_SKINS, ALL_MODELS, CATEGORIES } from '@/data/mock-skins';

interface FilterState {
  selectedModel: TeslaModel | 'All';
  searchQuery: string;
  selectedCategories: string[];
  selectedPrice: 'all' | 'free' | 'paid';
}

interface SkinContextType {
  filters: FilterState;
  updateFilters: (updates: Partial<FilterState>) => void;
  clearFilters: () => void;
  filteredSkins: Skin[];
  categories: Category[];
}

const SkinContext = createContext<SkinContextType | undefined>(undefined);

export function SkinProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>({
    selectedModel: 'All',
    searchQuery: '',
    selectedCategories: [],
    selectedPrice: 'all',
  });

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const clearFilters = () => {
    setFilters({
      selectedModel: 'All',
      searchQuery: '',
      selectedCategories: [],
      selectedPrice: 'all',
    });
  };

  // Filter logic
  const filteredSkins = MOCK_SKINS.filter(skin => {
    // Filter by model
    if (filters.selectedModel !== 'All' && skin.model !== filters.selectedModel) {
      return false;
    }

    // Filter by search query
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      const matchesName = skin.name.toLowerCase().includes(query);
      const matchesDescription = skin.description.toLowerCase().includes(query);
      const matchesCreator = skin.creator.name.toLowerCase().includes(query);
      const matchesTags = skin.tags.some(tag => tag.toLowerCase().includes(query));
      const matchesCategory = skin.category.toLowerCase().includes(query);
      
      if (!matchesName && !matchesDescription && !matchesCreator && !matchesTags && !matchesCategory) {
        return false;
      }
    }

    // Filter by categories
    if (filters.selectedCategories.length > 0 && !filters.selectedCategories.includes(skin.category)) {
      return false;
    }

    // Filter by price
    if (filters.selectedPrice === 'free' && !skin.isFree) {
      return false;
    }
    if (filters.selectedPrice === 'paid' && skin.isFree) {
      return false;
    }

    return true;
  });

  // Update categories with filtered skins
  const updatedCategories = CATEGORIES.map(category => ({
    ...category,
    featuredSkins: filteredSkins.filter(skin => skin.category === category.id).slice(0, 8)
  }));

  return (
    <SkinContext.Provider value={{
      filters,
      updateFilters,
      clearFilters,
      filteredSkins,
      categories: updatedCategories,
    }}>
      {children}
    </SkinContext.Provider>
  );
}

export function useSkinContext() {
  const context = useContext(SkinContext);
  if (!context) {
    throw new Error('useSkinContext must be used within SkinProvider');
  }
  return context;
}