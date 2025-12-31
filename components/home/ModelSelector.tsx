// components/home/ModelSelector.tsx
"use client";

import { useState } from 'react';
import { ALL_MODELS } from '@/data/mock-skins';
import { Car } from 'lucide-react';

type TeslaModel = 'Model 3' | 'Model Y' | 'Model S' | 'Model X' | 'Cybertruck';

import { useSkinContext } from '@/context/SkinContext';

export default function ModelSelector() {
  const { filters, updateFilters } = useSkinContext();

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Car className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Tesla Models</h3>
        {filters.selectedModel !== 'All' && (
          <button
            onClick={() => updateFilters({ selectedModel: 'All' })}
            className="ml-auto text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear filter
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateFilters({ selectedModel: 'All' })}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            filters.selectedModel === 'All'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Models
        </button>
        
        {ALL_MODELS.map((model) => (
          <button
            key={model}
            onClick={() => updateFilters({ selectedModel: model })}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-1 ${
              filters.selectedModel === model
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Car className="h-3 w-3" />
            {model}
          </button>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          Showing: <span className="font-semibold text-blue-600">
            {filters.selectedModel === 'All' ? 'All Models' : `Tesla ${filters.selectedModel}`}
          </span>
          <span className="text-gray-400 ml-2">
            ({ALL_MODELS.filter(m => filters.selectedModel === 'All' || m === filters.selectedModel).length} models available)
          </span>
        </p>
      </div>
    </div>
  );
}