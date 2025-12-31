// components/home/CategorySection.tsx
"use client";

import { Category } from '@/types/skin';
import SkinCard from './SkinCard';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useSkinContext } from '@/context/SkinContext';

interface CategorySectionProps {
    category: Category;
}

export default function CategorySection({ category }: CategorySectionProps) {
    const { filteredSkins } = useSkinContext();

    // Get skins for this specific category from filtered results
    const categorySkins = filteredSkins.filter(skin => skin.category === category.id);

    // If no skins in this category after filtering, don't show the section
    if (categorySkins.length === 0) {
        return null;
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <div className="flex items-center gap-3 mb-3 sm:mb-0">
                    <div className="text-xl">{category.icon}</div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                        <p className="text-sm text-gray-600">
                            {categorySkins.length} of {category.count} skins
                        </p>
                    </div>
                </div>
                // components/home/CategorySection.tsx - Update the link
                <Link
                    href={`/category/${category.id}`}
                    className="group flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                >
                    View all
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {categorySkins.slice(0, 8).map((skin) => (
                    <SkinCard key={skin.id} skin={skin} />
                ))}
            </div>

            {categorySkins.length > 8 && (
                <div className="mt-6 text-center">
          // components/home/CategorySection.tsx - Update the link
                    <Link
                        href={`/category/${category.id}`}
                        className="group flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                    >
                        View all
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            )}
        </div>
    );
}